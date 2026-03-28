"use client";

import { useStore, WindowState } from "@/store/useStore";
import WindowFrame from "./WindowFrame";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BrowserWindow({
  windowState,
}: {
  windowState: WindowState;
}) {
  const mode = useStore((state) => state.mode);
  const browserUrl = useStore((state) => state.browserUrl);

  return (
    <WindowFrame
      windowState={windowState}
      title="WEB_UPLINK"
      className="w-[800px] h-[600px]"
    >
      <div
        className={cn(
          "h-full flex flex-col",
          mode === "agent" ? "bg-black/90" : "bg-white/90"
        )}
      >
        <div className="flex items-center gap-2 p-2 border-b border-white/10 bg-black/20">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="flex-1 bg-black/40 rounded px-3 py-1 text-xs font-mono text-white/70 truncate">
            {browserUrl}
          </div>
        </div>
        <div className="flex-1 relative">
          <iframe
            src={browserUrl}
            className="absolute inset-0 w-full h-full border-none bg-white"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            title="Web Browser"
          />
        </div>
      </div>
    </WindowFrame>
  );
}
