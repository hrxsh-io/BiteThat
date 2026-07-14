export default function sortRestaurants(
  restaurants = [],
  sort = "recommended"
) {
  // Never mutate the original array
  const sorted = [...restaurants];

  switch (sort) {
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);

    case "delivery":
      return sorted.sort(
        (a, b) => a.deliveryMinutes - b.deliveryMinutes
      );

    case "distance":
      return sorted.sort(
        (a, b) => a.distanceKm - b.distanceKm
      );

    case "priceLow":
      return sorted.sort(
        (a, b) => a.priceForTwo - b.priceForTwo
      );

    case "priceHigh":
      return sorted.sort(
        (a, b) => b.priceForTwo - a.priceForTwo
      );

    case "ai":
      return sorted.sort(
        (a, b) => b.aiMatch - a.aiMatch
      );

    case "recommended":
    default:
      // AI Match → Rating → Delivery Time
      return sorted.sort((a, b) => {
        if (b.aiMatch !== a.aiMatch) {
          return b.aiMatch - a.aiMatch;
        }

        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }

        return a.deliveryMinutes - b.deliveryMinutes;
      });
  }
}