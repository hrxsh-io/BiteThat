import { motion } from "framer-motion";
import {
  Star,
  ThumbsUp,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

/* ==========================================
      STATS
========================================== */

const stats = [
  { stars: 5, percent: 78 },
  { stars: 4, percent: 15 },
  { stars: 3, percent: 5 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

/* ==========================================
      COMPONENT
========================================== */

export default function Reviews() {
  return (
    <div className="mx-auto max-w-[1500px] px-6 lg:px-10 pt-4 pb-6 ">

      {/* Heading */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
            Customer Reviews
          </p>

          <h2 className="mt-2 text-4xl font-black text-gray-900">
            Loved by Foodies ❤️
          </h2>

        </div>

        <button className="flex items-center gap-2 rounded-full bg-violet-50 px-5 py-3 font-semibold text-violet-700 transition hover:bg-violet-100">
          View All
          <ChevronRight size={18} />
        </button>

      </div>

      {/* Rating Summary */}

      <div className="mb-12 rounded-[30px] border border-violet-100 bg-white p-8 shadow-[0_20px_60px_rgba(124,58,237,.08)]">

        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">

          {/* Left */}

          <div className="text-center">

            <h1 className="text-6xl font-black text-violet-700">
              4.8
            </h1>

            <div className="mt-3 flex justify-center gap-1">

              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={22}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}

            </div>

            <p className="mt-4 text-gray-500">
              Based on 2,864 reviews
            </p>

          </div>

          {/* Right */}

          <div className="space-y-4">

            {stats.map((item) => (

              <div
                key={item.stars}
                className="flex items-center gap-4"
              >

                <span className="w-10 font-semibold">
                  {item.stars}★
                </span>

                <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${item.percent}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
                  />

                </div>

                <span className="w-12 text-right text-gray-500">
                  {item.percent}%
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}