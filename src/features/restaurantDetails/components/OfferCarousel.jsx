import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Percent,
  Truck,
  Coins,
  Gift,
  Sparkles,
} from "lucide-react";

/* ==========================================
      OFFERS
========================================== */

const offers = [
  {
    id: 1,
    title: "40% OFF",
    subtitle: "Up to ₹120",
    code: "BITE40",
    icon: Percent,
    bg: "bg-violet-100",
    color: "text-violet-700",
  },

  {
    id: 2,
    title: "Free Delivery",
    subtitle: "Above ₹299",
    code: "AUTO",
    icon: Truck,
    bg: "bg-emerald-100",
    color: "text-emerald-700",
  },

  {
    id: 3,
    title: "5× BiteCoins",
    subtitle: "Weekend Reward",
    code: "BONUS",
    icon: Coins,
    bg: "bg-amber-100",
    color: "text-amber-700",
  },

  {
    id: 4,
    title: "Buy 1 Get 1",
    subtitle: "Selected Burgers",
    code: "BOGO",
    icon: Gift,
    bg: "bg-pink-100",
    color: "text-pink-700",
  },
];

/* ==========================================
      COMPONENT
========================================== */

export default function OfferCarousel() {
  const sliderRef = useRef(null);

  /* ==========================================
      SCROLL
  ========================================== */

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  /* ==========================================
      JSX
  ========================================== */

  return (
    <section
      className="
        relative
    overflow-hidden
    pt-0
    pb-0
      "
    >
      {/* ==========================
            SUBTLE BACKGROUND
      ========================== */}

      <div className="absolute inset-0">

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-56
            w-56
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-violet-500/5
            blur-[70px]
          "
        />

      </div>
<div className="relative mx-auto max-w-7xl px-8 lg:px-10">
      

        {/* ==========================
              HEADER
        ========================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            mb-5
            flex
            items-end
            justify-between
          "
        >

          <div>

            <div
              className="
                mb-2
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-violet-100
                px-3
                py-1.5
              "
            >
              <Sparkles
                size={14}
                className="text-violet-600"
              />

              <span className="text-xs font-semibold text-violet-700">
                Offers & Benefits
              </span>

            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Save More Today
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Exclusive restaurant offers and BiteCoins rewards.
            </p>

          </div>

        </motion.div>

        {/* ---------- PART 2 STARTS HERE ---------- */}
                {/* =====================================
              OFFER CHIPS
        ====================================== */}

        <div
          ref={sliderRef}
          className="
            flex
            gap-4
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            pb-2
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >

          {offers.map((offer) => {
            const Icon = offer.icon;

            return (
              <motion.div
                key={offer.id}
                whileHover={{
                  y: -2,
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  flex-shrink-0
                  snap-start
                "
              >
                <div
                  className="
                    flex
                    min-w-[250px]
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-violet-100
                    bg-white
                    px-4
                    py-3
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-violet-200
                    hover:shadow-md
                  "
                >

                  {/* Icon */}

                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      ${offer.bg}
                    `}
                  >
                    <Icon
                      size={20}
                      className={offer.color}
                    />
                  </div>

                  {/* Offer */}

                  <div className="flex-1">

                    <h3 className="text-sm font-bold text-gray-900">
                      {offer.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {offer.subtitle}
                    </p>

                  </div>

                  {/* Coupon */}

                  <div
                    className="
                      rounded-full
                      border
                      border-dashed
                      border-violet-300
                      bg-violet-50
                      px-3
                      py-1
                    "
                  >
                    <span className="text-xs font-bold tracking-wide text-violet-700">
                      {offer.code}
                    </span>
                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}