"use client";

import { useStore } from "@/store/useStore";
import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BiomeToggle() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);
  const addTerminalLog = useStore((state) => state.addTerminalLog);

  const handleToggle = () => {
    const nextMode = mode === "agent" ? "assistant" : "agent";
    setMode(nextMode);
    addTerminalLog(`> INITIATING LENS SHUTTER TRANSITION...`);
    addTerminalLog(`> BIOME SHIFT: ${nextMode.toUpperCase()} MODE ENGAGED.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed top-12 right-12 z-50"
    >
      <button
        onClick={handleToggle}
        className={cn(
          "relative flex items-center p-1 rounded-full w-24 h-10 transition-colors duration-500",
          "backdrop-blur-xl border",
          mode === "agent"
            ? "bg-black/40 border-white/10 shadow-[0_0_20px_rgba(255,0,127,0.2)]"
            : "bg-white/40 border-black/5 shadow-[0_0_20px_rgba(255,255,255,0.5)]",
        )}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "w-8 h-8 rounded-full shadow-lg flex items-center justify-center",
            mode === "agent"
              ? "bg-gradient-to-br from-pink-500 to-blue-900 ml-0"
              : "bg-gradient-to-br from-white to-pink-200 ml-14",
          )}
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              mode === "agent" ? "bg-white" : "bg-pink-500",
            )}
          />
        </motion.div>
      </button>
    </motion.div>
  );
}
