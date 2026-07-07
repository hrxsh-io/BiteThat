export default function filterRestaurants(restaurants = [], filters = {}) {
  const {
    search = "",
    cuisine = "All",
    veg = false,
    open = false,
    freeDelivery = false,
    rating = "",
  } = filters;

  const searchTerm = search.trim().toLowerCase();

  return restaurants.filter((restaurant) => {
    // ================= SEARCH =================

    const matchesSearch =
      searchTerm === "" ||
      restaurant.name.toLowerCase().includes(searchTerm) ||
      restaurant.category.toLowerCase().includes(searchTerm) ||
      restaurant.cuisines.some((cuisine) =>
        cuisine.toLowerCase().includes(searchTerm)
      );

    // ================= CUISINE =================

    const matchesCuisine =
      cuisine === "All" ||
      restaurant.cuisines.includes(cuisine) ||
      restaurant.category === cuisine;

    // ================= VEG =================

    const matchesVeg =
      !veg || restaurant.veg;

    // ================= OPEN NOW =================

    const matchesOpen =
      !open || restaurant.isOpen;

    // ================= FREE DELIVERY =================

    const matchesFreeDelivery =
      !freeDelivery || restaurant.freeDelivery;

    // ================= RATING =================

    const matchesRating =
      rating === "" ||
      restaurant.rating >= Number(rating);

    return (
      matchesSearch &&
      matchesCuisine &&
      matchesVeg &&
      matchesOpen &&
      matchesFreeDelivery &&
      matchesRating
    );
  });
}