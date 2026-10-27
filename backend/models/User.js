
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
  type: String,
  enum: ["customer", "admin"],
  default: "customer",
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
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);