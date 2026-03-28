"use client";

import { useStore } from "@/store/useStore";
import TerminalWindow from "./Windows/TerminalWindow";
import SysmonWindow from "./Windows/SysmonWindow";
import NetworkWindow from "./Windows/NetworkWindow";
import { AnimatePresence } from "motion/react";

export default function WindowManager() {
  const windows = useStore((state) => state.windows);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
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
              default:
                return null;
            }
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
