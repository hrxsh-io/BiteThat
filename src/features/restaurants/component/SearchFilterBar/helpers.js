
export function filterRestaurants(restaurants, search, filters) {
  return restaurants.filter((restaurant) => {
    const matchesSearch =
      !search ||
      restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.Types.toLowerCase().includes(search.toLowerCase());

    const matchesTypes =
      filters.Types.length === 0 ||
      filters.cuisine.includes(restaurant.cuisine);

    const matchesRating =
      filters.rating.length === 0 ||
      filters.rating.some((r) => restaurant.rating >= parseFloat(r));

    const matchesDelivery =
      filters.delivery.length === 0 ||
      filters.delivery.some((t) => restaurant.deliveryTime <= parseInt(t));

    const matchesPrice =
      filters.price.length === 0 ||
      filters.price.some((range) => {
        if (range === "₹400+") return restaurant.price >= 400;
        const [min, max] = range.replace("₹","").split("-").map(Number);
        return restaurant.price >= min && restaurant.price <= max;
      });

    return (
      matchesSearch &&
      matchesCuisine &&
      matchesRating &&
      matchesDelivery &&
      matchesPrice
    );
  });
}

export function sortRestaurants(restaurants, sortBy) {
  const list = [...restaurants];

  switch (sortBy) {
    case "Highest Rated":
      return list.sort((a,b)=>b.rating-a.rating);

    case "Fastest Delivery":
      return list.sort((a,b)=>a.deliveryTime-b.deliveryTime);

    case "Price: Low → High":
      return list.sort((a,b)=>a.price-b.price);

    case "Price: High → Low":
      return list.sort((a,b)=>b.price-a.price);

    default:
      return list;
  }
}
