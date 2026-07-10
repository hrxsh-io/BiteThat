import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Bike,
  House,
} from "lucide-react";

export default function OrderTimeline({
  timeline = [],
  progress = 0,
  eta = "15 mins",
}) {
  return (
    <div className="mt-8">

      {/* ETA */}

      <div className="mb-8 flex items-center justify-between">

        <h3 className="text-lg font-bold text-gray-900">
          Live Order Status
        </h3>

        <div className="flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2">

          <span className="relative flex h-3 w-3">

            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />

            <span className="relative inline-flex h-3 w-3 rounded-full bg-violet-600" />

          </span>

          <span className="font-semibold text-violet-700">
            ETA {eta}
          </span>

        </div>
      </div>

      {/* Timeline */}

      <div className="relative">

        {/* Background */}

        <div className="absolute left-0 top-5 h-2 w-full rounded-full bg-violet-100" />

        {/* Progress */}

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 1.4,
          }}
          className="absolute left-0 top-5 h-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
        />

        {/* Bike */}

        <motion.div
          initial={{ left: 0 }}
          animate={{
            left: `calc(${progress}% - 20px)`,
          }}
          transition={{
            duration: 1.4,
          }}
          className="absolute top-0 z-20"
        >
          <div className="rounded-full bg-white p-2 shadow-xl">

            <Bike
              size={22}
              className="text-violet-600"
            />

          </div>
        </motion.div>

        {/* Steps */}

        <div className="relative flex justify-between pt-12">

          {timeline.map((step, index) => {

            const completed = step.completed;

            return (
              <div
                key={index}
                className="flex w-24 flex-col items-center text-center"
              >

                {completed ? (
                  <CheckCircle2
                    size={26}
                    className="text-violet-600"
                  />
                ) : index === timeline.length - 1 ? (
                  <House
                    size={26}
                    className="text-gray-400"
                  />
                ) : (
                  <Circle
                    size={24}
                    className="text-gray-300"
                  />
                )}

                <p
                  className={`mt-3 text-xs font-semibold leading-5 ${
                    completed
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </p>

              </div>
            );
          })}

        </div>
      </div>

      {/* Footer */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1,
        }}
        className="mt-10 rounded-2xl border border-violet-100 bg-violet-50 p-4"
      >

        <p className="text-sm text-gray-700">

          🚴 Your delivery partner is on the way.

          <span className="font-semibold text-violet-700">
            {" "}
            Sit back and we'll notify you once your food arrives.
          </span>

        </p>

      </motion.div>

    </div>
  );
}