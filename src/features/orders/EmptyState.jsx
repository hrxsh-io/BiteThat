import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({
  title = "No Orders Yet",
  subtitle = "Looks like your plate is empty. Discover amazing food near you.",
  buttonText = "Browse Restaurants",
  buttonLink = "/restaurants",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center rounded-[36px] border border-violet-100 bg-white px-8 py-20 text-center shadow-lg"
    >
      {/* Illustration */}

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="mb-8 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-2xl"
      >
        <ShoppingBag size={64} className="text-white" />
      </motion.div>

      {/* Heading */}

      <h2 className="text-3xl font-bold text-gray-900">
        {title}
      </h2>

      {/* Subtitle */}

      <p className="mt-4 max-w-lg text-lg leading-8 text-gray-500">
        {subtitle}
      </p>

      {/* CTA */}

      <Link to={buttonLink}>
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="mt-10 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-semibold text-white shadow-xl"
        >
          {buttonText}

          <ArrowRight size={20} />
        </motion.button>
      </Link>

      {/* Tip */}

      <div className="mt-10 rounded-2xl bg-violet-50 px-6 py-4">
        <p className="text-sm font-medium text-violet-700">
          💜 Tip: Order from your favourite restaurants to earn more
          <span className="font-bold"> BiteCoins.</span>
        </p>
      </div>
    </motion.div>
  );
}