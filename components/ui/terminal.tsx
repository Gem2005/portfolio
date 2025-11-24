"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Minus, ChevronUp, ChevronDown, Terminal as TerminalIcon } from "lucide-react";

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
    onMinimize: () => void;
    height?: number;
}

export const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, onMinimize, height = 192 }) => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([
        "Welcome to Portfolio Terminal v1.0.0",
        "Type 'help' for available commands.",
    ]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
            inputRef.current?.focus();
        }
    }, [history, isOpen]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        let output: string[] = [`$ ${cmd}`];

        switch (trimmedCmd) {
            case "help":
                output.push(
                    "Available commands:",
                    "  about     - Display information about me",
                    "  projects  - List my projects",
                    "  skills    - Show my technical skills",
                    "  contact   - Get my contact info",
                    "  clear     - Clear the terminal",
                    "  whoami    - Display current user"
                );
                break;
            case "about":
                output.push(
                    "I am a Full Stack Developer passionate about building scalable web applications.",
                    "Check 'src/about.tsx' for more details."
                );
                break;
            case "projects":
                output.push(
                    "1. E-commerce Platform",
                    "2. Task Management App",
                    "3. Portfolio Website",
                    "Type 'cat projects.ts' in the file explorer to see code."
                );
                break;
            case "skills":
                output.push("React, Next.js, TypeScript, Node.js, Tailwind CSS, PostgreSQL");
                break;
            case "contact":
                output.push("Email: hello@example.com", "GitHub: github.com/example");
                break;
            case "clear":
                setHistory([]);
                return;
            case "whoami":
                output.push("guest@portfolio");
                break;
            case "":
                break;
            default:
                output.push(`Command not found: ${cmd}. Type 'help' for commands.`);
        }

        setHistory((prev) => [...prev, ...output]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="bg-[#1e1e1e]/40 backdrop-blur-xl border-t border-[#333] flex flex-col text-sm font-mono transition-all duration-75 ease-out"
            style={{ height: height }}
        >
            <div className="flex items-center justify-between px-4 py-1 bg-[#252526]/40 border-b border-[#333] select-none">
                <div className="flex items-center gap-2 text-[#cccccc]">
                    <TerminalIcon size={12} />
                    <span className="text-xs uppercase font-bold">Terminal</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onMinimize} className="hover:bg-[#333] p-1 rounded">
                        <ChevronDown size={14} className="text-[#cccccc]" />
                    </button>
                    <button onClick={onClose} className="hover:bg-[#333] p-1 rounded">
                        <X size={14} className="text-[#cccccc]" />
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 text-[#cccccc] font-mono" onClick={() => inputRef.current?.focus()}>
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap mb-1 leading-tight">
                        {line}
                    </div>
                ))}
                <div className="flex items-center gap-2">
                    <span className="text-green-500">➜</span>
                    <span className="text-blue-400">~</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-[#cccccc] font-mono ml-1"
                        autoFocus
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
