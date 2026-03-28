"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function GhostTerminal() {
  const logs = useStore((state) => state.terminalLogs);
  const mode = useStore((state) => state.mode);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={cn(
        "fixed top-12 left-12 w-96 h-[400px] z-40 p-6 rounded-none overflow-hidden pointer-events-none",
        mode === "agent" ? "glass-panel" : "glass-panel-light",
      )}
    >
      {/* HUD Corners */}
      <div className={cn(mode === "agent" ? "hud-corner" : "hud-corner-light", "top-0 left-0 border-t border-l")} />
      <div className={cn(mode === "agent" ? "hud-corner" : "hud-corner-light", "top-0 right-0 border-t border-r")} />
      <div className={cn(mode === "agent" ? "hud-corner" : "hud-corner-light", "bottom-0 left-0 border-b border-l")} />
      <div className={cn(mode === "agent" ? "hud-corner" : "hud-corner-light", "bottom-0 right-0 border-b border-r")} />

      {/* HUD Header */}
      <div className={cn(
        "absolute top-0 left-0 w-full px-4 py-1 text-[9px] font-mono tracking-[0.2em] flex justify-between items-center border-b",
        mode === "agent" ? "text-white/40 border-white/10" : "text-black/40 border-black/10"
      )}>
        <span>SYS.LOG // 0x00F</span>
        <span className="flex items-center gap-2">
          REC <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        </span>
      </div>

      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-50 mix-blend-overlay"></div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10%] w-full animate-scanline z-10 opacity-30"></div>

      <div
        ref={scrollRef}
        className={cn(
          "relative z-20 h-full mt-4 overflow-y-auto font-mono text-[11px] leading-relaxed tracking-widest",
          mode === "agent"
            ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]"
            : "text-blue-600 drop-shadow-[0_0_5px_rgba(37,99,235,0.5)]",
        )}
      >
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2"
              style={{
                textShadow:
                  mode === "agent"
                    ? "0 0 8px rgba(74,222,128,0.6)"
                    : "0 0 8px rgba(37,99,235,0.4)",
              }}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
        {/* Blinking Cursor */}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className={cn(
            "inline-block w-2 h-4 ml-1 align-middle",
            mode === "agent" ? "bg-green-400" : "bg-blue-600",
          )}
        />
      </div>
    </motion.div>
  );
}
