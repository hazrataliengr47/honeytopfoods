
import ReviewSettings from "../models/reviewSettings.models.js";

export const getReviewSettings = async (req, res) => {
  try {
    let settings = await ReviewSettings.findOne();

    if (!settings) {
      settings = await ReviewSettings.create({});
    }

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Get review settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get review settings",
    });
  }
};


export const updateReviewSettings = async (req, res) => {
  try {
    const { reviewsEnabled, allowGuestReviews } = req.body;

    if (
      typeof reviewsEnabled !== "boolean" ||
      typeof allowGuestReviews !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "Both review settings must be true or false",
      });
    }

    let settings = await ReviewSettings.findOne();

    if (!settings) {
      settings = await ReviewSettings.create({
        reviewsEnabled,
        allowGuestReviews,
      });
    } else {
      settings.reviewsEnabled = reviewsEnabled;
      settings.allowGuestReviews = allowGuestReviews;
      await settings.save();
    }

    return res.status(200).json({
      success: true,
      message: "Review settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Update review settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update review settings",
    });
  }
};

