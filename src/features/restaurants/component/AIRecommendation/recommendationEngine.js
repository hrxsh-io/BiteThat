const reasons = [
  "Because you selected this cuisine",
  "Trending near you",
  "Loved by foodies",
  "Lightning fast delivery",
  "Great value for money",
  "Highly rated this week",
];

const insights = [
  "Perfect for dinner tonight.",
  "One of the highest-rated restaurants in your area.",
  "Customers love the quick delivery and generous portions.",
  "Great choice if you're looking for something comforting.",
  "Popular among BiteThat users this evening.",
  "Excellent balance of quality, taste and value.",
];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getAIRecommendations(
  restaurants,
  {
    selectedCuisine = "All",
    search = "",
    limit = 4,
  } = {}
) {
  let filtered = [...restaurants];

  // Search

  if (search.trim()) {
    filtered = filtered.filter((restaurant) =>
      restaurant.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  // Cuisine

  if (selectedCuisine !== "All") {
    filtered = filtered.filter(
      (restaurant) =>
        restaurant.cuisine === selectedCuisine
    );
  }

  // Highest rating first

  filtered.sort((a, b) => b.rating - a.rating);

  // Top restaurants

  return filtered.slice(0, limit).map((restaurant) => ({
    ...restaurant,

    match:
      Math.floor(Math.random() * 8) + 92,

    reason:
      selectedCuisine !== "All"
        ? `Because you selected ${selectedCuisine}`
        : randomItem(reasons),

    insight: randomItem(insights),
  }));
}