import { motion } from "framer-motion";
import {
  Star,
  Clock3,
  BadgeCheck,
  Truck,
  Sparkles,
} from "lucide-react";

export default function RestaurantCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
      }}
      whileHover={{
        y: -8,
      }}
      className="
      overflow-hidden
      rounded-[32px]
      border
      border-violet-100
      bg-white
      shadow-lg
      transition-all
      duration-300
      hover:shadow-2xl
      "
    >
      <div className="grid md:grid-cols-[260px_1fr]">

        {/* Image */}

        <div className="relative overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900"
            alt="Restaurant"
            className="
            h-64
            w-full
            object-cover
            transition-transform
            duration-500
            hover:scale-110
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />

          {/* Offer */}

          <div className="absolute left-5 top-5 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            ₹150 OFF
          </div>

          {/* Rating */}

          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 backdrop-blur">

            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="font-semibold">
              4.8
            </span>
          </div>
        </div>

        {/* Content */}

        <div className="flex flex-col justify-between p-8">

          <div>

            {/* Top */}

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>

                <h2 className="text-3xl font-bold text-gray-900">
                  Domino's Pizza
                </h2>

                <p className="mt-2 text-gray-500">
                  Italian • Pizza • Fast Food
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-600">

                <BadgeCheck size={18} />

                <span className="text-sm font-semibold">
                  Verified
                </span>

              </div>
            </div>

            {/* Badges */}

            <div className="mt-8 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-violet-700">

                <Sparkles size={16} />

                Bestseller

              </div>

              <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-600">

                <Truck size={16} />

                Free Delivery

              </div>

              <div className="rounded-full bg-orange-50 px-4 py-2 text-orange-600">

                Open Now

              </div>
            </div>

            {/* Description */}

            <p className="mt-8 leading-7 text-gray-500">

              Fresh dough prepared every day with premium ingredients.
              Your order is being prepared as soon as it's confirmed.

            </p>

          </div>

          {/* Bottom */}

          <div className="mt-10 flex flex-wrap items-center justify-between border-t border-violet-100 pt-6">

            <div className="flex items-center gap-3">

              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

              <span className="font-medium text-gray-700">
                Preparing Fresh
              </span>

            </div>

            <div className="flex items-center gap-2 rounded-full bg-violet-100 px-5 py-3 text-violet-700">

              <Clock3 size={18} />

              <span className="font-semibold">
                22–30 mins
              </span>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}