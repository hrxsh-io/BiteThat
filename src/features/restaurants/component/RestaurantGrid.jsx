import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import RestaurantCard from "./RestaurantCard";
import RestaurantSkeleton from "./RestaurantSkeleton";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const INITIAL_COUNT = 9;
const LOAD_COUNT = 9;

const RestaurantGrid = ({
  restaurants = [],
  title = "All Restaurants",
  subtitle = "Discover the best restaurants near you.",
  onRestaurantClick,
}) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loadingMore, setLoadingMore] = useState(false);

  const loaderRef = useRef(null);

  // Reset when filters/search change
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [restaurants]);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loadingMore &&
          visibleCount < restaurants.length
        ) {
          setLoadingMore(true);

          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + LOAD_COUNT, restaurants.length)
            );

            setLoadingMore(false);
          }, 700);
        }
      },
      {
        threshold: 0.2,
      }
    );

    const current = loaderRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [visibleCount, loadingMore, restaurants.length]);

  const visibleRestaurants = restaurants.slice(0, visibleCount);

  return (
    <section className="bg-[#faf8ff] pt-8 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ================= HEADER ================= */}

        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
              Discover
            </span>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>

            <p className="mt-3 max-w-2xl text-lg text-gray-500">
              {subtitle}
            </p>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-white px-6 py-4 shadow-sm">
            <p className="text-sm text-gray-500">
              Showing
            </p>

            <p className="text-3xl font-bold text-violet-600">
              {visibleRestaurants.length}
              <span className="text-gray-400">
                {" "}
                / {restaurants.length}
              </span>
            </p>
          </div>
        </div>

        {/* ================= EMPTY ================= */}

        {restaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-violet-200 bg-white py-24 text-center">
            <div className="mb-5 text-6xl">
              🍽️
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              No Restaurants Found
            </h3>

            <p className="mt-3 max-w-md text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            {/* ================= GRID ================= */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            >
              {visibleRestaurants.map((restaurant) => (
                <motion.div
                  key={restaurant.id}
                  variants={cardVariants}
                >
                  <RestaurantCard
                    restaurant={restaurant}
                    onClick={onRestaurantClick}
                  />
                </motion.div>
              ))}

              {/* Skeleton Loader */}

              {loadingMore &&
                Array.from({ length: LOAD_COUNT }).map((_, index) => (
                  <RestaurantSkeleton key={index} />
                ))}
            </motion.div>

            {/* Observer */}

            {visibleCount < restaurants.length && (
              <div
                ref={loaderRef}
                className="flex justify-center py-14"
              >
                <p className="text-sm font-medium text-violet-600">
                  Loading more restaurants...
                </p>
              </div>
            )}

            {/* End */}

            {visibleCount >= restaurants.length &&
              restaurants.length > INITIAL_COUNT && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="mt-16 text-center"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-6 py-3 font-semibold text-violet-700">
                    🎉 You've reached the end
                  </div>

                  <p className="mt-4 text-gray-500">
                    More restaurants will be added soon.
                  </p>
                </motion.div>
              )}
          </>
        )}
      </div>
    </section>
  );
};

export default RestaurantGrid;