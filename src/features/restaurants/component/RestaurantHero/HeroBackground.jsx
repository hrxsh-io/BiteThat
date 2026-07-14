import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <>
      {/* Base Background */}
      <div className="absolute inset-0 bg-[#faf8ff]" />

      {/* Mesh Gradient */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_15%_20%,rgba(124,58,237,0.18),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(236,72,153,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.12),transparent_35%)]
        "
      />

      {/* Top Right Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-32
          right-[-120px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-violet-400/25
          blur-[140px]
        "
      />

      {/* Bottom Left Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-40
          -left-32
          h-[450px]
          w-[450px]
          rounded-full
          bg-fuchsia-300/25
          blur-[130px]
        "
      />

      {/* Center Spotlight */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[650px]
          w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-100/40
          blur-[180px]
        "
      />

      {/* Grid Texture */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:linear-gradient(#7c3aed_1px,transparent_1px),linear-gradient(to_right,#7c3aed_1px,transparent_1px)]
          [background-size:42px_42px]
        "
      />

      {/* Noise Overlay */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          mix-blend-soft-light
          [background-image:url('https://www.transparenttextures.com/patterns/noise.png')]
        "
      />

      {/* Bottom Fade */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-40
          w-full
          bg-gradient-to-b
          from-transparent
          to-[#faf8ff]
        "
      />
    </>
  );
}