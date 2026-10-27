import express from "express"
import upload from "../middleware/upload.js"
const router = express.Router()
import adminMiddleware from "../middleware/adminMiddleware.js"
import {createProduct, getProduct, updateProduct, deleteProduct} from "../controller/product.controller.js"
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  getMyOrders,
  getMyOrderById,
} from "../controller/order.controller.js";
import authMiddleware from "../middleware/authmiddleware.js";
import { 
  createReview ,
  getApprovedReviews,
  updateReviewStatus,
} from "../controller/review.controller.js"


router.post("/orders", authMiddleware, createOrder);

router.get("/orders/my-orders", authMiddleware, getMyOrders);
router.get(
  "/orders/my-orders/:id",
  authMiddleware,
  getMyOrderById
);

router.get("/orders", adminMiddleware, getOrders);
router.get("/orders/:id", adminMiddleware, getOrderById);

router.put("/orders/:id", adminMiddleware, updateOrder);



router.post("/contact",adminMiddleware, upload.single("image"), createProduct)
router.post("/review", authMiddleware, createReview)
router.get("/reviews/:productId", getApprovedReviews);
router.put("/reviews/:id/status", adminMiddleware, updateReviewStatus);

router.get("/contact", getProduct);

router.put("/contact/:id",adminMiddleware, upload.single("image"), updateProduct );

router.delete("/contact/:id",adminMiddleware, deleteProduct)


export default router