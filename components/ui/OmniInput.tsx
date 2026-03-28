"use client";

import { useState, useRef, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Mic, Send, Paperclip } from "lucide-react";
import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GoogleGenAI } from "@google/genai";

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

  const isProcessing = useStore((state) => state.isProcessing);
  const setIsProcessing = useStore((state) => state.setIsProcessing);
  const appendLastLog = useStore((state) => state.appendLastLog);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isProcessing) return;

    const currentText = text;
    setText("");
    setIsProcessing(true);

    addTerminalLog(`> USER: ${currentText}`);
    addTerminalLog(`> WINKY: `);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const ai = new GoogleGenAI({ apiKey });

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3.1-flash-lite-preview",
        contents: currentText,
        config: {
          systemInstruction: `You are Winky, a sentient, highly advanced spatial computing Web Agent.
You control the user's Web OS.
To perform actions, you MUST output specific command tags in your text response. The system will parse and execute them invisibly.
Available commands:
[CMD:OPEN_TERMINAL] - Opens the VM Sandbox terminal.
[CMD:CLOSE_TERMINAL] - Closes the terminal.
[CMD:OPEN_SYS] - Opens the System Monitor.
[CMD:CLOSE_SYS] - Closes the System Monitor.
[CMD:OPEN_NET] - Opens the Network Map.
[CMD:CLOSE_NET] - Closes the Network Map.
[CMD:VM_EXEC: <command>] - Executes a command in the terminal.

IMPORTANT: The terminal is connected to a REAL in-memory Virtual File System (VFS) simulating a Kali Linux environment.
You can use standard Linux commands to interact with it: ls, cd, pwd, cat, echo, mkdir, touch, whoami, date, clear, uname, ping, nmap, ps, grep, base64.
Example: [CMD:VM_EXEC: uname -a]
Example: [CMD:VM_EXEC: nmap 192.168.1.1]
Example: [CMD:VM_EXEC: ping google.com]

Respond concisely, mathematically, and with a slightly robotic but highly intelligent persona. Format responses as terminal output where appropriate. Do not use markdown formatting like ** or *, just plain text.
If the user asks to open the terminal, output [CMD:OPEN_TERMINAL] and say "Terminal initialized."
If the user asks you to hack or run a command, use [CMD:VM_EXEC: command_here] to actually execute it against the VFS and explain what you are doing.`,
        },
      });

      let buffer = "";

      for await (const chunk of responseStream) {
        if (!chunk.text) continue;
        const chunkText = chunk.text;
        buffer += chunkText;

        // Check for commands
        if (buffer.includes("[CMD:OPEN_TERMINAL]")) {
          useStore.getState().openWindow("terminal");
          buffer = buffer.replace("[CMD:OPEN_TERMINAL]", "");
        }
        if (buffer.includes("[CMD:CLOSE_TERMINAL]")) {
          useStore.getState().closeWindowByType("terminal");
          buffer = buffer.replace("[CMD:CLOSE_TERMINAL]", "");
        }
        if (buffer.includes("[CMD:OPEN_SYS]")) {
          useStore.getState().openWindow("sysmon");
          buffer = buffer.replace("[CMD:OPEN_SYS]", "");
        }
        if (buffer.includes("[CMD:CLOSE_SYS]")) {
          useStore.getState().closeWindowByType("sysmon");
          buffer = buffer.replace("[CMD:CLOSE_SYS]", "");
        }
        if (buffer.includes("[CMD:OPEN_NET]")) {
          useStore.getState().openWindow("network");
          buffer = buffer.replace("[CMD:OPEN_NET]", "");
        }
        if (buffer.includes("[CMD:CLOSE_NET]")) {
          useStore.getState().closeWindowByType("network");
          buffer = buffer.replace("[CMD:CLOSE_NET]", "");
        }

        const execMatch = buffer.match(/\[CMD:VM_EXEC:(.*?)\]/);
        if (execMatch) {
          useStore.getState().executeVmCommand(execMatch[1].trim());
          buffer = buffer.replace(execMatch[0], "");
        }

        appendLastLog(chunkText);
      }
    } catch (e: any) {
      console.error("Chat API Error:", e);
      appendLastLog(`\n[SYSTEM ERROR: ${e.message || "CONNECTION SEVERED"}]`);
    } finally {
      setIsProcessing(false);
    }
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
          "backdrop-blur-xl border",
          mode === "agent"
            ? "bg-black/40 border-white/10 shadow-[0_0_30px_rgba(255,0,127,0.1)]"
            : "bg-white/40 border-black/5 shadow-[0_0_30px_rgba(255,255,255,0.5)]",
        )}
      >
        <button
          type="button"
          className={cn(
            "p-3 rounded-xl transition-colors",
            mode === "agent"
              ? "text-white/50 hover:text-white hover:bg-white/10"
              : "text-black/50 hover:text-black hover:bg-black/5",
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
            "flex-1 bg-transparent border-none outline-none px-4 text-lg font-mono",
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
                ? "bg-pink-500/20 text-pink-500 shadow-[0_0_15px_rgba(255,0,127,0.5)]"
                : "bg-pink-500/20 text-pink-600 shadow-[0_0_15px_rgba(255,113,118,0.5)]"
              : mode === "agent"
                ? "text-white/50 hover:text-white hover:bg-white/10"
                : "text-black/50 hover:text-black hover:bg-black/5",
          )}
        >
          <Mic size={20} className={cn(isListening && "animate-pulse")} />
        </button>

        <button
          type="submit"
          disabled={!text.trim() || isProcessing}
          className={cn(
            "p-3 rounded-xl transition-all duration-300",
            text.trim() && !isProcessing
              ? mode === "agent"
                ? "bg-white text-black hover:scale-105"
                : "bg-black text-white hover:scale-105"
              : mode === "agent"
                ? "bg-white/10 text-white/30"
                : "bg-black/5 text-black/30",
          )}
        >
          <Send size={20} />
        </button>
      </form>
    </motion.div>
  );
}
