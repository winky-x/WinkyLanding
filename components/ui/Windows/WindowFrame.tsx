"use client";

import { useStore, WindowState } from "@/store/useStore";
import { motion } from "motion/react";
import { X, Minus, Square } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function WindowFrame({
  windowState,
  title,
  children,
  className,
}: {
  windowState: WindowState;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const closeWindow = useStore((state) => state.closeWindow);
  const focusWindow = useStore((state) => state.focusWindow);
  const mode = useStore((state) => state.mode);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onPointerDown={() => focusWindow(windowState.id)}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      style={{ zIndex: windowState.zIndex }}
      className={cn(
        "absolute rounded-2xl overflow-hidden backdrop-blur-xl border shadow-2xl flex flex-col",
        mode === "agent"
          ? "bg-black/60 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          : "bg-white/60 border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {/* Title Bar */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3 cursor-grab active:cursor-grabbing border-b",
          mode === "agent"
            ? "bg-white/5 border-white/10"
            : "bg-black/5 border-black/10"
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-xs font-mono tracking-widest font-bold",
              mode === "agent" ? "text-white/70" : "text-black/70"
            )}
          >
            &gt;_ {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-white/10 rounded-md transition-colors">
            <Minus size={14} className="opacity-50" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded-md transition-colors">
            <Square size={12} className="opacity-50" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(windowState.id);
            }}
            className="p-1 hover:bg-red-500/20 hover:text-red-500 rounded-md transition-colors"
          >
            <X size={14} className="opacity-50 hover:opacity-100" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">{children}</div>
    </motion.div>
  );
}
