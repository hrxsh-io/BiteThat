import "./WhyChooseBiteThat.css";

import { motion } from "framer-motion";

import {
    Sparkles,
    CreditCard,
    MapPinned,
    Coins,
    Users,
    UtensilsCrossed,
} from "lucide-react";

const features = [
    {
        title: "AI Assistant",
        subtitle: "Personalized food recommendations",
        icon: Sparkles,
        color: "purple",
    },
    {
        title: "Secure Payments",
        subtitle: "Fast & protected checkout",
        icon: CreditCard,
        color: "blue",
    },
    {
        title: "Live Tracking",
        subtitle: "Track every order in real-time",
        icon: MapPinned,
        color: "orange",
    },
    {
        title: "BiteCoins",
        subtitle: "Rewards on every purchase",
        icon: Coins,
        color: "green",
    },
    {
        title: "Group Ordering",
        subtitle: "Order together effortlessly",
        icon: Users,
        color: "pink",
    },
    {
        title: "Multi Restaurant Ordering",
        subtitle: "One checkout, many restaurants",
        icon: UtensilsCrossed,
        color: "violet",
    },
];

const stats = [
    {
        number: "500+",
        label: "Restaurants",
    },
    {
        number: "1M+",
        label: "Orders",
    },
    {
        number: "4.9★",
        label: "Rating",
    },
    {
        number: "99%",
        label: "On Time",
    },
];

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const WhyChooseBiteThat = () => {
    return (
        <section className="experience-section">

            <div className="experience-container">

                {/* Heading */}

                <motion.div
                    className="experience-heading"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <span className="h">THE BITETHAT EXPERIENCE</span>

                    <h2>
                        Smarter.
                        <span className="fast"></span>
                        <span className="gradient-text"> Faster.Better.</span>
                    </h2>

                    <p>
                        Premium features designed to make every food order seamless,
                        rewarding and enjoyable.
                    </p>
                </motion.div>

                {/* Features */}

                <motion.div
                    className="features-grid"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{
                        staggerChildren: 0.08,
                    }}
                >
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                variants={fadeUp}
                                key={feature.title}
                                className="feature-card"
                            >
                                <div className={`feature-icon ${feature.color}`}>
                                    <Icon size={24} />
                                </div>

                                <div className="feature-text">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.subtitle}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Stats */}

                <motion.div
                    className="stats-row"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.15,
                    }}
                    variants={fadeUp}
                >
                    {stats.map((item) => (
                        <div
                            className="stat-item"
                            key={item.label}
                        >
                            <h3>{item.number}</h3>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </motion.div>

            </div>

        </section>
    );
};

export default WhyChooseBiteThat;