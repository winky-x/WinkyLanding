"use client";

import { useEffect, useRef } from "react";
import { useStore, WindowState } from "@/store/useStore";
import WindowFrame from "./WindowFrame";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function TerminalWindow({
  windowState,
}: {
  windowState: WindowState;
}) {
  const vmLogs = useStore((state) => state.vmLogs);
  const mode = useStore((state) => state.mode);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [vmLogs]);

  return (
    <WindowFrame
      windowState={windowState}
      title="WINKY_VM_SANDBOX"
      className="w-[600px] h-[400px]"
    >
      <div className="flex h-full">
        {/* Telemetry Sidebar */}
        <div
          className={cn(
            "w-24 p-4 border-r flex flex-col gap-6",
            mode === "agent"
              ? "bg-black/40 border-white/10"
              : "bg-white/40 border-black/10"
          )}
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-pink-500">
              CPU
            </span>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: ["20%", "80%", "40%", "90%", "30%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="h-full bg-pink-500 shadow-[0_0_10px_rgba(255,0,127,0.8)]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-blue-500">
              MEM
            </span>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: ["60%", "65%", "62%", "70%", "60%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.8)]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-green-500">
              NET
            </span>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: ["10%", "90%", "5%", "100%", "20%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"
              />
            </div>
          </div>
        </div>

        {/* Terminal Output */}
        <div
          ref={scrollRef}
          className={cn(
            "flex-1 p-6 overflow-y-auto font-mono text-xs leading-loose tracking-wider",
            mode === "agent"
              ? "bg-black/60 text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]"
              : "bg-white/60 text-blue-600 drop-shadow-[0_0_5px_rgba(37,99,235,0.3)]"
          )}
        >
          <AnimatePresence initial={false}>
            {vmLogs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "mb-1 break-words whitespace-pre-wrap",
                  log.startsWith("winky@local")
                    ? "text-pink-500 font-bold"
                    : log.includes("[ERROR]")
                    ? "text-red-500"
                    : log.includes("[SUCCESS]")
                    ? "text-green-300"
                    : ""
                )}
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className={cn(
              "inline-block w-2 h-4 ml-1 align-middle",
              mode === "agent" ? "bg-green-400" : "bg-blue-600"
            )}
          />
        </div>
      </div>
    </WindowFrame>
  );
}
