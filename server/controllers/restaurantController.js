const {
  getNearbyRestaurants,
  searchRestaurants,
} = require("../services/restaurantProvider");

// ==========================================
// GET NEARBY RESTAURANTS
// GET /api/restaurants/nearby
// ==========================================

const nearbyRestaurants = async (req, res) => {
  try {
    const {
      lat,
      lng,
      radius = 5000,
      limit = 20,
    } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const latitude = Number(lat);
    const longitude = Number(lng);

    if (
      Number.isNaN(latitude) ||
      Number.isNaN(longitude)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude or longitude",
      });
    }

    const restaurants = await getNearbyRestaurants({
      latitude,
      longitude,
      radius,
      maxResultCount: limit,
    });

    return res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.error("Nearby restaurants error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch nearby restaurants",
      error: error.message,
    });
  }
};

// ==========================================
// SEARCH RESTAURANTS
// GET /api/restaurants/search?q=pizza
// ==========================================

const searchRestaurant = async (req, res) => {
  try {
    const {
      q,
      lat,
      lng,
      limit = 20,
    } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const restaurants = await searchRestaurants({
      query: q.trim(),
      latitude: lat,
      longitude: lng,
      maxResultCount: limit,
    });

    return res.status(200).json({
      success: true,
      query: q.trim(),
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.error("Restaurant search error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search restaurants",
      error: error.message,
    });
  }
};

module.exports = {
  nearbyRestaurants,
  searchRestaurant,
};