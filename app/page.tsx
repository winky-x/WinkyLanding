"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useStore } from "@/store/useStore";
import Nebula from "@/components/canvas/Nebula";
import OmniInput from "@/components/ui/OmniInput";
import GhostTerminal from "@/components/ui/GhostTerminal";
import BiomeToggle from "@/components/ui/BiomeToggle";
import WindowManager from "@/components/ui/WindowManager";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const mode = useStore((state) => state.mode);

  return (
    <main
      className={cn(
        "relative w-full h-screen overflow-hidden transition-colors duration-1000",
        mode === "agent" ? "bg-[#050505]" : "bg-[#f8f9fa]",
      )}
    >
      {/* Film Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay bg-noise"></div>

      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 45 }}
          dpr={[1, 2]} // Optimize for high DPI displays
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <Nebula />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay Layer */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        <GhostTerminal />
        <BiomeToggle />
        <WindowManager />

        {/* Omni-Input needs pointer events */}
        <div className="pointer-events-auto">
          <OmniInput />
        </div>
      </div>
    </main>
  );
}
