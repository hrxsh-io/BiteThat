import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import FoodCard from "./FoodCard";
import menu from "../data/menu_popular";

/* ==========================================
      COMPONENT
========================================== */

export default function PopularDishes() {
  const sliderRef = useRef(null);

  const [liked, setLiked] = useState([]);

  /* ==========================================
        POPULAR DISHES
  ========================================== */

  const popularDishes = useMemo(() => {
    return menu.filter(
      (item) =>
        item.popular ||
        item.bestseller ||
        item.ai
    );
  }, []);

  /* ==========================================
        LIKE
  ========================================== */

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  /* ==========================================
        CAROUSEL
  ========================================== */

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -380,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 380,
      behavior: "smooth",
    });
  };

  /* ==========================================
        JSX
  ========================================== */

  return (
    <section
      className="
        relative
        overflow-hidden
        pt-6 pb-4
        bg-gradient-to-b
        from-[#faf8ff]
        via-white
        to-[#faf8ff]
      "
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            left-0
            top-10
            h-96
            w-96
            rounded-full
            bg-violet-500/10
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            right-0
            bottom-0
            h-[420px]
            w-[420px]
            rounded-full
            bg-fuchsia-500/10
            blur-[150px]
          "
        />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}

        <motion.div
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
          }}
          className="
            mb-12
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >

          <div>

            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-violet-100
                px-4
                py-2
                text-sm
                font-semibold
                text-violet-700
              "
            >
              <Sparkles size={16} />

              BiteThat Picks
            </div>

            <h2 className="text-4xl font-black text-gray-900 lg:text-5xl">
              Popular Dishes
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-500">
              Discover the restaurant's most loved dishes,
              AI recommendations and customer favourites.
            </p>

          </div>

          <div className="flex gap-4">

            <button
              onClick={scrollLeft}
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-violet-200
                bg-white
                shadow-lg
                transition-all
                hover:-translate-y-1
              "
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={scrollRight}
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-r
                from-violet-600
                to-fuchsia-600
                text-white
                shadow-xl
                transition-all
                hover:-translate-y-1
              "
            >
              <ChevronRight size={22} />
            </button>

          </div>

        </motion.div>

        {/* ---------- PART 2 STARTS HERE ---------- */}
        {/* ======================================
              CAROUSEL
        ======================================= */}

        <div className="relative">

          {/* Left Gradient */}

          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              z-10
              hidden
              h-full
              w-24
              bg-gradient-to-r
              from-[#faf8ff]
              to-transparent
              lg:block
            "
          />

          {/* Right Gradient */}

          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              z-10
              hidden
              h-full
              w-24
              bg-gradient-to-l
              from-[#faf8ff]
              to-transparent
              lg:block
            "
          />

          {/* Cards */}

          {popularDishes.length > 0 ? (
            <div
              ref={sliderRef}
              className="
  flex
  snap-x
  snap-mandatory
  gap-6
  overflow-x-auto
  scroll-smooth
  px-2
  pb-6
  [-ms-overflow-style:none]
  [scrollbar-width:none]
  [&::-webkit-scrollbar]:hidden
"
            >
              {popularDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="
    snap-start
    flex-shrink-0
  "
                >
                  <FoodCard
                    variant="popular"
                    dish={dish}
                    liked={liked.includes(dish.id)}
                    onLike={() => toggleLike(dish.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="
                flex
                h-72
                flex-col
                items-center
                justify-center
                rounded-[32px]
                border
                border-dashed
                border-violet-200
                bg-white/70
                text-center
                backdrop-blur-xl
              "
            >
              <Sparkles
                size={40}
                className="mb-4 text-violet-500"
              />

              <h3 className="text-2xl font-bold text-gray-900">
                No Popular Dishes
              </h3>

              <p className="mt-2 text-gray-500">
                Popular dishes will appear here
                once menu data is available.
              </p>
            </motion.div>
          )}

        </div>

      </div>

    </section>
  );
}