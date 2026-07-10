import { motion } from "framer-motion";
import {
    Clock3,
    MapPin,
    Phone,
    ShieldCheck,
    Star,
    Bike,
    ChevronRight,
} from "lucide-react";

import OrderTimeline from "./OrderTimeline";

export default function CurrentOrderCard({ order }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 30,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            whileHover={{
                y: -4,
            }}
            transition={{
                duration: 0.4,
            }}
            className="overflow-hidden rounded-[32px] border border-violet-100 bg-white shadow-xl"
        >
            {/* Hero Section */}

            <div className="relative">

                <img
                    src={order.image}
                    alt={order.restaurant}
                    className="h-64 w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Live Badge */}

                <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-lg backdrop-blur">

                    <span className="relative flex h-3 w-3">

                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />

                        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />

                    </span>

                    <span className="text-sm font-semibold">
                        Live Tracking
                    </span>

                </div>

                {/* ETA */}

                <div className="absolute right-6 top-6 rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg">
                    ETA {order.eta}
                </div>

                {/* Restaurant */}

                <div className="absolute bottom-6 left-6">

                    <h2 className="text-3xl font-bold text-white">
                        {order.restaurant}
                    </h2>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-violet-100">

                        <div className="flex items-center gap-1">

                            <Clock3 size={15} />

                            {order.placedAt}

                        </div>

                        <div className="flex items-center gap-1">

                            <Bike size={15} />

                            Order #{order.id}

                        </div>

                    </div>

                </div>

            </div>

            {/* Content */}

            <div className="p-8">

                {/* Order + Rider */}

                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

                    {/* Left */}

                    <div>

                        <div className="mb-6">

                            <h3 className="text-xl font-bold text-gray-900">
                                Your Order
                            </h3>

                            <p className="mt-1 text-gray-500">
                                Freshly prepared and on its way 🚴
                            </p>

                        </div>

                        <div className="space-y-4">

                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl bg-violet-50 px-5 py-4"
                                >

                                    <div>

                                        <h4 className="font-semibold text-gray-900">
                                            {item.name}
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            Qty {item.quantity}
                                        </p>

                                    </div>

                                    <ChevronRight
                                        className="text-violet-400"
                                        size={20}
                                    />

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Rider Card */}

                    <motion.div
                        whileHover={{
                            scale: 1.02,
                        }}
                        className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-6"
                    >

                        <h3 className="mb-6 text-lg font-bold">
                            Delivery Partner
                        </h3>

                        <div className="flex items-center gap-4">

                            <img
                                src={order.rider.avatar}
                                alt={order.rider.name}
                                className="h-20 w-20 rounded-full border-4 border-white shadow-lg"
                            />

                            <div>

                                <h4 className="text-lg font-bold">
                                    {order.rider.name}
                                </h4>

                                <div className="mt-2 flex items-center gap-2">

                                    <Star
                                        size={16}
                                        className="fill-yellow-400 text-yellow-400"
                                    />

                                    <span className="font-semibold">
                                        {order.rider.rating}
                                    </span>

                                </div>

                                <p className="mt-2 text-sm text-gray-500">
                                    {order.rider.vehicle}
                                </p>

                            </div>

                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">

                            <button className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700">

                                <Phone size={18} />

                                Call

                            </button>

                            <button className="flex items-center justify-center gap-2 rounded-2xl border border-violet-200 py-3 font-semibold transition hover:bg-violet-50">

                                <MapPin size={18} />

                                Track

                            </button>

                        </div>

                        <div className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-50 p-4">

                            <ShieldCheck
                                className="text-emerald-600"
                                size={20}
                            />

                            <span className="text-sm font-medium text-emerald-700">
                                Verified Delivery Partner
                            </span>

                        </div>

                    </motion.div>

                </div>

                {/* Timeline */}
                <OrderTimeline
                    timeline={order.timeline}
                    progress={order.progress}
                    eta={order.eta}
                />

                {/* Bottom Actions */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50 via-white to-violet-50 p-6"
                >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        {/* Price */}

                        <div>

                            <p className="text-sm text-gray-500">
                                Order Total
                            </p>

                            <h2 className="mt-1 text-3xl font-bold text-gray-900">
                                ₹{order.total}
                            </h2>

                        </div>

                        {/* Buttons */}

                        <div className="flex flex-wrap gap-4">

                            <motion.button
                                whileHover={{
                                    scale: 1.04,
                                }}
                                whileTap={{
                                    scale: 0.96,
                                }}
                                className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 font-semibold text-white shadow-lg transition"
                            >
                                📍 Track Live
                            </motion.button>

                            <motion.button
                                whileHover={{
                                    scale: 1.04,
                                }}
                                whileTap={{
                                    scale: 0.96,
                                }}
                                className="rounded-2xl border border-violet-200 bg-white px-8 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
                            >
                                💬 Need Help?
                            </motion.button>

                            <motion.button
                                whileHover={{
                                    scale: 1.04,
                                }}
                                whileTap={{
                                    scale: 0.96,
                                }}
                                className="rounded-2xl border border-red-200 bg-red-50 px-8 py-3 font-semibold text-red-600 transition hover:bg-red-100"
                            >
                                ❌ Cancel Order
                            </motion.button>

                        </div>

                    </div>

                </motion.div>

                {/* Bottom Message */}

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.8,
                    }}
                    className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-[1px]"
                >

                    <div className="rounded-[22px] bg-white px-8 py-6">

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            <div>

                                <h3 className="text-xl font-bold text-gray-900">
                                    🍕 Almost there...
                                </h3>

                                <p className="mt-2 text-gray-600">
                                    Your delicious food is just a few minutes away.
                                    Sit back, relax, and we'll notify you once it arrives.
                                </p>

                            </div>

                            <motion.div
                                animate={{
                                    y: [0, -6, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                }}
                                className="text-5xl"
                            >
                                🚴
                            </motion.div>

                        </div>

                    </div>

                </motion.div>

            </div>

        </motion.div>
    );
}