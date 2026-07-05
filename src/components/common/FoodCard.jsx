import { Heart, Plus, Star } from "lucide-react";

const FoodCard = ({ food }) => {
  return (
    <div
      className="
      group
      relative
      bg-white
      rounded-[35px]
      p-5
      shadow-lg
      hover:shadow-[0_20px_50px_rgba(124,58,237,.20)]
      transition-all
      duration-500
      hover:-translate-y-2
      overflow-hidden
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -top-20
        -right-20
        w-40
        h-40
        rounded-full
        bg-violet-100
        blur-3xl
        opacity-0
        group-hover:opacity-100
        transition
        "
      />

      {/* Favorite */}

      <button
        className="
        absolute
        top-5
        right-5
        bg-white
        p-2
        rounded-full
        shadow-md
        hover:bg-red-50
        "
      >
        <Heart size={18} />
      </button>

      {/* Image */}

      <div className="flex justify-center">

        <img
          src={food.image}
          alt={food.name}
          className="
          h-40
          object-contain
          group-hover:scale-110
          transition-all
          duration-500
          "
        />

      </div>

      <h2 className="text-xl font-bold mt-5">
        {food.name}
      </h2>

      <p className="text-gray-500">
        {food.category}
      </p>

      <div className="flex justify-between mt-5">

        <div>

          <p className="text-2xl font-bold text-violet-700">
            ₹{food.price}
          </p>

        </div>

        <div className="flex items-center gap-1">

          <Star
            fill="#FFD700"
            className="text-yellow-400"
            size={18}
          />

          {food.rating}

        </div>

      </div>

      <button
        className="
        mt-6
        w-full
        rounded-2xl
        py-3
        bg-violet-600
        text-white
        flex
        justify-center
        items-center
        gap-2
        hover:bg-violet-700
        transition
        "
      >
        <Plus size={18} />
        Add to Cart
      </button>

    </div>
  );
};

export default FoodCard;