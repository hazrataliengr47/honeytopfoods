
import mongoose from "mongoose";

const reviewSettingsSchema = new mongoose.Schema(
  {
    reviewsEnabled: {
      type: Boolean,
      default: true,
    },

    allowGuestReviews: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewSettings = mongoose.model(
  "ReviewSettings",
  reviewSettingsSchema
);

export default ReviewSettings;
