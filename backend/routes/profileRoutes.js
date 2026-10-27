
import express from "express";
import {
  getProfile,
  updateProfile,
} from "../controller/profileController.js";

import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// Get logged-in customer's profile
router.get("/", authMiddleware, getProfile);

// Update logged-in customer's profile
router.put("/", authMiddleware, updateProfile);

export default router;