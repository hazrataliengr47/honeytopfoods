import Order from "../models/order.modals.js"
import Product from "../models/product.models.js";
import ShippingSettings from "../models/shippngSetting.model.js";
import mongoose from "mongoose";


export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMyOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// create new order
// export const createOrder = async (req,res) => {
//     try{
//         const {
//         customer,
//         email,
//         mobile,
//         address,
//         apartment,
//         city,
//         postalCode,
//         product,
//         price,
//         quantity,
//         products,
//         amount,
//         shippingCharges,
//         status,
//         date,
//     } = req.body;

//     const randomNumber = Math.floor(
//   1000000 + Math.random() * 9000000
// );

// const nextOrderNumber = `HTF0${randomNumber}`;

//     // const lastOrder = await Order.findOne({
//     //         orderNumber: { $exists: true, $ne: null }
//     //     }).sort({ createdAt: -1 });

//     //     let nextNumber = 5001;

//     //     if (lastOrder?.orderNumber) {
//     //         const lastNumber = parseInt(
//     //             lastOrder.orderNumber.replace("HTF-", ""),
//     //             10
//     //         );

//     //         nextNumber = lastNumber + 1;
//     //     }

//     //     const nextOrderNumber = `HTF-${nextNumber}`;



//     const order = await Order.create({
//         orderNumber: nextOrderNumber,
//         userId: req.userId,
//         customer,
//         email,
//         mobile,
//         address,
//         apartment,
//         city,
//         postalCode,
//         product,
//         price,
//         quantity,
//         products,
//         amount,
//         shippingCharges,
//         status,
//         date,
//     });

//     res.status(201).json({
//         success:true,
//         message:"order created successfully",
//         data:order,
//     });
//     }catch(error){
//         res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }
    
// };

export const createOrder = async (req, res) => {
  const reservedStock = [];
  const restoreReservedStock = async () => {
    for (const item of reservedStock) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { stock: item.quantity } }
      );
    }

    reservedStock.length = 0;
  };


  try {
    const {
      customer,
      email,
      mobile,
      address,
      apartment,
      city,
      postalCode,
      products,
    } = req.body;

    // Step 1: Validate the order
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    // Step 2: Validate product IDs and quantities
    for (const item of normalizedProducts) {
      if (
        !mongoose.Types.ObjectId.isValid(item.productId) ||
        !/^[0-9a-fA-F]{24}$/.test(String(item.productId))
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID.",
        });
      }

      if (!Number.isInteger(Number(item.quantity)) || Number(item.quantity) < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity.",
        });
      }
    }

    // Step 3: Get official products from MongoDB
    const combinedProductsMap = new Map();

for (const item of products) {
  const productId = String(item.productId);
  const quantity = Number(item.quantity);

  combinedProductsMap.set(
    productId,
    (combinedProductsMap.get(productId) || 0) + quantity
  );
}

const normalizedProducts = Array.from(
  combinedProductsMap,
  ([productId, quantity]) => ({ productId, quantity })
);


    const productIds = [
  ...new Set(products.map((item) => String(item.productId))),
];
    const databaseProducts = await Product.find({
      _id: { $in: productIds },
    });

    const productMap = new Map(
      databaseProducts.map((item) => [item._id.toString(), item])
    );

    const verifiedProducts = [];

    for (const item of normalizedProducts) {
      const databaseProduct = productMap.get(String(item.productId));
      const quantity = Number(item.quantity);

      if (!databaseProduct) {
        return res.status(400).json({
          success: false,
          message: "A product in your cart no longer exists.",
        });
      }

      if (quantity > databaseProduct.stock) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${databaseProduct.name}.`,
        });
      }

      const officialPrice = Number(databaseProduct.price);

      verifiedProducts.push({
        productId: databaseProduct._id,
        name: databaseProduct.name,
        price: officialPrice,
        quantity,
        image: databaseProduct.image || "",
        lineTotal: officialPrice * quantity,
      });
    }

// Deduct stock safely in MongoDB
for (const item of verifiedProducts) {
  const result = await Product.updateOne(
    {
      _id: item.productId,
      stock: { $gte: item.quantity },
    },
    {
      $inc: { stock: -item.quantity },
    }
  );

  if (result.modifiedCount !== 1) {
    await restoreReservedStock();

    return res.status(400).json({
      success: false,
      message: `Insufficient stock for ${item.name}. Please refresh your cart.`,
    });
  }

  reservedStock.push({
    productId: item.productId,
    quantity: item.quantity,
  });
}


    // Step 4: Calculate subtotal using database prices
    const subtotal = verifiedProducts.reduce(
      (total, item) => total + item.lineTotal,
      0
    );

    // Step 5: Get official shipping settings
    const settings = await ShippingSettings.findOne();

    const shippingCharges =
      settings?.shippingType === "manual"
        ? Number(settings.shippingAmount || 0)
        : 0;

    if (!Number.isFinite(shippingCharges) || shippingCharges < 0) {
      return res.status(500).json({
        success: false,
        message: "Invalid shipping settings.",
      });
    }

    const grandTotal = subtotal + shippingCharges;
    const totalQuantity = verifiedProducts.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Step 6: Create the order using server-calculated values
    const randomNumber = Math.floor(
      1000000 + Math.random() * 9000000
    );

    const order = await Order.create({
      orderNumber: `HTF0${randomNumber}`,
      userId: req.userId,
      customer,
      email,
      mobile,
      address,
      apartment,
      city,
      postalCode,
      product: verifiedProducts
        .map((item) => `${item.name} x ${item.quantity}`)
        .join(", "),
      price: subtotal,
      quantity: totalQuantity,
      products: verifiedProducts,
      amount: grandTotal,
      shippingCharges,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully.",
      data: order,
    });
  } catch (error) {
  console.error("Create order error:", error);

  try {
    await restoreReservedStock();
  } catch (restoreError) {
    console.error("Stock restoration error:", restoreError);
  }

  return res.status(500).json({
    success: false,
    message: "Unable to place order. Please try again.",
  });
}
};



// Get all Orders
export const getOrders = async (req, res) => {
    try{
         const  orders=await Order.find();

    res.status(201).json({
        success:true,
        data:orders,
    })
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}


// Get Single order
export const getOrderById = async (req, res) => {
    try{
        const {id} = req.params;

    let order;

if (id.match(/^[0-9a-fA-F]{24}$/)) {
    order = await Order.findById(id);
} else {
    order = await Order.findOne({
        orderNumber: id
    });
}

    if(!order){
        return res.status(404).json({
            success:false,
            message: "order not found",
        });
    }
 
    res.status(200).json({
        success:true,
        data:order,
    });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    
}; 

// update order
export const updateOrder = async (req, res) => {
    try{
        //get id
        const {id} = req.params;

        //get update data
        const updateData = req.body;

        //update mongoDB
        let order;

if (id.match(/^[0-9a-fA-F]{24}$/)) {
    order = await Order.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    );
} else {
    order = await Order.findOneAndUpdate(
        { orderNumber: id },
        updateData,
        { new: true }
    );
}

        //check Order
        if(!order){
            return res.status(404).json({
                success:false,
                message:"order not found"
            })
        }

        //send response
        res.status(200).json({
            success:true,
            message: "order successfully updated",
            data:order,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}