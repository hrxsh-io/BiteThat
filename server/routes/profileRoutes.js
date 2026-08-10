const express = require("express");

const {
  getProfileStats,
} = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// GET PROFILE STATISTICS
// GET /api/profile/stats
// ==========================================

router.get("/stats", authMiddleware, getProfileStats);

module.exports = router;