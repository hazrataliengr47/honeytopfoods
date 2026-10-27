
import express from "express";
import { sendOtp , verifyOtp, adminLogin} from "../controller/authController.js";


const router = express.Router();

router.post("/admin-login", adminLogin);

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

export default router;