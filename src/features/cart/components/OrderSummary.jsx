import { motion } from "framer-motion";
import {
  Receipt,
  Coins,
  Tag,
  Truck,
  Percent,
} from "lucide-react";

export default function OrderSummary({
  subtotal,
  delivery,
  tax,
  couponDiscount,
  coinDiscount,
  total,
  biteCoins,
  onCheckout,
}) {
  const totalDiscount =
    couponDiscount + coinDiscount;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-[32px] border border-violet-100 bg-white p-7 shadow-xl"
    >
      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-violet-100 p-3">

          <Receipt className="text-violet-600" />

        </div>

        <div>

          <h3 className="text-xl font-bold">
            Order Summary
          </h3>

          <p className="text-sm text-gray-500">
            Price Breakdown
          </p>

        </div>

      </div>

      {/* Price Details */}

      <div className="mt-8 space-y-5">

        <Row
          icon={<Receipt size={17} />}
          title="Subtotal"
          value={`₹${subtotal}`}
        />

        <Row
          icon={<Truck size={17} />}
          title="Delivery Fee"
          value={
            delivery === 0
              ? "FREE"
              : `₹${delivery}`
          }
          green={delivery === 0}
        />

        <Row
          icon={<Percent size={17} />}
          title="Taxes"
          value={`₹${tax}`}
        />

        <Row
          icon={<Tag size={17} />}
          title="Coupon Discount"
          value={`-₹${couponDiscount}`}
          green={couponDiscount > 0}
        />

        <Row
          icon={<Coins size={17} />}
          title="Coins Redeemed"
          value={`-₹${coinDiscount}`}
          green={coinDiscount > 0}
        />

      </div>

      {/* Total Discount */}

      {totalDiscount > 0 && (

        <div className="mt-7 rounded-2xl bg-green-50 p-4">

          <div className="flex items-center justify-between">

            <span className="font-medium text-green-700">
              Total Savings
            </span>

            <span className="font-bold text-green-700">
              ₹{totalDiscount}
            </span>

          </div>

        </div>

      )}

      <div className="my-8 border-t border-dashed" />

      {/* Total */}

      <div className="flex items-center justify-between">

        <span className="text-lg font-bold">
          Grand Total
        </span>

        <span className="text-3xl font-bold text-violet-600">
          ₹{total}
        </span>

      </div>

      {/* Rewards */}

      <div className="mt-6 rounded-2xl bg-violet-50 p-4">

        <div className="flex items-center justify-between">

          <span className="text-gray-600">
            You'll Earn
          </span>

          <span className="font-bold text-violet-700">
            +{biteCoins} BiteCoins
          </span>

        </div>

      </div>

      {/* Checkout */}

      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: .98,
        }}
        onClick={onCheckout}
        className="mt-7 w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 text-lg font-semibold text-white shadow-lg"
      >
        Proceed to Payment →
      </motion.button>

    </motion.div>
  );
}

function Row({
  icon,
  title,
  value,
  green,
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2 text-gray-500">

        {icon}

        <span>{title}</span>

      </div>

      <span
        className={`font-semibold ${
          green
            ? "text-green-600"
            : "text-gray-900"
        }`}
      >
        {value}
      </span>

    </div>
  );
}