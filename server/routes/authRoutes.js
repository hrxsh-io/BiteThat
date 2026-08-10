const express = require("express");

const {
  register,
  login,
  getMe,
  updateProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Current user
router.get("/me", authMiddleware, getMe);

// Update profile
router.patch("/profile", authMiddleware, updateProfile);

module.exports = router;