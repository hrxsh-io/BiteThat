const express = require("express");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// CREATE ORDER
// POST /api/orders
// ==========================================

router.post("/", authMiddleware, createOrder);

// ==========================================
// GET MY ORDERS
// GET /api/orders
// ==========================================

router.get("/", authMiddleware, getMyOrders);

// ==========================================
// GET SINGLE ORDER
// GET /api/orders/:orderId
// ==========================================

router.get("/:orderId", authMiddleware, getOrderById);

// ==========================================
// CANCEL ORDER
// PATCH /api/orders/:orderId/cancel
// ==========================================

router.patch(
  "/:orderId/cancel",
  authMiddleware,
  cancelOrder
);

module.exports = router;