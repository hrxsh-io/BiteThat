import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Clock3,
  Truck,
  MapPin,
  Plus,
  Check,
} from "lucide-react";

const addresses = [
  {
    id: 1,
    title: "Home",
    address: "24 MG Road, Pune",
  },
  {
    id: 2,
    title: "Office",
    address: "Cyber City, Pune",
  },
  {
    id: 3,
    title: "Hostel",
    address: "MIT Hostel Block B",
  },
];

export default function DeliveryCard() {
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="rounded-[28px] border border-violet-100 bg-white p-6 shadow-md transition-all hover:shadow-xl"
      >
        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-lg font-bold">
              Delivery Address
            </h3>

            <p className="text-sm text-gray-500">
              Change where your food will be delivered
            </p>

          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white transition hover:scale-105 hover:bg-violet-700"
          >
            <Plus size={18} />
          </button>

        </div>

        {/* Current Address */}

        <div className="mt-6 flex gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">

            <House className="text-violet-600" />

          </div>

          <div>

            <h4 className="font-semibold">
              {selectedAddress.title}
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              {selectedAddress.address}
            </p>

          </div>

        </div>

        {/* Delivery Info */}

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-violet-50 p-4">

          <div className="flex items-center gap-2">

            <Truck size={18} />

            Free Delivery

          </div>

          <div className="flex items-center gap-2">

            <Clock3 size={18} />

            22 mins

          </div>

        </div>

      </motion.div>

      {/* Address Modal */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >

            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              className="w-[420px] rounded-[28px] bg-white p-6 shadow-2xl"
            >

              <div className="flex items-center gap-3">

                <MapPin className="text-violet-600" />

                <h2 className="text-xl font-bold">
                  Choose Address
                </h2>

              </div>

              <div className="mt-6 space-y-3">

                {addresses.map((address) => (

                  <button
                    key={address.id}
                    onClick={() => {
                      setSelectedAddress(address);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition

                    ${
                      selectedAddress.id === address.id
                        ? "border-violet-500 bg-violet-50"
                        : "border-gray-200 hover:border-violet-300"
                    }`}
                  >

                    <div>

                      <h4 className="font-semibold">
                        {address.title}
                      </h4>

                      <p className="mt-1 text-sm text-gray-500">
                        {address.address}
                      </p>

                    </div>

                    {selectedAddress.id === address.id && (

                      <Check className="text-violet-600" />

                    )}

                  </button>

                ))}

              </div>

              {/* Add Address */}

              <button
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-violet-300 py-3 font-semibold text-violet-600 transition hover:bg-violet-50"
              >
                <Plus size={18} />
                Add New Address
              </button>

              <button
                onClick={() => setOpen(false)}
                className="mt-4 w-full rounded-full bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
              >
                Done
              </button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}