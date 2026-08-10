const express = require("express");

const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");

const {
  register,
  login,
  getMe,
  updateProfile,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  changePassword,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// REGISTER
// ==========================================

router.post("/register", register);

// ==========================================
// LOGIN
// ==========================================

router.post("/login", login);

// ==========================================
// CURRENT USER
// ==========================================

router.get("/me", authMiddleware, getMe);

// ==========================================
// UPDATE PROFILE
// ==========================================

router.patch("/profile", authMiddleware, updateProfile);

// ==========================================
// FORGOT PASSWORD
// ==========================================

router.post("/forgot-password", forgotPassword);

// ==========================================
// VERIFY RESET CODE
// ==========================================

router.post("/verify-reset-code", verifyResetCode);

// ==========================================
// RESET PASSWORD
// ==========================================

router.post("/reset-password", resetPassword);

// Change password while logged in
router.patch("/change-password", authMiddleware, changePassword);

// ==========================================
// SAVED ADDRESSES
// ==========================================

// Get all saved addresses
router.get("/addresses", authMiddleware, getAddresses);

// Add a new address
router.post("/addresses", authMiddleware, addAddress);

// Update an address
router.patch(
  "/addresses/:addressId",
  authMiddleware,
  updateAddress
);

// Delete an address
router.delete(
  "/addresses/:addressId",
  authMiddleware,
  deleteAddress
);

module.exports = router;