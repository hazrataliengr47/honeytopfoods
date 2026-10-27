import mongoose from "mongoose";

const shippingSettingsSchema = new mongoose.Schema(
  {
    shippingType: {
      type: String,
      enum: ["free", "manual"],
      default: "free",
    },

    shippingAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ShippingSettings = mongoose.model(
  "ShippingSettings",
  shippingSettingsSchema
);

export default ShippingSettings;