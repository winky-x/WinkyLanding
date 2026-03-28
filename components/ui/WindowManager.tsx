"use client";

import { useStore } from "@/store/useStore";
import TerminalWindow from "./Windows/TerminalWindow";
import SysmonWindow from "./Windows/SysmonWindow";
import NetworkWindow from "./Windows/NetworkWindow";
import BrowserWindow from "./Windows/BrowserWindow";
import ExplorerWindow from "./Windows/ExplorerWindow";
import SettingsWindow from "./Windows/SettingsWindow";
import { AnimatePresence } from "motion/react";

export default function WindowManager() {
  const windows = useStore((state) => state.windows);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <div className="w-full h-full relative pointer-events-auto">
        <AnimatePresence>
          {windows.map((window) => {
            if (!window.isOpen) return null;

            switch (window.type) {
              case "terminal":
                return <TerminalWindow key={window.id} windowState={window} />;
              case "sysmon":
                return <SysmonWindow key={window.id} windowState={window} />;
              case "network":
                return <NetworkWindow key={window.id} windowState={window} />;
              case "browser":
                return <BrowserWindow key={window.id} windowState={window} />;
              case "explorer":
                return <ExplorerWindow key={window.id} windowState={window} />;
              case "settings":
                return <SettingsWindow key={window.id} windowState={window} />;
              default:
                return null;
            }
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
