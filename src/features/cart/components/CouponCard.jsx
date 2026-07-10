import { useState } from "react";
import { Gift, Tag, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const coupons = [
  {
    code: "BITETHAT10",
    discount: "10% OFF",
    description: "Maximum discount ₹100",
  },
  {
    code: "BITETHAT20",
    discount: "20% OFF",
    description: "Maximum discount ₹250",
  },
  {
    code: "WELCOME100",
    discount: "Flat ₹100 OFF",
    description: "On orders above ₹499",
  },
  {
    code: "FREEDELIVERY",
    discount: "Free Delivery",
    description: "Removes delivery charges",
  },
];

export default function CouponCard({
  onApplyCoupon,
  appliedCoupon,
}) {
  const [coupon, setCoupon] = useState("");

  const applyCoupon = (code) => {
    const validCoupon = coupons.find(
      (c) => c.code === code.toUpperCase()
    );

    if (!validCoupon) {
      toast.error("Invalid coupon");
      return;
    }

    onApplyCoupon?.(validCoupon);

    setCoupon(validCoupon.code);

    toast.success(`${validCoupon.code} applied`);
  };

  return (
    <div className="rounded-[28px] border border-violet-100 bg-white p-6 shadow-lg">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-violet-100 p-3">

          <Gift className="text-violet-600" />

        </div>

        <div>

          <h3 className="font-bold text-lg">
            Coupons
          </h3>

          <p className="text-sm text-gray-500">
            Save more on this order
          </p>

        </div>

      </div>

      {/* Input */}

      <div className="mt-6 flex gap-3">

        <input
          value={coupon}
          onChange={(e) =>
            setCoupon(e.target.value)
          }
          placeholder="Enter coupon code"
          className="flex-1 rounded-full border border-violet-200 px-5 py-3 outline-none transition focus:border-violet-600"
        />

        <button
          onClick={() => applyCoupon(coupon)}
          className="rounded-full bg-violet-600 px-6 font-semibold text-white transition hover:bg-violet-700"
        >
          Apply
        </button>

      </div>

      {/* Suggested Coupons */}

      <div className="mt-6 space-y-3">

        {coupons.map((item) => (

          <motion.div
            whileHover={{
              y: -2,
            }}
            key={item.code}
            className="flex items-center justify-between rounded-2xl border border-violet-100 bg-violet-50 p-4"
          >

            <div className="flex items-center gap-3">

              <Tag
                size={18}
                className="text-violet-600"
              />

              <div>

                <h4 className="font-semibold">
                  {item.code}
                </h4>

                <p className="text-sm text-gray-500">
                  {item.discount}
                </p>

                <p className="text-xs text-gray-400">
                  {item.description}
                </p>

              </div>

            </div>

            {appliedCoupon === item.code ? (

              <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-2 text-sm font-semibold text-green-700">

                <CheckCircle2 size={16} />

                Applied

              </div>

            ) : (

              <button
                onClick={() =>
                  applyCoupon(item.code)
                }
                className="rounded-full border border-violet-600 px-4 py-2 text-sm font-semibold text-violet-600 transition hover:bg-violet-600 hover:text-white"
              >
                Apply
              </button>

            )}

          </motion.div>

        ))}

      </div>

    </div>
  );
}