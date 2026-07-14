import { motion } from "framer-motion";
import {
  CircleX,
  Receipt,
  RotateCcw,
  CalendarDays,
  Wallet,
  ChevronRight,
} from "lucide-react";

export default function CancelledOrderCard({ order }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-[30px] border border-red-100 bg-white shadow-lg hover:shadow-xl"
    >
      <div className="flex flex-col lg:flex-row">

        {/* Image */}

        <div className="relative lg:w-72">

          <img
            src={order.image}
            alt={order.restaurant}
            className="h-64 w-full object-cover lg:h-full"
          />

          <div className="absolute left-5 top-5 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            Cancelled
          </div>

        </div>

        {/* Content */}

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

                  <div className="flex items-center gap-2 text-red-600">

                    <CircleX size={16} />

                    Order Cancelled

                  </div>

                </div>

              </div>

              <div className="text-right">

                <p className="text-sm text-gray-500">
                  Amount
                </p>

                <h3 className="mt-1 text-3xl font-bold text-gray-900">
                  ₹{order.total}
                </h3>

              </div>

            </div>

            {/* Ordered Items */}

            <div className="mt-8 flex flex-wrap gap-3">

              {order.items.map((item, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {item.quantity} × {item.name}
                </span>
              ))}

            </div>

          </div>

          {/* Refund */}

          <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 p-6">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <Wallet
                    className="text-red-500"
                    size={24}
                  />

                  <div>

                    <h4 className="font-bold text-gray-900">
                      Refund Status
                    </h4>

                    <p className="text-sm text-gray-600">
                      {order.refundStatus}
                    </p>

                  </div>

                </div>

                <p className="mt-4 text-sm text-gray-500">

                  Your refund will be credited to the original
                  payment method.

                </p>

              </div>

              <div className="rounded-2xl bg-white px-6 py-4 shadow">

                <p className="text-sm text-gray-500">
                  Refund Amount
                </p>

                <h2 className="text-2xl font-bold text-red-600">
                  ₹{order.total}
                </h2>

              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="mt-8 flex flex-wrap gap-4">

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3 font-semibold text-white shadow-lg"
            >

              <RotateCcw size={18} />

              Reorder

            </motion.button>

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
              className="ml-auto flex items-center gap-2 rounded-2xl px-4 py-3 font-semibold text-gray-600 hover:text-violet-700"
            >

              View Details

              <ChevronRight size={18} />

            </motion.button>

          </div>

        </div>

      </div>

    </motion.div>
  );
}