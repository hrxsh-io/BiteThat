import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Tabs from "../features/orders/Tabs";
import StatsCards from "../features/orders/StatsCards";
import CurrentOrderCard from "../features/orders/CurrentOrderCard";
import PastOrderCard from "../features/orders/PastOrderCard";
import CancelledOrderCard from "../features/orders/CancelledOrderCard";
import EmptyState from "../features/orders/EmptyState";

import {
  orders,
  orderStats,
  achievements,
} from "../data/orders";

import {
  Trophy,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export default function Orders() {

  const [activeTab, setActiveTab] = useState("current");

  const currentOrders = useMemo(
    () =>
      orders.filter((order) =>
        [
          "pending",
          "confirmed",
          "preparing",
          "pickedUp",
          "outForDelivery",
        ].includes(order.status)
      ),
    []
  );

  const pastOrders = useMemo(
    () =>
      orders.filter(
        (order) => order.status === "delivered"
      ),
    []
  );

  const cancelledOrders = useMemo(
    () =>
      orders.filter(
        (order) => order.status === "cancelled"
      ),
    []
  );

  return (
    <main className="min-h-screen bg-[#faf8ff]">

      {/* Background */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-300/20 blur-[120px]" />

        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-[120px]" />

      </div>

      <section className="relative mx-auto max-w-7xl px-6 py-14">

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-12"
        >

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2">

                <Sparkles
                  size={16}
                  className="text-violet-600"
                />

                <span className="font-medium text-violet-700">
                  BiteThat Orders
                </span>

              </div>

              <h1 className="mt-5 text-5xl font-black tracking-tight text-gray-900">

                My Orders

              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-500">

                Track your live orders, revisit your favourite meals
                and reorder in seconds.

              </p>

            </div>

            {/* Achievement */}

            <motion.div

              whileHover={{
                scale: 1.03,
              }}

              className="rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-[1px]"
            >

              <div className="rounded-[22px] bg-white p-6">

                <div className="flex items-center gap-5">

                  <div className="rounded-2xl bg-violet-100 p-4">

                    <Trophy
                      className="text-violet-600"
                      size={28}
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-gray-900">
                      Latest Achievement
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">

                      {achievements[0].icon}{" "}
                      {achievements[0].title}

                    </p>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </motion.div>

        {/* Stats */}

        <StatsCards stats={orderStats} />

        {/* Tabs */}

        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={{
            current: currentOrders.length,
            past: pastOrders.length,
            cancelled: cancelledOrders.length,
          }}
        />

        {/* Orders */}

        <AnimatePresence mode="wait">

          <motion.div

            key={activeTab}

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
            }}

            transition={{
              duration: .35,
            }}

            className="mt-12 space-y-8"
          >
                        {/* =========================
                CURRENT ORDERS
            ========================== */}

            {activeTab === "current" && (
              <>
                {currentOrders.length ? (
                  currentOrders.map((order) => (
                    <CurrentOrderCard
                      key={order.id}
                      order={order}
                    />
                  ))
                ) : (
                  <EmptyState
                    title="Nothing Cooking Right Now 🍕"
                    subtitle="Looks like you don't have any active orders. Discover something delicious!"
                    buttonText="Browse Restaurants"
                    buttonLink="/restaurants"
                  />
                )}
              </>
            )}

            {/* =========================
                PAST ORDERS
            ========================== */}

            {activeTab === "past" && (
              <>
                {pastOrders.length ? (
                  <div className="space-y-8">
                    {pastOrders.map((order) => (
                      <PastOrderCard
                        key={order.id}
                        order={order}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No Previous Orders Yet 🍔"
                    subtitle="Once your delicious meals are delivered, they'll appear here."
                    buttonText="Order Food"
                    buttonLink="/restaurants"
                  />
                )}
              </>
            )}

            {/* =========================
                CANCELLED ORDERS
            ========================== */}

            {activeTab === "cancelled" && (
              <>
                {cancelledOrders.length ? (
                  <div className="space-y-8">
                    {cancelledOrders.map((order) => (
                      <CancelledOrderCard
                        key={order.id}
                        order={order}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No Cancelled Orders 🎉"
                    subtitle="Great! None of your recent orders were cancelled."
                    buttonText="Explore Restaurants"
                    buttonLink="/restaurants"
                  />
                )}
              </>
            )}

            {/* =========================
                ACHIEVEMENTS
            ========================== */}

            <motion.section
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
              }}
              className="mt-20"
            >
              <div className="mb-8 flex items-center gap-3">

                <ShoppingBag
                  className="text-violet-600"
                  size={26}
                />

                <h2 className="text-3xl font-bold text-gray-900">
                  Your Food Journey
                </h2>

              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{
                      y: -8,
                    }}
                    className="rounded-3xl border border-violet-100 bg-white p-8 shadow-lg"
                  >
                    <div className="text-5xl">
                      {achievement.icon}
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      {achievement.title}
                    </h3>

                    <p className="mt-3 text-gray-500 leading-7">
                      {achievement.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

                        {/* =========================
                CTA SECTION
            ========================== */}

            <motion.section
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mt-24"
            >
              <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-10 text-white">

                {/* Decorative Blobs */}

                <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

                <div className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

                <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

                  <div className="max-w-2xl">

                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur">

                      <Sparkles size={18} />

                      <span className="font-semibold">
                        Recommended For You
                      </span>

                    </div>

                    <h2 className="mt-6 text-4xl font-black leading-tight">

                      Craving Something New?

                    </h2>

                    <p className="mt-5 text-lg leading-8 text-violet-100">

                      Discover trending restaurants, chef specials,
                      exclusive BiteThat offers and earn more BiteCoins
                      on every order.

                    </p>

                  </div>

                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                    }}
                    className="text-8xl"
                  >
                    🍕
                  </motion.div>

                </div>

                <div className="relative z-10 mt-10 flex flex-wrap gap-5">

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="rounded-2xl bg-white px-8 py-4 font-bold text-violet-700 shadow-xl"
                  >
                    Browse Restaurants
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold backdrop-blur"
                  >
                    View Today's Offers
                  </motion.button>

                </div>

              </div>
            </motion.section>

          </motion.div>

        </AnimatePresence>

      </section>

    </main>

  );
}