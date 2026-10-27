import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  getShippingSettings,
  updateShippingSettings,
} from "../controller/shippingSetting.controller.js";

const router = express.Router();

router.get("/", getShippingSettings);

router.put("/",adminMiddleware, updateShippingSettings);

export default router;