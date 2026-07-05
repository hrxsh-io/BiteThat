import "./Hero.css";
import heroBurger from "../../../assets/heroburger.png";
// import burger from "../../assets/burger.png";
// import pizza from "../../assets/pizza.png";
// import fries from "../../assets/fries.png";
// import drink from "../../assets/drink.png";

import { Truck } from "lucide-react";

import { motion } from "framer-motion";

import {
  Search,
  MapPin,
  ArrowRight,
  Star,
  Clock3,
  Store,
  Users,
  TicketPercent,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#faf7ff]">

      {/* ================= BACKGROUND ================= */}

      {/* Purple Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#faf5ff] to-[#efe7ff]" />

      {/* Large Glow */}
      <div className="absolute top-0 right-0 h-[700px] w-[700px] rounded-full bg-violet-400/20 blur-[170px]" />

      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-fuchsia-300/20 blur-[150px]" />

      {/* Grid */}
      <div className="hero-grid absolute inset-0 opacity-30" />



      {/* =============== ANIMATED BLOBS =============== */}

      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute top-20 left-20 h-44 w-44 rounded-full bg-violet-300/30 blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute right-40 top-56 h-60 w-60 rounded-full bg-pink-300/20 blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
        className="absolute bottom-16 left-1/2 h-52 w-52 rounded-full bg-purple-300/20 blur-[110px]"
      />



      {/* ===================== MAIN ===================== */}

      <div
        className="
  relative
  z-10
  mx-auto
  flex
  flex-col-reverse
  lg:flex-row
  items-center
  justify-between
  min-h-screen
  max-w-7xl
  px-6
  pt-28
  pb-16
  lg:pt-0
  lg:pb-0
  lg:px-12
"
      >

        {/* LEFT */}

        <div
          className="
w-full
lg:w-[46%]
text-center
lg:text-left
mt-12
lg:mt-0
"
        >

          {/* Tag */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-5 py-2"
          >
            <span className="h-2 w-2 rounded-full bg-violet-600 animate-pulse" />

            <p className="text-sm font-semibold uppercase tracking-[4px] text-violet-700">
              Chef's Special
            </p>
          </motion.div>



          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
            className="
mx-auto
lg:mx-0
max-w-xl
text-4xl
sm:text-5xl
md:text-6xl
lg:text-7xl
font-black
leading-tight
text-[#17112d]
"
          >
            Freshness
            <br />

            <span className="text-violet-600">
              in every bite.
            </span>
          </motion.h1>



          {/* Description */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .3 }}
            className="
mx-auto
lg:mx-0
mt-6
max-w-lg
text-base
sm:text-lg
lg:text-xl
leading-8
text-gray-600
"
          >
            Order delicious meals from the best restaurants around you.
            Lightning-fast delivery, exclusive offers, and unforgettable
            flavors—all in one place.
          </motion.p>



          {/* ================= LOCATION BAR ================= */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="
mt-8
w-full
sm:max-w-lg
lg:max-w-md
mx-auto
lg:mx-0
"
          >
            <div className="relative rounded-2xl bg-white p-2 shadow-xl shadow-violet-200/30">

              <div className="flex flex-col sm:flex-row items-center gap-3">

                {/* Icon */}

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">

                  <MapPin
                    className="text-violet-600"
                    size={20}
                  />

                </div>

                {/* Input */}

                <div className="flex-1">

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Delivering to
                  </p>

                  <input
                    type="text"
                    placeholder="Enter your location..."
                    className="mt-0.5 w-full bg-transparent text-base font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                  />

                </div>

                {/* Button */}

                <button className="
w-full
sm:w-auto
rounded-xl
bg-gradient-to-r
from-violet-600
to-purple-500
px-6
py-3
text-sm
font-semibold
text-white
transition-all
duration-300
hover:scale-105
">

                  Find Food

                </button>

              </div>

            </div>

          </motion.div>



          {/* ================= CTA ================= */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .6 }}
            className="
mt-10
flex
flex-col
sm:flex-row
justify-center
lg:justify-start
gap-4
"
          >

            <button className="w-full
sm:w-auto group flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl">

              Browse Restaurants

              <ArrowRight
                className="transition-transform group-hover:translate-x-1"
                size={20}
              />

            </button>



            <button
              onClick={() =>
                document
                  .getElementById("offers")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full
sm:w-auto group flex items-center gap-3 rounded-full border-2 border-violet-500 bg-white px-8 py-4 font-semibold text-violet-700 transition-all duration-300 hover:scale-105 hover:bg-violet-600 hover:text-white"
            >
              <TicketPercent
                size={20}
                className="transition-transform duration-300 group-hover:rotate-12"
              />

              View Offers

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

          </motion.div>



          {/* ================= TRUST ================= */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 grid gap-3 grid-cols-2
md:grid-cols-4"
          >
            {/* Rating */}

            <motion.div
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-violet-100 bg-white/75 p-4 backdrop-blur-xl shadow-md"
            >
              <Star
                size={20}
                className="mb-2 text-yellow-500"
                fill="currentColor"
              />

              <h2 className="text-xl font-bold text-gray-900">
                4.8
              </h2>

              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                Rating
              </p>
            </motion.div>

            {/* Restaurants */}

            <motion.div
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-violet-100 bg-white/75 p-4 backdrop-blur-xl shadow-md"
            >
              <Store
                size={20}
                className="mb-2 text-violet-600"
              />

              <h2 className="text-xl font-bold text-gray-900">
                500+
              </h2>

              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                Restaurants
              </p>
            </motion.div>

            {/* Delivery */}

            <motion.div
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-violet-100 bg-white/75 p-4 backdrop-blur-xl shadow-md"
            >
              <Clock3
                size={20}
                className="mb-2 text-green-500"
              />

              <h2 className="text-xl font-bold text-gray-900">
                20 min
              </h2>

              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                Delivery
              </p>
            </motion.div>

            {/* Happy Foodies */}

            <motion.div
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-violet-100 bg-white/75 p-4 backdrop-blur-xl shadow-md"
            >
              <Users
                size={20}
                className="mb-2 text-pink-500"
              />

              <h2 className="text-xl font-bold text-gray-900">
                50K+
              </h2>

              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                Happy Foodies
              </p>
            </motion.div>
          </motion.div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="relative flex w-full
lg:w-[54%] items-center justify-center">

          {/* Background Glow */}

          <div
            className="
  absolute
  h-[420px]
  w-[420px]
  rounded-full
  bg-violet-400/20
  blur-[100px]
  "
          />
          {/* Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[620px] w-[620px] rounded-full border border-violet-300/30"
          />

          {/* Decorative Circle */}
          <div className="absolute h-[500px] w-[500px] rounded-full border border-violet-100 opacity-60" />



          {/* Main Food Image */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -18, 0],
              rotate: [0, 1.5, -1.5, 0]
            }}
            transition={{
              duration: 1,
              y: {
                repeat: Infinity,
                duration: 4,
              },
            }}
            className="
relative
z-20
flex
items-center
justify-center
h-[580px]
w-[580px]
rounded-full
bg-white/30
backdrop-blur-xl
border
border-white/40
"
          >
            <img
              src={heroBurger}
              alt="Burger"
              className="w-[260px]
sm:w-[360px]
md:w-[440px]
lg:w-[600px]
drop-shadow-[0_45px_80px_rgba(0,0,0,.28)]"
            />
          </motion.div>

          {/* Delivery Card */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="absolute left-10 bottom-24 z-30 hidden md:block"
          >
            <div className="glass rounded-[30px] px-6 py-5 shadow-2xl">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600">

                  <Truck
                    size={28}
                    className="text-white"
                  />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Delivery in
                  </p>

                  <h3 className="text-2xl font-black text-violet-700">
                    20 mins
                  </h3>

                  <p className="text-sm text-gray-500">
                    Rider on the way 🚀
                  </p>

                </div>

              </div>

            </div>
          </motion.div>

          {/* ================= CUSTOMER REVIEW ================= */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute top-6 right-0 z-30 hidden lg:block"
          >
            <div className="glass w-[340px] rounded-[30px] p-6 shadow-2xl">

              <div className="flex items-center gap-4">

                <img
                  src="https://i.pravatar.cc/100?img=32"
                  alt="Customer"
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>

                  <h3 className="font-bold text-gray-800">
                    Sarah Johnson
                  </h3>

                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    ⭐⭐⭐⭐⭐
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Verified Customer
                  </p>

                </div>

              </div>

              <p className="mt-5 text-[15px] leading-7 text-gray-600">
                “Food arrived hot, fresh and exactly on time.
                The app is beautiful and ordering was incredibly easy.”
              </p>

            </div>

          </motion.div>



          {/* ================= LIVE ORDER ================= */}

          <motion.div
            animate={{
              x: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="absolute bottom-8 right-14 z-30 hidden md:block"
          >

            <div className="glass rounded-[26px] px-6 py-5 shadow-2xl">

              <div className="flex items-center gap-4">

                <div className="relative">

                  <div className="h-4 w-4 rounded-full bg-green-500"></div>

                  <span className="absolute inset-0 animate-ping rounded-full bg-green-500"></span>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Live Order
                  </p>

                  <h3 className="font-bold text-gray-800">
                    🍔 Burger is being prepared
                  </h3>

                  <div className="mt-3 h-2 w-52 overflow-hidden rounded-full bg-violet-100">

                    <motion.div
                      animate={{
                        width: ["20%", "85%", "20%"],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                    />

                  </div>

                </div>

              </div>

            </div>

          </motion.div>



          {/* ================= FLOATING DOTS ================= */}

          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="hidden lg:block absolute top-16 left-10 h-5 w-5 rounded-full bg-gradient-to-r
from-violet-500
to-pink-500"
          />

          <motion.div
            animate={{
              y: [0, 18, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
            }}
            className="hidden lg:blockabsolute bottom-24 right-24 h-4 w-4 rounded-full bg-pink-400"
          />

          <motion.div
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="hidden lg:block absolute top-1/2 left-8 h-3 w-3 rounded-full bg-violet-300"
          />

          <motion.div
            animate={{
              scale: [1, 1.4, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="hidden lg:block absolute top-20 right-24 h-3 w-3 rounded-full bg-fuchsia-300"
          />

        </div>

      </div>

      {/* ================= SCROLL INDICATOR ================= */}

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex-col items-center"
      >

        <p className="mb-3 text-sm tracking-[3px] uppercase text-violet-700 font-semibold">
          Scroll
        </p>

        <div className="flex h-14 w-8 justify-center rounded-full border-2 border-violet-500">

          <motion.div
            animate={{
              y: [0, 18, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="mt-2 h-3 w-3 rounded-full bg-violet-600"
          />

        </div>

      </motion.div>

    </section>
  );
};

export default Hero;