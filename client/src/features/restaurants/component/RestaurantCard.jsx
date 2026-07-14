import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  Star,
  Heart,
  BadgeCheck,
  Clock3,
  MapPin,
} from "lucide-react";

const RestaurantCard = ({
  restaurant,
  variant = "default",
}) => {
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  return (
    <motion.article
      whileHover={{
        y: -12,
        scale: 1.01,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className={`
group
relative
${variant === "compact"
  ? "w-[330px] flex-shrink-0"
  : "w-full"}
overflow-hidden
rounded-[32px]
border
border-violet-100
bg-white
shadow-lg
transition-all
duration-500
hover:border-violet-200
hover:shadow-[0_35px_90px_rgba(124,58,237,0.22)]
`}
    >
      {/* ================= IMAGE ================= */}

      <div
  className={`relative ${
    variant === "compact"
      ? "h-[200px]"
      : "h-[260px]"
  } overflow-hidden`}
>

        {/* Background Image */}

        <motion.img
          src={restaurant.image}
          alt={restaurant.name}
          whileHover={{
            scale: 1.1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/75
            via-black/20
            to-transparent
          "
        />

        {/* Decorative Glow */}

        <div
          className="
            absolute
            -top-24
            right-[-80px]
            h-56
            w-56
            rounded-full
            bg-violet-500/20
            blur-3xl
          "
        />

        {/* ================= OFFER BADGE ================= */}

        {restaurant.offer && (

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="
              absolute
              left-5
              top-5
              rounded-full
              border
              border-white/30
              bg-white/15
              px-4
              py-2
              text-xs
              font-semibold
              text-white
              backdrop-blur-xl
              shadow-lg
            "
          >
            🔥 {restaurant.offer}
          </motion.div>

        )}

        {/* ================= RATING ================= */}

        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          className="
            absolute
            right-5
            top-5
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/30
            bg-white/20
            px-4
            py-2
            backdrop-blur-xl
            shadow-lg
          "
        >
          <Star
            size={15}
            className="
              fill-yellow-400
              text-yellow-400
            "
          />

          <span className="text-sm font-semibold text-white">
            {restaurant.rating}
          </span>
        </motion.div>

        {/* ================= FAVOURITE ================= */}

        <motion.button
          whileHover={{
            scale: 1.12,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="
            absolute
            bottom-5
            right-5
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/30
            bg-white/20
            backdrop-blur-xl
            shadow-xl
          "
        >
          <Heart
            size={20}
            className={`
              transition-all
              duration-300

              ${liked
                ? "fill-red-500 text-red-500 scale-110"
                : "text-white"
              }
            `}
          />
        </motion.button>

        {/* ================= TITLE OVER IMAGE ================= */}

        <div className="absolute bottom-6 left-6 max-w-[70%]">

          <div className="flex items-center gap-2">

            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
              {restaurant.name}
            </h2>

            {restaurant.verified && (
              <BadgeCheck
                size={22}
                className="text-violet-300"
              />
            )}

          </div>

          <p className="mt-2 text-sm text-gray-200">
            {restaurant.description}
          </p>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div
  className={`
    ${
      variant === "compact"
        ? "space-y-4 p-4"
        : "space-y-6 p-6"
    }
`}
>

        {/* Cuisine */}

        <div className="flex flex-wrap gap-2">

          {(restaurant.cuisines ?? ["Fast Food"]).map((cuisine) => (
            <span
              key={cuisine}
              className="
          rounded-full
          bg-violet-50
          px-3
          py-1
          text-xs
          font-semibold
          text-violet-700
          transition-all
          duration-300
          hover:bg-violet-600
          hover:text-white
        "
            >
              {cuisine}
            </span>
          ))}

        </div>

        {/* Delivery + Distance */}

        <div className="grid grid-cols-2 gap-3">

          <motion.div
            whileHover={{ y: -2 }}
            className="
        rounded-2xl
        border
        border-gray-100
        bg-gray-50
        px-3 py-2.5
      "
          >

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-violet-100 p-2">
                <Clock3
                  size={18}
                  className="text-violet-600"
                />
              </div>

              <div>

                <p className="text-[11px] text-gray-500">
                  Delivery
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  {restaurant.deliveryTime}
                </p>

              </div>

            </div>

          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="
        rounded-2xl
        border
        border-gray-100
        bg-gray-50
        px-3 py-2.5
      "
          >

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-violet-100 p-2">
                <MapPin
                  size={18}
                  className="text-violet-600"
                />
              </div>

              <div>

                <p className="text-[11px] text-gray-500">
                  Distance
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  {restaurant.distance}
                </p>

              </div>

            </div>

          </motion.div>

        </div>

        {/* AI Match */}

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className={`
      rounded-2xl
      border
      border-violet-100
      bg-gradient-to-r
      from-violet-50
      to-fuchsia-50
      ${variant === "compact" ? "p-3" : "p-5"}
    `}
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
                AI Recommendation
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Highly recommended for your taste profile.
              </p>

            </div>

            <div
              className="
          rounded-full
          bg-violet-600
          px-4
          py-2
          text-sm
          font-bold
          text-white
        "
            >
              {restaurant.aiMatch ?? 96}% Match
            </div>

          </div>

        </motion.div>

        {/* Reviews */}

        <div
          className="
      flex
      items-center
      justify-between
      border-t
      border-gray-100
      pt-4
    "
        >

          <div>

            <p className="text-[11px] text-gray-500">
              Customer Reviews
            </p>

            <div className="mt-2 flex items-center gap-2">

              <Star
                size={17}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="font-semibold text-gray-900">
                {restaurant.reviews}
              </span>

            </div>

          </div>

          <div
            className="
        rounded-full
        bg-emerald-100
        px-4
        py-2
        text-sm
        font-semibold
        text-emerald-700
      "
          >
            ● Open Now
          </div>

        </div>

        {/* ================= PREMIUM CTA ================= */}

        <motion.div
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="relative overflow-hidden rounded-[24px]"
        >

          {/* Animated Gradient */}

          <motion.div
            animate={{
              backgroundPosition: [
                "0% 50%",
                "100% 50%",
                "0% 50%",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "linear",
            }}
            className="
      absolute
      inset-0
      bg-[length:250%_250%]
      bg-gradient-to-r
      from-violet-700
      via-fuchsia-600
      to-violet-700
    "
          />

          {/* Glow */}

          <div
            className="
      absolute
      left-1/2
      top-1/2
      h-40
      w-40
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-white/20
      blur-3xl
    "
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/restaurant/${restaurant.id}`);
            }}
            className={`
      relative
      flex
      w-full
      items-center
      justify-between
      px-6
      ${variant === "compact" ? "py-3" : "py-5"}
      text-white
    `}
          >

            <div>

              <p className="text-lg font-bold">
                Explore Restaurant
              </p>

              <p className="mt-1 text-sm text-violet-100">
                View Menu • Reviews • Offers
              </p>

            </div>

            <motion.div
              whileHover={{
                rotate: 45,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
              }}
              className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-white/20
        backdrop-blur-xl
      "
            >

              <ArrowRight size={24} />

            </motion.div>

          </button>

        </motion.div>

      </div>

    </motion.article>
  );
};

export default RestaurantCard;