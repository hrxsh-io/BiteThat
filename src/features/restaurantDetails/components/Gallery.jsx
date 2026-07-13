import { motion } from "framer-motion";
import {
  Camera,
  ChevronRight,
} from "lucide-react";

/* ==========================================
      DEMO IMAGES
========================================== */

const images = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
  "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
];

/* ==========================================
      COMPONENT
========================================== */

export default function Gallery() {
  return (
    <section className="mx-auto max-w-[1500px] px-6 pt-0 pb-4 lg:px-10">

      {/* Heading */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
            Restaurant Gallery
          </p>

          <h2 className="mt-2 text-4xl font-black text-gray-900">
            A Feast for Your Eyes 📸
          </h2>

        </div>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-violet-50
            px-5
            py-3
            font-semibold
            text-violet-700
            transition
            hover:bg-violet-100
          "
        >
          View All
          <ChevronRight size={18} />
        </button>

      </div>

      {/* Gallery */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Featured Image */}

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.35 }}
          className="
            group
            relative
            overflow-hidden
            rounded-[34px]
            lg:col-span-2
          "
        >
          <img
            src={images[0]}
            alt="Restaurant"
            className="
              h-[520px]
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-8 left-8">

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white/90
                px-5
                py-3
                font-semibold
                text-gray-900
                backdrop-blur-xl
              "
            >
              <Camera size={18} />

              Restaurant Interior

            </div>

          </div>

        </motion.div>

        {/* Right Grid */}

        <div className="grid gap-6 grid-cols-2">

          {images.slice(1).map((image, index) => (

            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="
                group
                overflow-hidden
                rounded-[26px]
              "
            >

              <img
                src={image}
                alt=""
                className="
                  h-[247px]
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
              />

            </motion.div>

          ))}

        </div>

      </div>

      {/* Bottom Card */}

      <motion.div
        whileHover={{ y: -4 }}
        className="
          mt-8
          rounded-[30px]
          border
          border-violet-100
          bg-gradient-to-r
          from-violet-50
          via-white
          to-violet-50
          p-8
          shadow-[0_20px_60px_rgba(124,58,237,.06)]
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-2xl font-black text-gray-900">
              48+ Food & Restaurant Photos
            </h3>

            <p className="mt-2 text-gray-500">
              Explore delicious dishes, restaurant ambience and customer favourites.
            </p>

          </div>

          <button
            className="
              rounded-2xl
              bg-gradient-to-r
              from-violet-600
              to-fuchsia-600
              px-7
              py-4
              font-semibold
              text-white
              shadow-lg
            "
          >
            Browse Gallery
          </button>

        </div>

      </motion.div>

    </section>
  );
}