import { motion } from "framer-motion";
import React from "react";

export default function BackgroundCircles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[38%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(111,159,152,0.14),rgba(111,159,152,0.04)_42%,transparent_72%)] blur-3xl sm:h-[32rem] sm:w-[32rem]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[-10%] top-[32%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_38%,transparent_74%)] blur-3xl sm:h-[36rem] sm:w-[36rem]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,146,140,0.08),transparent_38%,transparent_68%,rgba(0,0,0,0.6)_88%)]" />
    </div>
  );
}
