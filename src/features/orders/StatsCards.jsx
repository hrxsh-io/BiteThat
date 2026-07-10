import { motion } from "framer-motion";
import {
  Package,
  BadgePercent,
  Heart,
  Coins,
} from "lucide-react";

const iconMap = {
  Package,
  BadgePercent,
  Heart,
  Coins,
};

const colorMap = {
  violet: {
    bg: "from-violet-500 to-purple-600",
    light: "bg-violet-100",
    text: "text-violet-600",
    glow: "shadow-violet-200",
  },

  emerald: {
    bg: "from-emerald-500 to-green-600",
    light: "bg-emerald-100",
    text: "text-emerald-600",
    glow: "shadow-emerald-200",
  },

  rose: {
    bg: "from-rose-500 to-pink-600",
    light: "bg-rose-100",
    text: "text-rose-600",
    glow: "shadow-rose-200",
  },

  amber: {
    bg: "from-amber-400 to-orange-500",
    light: "bg-amber-100",
    text: "text-amber-600",
    glow: "shadow-amber-200",
  },
};

export default function StatsCards({ stats }) {
  return (
    <section className="mt-10">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((card, index) => {

          const Icon = iconMap[card.icon];

          const colors = colorMap[card.color];

          return (
            <motion.div
              key={card.id}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className={`group relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl ${colors.glow}`}
            >
              {/* Background Glow */}

              <div
                className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${colors.bg} opacity-10 blur-3xl`}
              />

              {/* Icon */}

              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${colors.light}`}
              >
                <Icon
                  size={28}
                  className={colors.text}
                />
              </div>

              {/* Value */}

              <h2 className="text-3xl font-extrabold text-gray-900">
                {card.value}
              </h2>

              {/* Title */}

              <p className="mt-2 text-sm font-medium text-gray-500">
                {card.title}
              </p>

              {/* Bottom Accent */}

              <div
                className={`mt-6 h-1 w-full rounded-full bg-gradient-to-r ${colors.bg}`}
              />

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}