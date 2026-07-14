import { motion } from "framer-motion";
import {
  CalendarDays,
  Star,
  RotateCcw,
  Receipt,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export default function PastOrderCard({ order }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-[30px] border border-violet-100 bg-white shadow-lg transition-all hover:shadow-2xl"
    >
      <div className="flex flex-col lg:flex-row">

        {/* Food Image */}

        <div className="relative lg:w-72">

          <img
            src={order.image}
            alt={order.restaurant}
            className="h-64 w-full object-cover lg:h-full"
          />

          <div className="absolute left-5 top-5 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            Delivered
          </div>

        </div>

        {/* Right */}

        <div className="flex flex-1 flex-col justify-between p-8">

          {/* Header */}

          <div>

            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {order.restaurant}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-gray-500">

                  <div className="flex items-center gap-2">

                    <CalendarDays size={16} />

                    {order.placedAt}

                  </div>

                  <div className="flex items-center gap-2">

                    <CheckCircle2
                      size={16}
                      className="text-emerald-500"
                    />

                    Delivered Successfully

                  </div>

                </div>

              </div>

              <div className="text-right">

                <p className="text-sm text-gray-500">
                  Total Paid
                </p>

                <h3 className="mt-1 text-3xl font-bold text-violet-700">
                  ₹{order.total}
                </h3>

              </div>

            </div>

            {/* Items */}

            <div className="mt-8 flex flex-wrap gap-3">

              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700"
                >
                  {item.quantity} × {item.name}
                </div>
              ))}

            </div>

          </div>

          {/* Bottom */}

          <div className="mt-10">

            {/* Craving Again */}

            <div className="rounded-3xl bg-gradient-to-r from-violet-50 to-fuchsia-50 p-5">

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h4 className="text-lg font-bold text-gray-900">
                    🍕 Craving this again?
                  </h4>

                  <p className="mt-1 text-gray-500">
                    Reorder your favourites with one click.
                  </p>

                </div>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 font-semibold text-white shadow-lg"
                >
                  <span className="flex items-center gap-2">
                    <RotateCcw size={18} />
                    Reorder
                  </span>
                </motion.button>

              </div>

            </div>

            {/* Footer Buttons */}

            <div className="mt-6 flex flex-wrap gap-4">

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="flex items-center gap-2 rounded-2xl border border-violet-200 px-6 py-3 font-semibold text-violet-700 hover:bg-violet-50"
              >
                <Receipt size={18} />

                Receipt
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="flex items-center gap-2 rounded-2xl border border-yellow-200 px-6 py-3 font-semibold text-yellow-600 hover:bg-yellow-50"
              >
                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />

                Rate Food
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="ml-auto flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold text-gray-600 hover:text-violet-700"
              >
                View Details

                <ChevronRight size={18} />
              </motion.button>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}