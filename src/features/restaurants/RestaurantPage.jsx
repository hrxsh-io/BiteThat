import { useMemo, useState } from "react";

import RestaurantHero from "./component/RestaurantHero/RestaurantHero";
import SearchFilterBar from "./component/SearchFilterBar/SearchFilterBar";
import CuisineChips from "./component/CuisineChips";
import AIRecommendation from "./component/AIRecommendation/AIRecommendation";

import restaurants from "../../data/restaurants";
import { getAIRecommendations } from "./component/AIRecommendation/recommendationEngine";

export default function RestaurantPage() {
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const [search, setSearch] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  const recommendations = useMemo(() => {
    return getAIRecommendations(restaurants, {
      selectedCuisine,
      search,
      limit: 4,
    });
  }, [selectedCuisine, search, refreshKey]);

  return (
    <main className="min-h-screen bg-[#faf8ff]">
      <RestaurantHero />

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
      />

      <CuisineChips
        selectedCuisine={selectedCuisine}
        setSelectedCuisine={setSelectedCuisine}
      />

      <AIRecommendation
        recommendations={recommendations}
        onRefresh={() => setRefreshKey((prev) => prev + 1)}
      />

      {/* Restaurant Grid */}
      {/* <RestaurantGrid
            selectedCuisine={selectedCuisine}
            search={search}
        /> */}
    </main>
  );
}