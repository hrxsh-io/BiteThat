import { motion, AnimatePresence } from "framer-motion";
import {
  Clock3,
  Coins,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function StickyCheckout({
  total = 726,
  eta = "22 mins",
  biteCoins = 120,
  itemCount = 3,
  onCheckout,
}) {
  return (
    <motion.div
      initial={{
        y: 120,
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
      fixed
      bottom-5
      left-1/2
      z-50
      w-[95%]
      max-w-6xl
      -translate-x-1/2
      "
    >
      <div
        className="
        overflow-x-hidden
        rounded-[30px]
        border
        border-violet-200
        bg-white/85
        shadow-2xl
        backdrop-blur-2xl
        "
      >
        <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT */}

          <div className="flex flex-wrap items-center gap-8">

            {/* TOTAL */}

            <div>

              <p className="text-xs uppercase tracking-widest text-gray-400">
                Total Amount
              </p>

              <AnimatePresence mode="wait">
                <motion.h2
                  key={total}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="mt-1 text-3xl font-bold text-violet-700"
                >
                  ₹{total}
                </motion.h2>
              </AnimatePresence>

            </div>

            {/* ETA */}

            <div className="flex items-center gap-3 rounded-full bg-violet-50 px-4 py-3">

              <Clock3
                size={18}
                className="text-violet-600"
              />

              <div>

                <p className="text-xs text-gray-400">
                  Delivery
                </p>

                <p className="font-semibold">
                  {eta}
                </p>

              </div>

            </div>

            {/* COINS */}

            <div className="flex items-center gap-3 rounded-full bg-amber-50 px-4 py-3">

              <Coins
                size={18}
                className="text-amber-500"
              />

              <div>

                <p className="text-xs text-gray-400">
                  Earn
                </p>

                <p className="font-semibold">
                  +{biteCoins} Coins
                </p>

              </div>

            </div>

            {/* ITEMS */}

            <div className="hidden rounded-full bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 md:block">
              {itemCount} Items
            </div>

          </div>

          {/* CTA */}

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={onCheckout}
            className="
            group
            relative
            overflow-x-hidden
            rounded-full
            bg-gradient-to-r
            from-violet-600
            to-fuchsia-600
            px-8
            py-4
            font-semibold
            text-white
            shadow-xl
            "
          >
            {/* Glow */}

            <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-center gap-3">

              <Sparkles size={18} />

              Proceed to Payment

              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
              >
                <ArrowRight size={18} />
              </motion.div>

            </div>

          </motion.button>

        </div>

        {/* PROGRESS */}

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: "100%",
          }}
          transition={{
            duration: 1.2,
          }}
          className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
        />

      </div>
    </motion.div>
  );
}