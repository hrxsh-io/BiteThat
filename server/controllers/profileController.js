const Order = require("../models/Order");

// ==========================================
// GET PROFILE STATISTICS
// GET /api/profile/stats
// ==========================================

const getProfileStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({
      user: userId,
    });

    const totalOrders = orders.length;

    const completedOrders = orders.filter(
      (order) => order.status === "delivered"
    ).length;

    const cancelledOrders = orders.filter(
      (order) => order.status === "cancelled"
    ).length;

    const activeOrders = orders.filter(
      (order) =>
        order.status !== "delivered" &&
        order.status !== "cancelled"
    ).length;

    const totalSpent = orders
      .filter((order) => order.status !== "cancelled")
      .reduce((total, order) => total + order.total, 0);

    return res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        completedOrders,
        cancelledOrders,
        activeOrders,
        totalSpent,
      },
    });
  } catch (error) {
    console.error("Get profile stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching profile statistics",
    });
  }
};

module.exports = {
  getProfileStats,
};