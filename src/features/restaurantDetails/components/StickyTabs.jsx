import { motion } from "framer-motion";
import {
  Gift,
  UtensilsCrossed,
  ClipboardList,
  Star,
  Image,
} from "lucide-react";

/* ==========================================
      TABS
========================================== */

const tabs = [
  {
    id: "overview",
    label: "Offers",
    icon: Gift,
  },
  {
    id: "popular",
    label: "Popular",
    icon: UtensilsCrossed,
  },
  {
    id: "menu",
    label: "Menu",
    icon: ClipboardList,
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: Star,
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: Image,
  },
];

/* ==========================================
      COMPONENT
========================================== */

export default function StickyTabs({
  activeTab,
  onTabClick,
}) {
  

  /* ==========================================
        JSX
  ========================================== */

  return (
    <motion.div
      initial={{
        y: -30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        sticky
        top-20
        z-40
        mb-10
      "
    >
      {/* ======================================
            GLASS CONTAINER
      ======================================= */}

      <div
        className="
          mx-auto
          max-w-7xl
          rounded-3xl
          border
          border-violet-200/40
          bg-white/70
          px-3
          py-3
          shadow-[0_20px_60px_rgba(124,58,237,0.08)]
          backdrop-blur-2xl
        "
      >
        <div
          className="
            relative
            flex
            items-center
            justify-between
            gap-2
            overflow-x-auto
            scrollbar-hide
          "
        >

          {/* ---------- PART 2 STARTS HERE ---------- */}
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => onTabClick(tab.id)}
                className={`
        relative
        flex
        min-w-fit
        flex-1
        items-center
        justify-center
        gap-2
        rounded-2xl
        px-5
        py-3
        text-sm
        font-semibold
        transition-all
        duration-300
        md:px-6
        ${isActive
                    ? "text-white"
                    : "text-gray-600 hover:text-violet-700"
                  }
      `}
              >
                {/* Active Background */}

                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 28,
                    }}
                    className="
            absolute
            inset-0
            rounded-2xl
            bg-gradient-to-r
            from-violet-600
            to-fuchsia-600
            shadow-lg
          "
                  />
                )}

                {/* Icon */}

                <Icon
                  size={18}
                  className="relative z-10"
                />

                {/* Label */}

                <span className="relative z-10 whitespace-nowrap">
                  {tab.label}
                </span>

                {/* Bottom Indicator */}

                {isActive && (
                  <motion.div
                    layoutId="bottomIndicator"
                    className="
            absolute
            -bottom-1
            left-1/2
            h-1
            w-8
            -translate-x-1/2
            rounded-full
            bg-violet-300
          "
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}