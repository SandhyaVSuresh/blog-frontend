"use client";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <motion.div
      className="fixed inset-0 -z-10 bg-gradient-to-r from-black-900 via-blue-950 to-black-900"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 15,
        ease: "linear",
        repeat: Infinity,
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    />
  );
}