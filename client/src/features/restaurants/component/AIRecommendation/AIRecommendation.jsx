import { motion } from "framer-motion";
import { Sparkles, RefreshCcw } from "lucide-react";
import AIRecommendationCard from "./AIRecommendationCard";

export default function AIRecommendation({
  recommendations = [],
  onRefresh,
}) {
  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">

              <Sparkles size={16} />

              Personalized Picks

            </div>

            <h2 className="text-4xl font-bold tracking-tight text-gray-900">

              Curated by Bite AI

            </h2>

            <p className="mt-3 max-w-2xl text-gray-500">

              Restaurants selected especially for you based on your
              preferences, cuisine selection and trending choices.

            </p>

          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-full border border-violet-200 bg-white px-5 py-3 font-medium text-violet-700 shadow-sm transition hover:border-violet-300 hover:shadow-lg"
          >

            <RefreshCcw size={18} />

            Refresh Picks

          </motion.button>

        </div>

        {/* Cards */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="
          grid
          grid-cols-1
          gap-8
          md:grid-cols-2
          xl:grid-cols-4
        "
        >
          {recommendations.map((restaurant) => (
            <motion.div
              key={restaurant.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
            >
              <AIRecommendationCard restaurant={restaurant} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}