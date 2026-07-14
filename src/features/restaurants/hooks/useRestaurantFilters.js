import { useSearchParams } from "react-router-dom";

const DEFAULT_FILTERS = {
  search: "",
  cuisines: "All",
  sort: "recommended",
  veg: false,
  open: false,
  freeDelivery: false,
  rating: "",
};

export default function useRestaurantFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    search: searchParams.get("search") || DEFAULT_FILTERS.search,

    Types:
      searchParams.get("cuisine") || DEFAULT_FILTERS.Types,

    sort:
      searchParams.get("sort") || DEFAULT_FILTERS.sort,

    veg: searchParams.get("veg") === "true",

    open: searchParams.get("open") === "true",

    freeDelivery:
      searchParams.get("freeDelivery") === "true",

    rating:
      searchParams.get("rating") || DEFAULT_FILTERS.rating,
  };

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);

    const shouldDelete =
      value === "" ||
      value === false ||
      value === null ||
      value === undefined ||
      value === "All";

    if (shouldDelete) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  return {
    filters,
    updateFilter,
    resetFilters,
  };
}