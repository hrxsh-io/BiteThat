import { motion } from "framer-motion";
import {
  Star,
  Clock3,
  MapPin,
  TicketPercent,
} from "lucide-react";

import heroFood from "../../../../assets/panipuri.png";

export default function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative hidden lg:flex items-center justify-center"
    >
      {/* Background Glow */}
      <div className="absolute h-[460px] w-[460px] rounded-full bg-violet-300/20 blur-3xl" />

      {/* Main Food Image */}
      <motion.img
        src={heroFood}
        alt="Food"
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-[420px] drop-shadow-[0_35px_45px_rgba(0,0,0,0.18)]"
      />

      {/* Rating Card */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{
          y: [0, -8, 0],
          scale: 1,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute left-0 top-16 z-20 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
          <span className="font-bold text-slate-900">
            4.9 Rating
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Loved by foodies
        </p>
      </motion.div>

      {/* Delivery Card */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute right-0 top-24 z-20 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <Clock3
            size={18}
            className="text-violet-600"
          />

          <span className="font-bold">
            25 mins
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Fast Delivery
        </p>
      </motion.div>

      {/* Offer Card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
        }}
        className="absolute bottom-8 left-10 z-20 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <TicketPercent
            size={18}
            className="text-green-600"
          />

          <span className="font-bold">
            50% OFF
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          First Order
        </p>
      </motion.div>

      {/* Location Card */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
        }}
        className="absolute bottom-12 right-8 z-20 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <MapPin
            size={18}
            className="text-red-500"
          />

          <span className="font-bold">
            Pune
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          500+ Restaurants
        </p>
      </motion.div>

      {/* Floating Food Icons */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute top-4 left-36 text-4xl"
      >
        🍕
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute bottom-0 right-32 text-4xl"
      >
        🍔
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
        }}
        className="absolute top-44 right-6 text-4xl"
      >
        🥗
      </motion.div>
    </motion.div>
  );
}