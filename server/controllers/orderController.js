const mongoose = require("mongoose");
const Order = require("../models/Order");

// ==========================================
// CREATE ORDER
// POST /api/orders
// ==========================================

const createOrder = async (req, res) => {
  try {
    const {
      items,
      deliveryAddress,
      subtotal,
      deliveryFee = 0,
      tax = 0,
      discount = 0,
      paymentMethod = "cash",
      specialInstructions = "",
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    if (
      deliveryAddress.addressLine === undefined ||
      deliveryAddress.city === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Address line and city are required",
      });
    }

    // ==========================================
    // VALIDATE ITEMS
    // ==========================================

    for (const item of items) {
      if (
        !item.foodId ||
        !item.name ||
        item.price === undefined ||
        !item.quantity ||
        !item.restaurantId ||
        !item.restaurantName
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid order item",
        });
      }

      if (item.price < 0 || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid item price or quantity",
        });
      }
    }

    // ==========================================
    // CALCULATE TOTALS ON SERVER
    // ==========================================

    const calculatedSubtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const calculatedTotal =
      calculatedSubtotal +
      Number(deliveryFee) +
      Number(tax) -
      Number(discount);

    if (calculatedTotal < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order total",
      });
    }

    // ==========================================
    // CREATE ORDER
    // ==========================================

    const order = await Order.create({
      user: req.user.userId,

      items,

      subtotal: calculatedSubtotal,

      deliveryFee: Number(deliveryFee),
      tax: Number(tax),
      discount: Number(discount),

      total: calculatedTotal,

      deliveryAddress,

      paymentMethod,

      paymentStatus:
        paymentMethod === "cash" ? "pending" : "pending",

      specialInstructions: specialInstructions.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating order",
    });
  }
};

// ==========================================
// GET MY ORDERS
// GET /api/orders
// ==========================================

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
    });
  }
};

// ==========================================
// GET SINGLE ORDER
// GET /api/orders/:orderId
// ==========================================

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findOne({
      _id: orderId,
      user: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching order",
    });
  }
};

// ==========================================
// CANCEL ORDER
// PATCH /api/orders/:orderId/cancel
// ==========================================

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findOne({
      _id: orderId,
      user: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only allow cancellation before delivery
    const nonCancellableStatuses = [
      "delivered",
      "cancelled",
    ];

    if (nonCancellableStatuses.includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled because it is already ${order.status}`,
      });
    }

    order.status = "cancelled";

    // Refund handling can be connected later
    if (order.paymentStatus === "paid") {
      order.paymentStatus = "refunded";
    }

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while cancelling order",
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
};