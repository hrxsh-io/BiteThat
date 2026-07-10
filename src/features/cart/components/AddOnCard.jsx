import { motion } from "framer-motion";
import {
  Plus,
  Star,
  Flame,
} from "lucide-react";

export default function AddOnCard({
  item,
  onAdd,
}) {
  return (
    <motion.div
      layout
      whileHover={{
        y: -10,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      group
      relative
      min-w-[270px]
      overflow-x-hidden
      rounded-[30px]
      border
      border-violet-100
      bg-white
      shadow-lg
      transition-all
      duration-300
      hover:shadow-2xl
      "
    >
      {/* IMAGE */}

      <div className="relative overflow-x-hidden">

        <img
          src={item.image}
          alt={item.name}
          className="
          h-56
          w-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />

        {/* Bestseller */}

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">

          <Flame size={14} />

          Bestseller

        </div>

        {/* Rating */}

        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 backdrop-blur">

          <Star
            size={15}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-semibold">
            {item.rating}
          </span>

        </div>

        {/* Floating Add Button */}

        <motion.button
          whileTap={{
            scale: 0.9,
          }}
          whileHover={{
            rotate: 90,
          }}
          onClick={() => onAdd(item)}
          className="
          absolute
          bottom-4
          right-4
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-violet-600
          text-white
          shadow-xl
          transition
          hover:bg-violet-700
          "
        >
          <Plus size={22} />
        </motion.button>

      </div>

      {/* CONTENT */}

      <div className="p-6">

        {/* Restaurant */}

        <div className="mb-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">

              {item.restaurant?.charAt(0)}

            </div>

            <div>

              <p className="font-semibold text-gray-900">

                {item.restaurant}

              </p>

              <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">

                <Star
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />

                {item.restaurantRating}

                •

                {item.delivery}

                •

                {item.distance}

              </div>

            </div>

          </div>

        </div>

        {/* Food */}

        <h3 className="text-xl font-bold text-gray-900">

          {item.name}

        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">

          {item.description}

        </p>

        {/* Tags */}

        <div className="mt-5 flex flex-wrap gap-2">

          {item.tags?.map((tag) => (

            <span
              key={tag}
              className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700"
            >
              {tag}
            </span>

          ))}

        </div>

        {/* Bottom */}

        <div className="mt-6 flex items-end justify-between">

          <div>

            <p className="text-xs uppercase tracking-wider text-gray-400">

              Price

            </p>

            <h2 className="mt-1 text-2xl font-bold text-violet-600">

              ₹{item.price}

            </h2>

          </div>



        </div>

      </div>
    </motion.div>
  );
}