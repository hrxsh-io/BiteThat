import { Clock3, Star, Bike, Flame } from "lucide-react";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div
      className="
      group
      overflow-hidden
      rounded-3xl
      bg-white
      shadow-lg
      hover:shadow-[0_20px_60px_rgba(124,58,237,.25)]
      transition-all
      duration-500
      hover:-translate-y-2
      border border-violet-100
      "
    >
      {/* Image */}

      <div className="relative overflow-hidden h-60">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="
          w-full
          h-full
          object-cover
          group-hover:scale-110
          transition-all
          duration-700
          "
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        {/* Rating */}

        <div className="absolute top-4 left-4">

          <div className="bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1">

            <Star
              size={15}
              fill="#FACC15"
              className="text-yellow-400"
            />

            <span className="font-semibold text-sm">
              {restaurant.rating}
            </span>

          </div>

        </div>

        {/* Trending */}

        <div className="absolute top-4 right-4">

          <div className="bg-violet-600 text-white rounded-full px-3 py-1 flex items-center gap-1 text-sm">

            <Flame size={14} />

            Trending

          </div>

        </div>

        {/* Offer */}

        <div className="absolute bottom-4 left-4">

          <div className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg">

            20% OFF TODAY

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        <h2 className="text-xl font-bold text-gray-800">
          {restaurant.name}
        </h2>

        <p className="text-gray-500 mt-1">
          {restaurant.cuisine}
        </p>

        <div className="flex justify-between mt-5">

          <div className="flex items-center gap-2">

            <Clock3
              size={18}
              className="text-violet-600"
            />

            <span>{restaurant.deliveryTime}</span>

          </div>

          <div className="flex items-center gap-2">

            <Bike
              size={18}
              className="text-violet-600"
            />

            ₹{restaurant.priceForTwo}

          </div>

        </div>

        <button
          className="
          mt-6
          w-full
          py-3
          rounded-2xl
          bg-gradient-to-r
          from-violet-600
          to-purple-500
          text-white
          font-semibold
          hover:shadow-xl
          transition-all
          duration-300
          "
        >
          View Menu →
        </button>

      </div>
    </div>
  );
};

export default RestaurantCard;