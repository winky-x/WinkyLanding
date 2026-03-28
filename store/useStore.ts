import { create } from "zustand";

interface AppState {
  mode: "agent" | "assistant";
  setMode: (mode: "agent" | "assistant") => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  inputCoordinates: { x: number; y: number } | null;
  setInputCoordinates: (coords: { x: number; y: number } | null) => void;
  terminalLogs: string[];
  addTerminalLog: (log: string) => void;
  appendLastLog: (text: string) => void;
  clearTerminalLogs: () => void;
}

export const useStore = create<AppState>((set) => ({
  mode: "agent",
  setMode: (mode) => set({ mode }),
  isListening: false,
  setIsListening: (isListening) => set({ isListening }),
  isProcessing: false,
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  inputCoordinates: null,
  setInputCoordinates: (coords) => set({ inputCoordinates: coords }),
  terminalLogs: [
    "> INITIALIZING VANGUARD PROTOCOL...",
    "> WINKY-CORE KERNEL LOADED.",
    "> AWAITING DIRECTIVE.",
  ],
  addTerminalLog: (log) =>
    set((state) => ({ terminalLogs: [...state.terminalLogs, log] })),
  appendLastLog: (text) =>
    set((state) => {
      const newLogs = [...state.terminalLogs];
      if (newLogs.length > 0) {
        newLogs[newLogs.length - 1] += text;
      }
      return { terminalLogs: newLogs };
    }),
  clearTerminalLogs: () => set({ terminalLogs: [] }),
}));
