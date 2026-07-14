import { motion } from "framer-motion";
import {
  ShoppingCart,
  CreditCard,
  Bike,
  CheckCircle2,
  Package,
  Clock3,
  IndianRupee,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Cart",
    subtitle: "5 Items",
    icon: ShoppingCart,
    status: "completed",
  },
  {
    id: 2,
    title: "Payment",
    subtitle: "Current",
    icon: CreditCard,
    status: "current",
  },
  {
    id: 3,
    title: "Delivery",
    subtitle: "22 mins",
    icon: Bike,
    status: "upcoming",
  },
];

export default function CartProgress() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-[34px] border border-violet-100 bg-white/80 shadow-xl backdrop-blur-xl"
    >
      

      {/* Progress */}

      <div className="relative flex items-center justify-between px-12 py-10">

        {steps.map((step, index) => {

          const Icon = step.icon;

          return (

            <div
              key={step.id}
              className="relative z-10 flex flex-1 flex-col items-center"
            >

              {/* Line */}

              {index !== steps.length - 1 && (

                <div className="absolute left-[58%] top-8 hidden h-[3px] w-full lg:block">

                  <div className="h-full rounded-full bg-gray-200">

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          step.status === "completed"
                            ? "100%"
                            : "0%",
                      }}
                      transition={{
                        duration: .7,
                        delay: index * .25,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
                    />

                  </div>

                </div>

              )}

              {/* Circle */}

              <motion.div
                whileHover={{
                  scale: 1.08,
                }}
                className={`
                relative
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl

                ${
                  step.status === "completed"
                    ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-xl"
                    : step.status === "current"
                    ? "border-2 border-violet-600 bg-violet-50 text-violet-600"
                    : "border border-gray-200 bg-white text-gray-400"
                }
                `}
              >

                {step.status === "completed" ? (
                  <CheckCircle2 size={30} />
                ) : (
                  <Icon size={28} />
                )}

              </motion.div>

              {/* Text */}

              <div className="mt-4 text-center">

                <h3 className="font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p
                  className={`
                  mt-1 text-sm

                  ${
                    step.status === "completed"
                      ? "text-green-500"
                      : step.status === "current"
                      ? "text-violet-600"
                      : "text-gray-400"
                  }
                  `}
                >
                  {step.subtitle}
                </p>

              </div>

            </div>

          );

        })}

      </div>
    </motion.div>
  );
}

function Stat({ icon, title, value }) {
  return (
    <div className="flex items-center justify-center gap-3 py-5">

      <div className="rounded-xl bg-white p-3 text-violet-600 shadow">

        {icon}

      </div>

      <div>

        <p className="text-xs uppercase tracking-wider text-gray-400">
          {title}
        </p>

        <p className="font-bold text-gray-900">
          {value}
        </p>

      </div>

    </div>
  );
}