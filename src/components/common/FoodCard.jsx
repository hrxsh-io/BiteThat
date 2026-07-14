import "./FoodCard.css";

import { motion } from "framer-motion";

import {
  Star,
  Clock3,
  ArrowUpRight,
  Plus,
  Check,
} from "lucide-react";

const FoodCard = ({
  food,
  buttonVariant = "explore",
  onCardClick,
  onButtonClick,
}) => {
  const renderIcon = () => {
    switch (buttonVariant) {
      case "add":
        return <Plus size={18} />;

      case "added":
        return <Check size={18} />;

      default:
        return <ArrowUpRight size={18} />;
    }
  };

  return (
    <motion.article
      className="food-card"
      onClick={onCardClick}
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.55,
      }}
      whileHover={{
        y: -10,
      }}
    >
      {/* ================= IMAGE ================= */}

      <div className="food-image">

        <motion.img
          src={food.image}
          alt={food.name}
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.35,
          }}
        />

        {/* Rating */}

        <motion.div
          className="rating-badge"
          whileHover={{
            scale: 1.08,
          }}
        >
          <Star
            size={14}
            fill="#FFD43B"
            strokeWidth={0}
          />

          <span>{food.rating}</span>

        </motion.div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="food-content">

        {/* Decorative Wave */}

        <div className="food-info">

          <span className="food-category">
            {food.category}
          </span>

          <h3 className="food-title">
            {food.name}
          </h3>

          <div className="food-bottom">

            <div className="delivery-time">

              <Clock3 size={15} />

              <span>{food.deliveryTime}</span>

            </div>

          </div>

        </div>

        {/* Floating Action Button */}

        <motion.button
          className={`
            food-action-btn
            ${buttonVariant === "added" ? "added" : ""}
          `}
          whileHover={{
            scale: 1.08,
            rotate: 12,
          }}
          whileTap={{
            scale: 0.9,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick?.();
          }}
        >
          {renderIcon()}
        </motion.button>

      </div>
    </motion.article>
  );
};

export default FoodCard;