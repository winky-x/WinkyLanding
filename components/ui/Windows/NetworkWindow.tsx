"use client";

import { useStore, WindowState } from "@/store/useStore";
import WindowFrame from "./WindowFrame";
import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function NetworkWindow({
  windowState,
}: {
  windowState: WindowState;
}) {
  const mode = useStore((state) => state.mode);

  const [nodes] = useState<any[]>(() =>
    Array.from({ length: 12 }).map((_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = Math.random() * 100 + 50;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return {
        id: i,
        x,
        y,
        duration: Math.random() * 2 + 1,
        delay: Math.random(),
      };
    })
  );

  return (
    <WindowFrame
      windowState={windowState}
      title="NEBULA_UPLINK"
      className="w-[500px] h-[400px]"
    >
      <div
        className={cn(
          "h-full p-6 flex flex-col items-center justify-center relative overflow-hidden",
          mode === "agent" ? "bg-black/80" : "bg-white/80"
        )}
      >
        {/* Radar Effect */}
        <div
          className={cn(
            "absolute w-[300px] h-[300px] rounded-full border border-dashed opacity-20",
            mode === "agent" ? "border-green-500" : "border-blue-500"
          )}
        />
        <div
          className={cn(
            "absolute w-[200px] h-[200px] rounded-full border opacity-30",
            mode === "agent" ? "border-green-500" : "border-blue-500"
          )}
        />
        <div
          className={cn(
            "absolute w-[100px] h-[100px] rounded-full border opacity-50",
            mode === "agent" ? "border-green-500" : "border-blue-500"
          )}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className={cn(
            "absolute w-[300px] h-[300px] rounded-full border-t-2 opacity-50",
            mode === "agent" ? "border-green-400" : "border-blue-400"
          )}
        />

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.5, 1, 0.5], scale: 1 }}
            transition={{
              repeat: Infinity,
              duration: node.duration,
              delay: node.delay,
            }}
            className={cn(
              "absolute w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]",
              mode === "agent" ? "bg-pink-500 text-pink-500" : "bg-blue-500 text-blue-500"
            )}
            style={{ x: node.x, y: node.y }}
          />
        ))}

        <div
          className={cn(
            "absolute bottom-4 left-4 font-mono text-[10px] tracking-widest",
            mode === "agent" ? "text-green-500" : "text-blue-500"
          )}
        >
          [SCANNING FOR ANOMALIES...]
        </div>
      </div>
    </WindowFrame>
  );
}
