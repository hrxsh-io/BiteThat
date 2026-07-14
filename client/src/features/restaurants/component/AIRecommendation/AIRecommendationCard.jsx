import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  Star,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

export default function AIRecommendationCard({ restaurant }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        rotate: 0.8,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className="group"
    >
      {/* Gradient Border */}

      <div className="rounded-[30px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 p-[1px]">

        {/* Card */}

        <div className="overflow-hidden rounded-[29px] bg-white">

          {/* Image */}

          <div className="relative h-56 overflow-hidden">

            <motion.img
              whileHover={{
                scale: 1.08,
              }}
              transition={{
                duration: 0.45,
              }}
              src={restaurant.image}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

            {/* Match */}

            <div className="absolute left-4 top-4">

              <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 py-2 text-xs font-semibold text-white shadow-xl">

                <Sparkles size={13} />

                {restaurant.match}% Match

              </div>

            </div>

            {/* AI Pick */}

            <div className="absolute right-4 top-4">

              <div className="rounded-full border border-white/30 bg-white/20 px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl">

                AI Pick

              </div>

            </div>

          </div>

          {/* Content */}

          <div className="space-y-5 p-6">

            {/* Title */}

            <div>

              <h3 className="text-xl font-bold text-gray-900">

                {restaurant.name}

              </h3>

              <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">

                <div className="flex items-center gap-1">

                  <Star
                    size={15}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  {restaurant.rating}

                </div>

                <div className="flex items-center gap-1">

                  <Clock3 size={15} />

                  {restaurant.deliveryTime}

                </div>

                <span>{restaurant.price}</span>

              </div>

            </div>

            {/* Reason */}

            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">

              💜 {restaurant.reason}

            </div>

            {/* AI Insight */}

            <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-4">

              <div className="mb-2 flex items-center gap-2">

                <Brain
                  size={16}
                  className="text-violet-600"
                />

                <span className="font-semibold text-violet-700">

                  AI Insight

                </span>

              </div>

              <p className="text-sm leading-6 text-gray-600">

                {restaurant.insight}

              </p>

            </div>

            {/* CTA */}

            <button className="flex items-center gap-2 font-semibold text-violet-600 transition-all group-hover:gap-3">

              View Restaurant

              <ArrowUpRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </motion.div>
  );
}