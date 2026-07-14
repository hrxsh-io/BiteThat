import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Pizza,
  Sandwich,
  Soup,
  Salad,
  Coffee,
  Fish,
  IceCream,
  Beef,
} from "lucide-react";

const cuisines = [
  { name: "All", icon: UtensilsCrossed, count: 128 },
  { name: "Pizza", icon: Pizza, count: 22 },
  { name: "Burgers", icon: Sandwich, count: 18 },
  { name: "Chinese", icon: Soup, count: 26 },
  { name: "Indian", icon: UtensilsCrossed, count: 31 },
  { name: "Healthy", icon: Salad, count: 12 },
  { name: "Cafe", icon: Coffee, count: 15 },
  { name: "Sushi", icon: Fish, count: 9 },
  { name: "BBQ", icon: Beef, count: 8 },
  { name: "Desserts", icon: IceCream, count: 20 },
];

export default function CuisineChips({
  selectedCuisine,
  setSelectedCuisine,
}) {
  return (
    <section className="bg-[#faf8ff]">
      <div className="mx-auto max-w-7xl px-6 py-4">

        {/* Heading */}

        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-900">
            Browse by Cuisine
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Discover restaurants by your favorite cuisine
          </p>
        </div>

        {/* Chips */}

        <div
          className="
          flex
          gap-3
          overflow-x-auto
          scroll-smooth
          snap-x
          snap-mandatory
          pb-1
          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
        >
          {cuisines.map((item) => {
            const Icon = item.icon;
            const active = selectedCuisine === item.name;

            return (
              <motion.button
                key={item.name}
                onClick={() => setSelectedCuisine(item.name)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  relative
                  snap-start
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-4
                  py-2.5
                  transition-all
                  duration-300
                  whitespace-nowrap
                  ${
                    active
                      ? "border-transparent text-white shadow-lg shadow-violet-500/30"
                      : "border-gray-200 bg-white text-gray-700 hover:border-violet-300 hover:shadow-md"
                  }
                `}
              >
                {active && (
                  <motion.div
                    layoutId="activeCuisine"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 28,
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
                  />
                )}

                <div className="relative z-10 flex items-center gap-2">

                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      active
                        ? "bg-white/20"
                        : "bg-violet-50 text-violet-600"
                    }`}
                  >
                    <Icon size={15} strokeWidth={2.2} />
                  </div>

                  <span className="text-sm font-semibold">
                    {item.name}
                  </span>

                  <span
                    className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                      active
                        ? "bg-white/20"
                        : "bg-violet-100 text-violet-700"
                    }`}
                  >
                    {item.count}
                  </span>

                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}