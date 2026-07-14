import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import AddOnCard from "./AddOnCard";

export default function AIRecommendationCarousel({
  items = [],
  onAdd,
}) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const amount = 340;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <motion.section
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
      transition={{
        duration: 0.5,
      }}
      className="relative mt-14"
    >
      {/* Header */}

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">

            <Sparkles size={16} />

            AI Powered

          </div>

          <h2 className="mt-5 bg-gradient-to-r from-violet-700 via-violet-500 to-fuchsia-500 bg-clip-text text-4xl font-extrabold text-transparent">

            Recommended Just For You

          </h2>

          <p className="mt-3 max-w-2xl text-gray-500">

            Based on your current order, people usually
            add these delicious items before checkout.

          </p>

        </div>

        {/* Controls */}

        <div className="flex gap-3">

          <button
            onClick={() => scroll("left")}
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-violet-100
            bg-white
            shadow-md
            transition-all
            hover:-translate-y-1
            hover:border-violet-300
            hover:shadow-xl
            "
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-violet-600
            text-white
            shadow-lg
            transition-all
            hover:-translate-y-1
            hover:bg-violet-700
            hover:shadow-violet-300
            "
          >
            <ChevronRight />
          </button>

        </div>

      </div>

      {/* Carousel */}

      <div className="relative mt-10">

        {/* Left Fade */}

        <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-20 bg-gradient-to-r from-violet-50 via-violet-50/70 to-transparent lg:block" />

        {/* Right Fade */}

        <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-20 bg-gradient-to-l from-violet-50 via-violet-50/70 to-transparent lg:block" />

        <div
          ref={sliderRef}
          className="
          flex
          snap-x
          snap-mandatory
          gap-6
          overflow-x-auto
          scroll-smooth
          pb-4
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          "
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
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
              transition={{
                delay: index * 0.08,
              }}
              className="snap-start"
            >
              <AddOnCard
                item={item}
                onAdd={onAdd}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}