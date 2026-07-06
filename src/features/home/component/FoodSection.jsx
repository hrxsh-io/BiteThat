import "./FoodSection.css";

import { useRef } from "react";

import { motion } from "framer-motion";

import { ChevronLeft, ChevronRight } from "lucide-react";

import FoodCard from "../../../components/common/FoodCard";

const FoodSection = ({
  title = "Top Picks for You",
  subtitle = "Loved by thousands of foodies near you.",
  foods = [],
}) => {

  const sliderRef = useRef(null);

  const scroll = (direction) => {

    if (!sliderRef.current) return;

    const amount = 360;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });

  };

  return (

    <section className="food-section">

      <div className="food-container">

        {/* Heading */}

        <motion.div
          className="food-section-header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .55 }}
        >

          <div>

            <span className="food-label">
              HIGHLY  RECOMMENDED
            </span>

            <h2>
              {title}
            </h2>

            <p>
              {subtitle}
            </p>

          </div>

          {/* Controls */}

          <div className="food-controls">

            <button onClick={() => scroll("left")}>

              <ChevronLeft size={22} />

            </button>

            <button onClick={() => scroll("right")}>

              <ChevronRight size={22} />

            </button>

          </div>

        </motion.div>

        {/* Cards */}

        <div
          className="food-slider"
          ref={sliderRef}
        >

          {

            foods.map((food) => (

              <div
                className="food-slide"
                key={food.id}
              >

                <FoodCard
                  food={food}
                  buttonVariant="explore"
                />

              </div>

            ))

          }

        </div>

      </div>

    </section>

  );

};

export default FoodSection;