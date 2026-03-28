import { create } from "zustand";

export type WindowType = "terminal" | "sysmon" | "network" | "browser" | "explorer" | "settings";

export interface AICapabilities {
  terminal: boolean;
  browser: boolean;
  search: boolean;
  sysmon: boolean;
  network: boolean;
  explorer: boolean;
}

export interface WindowState {
  id: string;
  type: WindowType;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

interface VFSNode {
  type: "file" | "dir";
  content?: string;
}

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
  
  // OS Window Management
  windows: WindowState[];
  openWindow: (type: WindowType) => void;
  closeWindow: (id: string) => void;
  closeWindowByType: (type: WindowType) => void;
  focusWindow: (id: string) => void;
  
  // Browser State
  browserUrl: string;
  setBrowserUrl: (url: string) => void;

  // VM Sandbox Logs & VFS
  vmLogs: string[];
  vfs: Record<string, VFSNode>;
  cwd: string;
  addVmLog: (log: string) => void;
  executeVmCommand: (cmd: string) => Promise<void>;
  aiCapabilities: AICapabilities;
  toggleCapability: (key: keyof AICapabilities) => void;
}

let nextZIndex = 100;

const initialVFS: Record<string, VFSNode> = {
  "/": { type: "dir" },
  "/home": { type: "dir" },
  "/home/winky": { type: "dir" },
  "/home/winky/readme.txt": { type: "file", content: "WINKY-CORE VANGUARD EDITION\nSpatial Computing OS active.\nAll systems nominal." },
  "/home/winky/secrets": { type: "dir" },
  "/home/winky/secrets/key.pem": { type: "file", content: "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----" },
  "/etc": { type: "dir" },
  "/etc/os-release": { type: "file", content: "NAME=WinkyOS\nVERSION=9.2.1\nID=winky" },
  "/var": { type: "dir" },
  "/var/log": { type: "dir" },
  "/var/log/syslog": { type: "file", content: "Kernel boot complete.\nMounting VFS... OK.\nEstablishing neural link... OK." }
};

