"use client";

import { useStore, WindowState } from "@/store/useStore";
import WindowFrame from "./WindowFrame";
import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SysmonWindow({
  windowState,
}: {
  windowState: WindowState;
}) {
  const mode = useStore((state) => state.mode);

  return (
    <WindowFrame
      windowState={windowState}
      title="SYSTEM_TELEMETRY"
      className="w-[400px] h-[300px]"
    >
      <div
        className={cn(
          "h-full p-6 flex flex-col gap-4 font-mono text-xs",
          mode === "agent" ? "bg-black/60 text-white/80" : "bg-white/60 text-black/80"
        )}
      >
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span>CORE_TEMP</span>
          <motion.span
            animate={{ color: ["#4ade80", "#facc15", "#f87171", "#4ade80"] }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            42.4°C
          </motion.span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span>GPU_LOAD</span>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            98.2%
          </motion.span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span>NEBULA_PARTICLES</span>
          <span className="text-pink-500 font-bold">1,048,576</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span>LOGIC_GATES</span>
          <span className="text-blue-400">ENGAGED</span>
        </div>
        <div className="flex-1 flex items-end">
          <div className="w-full h-16 flex items-end gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  "flex-1 rounded-t-sm",
                  mode === "agent" ? "bg-green-500/50" : "bg-blue-500/50"
                )}
                animate={{
                  height: [
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 2 + 1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}
