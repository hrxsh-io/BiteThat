import "./Testimonials.css";

import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Blogger",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "BiteThat completely changed the way I discover restaurants. The AI recommendations are surprisingly accurate!",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    role: "Verified Customer",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "Fast delivery, beautiful interface and the offers are actually useful. Easily my favorite food app.",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "Food Enthusiast",
    image: "https://i.pravatar.cc/150?img=47",
    review:
      "The UI feels premium. Everything from searching restaurants to ordering is incredibly smooth.",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonial-heading">

        <span className="testimonial-name"> TESTIMONIALS</span>

        <h2>
          Loved by <span>Thousands</span> of Food Lovers
        </h2>

        <p>
          People across the country are enjoying smarter food ordering with
          BiteThat.
        </p>

      </div>

      <div className="testimonial-grid">

        {testimonials.map((item, index) => (
          <motion.div
            className="testimonial-card"
            key={item.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, delay: index * .2 }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              scale: 1.02
            }}
          >

            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#FFD43B" stroke="#FFD43B"/>
              ))}
            </div>

            <p className="review">
              "{item.review}"
            </p>

            <div className="user">

              <img src={item.image} alt="" />

              <div>

                <h4>{item.name}</h4>

                <span>
                  <BadgeCheck size={15}/>
                  {item.role}
                </span>

              </div>

            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}