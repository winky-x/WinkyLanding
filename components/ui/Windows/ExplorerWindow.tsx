"use client";

import { useState, useMemo } from "react";
import { useStore, WindowState } from "@/store/useStore";
import WindowFrame from "./WindowFrame";
import { Folder, FileText, ChevronUp, ChevronRight, HardDrive } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ExplorerWindow({
  windowState,
}: {
  windowState: WindowState;
}) {
  const mode = useStore((state) => state.mode);
  const vfs = useStore((state) => state.vfs);
  const [currentPath, setCurrentPath] = useState("/home/winky");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const children = useMemo(() => {
    const prefix = currentPath === "/" ? "/" : currentPath + "/";
    return Object.entries(vfs)
      .filter(([k]) => k.startsWith(prefix) && k !== currentPath && k.substring(prefix.length).indexOf("/") === -1)
      .map(([k, v]) => ({
        name: k.substring(prefix.length),
        path: k,
        ...v,
      }))
      .sort((a, b) => {
        // Folders first
        if (a.type === "dir" && b.type !== "dir") return -1;
        if (a.type !== "dir" && b.type === "dir") return 1;
        return a.name.localeCompare(b.name);
      });
  }, [currentPath, vfs]);

  const handleNavigateUp = () => {
    if (currentPath === "/") return;
    const parts = currentPath.split("/").filter(Boolean);
    parts.pop();
    setCurrentPath("/" + parts.join("/"));
    setSelectedFile(null);
  };

  const handleDoubleClick = (item: any) => {
    if (item.type === "dir") {
      setCurrentPath(item.path);
      setSelectedFile(null);
    } else {
      setSelectedFile(item.path);
    }
  };

  return (
    <WindowFrame
      windowState={windowState}
      title="VFS_EXPLORER"
      className="w-[700px] h-[500px]"
    >
      <div
        className={cn(
          "h-full flex flex-col font-mono text-sm",
          mode === "agent" ? "bg-black/90 text-white" : "bg-white/90 text-black"
        )}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-2 border-b border-white/10 bg-black/20">
          <button
            onClick={handleNavigateUp}
            disabled={currentPath === "/"}
            className="p-1 rounded hover:bg-white/10 disabled:opacity-50 transition-colors"
          >
            <ChevronUp size={18} />
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded flex-1 overflow-hidden border border-white/5">
            <HardDrive size={14} className="text-pink-500 shrink-0" />
            <ChevronRight size={14} className="text-white/30 shrink-0" />
            <span className="truncate text-white/80">{currentPath}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* File List */}
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-4 sm:grid-cols-5 gap-4 content-start">
            {children.map((child) => {
              const isSelected = selectedFile === child.path;
              return (
                <div
                  key={child.path}
                  onDoubleClick={() => handleDoubleClick(child)}
                  onClick={() => child.type === "file" && setSelectedFile(child.path)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer transition-all",
                    isSelected
                      ? "bg-pink-500/20 border border-pink-500/50 shadow-[0_0_15px_rgba(255,0,127,0.2)]"
                      : "hover:bg-white/5 border border-transparent"
                  )}
                >
                  {child.type === "dir" ? (
                    <Folder size={36} className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                  ) : (
                    <FileText size={36} className="text-gray-400 drop-shadow-[0_0_8px_rgba(156,163,175,0.5)]" />
                  )}
                  <span className="text-xs truncate w-full text-center text-white/80">
                    {child.name}
                  </span>
                </div>
              );
            })}
            {children.length === 0 && (
              <div className="col-span-full text-center py-12 text-white/30">
                Directory is empty
              </div>
            )}
          </div>

          {/* Preview Pane */}
          {selectedFile && vfs[selectedFile] && (
            <div className="w-1/3 border-l border-white/10 bg-black/40 p-4 flex flex-col overflow-hidden">
              <div className="font-bold mb-3 truncate border-b border-white/10 pb-2 text-pink-400">
                {selectedFile.split("/").pop()}
              </div>
              <div className="flex-1 overflow-y-auto text-xs text-white/70 whitespace-pre-wrap break-all">
                {vfs[selectedFile].content || <span className="italic opacity-50">Empty file</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </WindowFrame>
  );
}
