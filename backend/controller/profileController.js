
import User from "../models/User.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "name email mobile address apartment city postalCode"
    );

    if (!user) {
      return res.status(404).json({
        message: "Customer not found.",
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully.",
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch profile.",
    });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, mobile, address, apartment, city, postalCode } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        mobile,
        address,
        apartment,
        city,
        postalCode,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("name email mobile address apartment city postalCode");

    if (!user) {
      return res.status(404).json({
        message: "Customer not found.",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error.message);

    return res.status(500).json({
      message: "Unable to update profile.",
    });
  }
};