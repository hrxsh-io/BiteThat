import "./FeaturedRestaurantSection.css";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import FeaturedRestaurantCard from "../../../components/common/FeaturedRestaurantCard";
import featuredRestaurants from "../../../data/restaurants";

export default function FeaturedRestaurantSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % featuredRestaurants.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? featuredRestaurants.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="featured-section">
      {/* Heading */}

      <motion.div
        className="featured-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span>Featured Restaurants</span>

        <h2>
          Discover the City's
          <br />
          Most Loved Restaurants
        </h2>

        <p>
          Hand-picked restaurants offering exceptional food,
          exclusive deals and unforgettable dining experiences.
        </p>
      </motion.div>

      {/* Navigation */}

      <div className="featured-navigation">
        <button onClick={prevSlide}>
          <ChevronLeft size={22} />
        </button>

        <button onClick={nextSlide}>
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Card */}

      <AnimatePresence mode="wait">
        <motion.div
        className="featured-card-wrapper"
          key={featuredRestaurants[current].id}
          initial={{
            opacity: 0,
            x: 120,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: -120,
            scale: 0.96,
          }}
          transition={{
            duration: 0.55,
          }}
        >
          <FeaturedRestaurantCard
            restaurant={featuredRestaurants[current]}
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}

      <div className="featured-indicators">
        {featuredRestaurants.map((restaurant, index) => (
          <button
            key={restaurant.id}
            onClick={() => setCurrent(index)}
            className={
              current === index
                ? "indicator active"
                : "indicator"
            }
          />
        ))}
      </div>
    </section>
  );
}