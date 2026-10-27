import crypto from "crypto";
import Otp from "../models/Otp.js";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    // Store only a hash of the OTP
    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    // Remove any previous OTP for this email
    await Otp.deleteMany({ email: normalizedEmail });

    // Save OTP with a 10-minute expiry
    await Otp.create({
      email: normalizedEmail,
      otpHash,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    //  Send the OTP email
    await sendEmail({
      to: normalizedEmail,
      subject: "Your HoneyTop Foods Login Code",
      text: `Your HoneyTop Foods verification code is ${otp}. It expires in 10 minutes. Do not share this code with anyone.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;padding:24px;color:#333">
          <h2 style="color:#b7791f">HoneyTop Foods</h2>
          <p>Use the following code to log in to your account:</p>
          <div style="font-size:32px;font-weight:bold;letter-spacing:8px;padding:16px;background:#fff8e7;text-align:center">
            ${otp}
          </div>
          <p>This code expires in 10 minutes.</p>
          <p>Please do not share this code with anyone.</p>
        </div>
      `,
    });

    return res.status(200).json({
      message: "Verification code sent to your email.",
    });
  } catch (error) {
    console.error("Send OTP error:", error.message);

    return res.status(500).json({
      message: "Unable to send the verification code. Please try again.",
    });
  }
};




export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "OTP not found or expired. Please request a new OTP.",
      });
    }

    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteOne({ _id: otpRecord._id });

      return res.status(400).json({
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    const otpHash = crypto
      .createHash("sha256")
      .update(otp.trim())
      .digest("hex");

    if (otpHash !== otpRecord.otpHash) {
      return res.status(400).json({
        message: "Invalid OTP.",
      });
    }

    await Otp.deleteOne({ _id: otpRecord._id });

    let user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      user = await User.create({
        email: normalizedEmail,
      });
    }

    const token =  jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );

    return res.status(200).json({
      message: "OTP verified successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        apartment: user.apartment,
        city: user.city,
        postalCode: user.postalCode,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error.message);

    return res.status(500).json({
      message: "Unable to verify OTP. Please try again.",
    });
  }
};



export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("ADMIN LOGIN REQUEST RECEIVED");  

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid admin email or password.",
      });
    }

    console.log("JWT SECRET LOADED:", !!process.env.JWT_SECRET);

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Admin login successful.",
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error.message);

    return res.status(500).json({
      message: "Unable to log in. Please try again.",
    });
  }
};
