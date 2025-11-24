"use client";

import React, { useState, useRef, useEffect } from "react";
import * as FolderTree from "@/components/ui/folder-tree";
import { CodeBlock } from "@/components/ui/codeblock";
import { Terminal } from "@/components/ui/terminal";
import { WelcomeScreen } from "@/components/ui/welcome-screen";
import { files } from "@/lib/data";
import {
  Search,
  GitBranch,
  Menu,
  Bell,
  UserCircle,
  Settings,
  X,
  Minus,
  Square,
  LayoutTemplate,
  FileCode,
  Terminal as TerminalIcon,
  Command,
  ChevronRight,
  Download,
  Copy,
  Maximize2,
  Minimize2,
  Github,
  Info
} from "lucide-react";

export default function Home() {
  const [activeFile, setActiveFile] = useState<keyof typeof files | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(192); // Default 12rem
  const [isResizing, setIsResizing] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (id: string) => {
    if (files[id as keyof typeof files]) {
      setActiveFile(id as keyof typeof files);
    }
  };

  const currentFile = activeFile ? files[activeFile] : null;

  // Resize Logic
  const startResizing = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newHeight = containerRect.bottom - e.clientY;
      // Min height 100px, Max height 80% of container
      const constrainedHeight = Math.max(100, Math.min(newHeight, containerRect.height * 0.8));
      setTerminalHeight(constrainedHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Menu Actions
  const menuActions = {
    file: [
      { label: "New File", shortcut: "Ctrl+N", action: () => alert("New File not implemented") },
      { label: "Open File...", shortcut: "Ctrl+O", action: () => alert("Open File not implemented") },
      { separator: true },
      { label: "Save", shortcut: "Ctrl+S", action: () => alert("Auto-save is enabled") },
      { label: "Download Resume", icon: Download, action: () => window.open("/resume.pdf", "_blank") },
      { separator: true },
      { label: "Close Editor", shortcut: "Ctrl+W", action: () => setActiveFile(null) },
    ],
    edit: [
      { label: "Undo", shortcut: "Ctrl+Z", action: () => { } },
      { label: "Redo", shortcut: "Ctrl+Y", action: () => { } },
      { separator: true },
      { label: "Cut", shortcut: "Ctrl+X", action: () => { } },
      {
        label: "Copy", icon: Copy, shortcut: "Ctrl+C", action: () => {
          if (currentFile) navigator.clipboard.writeText(currentFile.content);
        }
      },
      { label: "Paste", shortcut: "Ctrl+V", action: () => { } },
    ],
    view: [
      { label: "Explorer", shortcut: "Ctrl+Shift+E", action: () => setSidebarVisible(!sidebarVisible) },
      { label: "Search", shortcut: "Ctrl+Shift+F", action: () => { } },
      { separator: true },
      { label: "Toggle Terminal", shortcut: 'Ctrl+`', action: () => setIsTerminalOpen(!isTerminalOpen) },
      {
        label: "Toggle Full Screen", icon: Maximize2, shortcut: "F11", action: () => {
          if (!document.fullscreenElement) document.documentElement.requestFullscreen();
          else document.exitFullscreen();
        }
      },
    ],
    help: [
      { label: "Welcome", action: () => setActiveFile(null) },
      { label: "Documentation", action: () => window.open("https://code.visualstudio.com/docs", "_blank") },
      { separator: true },
      { label: "About", icon: Info, action: () => handleFileSelect("about.tsx") },
      { label: "View Source", icon: Github, action: () => window.open("https://github.com", "_blank") },
    ]
  };

  return (
    <div
      className="flex flex-col h-screen bg-[url('/wallpaper.jpg')] bg-cover bg-center overflow-hidden font-sans text-[#cccccc] select-none"
      onClick={() => setActiveMenu(null)}
    >
      {/* Overlay for translucency */}
      <div className="absolute inset-0 bg-[#1e1e1e]/40 backdrop-blur-xl z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Title Bar */}
        <div className="h-8 bg-[#3c3c3c]/40 backdrop-blur-xl flex items-center justify-between px-2 select-none border-b border-black/20 z-50">
          <div className="flex items-center gap-1 text-xs">
            <img src="/vscode-icon.svg" alt="VS Code" className="w-4 h-4 mr-2" onError={(e) => e.currentTarget.style.display = 'none'} />
            {Object.entries(menuActions).map(([key, items]) => (
              <div key={key} className="relative">
                <span
                  className={`px-2 py-1 rounded cursor-pointer capitalize hover:bg-white/10 ${activeMenu === key ? "bg-white/10 text-white" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(activeMenu === key ? null : key);
                  }}
                  onMouseEnter={() => activeMenu && setActiveMenu(key)}
                >
                  {key}
                </span>
                {activeMenu === key && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-[#252526]/95 backdrop-blur-xl border border-[#454545] shadow-2xl rounded-md py-1 z-50">
                    {items.map((item: any, i) => (
                      item.separator ? (
                        <div key={i} className="h-[1px] bg-[#454545] my-1 mx-2" />
                      ) : (
                        <div
                          key={i}
                          className="px-4 py-1.5 hover:bg-[#094771] hover:text-white cursor-pointer flex items-center justify-between group"
                          onClick={() => {
                            item.action();
                            setActiveMenu(null);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon && <item.icon size={14} />}
                            <span>{item.label}</span>
                          </div>
                          {item.shortcut && <span className="text-xs text-[#999999] group-hover:text-white ml-4">{item.shortcut}</span>}
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-xs text-[#999999] absolute left-1/2 transform -translate-x-1/2 hidden md:block pointer-events-none">
            {activeFile ? `${activeFile} - ` : ""}Portfolio - Visual Studio Code
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f1fa8c] opacity-80 hover:opacity-100 cursor-pointer shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#50fa7b] opacity-80 hover:opacity-100 cursor-pointer shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#ff5555] opacity-80 hover:opacity-100 cursor-pointer shadow-sm"></div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden" ref={containerRef}>
          {/* Activity Bar */}
          <div className="w-12 bg-[#333333]/40 flex flex-col items-center py-2 gap-4 border-r border-white/5 backdrop-blur-xl z-20">
            <div className="cursor-pointer p-2 border-l-2 border-white text-white">
              <FileCode size={24} />
            </div>
            <div className="cursor-pointer p-2 text-[#858585] hover:text-white transition-colors">
              <Search size={24} />
            </div>
            <div className="cursor-pointer p-2 text-[#858585] hover:text-white transition-colors">
              <GitBranch size={24} />
            </div>
            <div className="cursor-pointer p-2 text-[#858585] hover:text-white transition-colors">
              <LayoutTemplate size={24} />
            </div>
            <div className="mt-auto cursor-pointer p-2 text-[#858585] hover:text-white transition-colors">
              <UserCircle size={24} />
            </div>
            <div className="cursor-pointer p-2 text-[#858585] hover:text-white transition-colors">
              <Settings size={24} />
            </div>
          </div>

          {/* Sidebar */}
          {sidebarVisible && (
            <div className="w-64 bg-[#252526]/40 flex flex-col border-r border-white/5 backdrop-blur-xl z-10">
              <div className="h-9 px-4 flex items-center text-xs font-bold uppercase tracking-wider text-[#bbbbbb] bg-[#252526]/40">
                Explorer
              </div>
              <div className="flex-1 overflow-hidden py-2">
                <FolderTree.Root
                  defaultExpanded={["portfolio", "src", "components"]}
                  onSelect={handleFileSelect}
                  className="bg-transparent border-none h-full"
                  defaultSelected={activeFile || undefined}
                >
                  <FolderTree.Item id="portfolio" label="PORTFOLIO">
                    <FolderTree.Item id="src" label="src">
                      <FolderTree.Item id="about.tsx" label="about.tsx" icon={FileCode} />
                      <FolderTree.Item id="experience.json" label="experience.json" icon={FileCode} />
                      <FolderTree.Item id="projects.ts" label="projects.ts" icon={FileCode} />
                      <FolderTree.Item id="contact.css" label="contact.css" icon={FileCode} />
                    </FolderTree.Item>
                    <FolderTree.Item id="components" label="components">
                      <FolderTree.Item id="ui" label="ui" />
                    </FolderTree.Item>
                    <FolderTree.Item id="public" label="public" />
                    <FolderTree.Item id="package.json" label="package.json" />
                    <FolderTree.Item id="README.md" label="README.md" />
                  </FolderTree.Item>
                </FolderTree.Root>
              </div>
            </div>
          )}

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col bg-[#1e1e1e]/30 backdrop-blur-xl overflow-hidden relative min-w-0">
            {currentFile ? (
              <>
                {/* Tabs */}
                <div className="flex bg-[#252526]/60 overflow-x-auto scrollbar-hide border-b border-white/5">
                  <div
                    className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer border-r border-white/5 min-w-fit bg-[#1e1e1e]/60 text-white border-t-2 border-t-[#007acc]"
                  >
                    <span className="text-blue-400">TS</span>
                    <span>{currentFile.name}</span>
                    <X
                      size={14}
                      className="ml-2 hover:bg-[#444444] rounded p-0.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveFile(null);
                      }}
                    />
                  </div>
                </div>

                {/* Breadcrumbs */}
                <div className="h-6 flex items-center px-4 text-xs text-[#969696] bg-[#1e1e1e]/20 border-b border-white/5">
                  src <span className="mx-1">{'>'}</span> {activeFile}
                </div>

                {/* Code Area */}
                <div className="flex-1 overflow-hidden p-0 relative">
                  <CodeBlock
                    language={currentFile.language}
                    filename={currentFile.name}
                    code={currentFile.content}
                    theme="dark"
                    showStats={true}
                    fullHeight={true}
                  />
                </div>
              </>
            ) : (
              /* Empty State / Welcome Screen */
              <WelcomeScreen onNavigate={handleFileSelect} />
            )}

            {/* Terminal Splitter and Component */}
            {isTerminalOpen && (
              <>
                <div
                  className="h-1 bg-[#007acc] cursor-row-resize hover:bg-[#0098ff] transition-colors z-20"
                  onMouseDown={startResizing}
                />
                <Terminal
                  isOpen={isTerminalOpen}
                  onClose={() => setIsTerminalOpen(false)}
                  onMinimize={() => setIsTerminalOpen(false)}
                  height={terminalHeight}
                />
              </>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-6 bg-[#007acc]/60 text-white flex items-center justify-between px-3 text-xs select-none backdrop-blur-xl z-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded">
              <GitBranch size={12} />
              <span>main*</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded">
              <Minus size={12} className="rotate-90" />
              <span>0</span>
              <Minus size={12} className="rotate-90" />
              <span>0</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {activeFile && (
              <>
                <span className="cursor-pointer hover:bg-white/20 px-1 rounded">Ln 12, Col 34</span>
                <span className="cursor-pointer hover:bg-white/20 px-1 rounded">UTF-8</span>
                <span className="cursor-pointer hover:bg-white/20 px-1 rounded">TypeScript JSX</span>
              </>
            )}
            <div
              className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded"
              onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            >
              <TerminalIcon size={12} />
              <span className="hidden sm:inline">Terminal</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded">
              <Bell size={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
