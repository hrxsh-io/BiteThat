import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
} from "lucide-react";

import menu from "../data/menu";
import FoodCard from "./FoodCard";
import MenuCardSkeleton from "./loading/MenuCardSkeleton";

/* ==========================================
      CONFIG
========================================== */

const INITIAL_CATEGORIES = 6;
const LOAD_MORE_CATEGORIES = 1;

/* ==========================================
      DESCRIPTION
========================================== */

const descriptions = {
  Pizza: "Freshly baked Italian favourites",
  Burger: "Loaded juicy burgers",
  Starters: "Perfect bites to start",
  Pasta: "Creamy authentic pasta",
  Chinese: "Indo-Chinese favourites",
  Sandwiches: "Freshly grilled sandwiches",
  Wraps: "Loaded wraps",
  Beverages: "Refreshing drinks",
  Desserts: "Sweet endings",
};

/* ==========================================
      COMPONENT
========================================== */

export default function MenuAccordion({
  likedItems = [],
  onLike = () => { },
  cart = {},
  onAdd = () => { },
}) {

  const [visibleCategories, setVisibleCategories] =
    useState(INITIAL_CATEGORIES);

  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const loadMoreRef = useRef(null);

  /* ==========================================
      GROUP ENTIRE MENU
========================================== */

  const groupedMenu = useMemo(() => {
    const grouped = {};

    menu.forEach((dish) => {
      if (!grouped[dish.category]) {
        grouped[dish.category] = [];
      }

      grouped[dish.category].push(dish);
    });

    return grouped;
  }, []);

  /* ==========================================
      GROUP CATEGORY
  ========================================== */

  const visibleGroupedMenu = useMemo(() => {
    return Object.fromEntries(
      Object.entries(groupedMenu).slice(
        0,
        visibleCategories
      )
    );
  }, [groupedMenu, visibleCategories]);

  /* ==========================================
      LOAD MORE
  ========================================== */

  const loadMore = () => {
    if (loading) return;

    if (
      visibleCategories >=
      Object.keys(groupedMenu).length
    )
      return;

    setLoading(true);

    setTimeout(() => {
      setVisibleCategories((prev) =>
        Math.min(
          prev + LOAD_MORE_CATEGORIES,
          Object.keys(groupedMenu).length
        )
      );

      setLoading(false);
    }, 350);
  };

  /* ==========================================
      INTERSECTION OBSERVER
  ========================================== */

  useEffect(() => {

    if (!loadMoreRef.current) return;

    const observer =
      new IntersectionObserver(

        ([entry]) => {

          if (entry.isIntersecting) {

            loadMore();

          }

        },

        {

          rootMargin: "500px",
          threshold: 0.1,

        }

      );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();

  }, [visibleCategories, loading]);

  /* ==========================================
      HELPERS
  ========================================== */

  const isLiked = (id) =>
    likedItems.includes(id);

  const quantity = (id) =>
    cart[id] || 0;

  if (pageLoading) {
    return (
      <section className="mx-auto max-w-[1500px] px-6 lg:px-10 pt-2 pb-8">

        <div className="space-y-16">

          {[1, 2, 3].map((section) => (
            <div key={section}>

              {/* Category Heading Skeleton */}
              <div className="mb-8">
                <div className="mb-4 h-8 w-52 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-72 animate-pulse rounded bg-gray-200" />
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <MenuCardSkeleton key={index} />
                ))}
              </div>

            </div>
          ))}

        </div>

      </section>
    );
  }

  return (

    <section
      className="
      mx-auto
      max-w-[1500px]
      px-6
      lg:px-10
      pt-2 pb-8
      "
    >

      <div className="space-y-0">

        {Object.entries(visibleGroupedMenu).map(
          ([category, dishes], sectionIndex) => (

            <motion.section
              key={category}
              id={category.toLowerCase().replace(/\s+/g, "-")}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
            >

              {/* =====================================
                CATEGORY HEADER
        ====================================== */}

              <div className="mb-6">

                {/* Decorative Line */}

                <div className="mb-5 flex items-center gap-4">

                  <div className="h-px flex-1 bg-violet-200" />

                  <Sparkles
                    size={18}
                    className="text-violet-600"
                  />

                  <div className="h-px w-20 bg-violet-200" />

                </div>

                {/* Heading */}

                <div className="flex items-end justify-between">

                  <div>

                    <h2
                      className="
                  text-4xl
                  font-black
                  text-gray-900
                "
                    >
                      {category}
                    </h2>

                    <p
                      className="
                  mt-2
                  text-lg
                  text-gray-500
                "
                    >
                      {descriptions[category]}
                    </p>

                  </div>

                  <motion.div
                    whileHover={{
                      x: 4,
                    }}
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
              "
                  >
                    {dishes.length} dishes

                    <ChevronRight size={18} />

                  </motion.div>

                </div>

              </div>

              {/* =====================================
                FOOD GRID
        ====================================== */}

              <div className="flex justify-start">


                <motion.div
                  variants={{
                    hidden: {},

                    show: {
                      transition: {
                        staggerChildren: 0.08,
                      },
                    },
                  }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{
                    once: true,
                  }}
                  className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-8
"
                >

                  {dishes.map((dish) => (

                    <motion.div
                      key={dish.id}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 30,
                        },

                        show: {
                          opacity: 1,
                          y: 0,
                        },
                      }}
                    >

                      <FoodCard
                        dish={dish}
                        liked={isLiked(dish.id)}
                        quantity={quantity(dish.id)}
                        onLike={() =>
                          onLike(dish.id)
                        }
                        onAdd={() =>
                          onAdd(dish)
                        }
                      />

                    </motion.div>

                  ))}

                </motion.div>
              </div>


              {/* =====================================
                SECTION DIVIDER
        ====================================== */}

              {sectionIndex !==
                Object.keys(visibleGroupedMenu).length -
                1 && (

                  <div className="mt-10 mb-4 flex justify-center">

                    <div
                      className="
                h-px
                w-72
                bg-gradient-to-r
                from-transparent
                via-violet-300
                to-transparent
              "
                    />

                  </div>

                )}

            </motion.section>

          )
        )}

        {/* =====================================
          LOAD MORE
  ====================================== */}

        {visibleCategories <
          Object.keys(groupedMenu).length && (

            <>
              <div
                ref={loadMoreRef}
                className="h-20"
              />

              {loading && (

                <div className="flex justify-center py-8">

                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="
              h-12
              w-12
              rounded-full
              border-4
              border-violet-200
              border-t-violet-600
            "
                  />

                </div>

              )}

            </>

          )}

        {/* =====================================
          END
  ====================================== */}
        {visibleCategories >=
          Object.keys(groupedMenu).length && (


            <div className="py-6 text-center">

              <Sparkles
                className="mx-auto text-violet-600"
                size={28}
              />

              <h3
                className="
          mt-4
          text-2xl
          font-bold
          text-gray-900
        "
              >
                You've reached the end
              </h3>

              <p className="mt-2 text-gray-500">
                That's everything on today's menu.
              </p>

            </div>

          )}

      </div>

    </section>

  );

}