import { motion } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  Flame,
  Star,
  Store,
  Clock3,
  MapPin,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: .25 }}
      className="
      group
      overflow-x-hidden
      rounded-[28px]
      border
      border-violet-100
      bg-white
      shadow-md
      hover:shadow-xl
      transition-all
      "
    >
      <div className="grid md:grid-cols-[180px_1fr_auto]">

        {/* IMAGE */}

        <div className="relative overflow-x-hidden">

          <img
            src={item.image}
            alt={item.name}
            className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40" />

          <div className="absolute left-4 top-4 rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
            Bestseller
          </div>

          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-violet-700 backdrop-blur">

            {item.restaurant}

          </div>
        </div>

        {/* DETAILS */}

        <div className="flex flex-col justify-between p-6">

          <div>

            <div className="mb-5 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">

                  <Store
                    size={22}
                    className="text-violet-600"
                  />

                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h4 className="font-bold text-gray-900">

                      {item.restaurant}

                    </h4>

                    <BadgeCheck
                      size={16}
                      className="text-green-500"
                    />

                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">

                    <span className="flex items-center gap-1">

                      <Star
                        size={13}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      {item.restaurantRating}

                    </span>

                    <span className="flex items-center gap-1">

                      <Clock3 size={13} />

                      {item.delivery}

                    </span>

                    <span className="flex items-center gap-1">

                      <MapPin size={13} />

                      {item.distance}

                    </span>

                  </div>

                </div>

              </div>

              <button
                className="flex items-center gap-1 rounded-full border border-violet-200 px-4 py-2 text-sm font-semibold text-violet-600 transition hover:bg-violet-600 hover:text-white"
              >
                View
                <ArrowUpRight size={15} />
              </button>

            </div>

            <div className="flex items-start justify-between">

              <div>

                <h3 className="text-2xl font-bold">
                  {item.name}
                </h3>

                <p className="mt-2 text-gray-500">
                  {item.description}
                </p>

              </div>

              <p className="text-2xl font-bold text-violet-600">
                ₹{item.price}
              </p>

            </div>

            {/* TAGS */}

            <div className="mt-5 flex flex-wrap gap-2">

              <span className="rounded-full bg-violet-50 px-3 py-1 text-sm text-violet-700">
                Medium
              </span>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-sm text-orange-600">
                Extra Cheese
              </span>

              <span className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-sm text-red-500">

                <Flame size={14} />

                Spicy

              </span>

            </div>

            {/* RATING */}

            <div className="mt-6 flex items-center gap-2">

              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="font-semibold">
                {item.rating}
              </span>

              <span className="text-gray-400">
                ({item.reviewCount || "2.3k"} Reviews)
              </span>

            </div>

          </div>

          {/* CONTROLS */}

          <div className="mt-8 flex items-center justify-between">

            {/* QUANTITY */}

            <div className="flex items-center gap-4 rounded-full border border-violet-100 bg-violet-50 p-2">

              <motion.button
                whileTap={{ scale: .9 }}
                onClick={onDecrease}
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white
                shadow
                hover:bg-violet-100
                "
              >
                <Minus size={18} />
              </motion.button>

              <motion.span
                key={item.quantity}
                initial={{ scale: .7 }}
                animate={{ scale: 1 }}
                className="w-8 text-center text-lg font-bold"
              >
                {item.quantity}
              </motion.span>

              <motion.button
                whileTap={{ scale: .9 }}
                onClick={onIncrease}
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-violet-600
                text-white
                shadow-lg
                hover:bg-violet-700
                "
              >
                <Plus size={18} />
              </motion.button>

            </div>

            {/* REMOVE */}

            <motion.button
              whileTap={{ scale: .9 }}
              onClick={onRemove}
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-red-500
              hover:bg-red-100
              "
            >
              <Trash2 size={18} />
            </motion.button>

          </div>

        </div>

      </div>
    </motion.div>
  );
}