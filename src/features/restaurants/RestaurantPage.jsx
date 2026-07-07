import { useMemo, useState } from "react";

import RestaurantHero from "./component/RestaurantHero/RestaurantHero";
import SearchFilterBar from "./component/SearchFilterBar/SearchFilterBar";
import CuisineChips from "./component/CuisineChips";
import AIRecommendation from "./component/AIRecommendation/AIRecommendation";
import RestaurantGrid from "./component/RestaurantGrid";

import restaurants from "../../data/restaurantMain";

import { getAIRecommendations } from "./component/AIRecommendation/recommendationEngine";

import filterRestaurants from "./utils/filterRestaurants";
import sortRestaurants from "./utils/sortRestaurants";

export default function RestaurantPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Search
  const [search, setSearch] = useState("");

  // Cuisine
  const [selectedCuisine, setSelectedCuisine] =
    useState("All");

  // Filters
  const [sort, setSort] = useState("recommended");
  const [vegOnly, setVegOnly] = useState(false);
  const [openNow, setOpenNow] = useState(false);
  const [freeDelivery, setFreeDelivery] =
    useState(false);
  const [rating, setRating] = useState("");

  const filters = {
    search,
    cuisine: selectedCuisine,
    sort,
    veg: vegOnly,
    open: openNow,
    freeDelivery,
    rating,
  };

  const filteredRestaurants = useMemo(() => {
    return filterRestaurants(restaurants, filters);
  }, [filters]);

  const sortedRestaurants = useMemo(() => {
    return sortRestaurants(
      filteredRestaurants,
      sort
    );
  }, [filteredRestaurants, sort]);

  const recommendations = useMemo(() => {
    return getAIRecommendations(sortedRestaurants, {
      selectedCuisine,
      search,
      limit: 4,
    });
  }, [
    sortedRestaurants,
    selectedCuisine,
    search,
    refreshKey,
  ]);

  return (
    <main className="min-h-screen bg-[#faf8ff]">
      <RestaurantHero />

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        vegOnly={vegOnly}
        setVegOnly={setVegOnly}
        openNow={openNow}
        setOpenNow={setOpenNow}
        freeDelivery={freeDelivery}
        setFreeDelivery={setFreeDelivery}
        rating={rating}
        setRating={setRating}
      />

      <CuisineChips
        selectedCuisine={selectedCuisine}
        setSelectedCuisine={setSelectedCuisine}
      />

      <AIRecommendation
        recommendations={recommendations}
        onRefresh={() =>
          setRefreshKey((prev) => prev + 1)
        }
      />

      <RestaurantGrid
        restaurants={sortedRestaurants}
        title="All Restaurants"
        subtitle="Discover the best restaurants near you."
      />
    </main>
  );
}