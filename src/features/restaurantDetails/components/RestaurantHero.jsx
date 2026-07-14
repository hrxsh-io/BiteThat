import { motion } from "framer-motion";
import {
    ArrowRight,
    Bot,
    ChevronDown,
    ChevronRight,
    Clock3,
    Heart,
    IndianRupee,
    MapPin,
    MapPinned,
    Share2,
    ShieldCheck,
    Sparkles,
    Star,
    Store,
    TrendingUp,
    Users,
} from "lucide-react";

/* ==================================================
   ANIMATION VARIANTS
================================================== */

const container = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: "easeOut",
        },
    },
};

const heroImage = {
    hidden: {
        opacity: 0,
        scale: 1.15,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1.2,
            ease: "easeOut",
        },
    },
};

export default function RestaurantHero({
    restaurant,
    favorite,
    onFavorite,
}) {
    return (
        <section className="relative isolate min-h-[90vh] overflow-hidden">

            {/* =====================================
            BACKGROUND IMAGE
      ====================================== */}

            <motion.div
                variants={heroImage}
                initial="hidden"
                animate="visible"
                className="absolute inset-0"
            >
                <img
                    src={restaurant.coverImage}
                    alt={restaurant.name}
                    className="
            h-full
            w-full
            object-cover
            scale-110
          "
                />
            </motion.div>

            {/* =====================================
              OVERLAY
      ====================================== */}

            <div
                className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#050505]/90
          via-[#111111]/60
          to-violet-950/80
        "
            />

            {/* =====================================
            MESH GLOW
      ====================================== */}

            <motion.div
                animate={{
                    x: [0, 40, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
          absolute
          -left-40
          top-0
          h-[550px]
          w-[550px]
          rounded-full
          bg-violet-600/30
          blur-[160px]
        "
            />

            <motion.div
                animate={{
                    x: [0, -60, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
          absolute
          right-0
          bottom-0
          h-[520px]
          w-[520px]
          rounded-full
          bg-fuchsia-500/20
          blur-[170px]
        "
            />

            {/* =====================================
            AMBIENT LIGHTS
      ====================================== */}

            <motion.div
                animate={{
                    y: [0, -18, 0],
                    scale: [1, 1.08, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                }}
                className="
          absolute
          top-28
          left-1/4
          hidden
          lg:block
        "
            >
                <Sparkles
                    size={28}
                    className="text-violet-300"
                />
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, 180],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                }}
                className="
          absolute
          right-1/3
          top-48
          hidden
          lg:block
        "
            >
                <Sparkles
                    size={18}
                    className="text-fuchsia-300"
                />
            </motion.div>

            {/* =====================================
            CONTENT CONTAINER
      ====================================== */}

            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="
          relative
    z-20
    mx-auto
    flex
    min-h-[90vh]
    max-w-7xl
    items-end
    px-6
    pt-10
    pb-16
    lg:px-8
        "
            >

                <div className="w-full">

                    {/* =====================================
                BREADCRUMB
          ====================================== */}

                    <motion.div
                        variants={fadeUp}
                        className="
              mb-6
              flex
              flex-wrap
              items-center
              gap-2
              text-sm
              text-white/80
            "
                    >
                        <span>Home</span>

                        <ChevronRight size={15} />

                        <span>Restaurants</span>

                        <ChevronRight size={15} />

                        <span className="font-semibold text-white">
                            {restaurant.name}
                        </span>
                    </motion.div>

                    {/* =====================================
                RESTAURANT LOGO
          ====================================== */}

                    <motion.div
                        variants={fadeUp}
                        whileHover={{
                            rotate: -4,
                            scale: 1.05,
                        }}
                        className="
              mb-6
              flex
              h-24
              w-24
              items-center
              justify-center
              overflow-hidden
              rounded-[30px]
              border
              border-white/20
              bg-white/15
              shadow-2xl
              backdrop-blur-3xl
            "
                    >
                        {restaurant.logo ? (
                            <img
                                src={restaurant.logo}
                                alt={restaurant.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <Store
                                size={42}
                                className="text-white"
                            />
                        )}
                    </motion.div>

                    {/* =====================================
                LIVE STATUS
          ====================================== */}

                    <motion.div
                        variants={fadeUp}
                        className="
              mb-8
              flex
              flex-wrap
              gap-3
            "
                    >
                        <div className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">
                            <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                            Open Now
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl">
                            <Users size={16} />
                            42 people ordering now
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/20 px-4 py-2 text-sm font-semibold text-violet-100 backdrop-blur-xl">
                            <Bot size={16} />
                            BiteAI Match 98%
                        </div>
                    </motion.div>

                    {/* ---------- PART 2 STARTS HERE ---------- */}
                    {/* =====================================
      PREMIUM GLASS CARD
===================================== */}

                    <motion.div
                        variants={fadeUp}
                        className="
    relative
    w-full
    max-w-3xl
    overflow-hidden
    rounded-[40px]
    border
    border-white/15
    bg-white/10
    p-8
    text-white
    shadow-[0_35px_90px_rgba(0,0,0,0.35)]
    backdrop-blur-3xl
    lg:p-10
  "
                    >

                        {/* ==============================
        Decorative Glow
  =============================== */}

                        <div
                            className="
      absolute
      -right-20
      -top-20
      h-72
      w-72
      rounded-full
      bg-violet-500/20
      blur-[120px]
    "
                        />

                        <div
                            className="
      absolute
      -left-16
      bottom-0
      h-56
      w-56
      rounded-full
      bg-fuchsia-500/15
      blur-[110px]
    "
                        />

                        <div
                            className="
      absolute
      inset-0
      bg-gradient-to-br
      from-white/5
      to-transparent
    "
                        />

                        {/* ==============================
        CONTENT
  =============================== */}

                        <div className="relative z-10">

                            {/* ==============================
          TOP BADGES
    =============================== */}

                            <motion.div
                                variants={fadeUp}
                                className="
        mb-6
        flex
        flex-wrap
        items-center
        gap-3
      "
                            >

                                {/* BiteAI */}

                                <motion.div
                                    whileHover={{
                                        scale: 1.05,
                                        y: -2,
                                    }}
                                    className="
          flex
          items-center
          gap-2
          rounded-full
          border
          border-violet-400/30
          bg-violet-600/20
          px-4
          py-2
          backdrop-blur-xl
        "
                                >
                                    <Bot
                                        size={16}
                                        className="text-violet-200"
                                    />

                                    <span className="text-sm font-semibold">
                                        BiteAI Recommended
                                    </span>
                                </motion.div>

                                {/* BiteCoins */}

                                <motion.div
                                    whileHover={{
                                        scale: 1.05,
                                        rotate: -2,
                                    }}
                                    className="
          rounded-full
          bg-gradient-to-r
          from-yellow-300
          via-yellow-400
          to-orange-400
          px-5
          py-2
          text-sm
          font-bold
          text-black
          shadow-lg
        "
                                >
                                    🪙 Earn 45 BiteCoins
                                </motion.div>

                            </motion.div>

                            {/* ==============================
          RESTAURANT NAME
    =============================== */}

                            <motion.h1
                                variants={fadeUp}
                                className="
        text-5xl
        font-black
        leading-tight
        tracking-tight
        md:text-6xl
      "
                            >
                                {restaurant.name}
                            </motion.h1>

                            {/* Cuisine */}

                            <motion.p
                                variants={fadeUp}
                                className="
        mt-2
        text-lg
        font-medium
        text-violet-200
      "
                            >
                                {restaurant.cuisine}
                            </motion.p>

                            {/* Description */}

                            <motion.p
                                variants={fadeUp}
                                className="
        mt-5
        max-w-2xl
        text-lg
        leading-8
        text-white/80
      "
                            >
                                {restaurant.description}
                            </motion.p>

                            {/* ---------- PART 2B STARTS HERE ---------- */}
                            {/* ==============================
          INFORMATION CARDS
    =============================== */}

                            <motion.div
                                variants={fadeUp}
                                className="mt-8 flex flex-wrap gap-4"
                            >

                                {/* Rating */}

                                <motion.div
                                    whileHover={{
                                        y: -5,
                                        scale: 1.03,
                                    }}
                                    className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/15
          bg-white/10
          px-5
          py-4
          backdrop-blur-xl
        "
                                >
                                    <div className="rounded-xl bg-yellow-400/20 p-3">
                                        <Star
                                            size={22}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-lg font-bold">
                                            {restaurant.rating}
                                        </p>

                                        <p className="text-xs text-white/60">
                                            {restaurant.reviews} Reviews
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Cuisine */}

                                <motion.div
                                    whileHover={{
                                        y: -5,
                                        scale: 1.03,
                                    }}
                                    className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/15
          bg-white/10
          px-5
          py-4
          backdrop-blur-xl
        "
                                >
                                    <div className="rounded-xl bg-violet-500/20 p-3">
                                        <MapPin
                                            size={20}
                                            className="text-violet-200"
                                        />
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            Cuisine
                                        </p>

                                        <p className="text-xs text-white/60">
                                            {restaurant.cuisine}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Delivery */}

                                <motion.div
                                    whileHover={{
                                        y: -5,
                                        scale: 1.03,
                                    }}
                                    className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/15
          bg-white/10
          px-5
          py-4
          backdrop-blur-xl
        "
                                >
                                    <div className="rounded-xl bg-emerald-500/20 p-3">
                                        <Clock3
                                            size={20}
                                            className="text-emerald-300"
                                        />
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            Delivery
                                        </p>

                                        <p className="text-xs text-white/60">
                                            {restaurant.deliveryTime}
                                        </p>
                                    </div>
                                </motion.div>

                            </motion.div>

                            {/* ==============================
          PREMIUM METRICS
    =============================== */}

                            <motion.div
                                variants={fadeUp}
                                className="
        mt-10
        grid
        grid-cols-2
        gap-4
        lg:grid-cols-4
      "
                            >

                                {/* Cost */}

                                <motion.div
                                    whileHover={{
                                        y: -6,
                                    }}
                                    className="
          rounded-3xl
          border
          border-white/15
          bg-white/10
          p-5
          backdrop-blur-xl
        "
                                >
                                    <p className="text-xs uppercase tracking-widest text-white/60">
                                        Cost
                                    </p>

                                    <div className="mt-3 flex items-center gap-2">
                                        <IndianRupee size={18} />

                                        <span className="text-2xl font-bold">
                                            {restaurant.priceForTwo}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-xs text-white/60">
                                        For Two
                                    </p>
                                </motion.div>

                                {/* Distance */}

                                <motion.div
                                    whileHover={{
                                        y: -6,
                                    }}
                                    className="
          rounded-3xl
          border
          border-white/15
          bg-white/10
          p-5
          backdrop-blur-xl
        "
                                >
                                    <p className="text-xs uppercase tracking-widest text-white/60">
                                        Distance
                                    </p>

                                    <div className="mt-3 flex items-center gap-2">
                                        <MapPinned size={18} />

                                        <span className="text-2xl font-bold">
                                            {restaurant.distance}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-xs text-white/60">
                                        From You
                                    </p>
                                </motion.div>

                                {/* Rewards */}

                                <motion.div
                                    whileHover={{
                                        y: -6,
                                    }}
                                    className="
          rounded-3xl
          border
          border-yellow-400/30
          bg-gradient-to-br
          from-yellow-400/20
          to-orange-500/10
          p-5
          backdrop-blur-xl
        "
                                >
                                    <p className="text-xs uppercase tracking-widest text-yellow-100">
                                        Rewards
                                    </p>

                                    <p className="mt-3 text-3xl font-black">
                                        +45
                                    </p>

                                    <p className="text-sm text-yellow-100">
                                        BiteCoins
                                    </p>
                                </motion.div>

                                {/* ETA */}

                                <motion.div
                                    whileHover={{
                                        y: -6,
                                    }}
                                    className="
          rounded-3xl
          border
          border-emerald-400/20
          bg-emerald-500/10
          p-5
          backdrop-blur-xl
        "
                                >
                                    <p className="text-xs uppercase tracking-widest text-emerald-100">
                                        ETA
                                    </p>

                                    <p className="mt-3 text-3xl font-black">
                                        20
                                    </p>

                                    <p className="text-sm text-emerald-100">
                                        Minutes
                                    </p>
                                </motion.div>

                            </motion.div>

                        </div>

                    </motion.div>

                    {/* ---------- PART 3 STARTS HERE ---------- */}
                    {/* =====================================
      ACTION BUTTONS
===================================== */}

                    <motion.div
                        variants={fadeUp}
                        className="mt-10 flex flex-wrap items-center gap-4"
                    >

                        {/* ===========================
        ORDER NOW
  ============================ */}

                        <motion.button
                            whileHover={{
                                scale: 1.04,
                                y: -3,
                                boxShadow:
                                    "0 20px 45px rgba(124,58,237,.45)",
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            className="
      relative
      overflow-hidden
      rounded-2xl
      bg-gradient-to-r
      from-violet-600
      via-fuchsia-600
      to-violet-700
      px-8
      py-4
      font-semibold
      text-white
      shadow-2xl
    "
                        >

                            {/* Shine */}

                            <motion.span
                                animate={{
                                    x: ["-140%", "240%"],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="
        absolute
        inset-y-0
        left-0
        w-20
        rotate-12
        bg-white/30
        blur-lg
      "
                            />

                            <span className="relative flex items-center gap-3">
                                Order Now

                                <ArrowRight
                                    size={18}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </span>

                        </motion.button>

                        {/* ===========================
        VIEW MENU
  ============================ */}

                        <motion.button
                            whileHover={{
                                y: -3,
                                scale: 1.03,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            className="
      rounded-2xl
      border
      border-white/20
      bg-white/10
      px-8
      py-4
      font-semibold
      text-white
      backdrop-blur-2xl
      transition-all
      hover:bg-white/15
    "
                        >
                            Browse Menu
                        </motion.button>

                        {/* ===========================
        FAVORITE
  ============================ */}

                        <motion.button
                            whileHover={{
                                rotate: -10,
                                scale: 1.08,
                            }}
                            whileTap={{
                                scale: 0.9,
                            }}
                            onClick={onFavorite}
                            className="
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-2xl
      border
      border-white/20
      bg-white/10
      backdrop-blur-xl
    "
                        >
                            <Heart
                                size={22}
                                className={`transition-all duration-300 ${favorite
                                    ? "fill-red-500 text-red-500 scale-110"
                                    : "text-white"
                                    }`}
                            />
                        </motion.button>

                        {/* ===========================
        SHARE
  ============================ */}

                        <motion.button
                            whileHover={{
                                rotate: 10,
                                scale: 1.08,
                            }}
                            whileTap={{
                                scale: 0.92,
                            }}
                            className="
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-2xl
      border
      border-white/20
      bg-white/10
      backdrop-blur-xl
    "
                        >
                            <Share2 size={20} />
                        </motion.button>

                    </motion.div>

                    {/* =====================================
      QUICK FEATURES
===================================== */}

                    <motion.div
                        variants={fadeUp}
                        className="
    mt-8
    flex
    flex-wrap
    gap-3
  "
                    >

                        <div
                            className="
      rounded-full
      border
      border-emerald-400/20
      bg-emerald-500/10
      px-4
      py-2
      text-sm
      text-emerald-100
    "
                        >
                            ✓ Free Delivery Above ₹299
                        </div>

                        <div
                            className="
      rounded-full
      border
      border-violet-400/20
      bg-violet-500/10
      px-4
      py-2
      text-sm
      text-violet-100
    "
                        >
                            ⚡ Instant Confirmation
                        </div>

                        <div
                            className="
      rounded-full
      border
      border-yellow-400/20
      bg-yellow-400/10
      px-4
      py-2
      text-sm
      text-yellow-100
    "
                        >
                            🏆 Top 10 Restaurant
                        </div>

                    </motion.div>

                    {/* ---------- PART 4 STARTS HERE ---------- */}
                    
                    {/* =====================================
      AMBIENT PARTICLES
===================================== */}

                    <motion.div
                        animate={{
                            y: [0, -18, 0],
                            rotate: [0, 180],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                        }}
                        className="
    absolute
    left-1/4
    top-24
    hidden
    lg:block
  "
                    >
                        <Sparkles
                            size={28}
                            className="text-violet-300"
                        />
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            rotate: [180, 0],
                        }}
                        transition={{
                            duration: 9,
                            repeat: Infinity,
                        }}
                        className="
    absolute
    right-1/3
    top-44
    hidden
    lg:block
  "
                    >
                        <Sparkles
                            size={18}
                            className="text-fuchsia-300"
                        />
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                        }}
                        className="
    absolute
    right-1/4
    bottom-28
    hidden
    xl:block
    h-5
    w-5
    rounded-full
    bg-violet-500
    blur-md
  "
                    />

                    <motion.div
                        animate={{
                            y: [0, 14, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                        }}
                        className="
    absolute
    left-16
    bottom-40
    hidden
    xl:block
    h-7
    w-7
    rounded-full
    bg-fuchsia-500/60
    blur-lg
  "
                    />

                    {/* ---------- PART 4B STARTS HERE ---------- */}
                    {/* =====================================
      SCROLL INDICATOR
===================================== */}

                    <motion.div
                        animate={{
                            y: [0, 12, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
    absolute
    bottom-8
    left-1/2
    flex
    -translate-x-1/2
    flex-col
    items-center
    text-white/80
  "
                    >
                        <p
                            className="
      mb-3
      text-xs
      font-medium
      uppercase
      tracking-[0.35em]
    "
                        >
                            Scroll to Explore
                        </p>

                        <div
                            className="
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-full
      border
      border-white/20
      bg-white/10
      backdrop-blur-2xl
    "
                        >
                            <ChevronDown size={22} />
                        </div>
                    </motion.div>

                </div>

            </motion.div>

        </section >
    );
}