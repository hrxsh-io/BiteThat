import { motion } from "framer-motion";

const tabs = [
  {
    id: "current",
    label: "Current Orders",
  },
  {
    id: "past",
    label: "Past Orders",
  },
  {
    id: "cancelled",
    label: "Cancelled",
  },
];

export default function Tabs({
  activeTab,
  setActiveTab,
  counts = {
    current: 0,
    past: 0,
    cancelled: 0,
  },
}) {
  return (
    <div className="mt-10 flex justify-center">
      <div className="relative flex rounded-full bg-white p-2 shadow-lg ring-1 ring-violet-100">

        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative z-10 px-6 py-3"
            >
              {active && (
                <motion.div
                  layoutId="orders-pill"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg"
                />
              )}

              <div className="relative flex items-center gap-2">

                <span
                  className={`text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {tab.label}
                </span>

                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold transition-all duration-300 ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-violet-100 text-violet-700"
                  }`}
                >
                  {counts[tab.id]}
                </span>

              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}