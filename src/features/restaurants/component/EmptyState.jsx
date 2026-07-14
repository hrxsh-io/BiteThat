import { SearchX, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const EmptyState = ({ onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-violet-200 bg-white px-8 py-20 text-center shadow-sm"
    >
      {/* Icon */}

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100">
        <SearchX
          size={44}
          className="text-violet-600"
        />
      </div>

      {/* Title */}

      <h2 className="mt-8 text-3xl font-bold text-gray-900">
        No Restaurants Found
      </h2>

      {/* Description */}

      <p className="mt-4 max-w-md text-gray-500">
        We couldn't find any restaurants matching your search or selected
        filters. Try changing your search or resetting the filters.
      </p>

      {/* Button */}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onReset}
        className="mt-8 flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-violet-700"
      >
        <RotateCcw size={18} />
        Reset Filters
      </motion.button>
    </motion.div>
  );
};

export default EmptyState;