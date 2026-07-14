import { ChevronRight } from "lucide-react";
import RestaurantCard from "../../restaurants/component/RestaurantCard";
import restaurants from "../../../data/restaurants";

export default function SimilarRestaurants() {
  // Don't include the current restaurant
  const similarRestaurants = restaurants.slice(0, 4);

  return (
    <section className="mx-auto max-w-[1500px] px-6 pt-2 pb-8 lg:px-10">

      {/* Heading */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
            Similar Restaurants
          </p>

          <h2 className="mt-2 text-4xl font-black text-gray-900">
            You May Also Like 🍔
          </h2>

          <p className="mt-3 text-gray-500">
            Discover more restaurants serving similar cuisine.
          </p>

        </div>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-violet-50
            px-5
            py-3
            font-semibold
            text-violet-700
            transition
            hover:bg-violet-100
          "
        >
          Explore All
          <ChevronRight size={18} />
        </button>

      </div>

      {/* Cards */}

      <div
  className="
    flex
    gap-6
    overflow-x-auto
    pb-4
    snap-x
    snap-mandatory
    scrollbar-thin
    scrollbar-thumb-violet-300
    scrollbar-track-transparent
  "
>

        {similarRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            variant="compact"
          />
        ))}

      </div>

    </section>
  );
}