export const useStore = create<AppState>((set, get) => ({
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

  windows: [],
  openWindow: (type) =>
    set((state) => {
      if (state.windows.some((w) => w.type === type && w.isOpen)) {
        return state;
      }
      const newWindow: WindowState = {
        id: `${type}-${Date.now()}`,
        type,
        isOpen: true,
        zIndex: nextZIndex++,
        position: { 
          x: Math.random() * 100 + 50, 
          y: Math.random() * 100 + 50 
        },
      };
      return { windows: [...state.windows, newWindow] };
    }),
  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),
  closeWindowByType: (type) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.type !== type),
    })),
  focusWindow: (id) =>
    set((state) => {
      const windows = state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex++ } : w
      );
      return { windows };
    }),

  browserUrl: "https://en.wikipedia.org",
  setBrowserUrl: (url) => set({ browserUrl: url }),

  aiCapabilities: {
    terminal: true,
    browser: true,
    search: true,
    sysmon: true,
    network: true,
    explorer: true,
  },
  toggleCapability: (key) =>
    set((state) => ({
      aiCapabilities: {
        ...state.aiCapabilities,
        [key]: !state.aiCapabilities[key],
      },
    })),

  vmLogs: [
    "> Booting WebAssembly Micro-OS...",
    "> Mounting virtual filesystem... [OK]",
    "> Establishing secure sandbox... [OK]",
    "> Agent logic engine online.",
  ],
  vfs: initialVFS,
  cwd: "/home/winky",
  addVmLog: (log) => set((state) => ({ vmLogs: [...state.vmLogs, log] })),
  executeVmCommand: async (cmdStr) => {
    const state = get();
    const logs = [...state.vmLogs, `winky@local:${state.cwd}$ ${cmdStr}`];
    set({ vmLogs: logs }); // Optimistic update

    const args = cmdStr.trim().split(/\s+/);
    const cmd = args[0];
    let output = "";

    const resolvePath = (p: string) => {
      if (p.startsWith("/")) return p;
      if (p === "..") {
        const parts = state.cwd.split("/").filter(Boolean);
        parts.pop();
        return "/" + parts.join("/");
      }
      if (p === ".") return state.cwd;
      return state.cwd === "/" ? `/${p}` : `${state.cwd}/${p}`;
    };

    try {
      switch (cmd) {
        case "pwd":
          output = state.cwd;
          break;
        case "whoami":
          output = "winky";
          break;
        case "date":
          output = new Date().toString();
          break;
        case "uname":
          output = args.includes("-a") 
            ? "Linux winky-core 6.1.0-kali3-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.27-1kali1 x86_64 GNU/Linux" 
            : "Linux";
          break;
        case "ping":
          const host = args[1] || "localhost";
          output = `PING ${host} (192.168.1.10) 56(84) bytes of data.\n64 bytes from 192.168.1.10: icmp_seq=1 ttl=64 time=0.034 ms\n64 bytes from 192.168.1.10: icmp_seq=2 ttl=64 time=0.041 ms\n64 bytes from 192.168.1.10: icmp_seq=3 ttl=64 time=0.039 ms`;
          break;
        case "nmap":
          const target = args[1] || "127.0.0.1";
          output = `Starting Nmap 7.93 ( https://nmap.org ) at ${new Date().toUTCString()}\nNmap scan report for ${target}\nHost is up (0.00013s latency).\nNot shown: 997 closed tcp ports\nPORT    STATE SERVICE\n22/tcp  open  ssh\n80/tcp  open  http\n443/tcp open  https\n\nNmap done: 1 IP address (1 host up) scanned in 0.42 seconds`;
          break;
        case "ps":
          output = `  PID TTY          TIME CMD\n    1 pts/0    00:00:00 init\n   42 pts/0    00:00:00 winky-core\n  108 pts/0    00:00:00 bash\n  109 pts/0    00:00:00 ps`;
          break;
        case "base64": {
          if (args[1]) {
            output = btoa(args.slice(1).join(" "));
          } else {
            output = "base64: missing input";
          }
          break;
        }
        case "grep": {
          if (args.length < 3) {
            output = "grep: missing operand";
            break;
          }
          const pattern = args[1];
          const fileTarget = resolvePath(args[2]);
          if (!state.vfs[fileTarget] || state.vfs[fileTarget].type !== "file") {
            output = `grep: ${args[2]}: No such file or directory`;
          } else {
            const lines = (state.vfs[fileTarget].content || "").split("\n");
            output = lines.filter(l => l.includes(pattern)).join("\n");
          }
          break;
        }
        case "clear":
          set({ vmLogs: [] });
          return;
        case "ls": {
          const target = args[1] ? resolvePath(args[1]) : state.cwd;
          if (!state.vfs[target] || state.vfs[target].type !== "dir") {
            output = `ls: cannot access '${target}': No such file or directory`;
          } else {
            const prefix = target === "/" ? "/" : target + "/";
            const entries = Object.keys(state.vfs).filter(
              (k) =>
                k.startsWith(prefix) &&
                k !== target &&
                k.substring(prefix.length).indexOf("/") === -1
            );
            output = entries.map((e) => e.substring(prefix.length)).join("  ");
          }
          break;
        }
        case "cd": {
          const target = args[1] ? resolvePath(args[1]) : "/home/winky";
          if (!state.vfs[target] || state.vfs[target].type !== "dir") {
            output = `cd: ${target}: No such file or directory`;
          } else {
            set({ cwd: target });
            return;
          }
          break;
        }
        case "cat": {
          if (!args[1]) {
            output = "cat: missing operand";
            break;
          }
          const target = resolvePath(args[1]);
          if (!state.vfs[target]) {
            output = `cat: ${args[1]}: No such file or directory`;
          } else if (state.vfs[target].type === "dir") {
            output = `cat: ${args[1]}: Is a directory`;
          } else {
            output = state.vfs[target].content || "";
          }
          break;
        }
        case "echo": {
          const redirectIdx = args.indexOf(">");
          const appendIdx = args.indexOf(">>");
          
          if (redirectIdx !== -1 || appendIdx !== -1) {
            const isAppend = appendIdx !== -1;
            const idx = isAppend ? appendIdx : redirectIdx;
            const text = args.slice(1, idx).join(" ");
            const file = resolvePath(args[idx + 1]);
            
            const existingContent = state.vfs[file]?.content || "";
            const newContent = isAppend ? existingContent + "\n" + text : text;
            
            set({ vfs: { ...state.vfs, [file]: { type: "file", content: newContent } } });
            return;
          }
          output = args.slice(1).join(" ");
          break;
        }
        case "mkdir": {
          if (!args[1]) {
            output = "mkdir: missing operand";
            break;
          }
          const target = resolvePath(args[1]);
          set({ vfs: { ...state.vfs, [target]: { type: "dir" } } });
          return;
        }
        case "touch": {
          if (!args[1]) {
            output = "touch: missing file operand";
            break;
          }
          const target = resolvePath(args[1]);
          set({ vfs: { ...state.vfs, [target]: { type: "file", content: "" } } });
          return;
        }
        // REAL COMMANDS
        case "curl": {
          if (!args[1]) {
            output = "curl: missing url";
            break;
          }
          try {
            // Use a CORS proxy to allow fetching from anywhere in the browser
            const targetUrl = args[1].startsWith("http") ? args[1] : `https://${args[1]}`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const res = await fetch(proxyUrl);
            const data = await res.json();
            if (data.contents) {
              const text = data.contents;
              output = text.substring(0, 1500) + (text.length > 1500 ? "\n...[TRUNCATED]" : "");
            } else {
              output = "curl: no content received";
            }
          } catch (e: any) {
            output = `curl: failed to fetch - ${e.message}`;
          }
          break;
        }
        case "calc": {
          if (!args[1]) {
            output = "calc: missing expression";
            break;
          }
          try {
            const expr = args.slice(1).join(" ");
            // Safe-ish eval for basic math
            output = String(new Function(`return ${expr}`)());
          } catch (e) {
            output = "calc: invalid expression";
          }
          break;
        }
        case "sysinfo": {
          output = `OS: ${navigator.platform}\nBrowser: ${navigator.userAgent}\nCores: ${navigator.hardwareConcurrency || 'Unknown'}\nMemory: ${(navigator as any).deviceMemory || 'Unknown'}GB\nScreen: ${window.screen.width}x${window.screen.height}`;
          break;
        }
        default:
          if (cmd) output = `bash: ${cmd}: command not found`;
      }
    } catch (e) {
      output = `Error executing ${cmd}`;
    }

    if (output) {
      set((s) => ({ vmLogs: [...s.vmLogs, output] }));
    }
  },
}));
