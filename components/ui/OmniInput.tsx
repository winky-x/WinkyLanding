"use client";

import { useState, useRef, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Mic, Send, Paperclip } from "lucide-react";
import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function OmniInput() {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mode = useStore((state) => state.mode);
  const isListening = useStore((state) => state.isListening);
  const setIsListening = useStore((state) => state.setIsListening);
  const setInputCoordinates = useStore((state) => state.setInputCoordinates);
  const addTerminalLog = useStore((state) => state.addTerminalLog);

  // Update coordinates for gravitational listening
  useEffect(() => {
    const updateCoords = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setInputCoordinates({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updateCoords();
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, [setInputCoordinates]);

  const handleVoiceToggle = () => {
    const nextState = !isListening;
    setIsListening(nextState);
    if (nextState) {
      addTerminalLog("> INITIATING AUDIO INGESTION PIPELINE...");
      addTerminalLog("> FFT ANALYSIS ACTIVE.");
    } else {
      addTerminalLog("> AUDIO PIPELINE TERMINATED.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTerminalLog(`> USER_INPUT: "${text}"`);
    addTerminalLog("> PARSING INTENT...");
    addTerminalLog("> EXECUTING LOCAL SCRIPT...");
    setText("");
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-3xl z-50 px-4"
    >
      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-center w-full p-2 rounded-2xl transition-all duration-500",
          mode === "agent" ? "glass-panel" : "glass-panel-light",
          isListening && (mode === "agent" ? "shadow-[0_0_40px_rgba(255,0,127,0.3)]" : "shadow-[0_0_40px_rgba(255,255,255,0.8)]")
        )}
      >
        {/* Animated Listening Border */}
        {isListening && (
          <div className="absolute inset-0 -z-10 rounded-2xl animate-pulse-glow">
            <div className={cn(
              "absolute inset-[-2px] rounded-[18px] opacity-50",
              mode === "agent" 
                ? "bg-gradient-to-r from-pink-500 via-blue-600 to-pink-500" 
                : "bg-gradient-to-r from-white via-pink-200 to-white"
            )} />
          </div>
        )}

        <button
          type="button"
          className={cn(
            "p-3 rounded-xl transition-all duration-300",
            mode === "agent"
              ? "text-white/50 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
              : "text-black/50 hover:text-black hover:bg-black/5 hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]",
          )}
        >
          <Paperclip size={20} />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Command Winky..."
          className={cn(
            "flex-1 bg-transparent border-none outline-none px-4 text-lg font-mono tracking-wide",
            mode === "agent"
              ? "text-white placeholder:text-white/30"
              : "text-black placeholder:text-black/30",
          )}
        />

        <button
          type="button"
          onClick={handleVoiceToggle}
          className={cn(
            "p-3 rounded-xl transition-all duration-300 mr-2",
            isListening
              ? mode === "agent"
                ? "bg-pink-500/20 text-pink-500 shadow-[inset_0_0_0_1px_rgba(255,0,127,0.5)]"
                : "bg-pink-500/10 text-pink-600 shadow-[inset_0_0_0_1px_rgba(255,113,118,0.5)]"
              : mode === "agent"
                ? "text-white/50 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                : "text-black/50 hover:text-black hover:bg-black/5 hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]",
          )}
        >
          <Mic size={20} className={cn(isListening && "animate-pulse")} />
        </button>

        <button
          type="submit"
          disabled={!text.trim()}
          className={cn(
            "p-3 rounded-xl transition-all duration-300",
            text.trim()
              ? mode === "agent"
                ? "bg-white text-black hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                : "bg-black text-white hover:scale-105 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
              : mode === "agent"
                ? "bg-white/5 text-white/30"
                : "bg-black/5 text-black/30",
          )}
        >
          <Send size={20} />
        </button>
      </form>
    </motion.div>
  );
}
