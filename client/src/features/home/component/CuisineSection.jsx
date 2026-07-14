import "./CuisineSection.css";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import cuisines from "../../../data/cuisines";

const CuisineSection = () => {
  const navigate = useNavigate();

  return (
    <section className="cuisine-section">
      <div className="cuisine-heading">

        <span>EXPLORE FLAVORS</span>

        <h2>Browse by Cuisine</h2>

        <p>
          Discover restaurants serving authentic cuisines from
          around the world.
        </p>

      </div>

      <div className="cuisine-grid">

        {cuisines.map((item, index) => (
          <motion.div
            key={item.id}
            className={`cuisine-card ${
              index === 0 ? "large" : ""
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.08,
              duration: 0.55,
            }}
            whileHover={{
              scale: 1.03,
              y: -8,
            }}
            onClick={() =>
              navigate(
                `/restaurants?cuisine=${encodeURIComponent(
                  item.name
                )}`
              )
            }
          >
            <img src={item.image} alt={item.name} />

            <div className="overlay"></div>

            <span className="badge">
              {item.badge}
            </span>

            <div className="content">

              <div>

                <h3>{item.name}</h3>

                <p>
                  {item.restaurants}+ Restaurants
                </p>

              </div>

              <div className="arrow">

                <ArrowUpRight size={22} />

              </div>

            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default CuisineSection;