const mongoose = require("mongoose");
const Order = require("../models/Order");

// ======================================================
// Helper: get authenticated user ID from JWT payload
// ======================================================

const getUserId = (req) => {
  return req.user?.id || req.user?._id || req.user?.userId;
};

// ======================================================
// CREATE ORDER
// POST /api/orders
// ======================================================

const createOrder = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const {
      restaurant,
      items,
      deliveryAddress,
      subtotal,
      deliveryFee = 0,
      discount = 0,
      biteCoinsUsed = 0,
      total,
      paymentMethod = "cod",
    } = req.body;

    // ------------------------------
    // Basic validation
    // ------------------------------

    if (!restaurant?.id || !restaurant?.name) {
      return res.status(400).json({
        success: false,
        message: "Restaurant information is required",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one item is required",
      });
    }

    if (!deliveryAddress?.addressLine || !deliveryAddress?.city) {
      return res.status(400).json({
        success: false,
        message: "Complete delivery address is required",
      });
    }

    if (subtotal === undefined || total === undefined) {
      return res.status(400).json({
        success: false,
        message: "Order pricing information is required",
      });
    }

    // ------------------------------
    // Validate MongoDB user ID
    // ------------------------------

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid user authentication",
      });
    }

    // ------------------------------
    // Create order
    // ------------------------------

    const order = await Order.create({
      user: userId,

      restaurant: {
        id: String(restaurant.id),
        name: restaurant.name,
        image: restaurant.image || "",
      },

      items: items.map((item) => ({
        foodId: String(item.foodId || item.id),
        name: item.name,
        image: item.image || "",
        price: Number(item.price),
        quantity: Number(item.quantity),
      })),

      deliveryAddress: {
        label: deliveryAddress.label || "Home",
        addressLine: deliveryAddress.addressLine,
        city: deliveryAddress.city,
        state: deliveryAddress.state || "",
        pincode: deliveryAddress.pincode || "",
        landmark: deliveryAddress.landmark || "",
      },

      subtotal: Number(subtotal),
      deliveryFee: Number(deliveryFee),
      discount: Number(discount),
      biteCoinsUsed: Number(biteCoinsUsed),
      total: Number(total),

      paymentMethod,

      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",

      status: "placed",
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
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// ======================================================
// GET ALL MY ORDERS
// GET /api/orders
// ======================================================

const getMyOrders = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const orders = await Order.find({
      user: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// ======================================================
// GET SINGLE ORDER
// GET /api/orders/:id
// ======================================================

const getOrderById = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { orderId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
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
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// ======================================================
// CANCEL ORDER
// PATCH /api/orders/:id/cancel
// ======================================================

const cancelOrder = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { orderId } = req.params;
    const { reason = "Cancelled by user" } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const nonCancellableStatuses = [
      "delivered",
      "cancelled",
      "out_for_delivery",
    ];

    if (nonCancellableStatuses.includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled once it is ${order.status.replace(
          "_",
          " "
        )}`,
      });
    }

    order.status = "cancelled";
    order.cancellationReason = reason;
    order.cancelledAt = new Date();

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
      message: "Failed to cancel order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
};