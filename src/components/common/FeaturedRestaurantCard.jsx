import "./FeaturedRestaurantCard.css";

import { motion } from "framer-motion";

import {
  Star,
  Clock3,
  MapPin,
  ArrowRight,
  Flame,
  BadgeCheck,
  Users,
} from "lucide-react";

const FeaturedRestaurantCard = ({ restaurant }) => {
  return (
    <motion.div
      className="featured-card"
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      {/* Background Glow */}
      <div className="featured-glow"></div>

      {/* LEFT */}
      <div className="featured-left">
        <motion.div
          className="offer-pill"
          initial={{ x: -25, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Flame size={16} />
          <span>{restaurant.offer}</span>
        </motion.div>

        <motion.div
          className="restaurant-title"
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <h1>{restaurant.name}</h1>

          {restaurant.verified && (
            <BadgeCheck
              className="verified"
              size={26}
            />
          )}
        </motion.div>

        <motion.p
          className="restaurant-description"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {restaurant.description}
        </motion.p>

        <motion.div
          className="restaurant-info"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <div className="info-box">
            <Star fill="currentColor" size={18} />
            <div>
              <h4>{restaurant.rating}</h4>
              <span>Rating</span>
            </div>
          </div>

          <div className="info-box">
            <Clock3 size={18} />
            <div>
              <h4>{restaurant.deliveryTime}</h4>
              <span>Delivery</span>
            </div>
          </div>

          <div className="info-box">
            <MapPin size={18} />
            <div>
              <h4>{restaurant.distance}</h4>
              <span>Distance</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="featured-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <button className="order-btn">
            Order Now
            <ArrowRight size={18} />
          </button>

          <div className="customer-box">
            <div className="avatars">
              <img
                src="https://i.pravatar.cc/50?img=1"
                alt=""
              />
              <img
                src="https://i.pravatar.cc/50?img=2"
                alt=""
              />
              <img
                src="https://i.pravatar.cc/50?img=3"
                alt=""
              />
              <img
                src="https://i.pravatar.cc/50?img=4"
                alt=""
              />
            </div>

            <div>
              <h4>{restaurant.customers}</h4>
              <span>Happy Customers</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="featured-right">
        <div className="purple-shape"></div>

        <motion.div
          className="rating-floating"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
        >
          <Star
            fill="#FACC15"
            color="#FACC15"
            size={18}
          />

          <div>
            <h3>{restaurant.rating}</h3>
            <span>{restaurant.reviews}</span>
          </div>
        </motion.div>

        <motion.img
          src={restaurant.image}
          alt={restaurant.name}
          className="featured-image"
          whileHover={{
            scale: 1.06,
            rotate: -2,
          }}
          transition={{
            duration: 0.4,
          }}
        />

        <motion.div
          className="floating-chip"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
        >
          <Users size={16} />
          {restaurant.ordersToday} orders today
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturedRestaurantCard;