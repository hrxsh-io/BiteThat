import { motion } from "framer-motion";

const shimmer = {
  initial: {
    backgroundPosition: "-200% 0",
  },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
    },
  },
};

const SkeletonBlock = ({ className = "" }) => (
  <motion.div
    variants={shimmer}
    initial="initial"
    animate="animate"
    className={`
      bg-[length:200%_100%]
      bg-gradient-to-r
      from-gray-100
      via-gray-200
      to-gray-100
      ${className}
    `}
  />
);

const RestaurantSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-sm">
      {/* ================= IMAGE ================= */}

      <div className="relative h-60">
        <SkeletonBlock className="h-full w-full" />

        {/* Offer Badge */}
        <SkeletonBlock className="absolute left-5 top-5 h-8 w-20 rounded-full" />

        {/* Rating */}
        <SkeletonBlock className="absolute right-5 top-5 h-8 w-14 rounded-full" />

        {/* Favourite */}
        <SkeletonBlock className="absolute bottom-5 right-5 h-11 w-11 rounded-full" />
      </div>

      {/* ================= CONTENT ================= */}

      <div className="space-y-5 p-6">
        {/* Title */}
        <div>
          <SkeletonBlock className="h-6 w-44 rounded-lg" />

          <SkeletonBlock className="mt-3 h-4 w-64 rounded-lg" />
        </div>

        {/* Pills */}

        <div className="flex gap-2">
          <SkeletonBlock className="h-9 w-24 rounded-full" />
          <SkeletonBlock className="h-9 w-24 rounded-full" />
        </div>

        {/* Bottom */}

        <div className="flex items-center justify-between border-t border-gray-100 pt-5">
          <div>
            <SkeletonBlock className="h-6 w-20 rounded-lg" />
            <SkeletonBlock className="mt-2 h-3 w-14 rounded-lg" />
          </div>

          <SkeletonBlock className="h-10 w-28 rounded-full" />
        </div>

        {/* Button */}

        <SkeletonBlock className="h-12 w-full rounded-2xl" />
      </div>
    </div>
  );
};

export default RestaurantSkeleton;