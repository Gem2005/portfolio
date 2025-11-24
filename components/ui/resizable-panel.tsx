"use client";

import React, { useState, useRef, useEffect } from "react";
import { Columns, Code2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResizablePanelProps {
    left: React.ReactNode;
    right: React.ReactNode;
    isPreviewVisible?: boolean;
}

export const ResizablePanel = ({
    left,
    right,
    isPreviewVisible = true,
}: ResizablePanelProps) => {
    const [width, setWidth] = useState(50); // Percentage
    const [isDragging, setIsDragging] = useState(false);
    const [viewMode, setViewMode] = useState<"split" | "code" | "preview">("split");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isPreviewVisible) {
            setViewMode("code");
        } else {
            setViewMode("split");
        }
    }, [isPreviewVisible]);

    const startResizing = React.useCallback((e: React.MouseEvent) => {
        setIsDragging(true);
        e.preventDefault();
    }, []);

    const stopResizing = React.useCallback(() => {
        setIsDragging(false);
    }, []);

    const resize = React.useCallback(
        (e: MouseEvent) => {
            if (isDragging && containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const relativeX = e.clientX - containerRect.left;
                const newWidth = (relativeX / containerRect.width) * 100;

                if (newWidth > 20 && newWidth < 80) {
                    setWidth(newWidth);
                }
            }
        },
        [isDragging]
    );

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    return (
        <div className="flex flex-col h-full w-full overflow-hidden bg-[#1e1e1e]/50 backdrop-blur-sm rounded-xl border border-white/10">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-white/10">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        View Mode
                    </span>
                </div>
                <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode("code")}
                        className={cn(
                            "p-1.5 rounded-md transition-all",
                            viewMode === "code"
                                ? "bg-[#007acc] text-white shadow-sm"
                                : "text-gray-400 hover:text-white hover:bg-white/10"
                        )}
                        title="Code Only"
                    >
                        <Code2 size={14} />
                    </button>
                    <button
                        onClick={() => setViewMode("split")}
                        className={cn(
                            "p-1.5 rounded-md transition-all",
                            viewMode === "split"
                                ? "bg-[#007acc] text-white shadow-sm"
                                : "text-gray-400 hover:text-white hover:bg-white/10"
                        )}
                        title="Split View"
                    >
                        <Columns size={14} />
                    </button>
                    <button
                        onClick={() => setViewMode("preview")}
                        className={cn(
                            "p-1.5 rounded-md transition-all",
                            viewMode === "preview"
                                ? "bg-[#007acc] text-white shadow-sm"
                                : "text-gray-400 hover:text-white hover:bg-white/10"
                        )}
                        title="Preview Only"
                    >
                        <Eye size={14} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative flex overflow-hidden" ref={containerRef}>
                {/* Left Pane (Code) */}
                <div
                    className={cn(
                        "h-full overflow-hidden",
                        !isDragging && "transition-all duration-300 ease-in-out",
                        viewMode === "code" && "w-full",
                        viewMode === "preview" && "w-0 hidden",
                        viewMode === "split" && "relative"
                    )}
                    style={viewMode === "split" ? { width: `${width}%` } : undefined}
                >
                    {left}
                </div>

                {/* Resizer Handle (Only in Split Mode) */}
                {viewMode === "split" && (
                    <div
                        className="w-1 bg-[#2d2d2d] hover:bg-[#007acc] cursor-col-resize transition-colors z-10 flex items-center justify-center group"
                        onMouseDown={startResizing}
                    >
                        <div className="w-0.5 h-8 bg-gray-600 group-hover:bg-white rounded-full transition-colors" />
                    </div>
                )}

                {/* Right Pane (Preview) */}
                <div
                    className={cn(
                        "h-full overflow-hidden bg-white/5 transition-all duration-300 ease-in-out",
                        viewMode === "preview" && "w-full",
                        viewMode === "code" && "w-0 hidden",
                        viewMode === "split" && "flex-1"
                    )}
                >
                    <div className="h-full w-full overflow-auto relative">
                        {/* Preview Header/Toolbar could go here if needed */}
                        {right}
                    </div>
                </div>
            </div>
        </div>
    );
};
