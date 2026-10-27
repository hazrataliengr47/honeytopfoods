import Product from "../models/product.models.js"

export const createProduct =async (req, res) => {
    try{
        const {name, category, price,stock,
      description,status} = req.body

       const image = req.file
      ? `/uploads/${req.file.filename}`
      : "";

        const products = await Product.create({
            name,
            category,
            price,
            stock,
            image,
            description,
            status,
        })

        res.status(201).json({
            succes : true,
            message:"contact created successfully",
            data: products,
        })
    }catch(error){
        res.status(500).json({
            succes: false,
            message: error.message,
        })
    }
}



    // Get Method
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      succes: true,
      data: products,
    });

  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};

    //update method

    export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

if (!id.match(/^[0-9a-fA-F]{24}$/)) {
  return res.status(400).json({
    succes: false,
    message: "Invalid product ID",
  });
}

    const updateData = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      status: req.body.status,
    };

    // If a new image was selected
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const products = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!products) {
      return res.status(404).json({
        succes: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      succes: true,
      message: "contact updated successfully",
      data: products,
    });

  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};


        //delete Method

        export const deleteProduct = async (req, res) => {
            try{
                const { id } = req.params;

if (!id.match(/^[0-9a-fA-F]{24}$/)) {
  return res.status(400).json({
    succes: false,
    message: "Invalid product ID",
  });
}

const products = await Product.findByIdAndDelete(id);

                  if (!products) {
                    return res.status(404).json({
                      succes: false,
                      message: "Product not found",
                    });
                  }

                  res.status(200).json({
                    succes: true,
                    message: "Product deleted successfully",
                    data: products,
                  });
            }catch(error){
                res.status(500).json({
                    succes:false,
                    message:error.message
                })
            }
        }