"use client";

import { useState, useRef } from "react";
import { useStore } from "@/store/useStore";
import { motion, useDragControls } from "motion/react";
import { Terminal, X, Minus, Square } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ProofOfPower() {
  const mode = useStore((state) => state.mode);
  const [isOpen, setIsOpen] = useState(true);
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={constraintsRef}
      className="fixed inset-0 pointer-events-none z-40"
    >
      <motion.div
        drag
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={constraintsRef}
        initial={{ opacity: 0, scale: 0.9, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 1.5 }}
        className={cn(
          "absolute top-1/4 right-1/4 w-[500px] h-[350px] rounded-xl overflow-hidden pointer-events-auto flex flex-col",
          "backdrop-blur-2xl border shadow-2xl",
          mode === "agent"
            ? "bg-black/60 border-white/10 shadow-[0_0_50px_rgba(255,0,127,0.15)]"
            : "bg-white/60 border-black/5 shadow-[0_0_50px_rgba(0,0,0,0.1)]",
        )}
      >
        {/* Title Bar */}
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className={cn(
            "h-10 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing border-b",
            mode === "agent"
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/5",
          )}
        >
          <div className="flex items-center gap-2">
            <Terminal
              size={14}
              className={mode === "agent" ? "text-white/50" : "text-black/50"}
            />
            <span
              className={cn(
                "text-xs font-mono tracking-widest",
                mode === "agent" ? "text-white/70" : "text-black/70",
              )}
            >
              WINKY_VM_SANDBOX
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Minus
              size={14}
              className={mode === "agent" ? "text-white/30" : "text-black/30"}
            />
            <Square
              size={12}
              className={mode === "agent" ? "text-white/30" : "text-black/30"}
            />
            <button onClick={() => setIsOpen(false)}>
              <X
                size={14}
                className={
                  mode === "agent"
                    ? "text-white/50 hover:text-red-400"
                    : "text-black/50 hover:text-red-500"
                }
              />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden relative">
          {/* Telemetry Sidebar */}
          <div className={cn(
            "w-24 border-r flex flex-col items-center py-4 gap-4 text-[9px] font-mono",
            mode === "agent" ? "border-white/10 text-white/40" : "border-black/10 text-black/40"
          )}>
            <div className="flex flex-col items-center gap-1">
              <span>CPU</span>
              <div className="w-8 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: ["30%", "80%", "40%", "90%", "50%"] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className={cn("h-full", mode === "agent" ? "bg-pink-500" : "bg-blue-500")} 
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span>MEM</span>
              <div className="w-8 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: ["60%", "65%", "62%", "70%", "60%"] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className={cn("h-full", mode === "agent" ? "bg-blue-500" : "bg-pink-500")} 
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span>NET</span>
              <div className="w-8 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: ["10%", "100%", "5%", "40%", "10%"] }} 
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className={cn("h-full", mode === "agent" ? "bg-green-400" : "bg-green-500")} 
                />
              </div>
            </div>
          </div>

          <div
            className={cn(
              "flex-1 p-4 font-mono text-xs overflow-y-auto",
              mode === "agent"
                ? "bg-black/40 text-green-400"
                : "bg-white/40 text-blue-600",
            )}
          >
            <div className="opacity-70 mb-4">
              {">"} Booting WebAssembly Micro-OS...
              <br />
              {">"} Mounting virtual filesystem... [OK]
              <br />
              {">"} Establishing secure sandbox... [OK]
              <br />
              {">"} Agent logic engine online.
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              <span
                className={mode === "agent" ? "text-pink-500" : "text-pink-600"}
              >
                winky@local
              </span>
              :
              <span
                className={mode === "agent" ? "text-blue-400" : "text-blue-500"}
              >
                ~
              </span>
              $ ./analyze_dom.sh
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5 }}
              className="mt-2 opacity-80"
            >
              [INFO] Scanning DOM tree...
              <br />
              [INFO] Found 1M+ particle nebula.
              <br />
              [INFO] Omni-Input active.
              <br />
              [SUCCESS] Containment field stable.
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6 }}
              className="mt-4"
            >
              <span
                className={mode === "agent" ? "text-pink-500" : "text-pink-600"}
              >
                winky@local
              </span>
              :
              <span
                className={mode === "agent" ? "text-blue-400" : "text-blue-500"}
              >
                ~
              </span>
              ${" "}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className={cn(
                  "inline-block w-2 h-4 align-middle",
                  mode === "agent" ? "bg-green-400" : "bg-blue-600",
                )}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
