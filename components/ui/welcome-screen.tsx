"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface WelcomeScreenProps {
    onNavigate: (fileId: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
    const [lines, setLines] = useState<string[]>([]);
    const bootSequence = [
        "Initializing system environment...",
        "Loading kernel modules...",
        "Mounting file systems...",
        "Starting network services...",
        "User authentication... [OK]",
        "Loading portfolio data... [OK]",
        "System ready.",
    ];

    useEffect(() => {
        let delay = 0;
        bootSequence.forEach((line, index) => {
            delay += Math.random() * 300 + 100;
            setTimeout(() => {
                setLines((prev) => [...prev, line]);
            }, delay);
        });
    }, []);

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-hidden relative z-10 select-none">
            <div className="max-w-2xl w-full bg-[#1e1e1e]/80 backdrop-blur-md border border-[#333] rounded-lg p-6 shadow-2xl font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-[#333] pb-2">
                    <Terminal size={16} className="text-green-500" />
                    <span className="text-[#cccccc]">terminal -- portfolio</span>
                </div>

                <div className="space-y-1">
                    {lines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[#cccccc]"
                        >
                            <span className="text-green-500 mr-2">➜</span>
                            {line}
                        </motion.div>
                    ))}

                    {lines.length === bootSequence.length && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6"
                        >
                            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                                WELCOME
                            </h1>
                            <p className="text-[#858585] mb-4">
                                Explore the codebase using the <span className="text-white">Explorer</span> or <span className="text-white">Terminal</span>.
                            </p>
                            <div className="flex items-center gap-2 text-green-500">
                                <span>guest@portfolio:~$</span>
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="w-2 h-5 bg-green-500 block"
                                />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};
