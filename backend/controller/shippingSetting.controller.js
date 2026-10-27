import ShippingSettings from "../models/shippngSetting.model.js";

// Get shipping settings
export const getShippingSettings = async (req, res) => {
  try {
    let settings = await ShippingSettings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await ShippingSettings.create({
        shippingType: "free",
        shippingAmount: 0,
      });
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update shipping settings
export const updateShippingSettings = async (req, res) => {
  try {
    const { shippingType, shippingAmount } = req.body;

    let settings = await ShippingSettings.findOne();

    if (!settings) {
      settings = await ShippingSettings.create({
        shippingType,
        shippingAmount:
          shippingType === "free" ? 0 : Number(shippingAmount),
      });
    } else {
      settings.shippingType = shippingType;

      settings.shippingAmount =
        shippingType === "free"
          ? 0
          : Number(shippingAmount);

      await settings.save();
    }

    res.status(200).json({
      success: true,
      message: "Shipping settings updated successfully",
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};