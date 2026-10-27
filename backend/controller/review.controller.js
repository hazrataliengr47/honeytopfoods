import Product from "../models/product.models.js";
import Review from "../models/review.modals.js";
import ReviewSettings from "../models/reviewSettings.models.js";
import mongoose from "mongoose";

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
  return res.status(400).json({
    success: false,
    message: "Invalid product ID.",
  });
}

const product = await Product.findById(productId);

if (!product) {
  return res.status(404).json({
    success: false,
    message: "Product not found.",
  });
}


    // settings review enabled
    const settings = await ReviewSettings.findOne();

if (settings && !settings.reviewsEnabled) {
  return res.status(403).json({
    success: false,
    message: "Product reviews are currently disabled.",
  });
}

// guest review settings
if (!settings?.allowGuestReviews && !req.userId) {
  return res.status(401).json({
    success: false,
    message: "Please log in to submit a review.",
  });
}




    if (!productId || !rating || !comment?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Product, rating, and comment are required",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a whole number from 1 to 5",
      });
    }

    const review = await Review.create({
  productId,
  customerId: req.userId,
  rating: numericRating,
  comment: comment.trim(),
  status: "pending",
});

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });
  } catch (error) {
    console.error("Create review error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit review",
    });
  }
};

export const getApprovedReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    const reviews = await Review.find({
      productId,
      status: "approved",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("Get approved reviews error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews.",
    });
  }
};


export const updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID.",
      });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be approved or rejected.",
      });
    }

    const review = await Review.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Review ${status} successfully.`,
      data: review,
    });
  } catch (error) {
    console.error("Update review status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update review status.",
    });
  }
};
