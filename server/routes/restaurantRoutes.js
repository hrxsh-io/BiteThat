const express = require("express");

const {
  nearbyRestaurants,
  searchRestaurant,
} = require("../controllers/restaurantController");

const router = express.Router();

// ==========================================
// Nearby restaurants
// GET /api/restaurants/nearby
// ==========================================

router.get("/nearby", nearbyRestaurants);

// ==========================================
// Search restaurants
// GET /api/restaurants/search?q=pizza
// ==========================================

router.get("/search", searchRestaurant);

module.exports = router;