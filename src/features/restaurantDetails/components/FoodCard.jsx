import { motion } from "framer-motion";
import {
  Heart,
  Star,
  Sparkles,
  Flame,
} from "lucide-react";

/* ==========================================
      COMPONENT
========================================== */

export default function FoodCard({
  dish,
  liked,
  onLike,
  variant = "menu",
}) {
  /* ==========================================
      CARD VARIANTS
========================================== */

  const widthClasses = {
    popular: "w-[340px]",
    menu: "w-[380px]",
    recommendation: "w-[300px]",
  };

  const cardWidth =
    widthClasses[variant] ||
    widthClasses.menu;
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      whileHover={{
        y: -10,
      }}
      transition={{
        duration: 0.45,
      }}
      className={`
group
relative
${cardWidth}
flex-shrink-0
overflow-hidden
rounded-[34px]
border
border-violet-100
bg-white
shadow-[0_25px_70px_rgba(124,58,237,.08)]
transition-all
duration-300
`}
    >

      {/* ======================================
              IMAGE
      ======================================= */}

      <div className="relative h-[250px] overflow-hidden">

        <motion.img
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.45,
          }}
          src={dish.image}
          alt={dish.name}
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* Dark Gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/60
            via-black/10
            to-transparent
          "
        />

        {/* ======================================
                AI PICK
        ======================================= */}

        {dish.ai && (
          <motion.div
            initial={{
              x: -30,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            className="
              absolute
              left-4
              top-4
              flex
              items-center
              gap-2
              rounded-full
              bg-violet-600
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              shadow-xl
            "
          >
            <Sparkles size={15} />

            BiteAI Pick
          </motion.div>
        )}

        {/* ======================================
              BESTSELLER
        ======================================= */}

        {dish.bestseller && (
          <motion.div
            initial={{
              y: -15,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            className="
              absolute
              left-4
              top-16
              flex
              items-center
              gap-2
              rounded-full
              bg-orange-500
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              shadow-lg
            "
          >
            <Flame size={15} />

            Bestseller
          </motion.div>
        )}

        {/* ======================================
              RATING
        ======================================= */}

        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          className="
            absolute
            right-4
            top-4
            flex
            items-center
            gap-2
            rounded-full
            bg-white/95
            px-4
            py-2
            shadow-xl
            backdrop-blur-xl
          "
        >
          <Star
            size={16}
            className="
              fill-yellow-400
              text-yellow-400
            "
          />

          <span className="font-bold">
            {dish.rating}
          </span>
        </motion.div>

      </div>

      {/* ---------- PART 2 STARTS HERE ---------- */}
      {/* ======================================
              GLASS INFORMATION PANEL
      ======================================= */}

      <div
        className="
          relative
          -mt-8
          rounded-t-[34px]
          border-t
          border-white/30
          bg-white/95
          p-6
          backdrop-blur-3xl
        "
      >

        {/* Decorative Glow */}

        <div
          className="
            absolute
            -right-12
            -top-12
            h-40
            w-40
            rounded-full
            bg-violet-500/10
            blur-[70px]
          "
        />

        <div className="relative z-10">

          {/* Category */}

          <div className="mb-3 flex items-center gap-2">

            <span
              className="
                rounded-full
                bg-violet-100
                px-3
                py-1
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-violet-700
              "
            >
              {dish.category || "Chef's Special"}
            </span>

            <span
              className="
                rounded-full
                bg-emerald-100
                px-3
                py-1
                text-xs
                font-semibold
                text-emerald-700
              "
            >
              Freshly Prepared
            </span>

          </div>

          {/* Dish Name */}

          <h3
            className="
              text-2xl
              font-black
              leading-tight
              text-gray-900
            "
          >
            {dish.name}
          </h3>

          {/* Description */}

          <p
            className="
              mt-3
              line-clamp-2
              text-[15px]
              leading-7
              text-gray-500
            "
          >
            {dish.description}
          </p>

          {/* Bottom Information */}

          <div
            className="
              mt-6
              flex
              items-center
              justify-between
            "
          >

            {/* Price */}

            <div>

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >
                Price
              </p>

              <h2
                className="
                  mt-1
                  text-3xl
                  font-black
                  text-violet-700
                "
              >
                ₹{dish.price}
              </h2>

            </div>

            {/* Preparation Time */}

            <div
              className="
                rounded-2xl
                border
                border-violet-100
                bg-violet-50
                px-5
                py-3
                text-center
              "
            >

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-500
                "
              >
                Prep Time
              </p>

              <p
                className="
                  mt-1
                  text-lg
                  font-bold
                  text-violet-700
                "
              >
                {dish.prepTime || "15-20 min"}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ---------- PART 3 STARTS HERE ---------- */}
      {/* ======================================
              ACTIONS
      ======================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-violet-100
          bg-gradient-to-r
          from-violet-50
          via-white
          to-violet-50
          px-7
          py-6
        "
      >
        {/* Reviews */}

        <div>

          <p className="text-xs uppercase tracking-wider text-gray-400">
            Loved by
          </p>

          <p className="mt-1 font-bold text-gray-900">
            {dish.reviews.toLocaleString()} Foodies
          </p>

        </div>

        {/* Add Button */}

        <motion.button
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            bg-gradient-to-r
            from-violet-600
            via-fuchsia-600
            to-violet-700
            px-7
            py-4
            font-semibold
            text-white
            shadow-[0_15px_40px_rgba(124,58,237,.35)]
          "
        >

          {/* Shine */}

          <motion.div
            animate={{
              x: ["-150%", "250%"],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-y-0
              left-0
              w-14
              rotate-12
              bg-white/30
              blur-md
            "
          />

          <span className="relative z-10 flex items-center gap-2">

            <span className="text-xl font-bold">
              +
            </span>

            Add

          </span>

        </motion.button>

      </div>

      {/* Bottom Accent */}

      <motion.div
        className="
          absolute
          bottom-0
          left-0
          h-1.5
          w-full
          origin-left
          rounded-full
          bg-gradient-to-r
          from-violet-600
          via-fuchsia-600
          to-pink-500
        "
        initial={{
          scaleX: 0,
        }}
        whileHover={{
          scaleX: 1,
        }}
        transition={{
          duration: 0.35,
        }}
      />

    </motion.article>
  );
}