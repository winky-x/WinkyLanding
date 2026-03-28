"use client";

import { useStore, WindowState, AICapabilities } from "@/store/useStore";
import WindowFrame from "./WindowFrame";
import { Shield, Terminal, Globe, Search, Activity, Network, Folder } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SettingsWindow({
  windowState,
}: {
  windowState: WindowState;
}) {
  const mode = useStore((state) => state.mode);
  const caps = useStore((state) => state.aiCapabilities);
  const toggle = useStore((state) => state.toggleCapability);

  const controls: { key: keyof AICapabilities; label: string; icon: any; desc: string }[] = [
    { key: "terminal", label: "Terminal & VM Execution", icon: Terminal, desc: "Allow AI to run Linux commands" },
    { key: "browser", label: "Web Browser", icon: Globe, desc: "Allow AI to open and view web pages" },
    { key: "search", label: "Google Search", icon: Search, desc: "Allow AI to search the live internet" },
    { key: "sysmon", label: "System Monitor", icon: Activity, desc: "Allow AI to view system metrics" },
    { key: "network", label: "Network Map", icon: Network, desc: "Allow AI to view network topology" },
    { key: "explorer", label: "File Explorer", icon: Folder, desc: "Allow AI to open the file explorer" },
  ];

  return (
    <WindowFrame
      windowState={windowState}
      title="AI_CAPABILITY_CONTROL"
      className="w-[500px] h-[580px]"
    >
      <div
        className={cn(
          "h-full flex flex-col p-6 font-mono",
          mode === "agent" ? "bg-black/90 text-white" : "bg-white/90 text-black"
        )}
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <Shield className="text-pink-500" size={32} />
          <div>
            <h2 className="text-xl font-bold tracking-wider">SECURITY OVERRIDE</h2>
            <p className="text-xs opacity-60">Manage Winky&apos;s system access privileges</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {controls.map((ctrl) => {
            const isEnabled = caps[ctrl.key];
            const Icon = ctrl.icon;
            return (
              <div
                key={ctrl.key}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all",
                  isEnabled
                    ? "bg-white/5 border-white/10"
                    : "bg-red-500/5 border-red-500/20 opacity-70"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-lg", isEnabled ? "bg-white/10 text-white" : "bg-red-500/20 text-red-400")}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{ctrl.label}</h3>
                    <p className="text-xs opacity-60 mt-1">{ctrl.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggle(ctrl.key)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    isEnabled ? "bg-pink-500" : "bg-white/20"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      isEnabled ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </WindowFrame>
  );
}
