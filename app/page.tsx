"use client";

import React, { useState } from "react";
import * as FolderTree from "@/components/ui/folder-tree";
import { CodeBlock } from "@/components/ui/codeblock";
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
  Terminal
} from "lucide-react";

export default function Home() {
  const [activeFile, setActiveFile] = useState<keyof typeof files>("about.tsx");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleFileSelect = (id: string) => {
    if (files[id as keyof typeof files]) {
      setActiveFile(id as keyof typeof files);
    }
  };

  const currentFile = files[activeFile];

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-[#cccccc] overflow-hidden font-sans">
      {/* Top Title Bar */}
      <div className="h-8 bg-[#3c3c3c] flex items-center justify-between px-2 select-none">
        <div className="flex items-center gap-2 text-xs">
          <img src="/vscode-icon.svg" alt="VS Code" className="w-4 h-4" onError={(e) => e.currentTarget.style.display = 'none'} />
          <span className="hidden sm:inline">File</span>
          <span className="hidden sm:inline">Edit</span>
          <span className="hidden sm:inline">Selection</span>
          <span className="hidden sm:inline">View</span>
          <span className="hidden sm:inline">Go</span>
          <span className="hidden sm:inline">Run</span>
          <span className="hidden sm:inline">Terminal</span>
          <span className="hidden sm:inline">Help</span>
        </div>
        <div className="text-xs text-[#999999] absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          {activeFile} - Portfolio - Visual Studio Code
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f1fa8c] opacity-50 hover:opacity-100 cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-[#50fa7b] opacity-50 hover:opacity-100 cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-[#ff5555] opacity-50 hover:opacity-100 cursor-pointer"></div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-4 border-r border-[#252526]">
          <div className="cursor-pointer p-2 border-l-2 border-white text-white">
            <FileCode size={24} />
          </div>
          <div className="cursor-pointer p-2 text-[#858585] hover:text-white">
            <Search size={24} />
          </div>
          <div className="cursor-pointer p-2 text-[#858585] hover:text-white">
            <GitBranch size={24} />
          </div>
          <div className="cursor-pointer p-2 text-[#858585] hover:text-white">
            <LayoutTemplate size={24} />
          </div>
          <div className="mt-auto cursor-pointer p-2 text-[#858585] hover:text-white">
            <UserCircle size={24} />
          </div>
          <div className="cursor-pointer p-2 text-[#858585] hover:text-white">
            <Settings size={24} />
          </div>
        </div>

        {/* Sidebar */}
        {sidebarVisible && (
          <div className="w-64 bg-[#252526] flex flex-col border-r border-[#1e1e1e]">
            <div className="h-9 px-4 flex items-center text-xs font-bold uppercase tracking-wider text-[#bbbbbb] bg-[#252526]">
              Explorer
            </div>
            <div className="flex-1 overflow-hidden py-2">
              <FolderTree.Root
                defaultExpanded={["portfolio", "src", "components"]}
                onSelect={handleFileSelect}
                className="bg-transparent border-none h-full"
                defaultSelected="about.tsx"
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
        <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
          {/* Tabs */}
          <div className="flex bg-[#252526] overflow-x-auto scrollbar-hide">
            {Object.values(files).map((file) => (
              <div
                key={file.name}
                onClick={() => setActiveFile(file.name as keyof typeof files)}
                className={`
                  flex items-center gap-2 px-3 py-2 text-sm cursor-pointer border-r border-[#1e1e1e] min-w-fit
                  ${activeFile === file.name ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]' : 'text-[#969696] hover:bg-[#2d2d2d]'}
                `}
              >
                <span className="text-blue-400">TS</span>
                <span>{file.name}</span>
                <X size={14} className="ml-2 hover:bg-[#444444] rounded p-0.5" />
              </div>
            ))}
          </div>

          {/* Breadcrumbs */}
          <div className="h-6 flex items-center px-4 text-xs text-[#969696] bg-[#1e1e1e] border-b border-[#2d2d2d]">
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
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <GitBranch size={12} />
            <span>main*</span>
          </div>
          <div className="flex items-center gap-1">
            <Minus size={12} className="rotate-90" />
            <span>0</span>
            <Minus size={12} className="rotate-90" />
            <span>0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 12, Col 34</span>
          <span>UTF-8</span>
          <span>TypeScript JSX</span>
          <div className="flex items-center gap-1">
            <Bell size={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
