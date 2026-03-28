import { create } from "zustand";

interface AppState {
  mode: "agent" | "assistant";
  setMode: (mode: "agent" | "assistant") => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
  inputCoordinates: { x: number; y: number } | null;
  setInputCoordinates: (coords: { x: number; y: number } | null) => void;
  terminalLogs: string[];
  addTerminalLog: (log: string) => void;
  clearTerminalLogs: () => void;
}

export const useStore = create<AppState>((set) => ({
  mode: "agent",
  setMode: (mode) => set({ mode }),
  isListening: false,
  setIsListening: (isListening) => set({ isListening }),
  inputCoordinates: null,
  setInputCoordinates: (coords) => set({ inputCoordinates: coords }),
  terminalLogs: [
    "> INITIALIZING VANGUARD PROTOCOL...",
    "> WINKY-CORE KERNEL LOADED.",
    "> AWAITING DIRECTIVE.",
  ],
  addTerminalLog: (log) =>
    set((state) => ({ terminalLogs: [...state.terminalLogs, log] })),
  clearTerminalLogs: () => set({ terminalLogs: [] }),
}));
