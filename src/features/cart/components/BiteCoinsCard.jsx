import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coins,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function BiteCoinsCard({
  availableCoins = 320,
  valuePerCoin = 0.1,
  onRedeem,
}) {
  const [redeemed, setRedeemed] = useState(false);

  const redeemValue = Math.floor(
    availableCoins * valuePerCoin
  );

  const handleRedeem = () => {
    if (redeemed) {
      setRedeemed(false);

      onRedeem?.(0);

      toast("Coins removed");

      return;
    }

    setRedeemed(true);

    onRedeem?.(redeemValue);

    toast.success(
      `₹${redeemValue} discount applied`
    );
  };

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="overflow-hidden rounded-[30px] bg-gradient-to-br from-violet-600 via-violet-500 to-fuchsia-500 p-6 text-white shadow-xl"
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-white/20 p-3">

            <Coins size={22} />

          </div>

          <div>

            <h3 className="text-lg font-bold">
              BiteCoins
            </h3>

            <p className="text-sm text-violet-100">
              Loyalty Rewards
            </p>

          </div>

        </div>

        <Sparkles />

      </div>

      {/* Coins */}

      <div className="mt-7">

        <h2 className="text-5xl font-bold">
          {availableCoins}
        </h2>

        <p className="mt-2 text-violet-100">
          Available Coins
        </p>

      </div>

      {/* Savings */}

      <div className="mt-6 rounded-2xl bg-white/15 p-4 backdrop-blur">

        <p className="text-sm text-violet-100">
          Redeem now and save
        </p>

        <h3 className="mt-1 text-2xl font-bold">
          ₹{redeemValue}
        </h3>

      </div>

      {/* Button */}

      <motion.button
        whileTap={{
          scale: 0.97,
        }}
        whileHover={{
          scale: 1.02,
        }}
        onClick={handleRedeem}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 font-semibold transition

${redeemed
            ? "bg-green-500 text-white"
            : "bg-white text-violet-700"
          }`}
      >
        {redeemed ? (
          <>
            <CheckCircle2 size={18} />
            Coins Redeemed
          </>
        ) : (
          <>
            <Coins size={18} />
            Redeem Coins
          </>
        )}
      </motion.button>
    </motion.div>
  );
}