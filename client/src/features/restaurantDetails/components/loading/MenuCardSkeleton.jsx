// src/features/restaurantDetails/components/MenuCardSkeleton.jsx

import { motion } from "framer-motion";

export default function MenuCardSkeleton() {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        relative
        w-[380px]
        overflow-hidden
        rounded-[34px]
        border
        border-violet-100
        bg-white
        shadow-[0_25px_70px_rgba(124,58,237,.08)]
      "
    >
      {/* IMAGE */}
      <div className="h-[250px] w-full animate-pulse bg-gray-200" />

      {/* Rating Badge */}
      <div className="absolute right-4 top-4 h-10 w-16 animate-pulse rounded-full bg-white shadow-lg" />

      {/* Info Panel */}
      <div
        className="
          relative
          -mt-8
          rounded-t-[34px]
          border-t
          border-white/30
          bg-white
          p-6
        "
      >
        {/* Tags */}
        <div className="mb-4 flex gap-3">
          <div className="h-7 w-24 animate-pulse rounded-full bg-gray-200" />
          <div className="h-7 w-28 animate-pulse rounded-full bg-gray-200" />
        </div>

        {/* Title */}
        <div className="mb-4 h-8 w-52 animate-pulse rounded-lg bg-gray-200" />

        {/* Description */}
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Price + Prep */}
        <div className="mt-7 flex items-center justify-between">
          <div>
            <div className="mb-2 h-3 w-14 animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-24 animate-pulse rounded bg-gray-300" />
          </div>

          <div className="rounded-2xl border border-violet-100 bg-violet-50 px-5 py-3">
            <div className="mb-2 h-3 w-16 animate-pulse rounded bg-gray-200" />
            <div className="h-5 w-20 animate-pulse rounded bg-gray-300" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-violet-100
          bg-gradient-to-r
          from-violet-50
          via-white
          to-violet-50
          px-7
          py-6
        "
      >
        <div>
          <div className="mb-2 h-3 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-28 animate-pulse rounded bg-gray-300" />
        </div>

        <div className="h-14 w-32 animate-pulse rounded-2xl bg-violet-200" />
      </div>

      {/* Bottom Accent */}
      <div className="h-1.5 w-full animate-pulse bg-violet-200" />
    </motion.article>
  );
}