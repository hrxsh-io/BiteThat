import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingCart({
  cartItems = [],
  total = 0,
}) {
  const navigate = useNavigate();

  const itemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: 100,
            opacity: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            fixed
            bottom-6
            left-1/2
            z-[100]
            w-[92%]
            max-w-md
            -translate-x-1/2
            lg:hidden
          "
        >
          <button
            onClick={() => navigate("/cart")}
            className="
              flex
              w-full
              items-center
              justify-between
              rounded-2xl
              bg-gradient-to-r
              from-violet-700
              via-fuchsia-600
              to-violet-700
              px-6
              py-4
              text-white
              shadow-[0_20px_50px_rgba(124,58,237,.35)]
            "
          >
            {/* Left */}

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white/20
                "
              >
                <ShoppingBag size={22} />
              </div>

              <div className="text-left">

                <p className="text-lg font-bold">
                  {itemCount} Item{itemCount > 1 ? "s" : ""}
                </p>

                <p className="text-sm text-violet-100">
                  ₹{total.toFixed(0)}
                </p>

              </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-2">

              <span className="font-semibold">
                View Cart
              </span>

              <ArrowRight size={20} />

            </div>

          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}