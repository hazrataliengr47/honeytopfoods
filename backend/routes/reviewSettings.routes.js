
import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  getReviewSettings,
  updateReviewSettings,
} from "../controller/reviewSettings.controller.js";

const router = express.Router();

router.get("/", getReviewSettings);

router.put("/", adminMiddleware, updateReviewSettings);

export default router;
