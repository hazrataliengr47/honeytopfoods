import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
        type: String,
        unique: true,
      },
    customer: {
      type: String,
      required: true,
    },
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },


    email: {
      type: String,
      default: "",
    },

    mobile: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    apartment: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    postalCode: {
      type: String,
      default: "",
    },

    product: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
        type: Number,
        default: 1,
      },

      
        products: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
            name: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
              min: 1,
            },
            image: {
              type: String,
              default: "",
            },
            lineTotal: {
              type: Number,
              required: true,
            },
          },
        ],


    amount: {
      type: Number,
      required: true,
    },

    shippingCharges: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;