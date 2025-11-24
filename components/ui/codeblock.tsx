"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  Check,
  Copy,
  ChevronRight,
  File,
  Folder,
  Terminal,
  Code2,
  Download,
  Maximize2,
  Minimize2,
  Settings,
} from "lucide-react";

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
  breadcrumb?: string[];
  showStats?: boolean;
  theme?: "dark" | "light";
} & (
    | {
      code: string;
      tabs?: never;
    }
    | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
  );

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
  breadcrumb = [],
  showStats = true,
  theme = "dark",
  fullHeight = false,
}: CodeBlockProps & { fullHeight?: boolean }) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadCode = () => {
    const textToDownload = tabsExist ? tabs[activeTab].code : code;
    const activeFilename = tabsExist ? tabs[activeTab].name : filename;
    if (textToDownload) {
      const blob = new Blob([textToDownload], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = activeFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  const getLanguageIcon = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "javascript":
      case "jsx":
      case "typescript":
      case "tsx":
        return <Code2 size="1em" className="text-yellow-500 dark:text-yellow-400" />;
      case "bash":
      case "shell":
        return <Terminal size="1em" className="text-green-600 dark:text-green-400" />;
      default:
        return <File size="1em" className="text-blue-600 dark:text-blue-400" />;
    }
  };

  const getCodeStats = (code: string) => {
    const lines = code.split("\n").length;
    const chars = code.length;
    const words = code.split(/\s+/).filter((word) => word.length > 0).length;
    return { lines, chars, words };
  };

  const stats = showStats ? getCodeStats(activeCode || "") : null;

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsExpanded(false)}
        />
      )}
      <div
        className={`
          ${isExpanded
            ? "fixed inset-4 md:inset-12 z-50 h-[90vh] flex flex-col shadow-2xl"
            : `relative w-full rounded-xl overflow-hidden shadow-2xl ${fullHeight ? "h-full flex flex-col" : ""}`
          }
          backdrop-blur-lg backdrop-saturate-150
          ${theme === "dark"
            ? "bg-slate-900/40 border border-slate-700/30"
            : "bg-white/90 border border-white/20 shadow-white/20"
          }
        `}
        style={{
          backdropFilter: theme === "light"
            ? "blur(20px) saturate(180%) brightness(110%)"
            : "blur(16px) saturate(150%)"
        }}
      >
        <div
          className={`flex items-stretch min-h-[3rem] backdrop-blur-sm ${theme === "dark"
            ? "bg-slate-800/30 border-b border-slate-700/30"
            : "bg-white/5 border-b border-white/10"
            }`}
          style={{
            backdropFilter: theme === "light"
              ? "blur(10px) saturate(120%) brightness(105%)"
              : undefined
          }}
        >
          <div className="flex-1 flex items-center min-w-0 px-3">
            <div className="flex gap-2 mr-3 shrink-0">
              <div className={`w-3 h-3 rounded-full shadow-sm ${theme === "dark" ? "bg-red-500/80" : "bg-red-400/90 shadow-red-200/50"
                }`}></div>
              <div className={`w-3 h-3 rounded-full shadow-sm ${theme === "dark" ? "bg-yellow-500/80" : "bg-yellow-400/90 shadow-yellow-200/50"
                }`}></div>
              <div className={`w-3 h-3 rounded-full shadow-sm ${theme === "dark" ? "bg-green-500/80" : "bg-green-400/90 shadow-green-200/50"
                }`}></div>
            </div>

            {breadcrumb.length > 0 && (
              <div className="flex items-center min-w-0">
                <Folder
                  size="1em"
                  className={`shrink-0 ${theme === "dark" ? "text-slate-300/80" : "text-gray-700/90"
                    }`}
                />
                <div className="flex items-center min-w-0 ml-2">
                  {breadcrumb.map((crumb, index) => (
                    <React.Fragment key={index}>
                      <span
                        className={`text-xs truncate ${theme === "dark" ? "text-slate-300/80" : "text-gray-700/90"
                          }`}
                      >
                        {crumb}
                      </span>
                      {index < breadcrumb.length - 1 && (
                        <ChevronRight
                          size="0.75em"
                          className={`shrink-0 mx-1 ${theme === "dark" ? "text-slate-400/80" : "text-gray-600/80"
                            }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end shrink-0 px-2">
            {stats && (
              <div
                className={`text-xs mx-2 truncate hidden md:block ${theme === "dark" ? "text-slate-300/80" : "text-gray-700/90"
                  }`}
              >
                {stats.lines}L • {stats.words}W
              </div>
            )}

            <div className="flex">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`p-2 transition-all duration-200 rounded-md backdrop-blur-sm ${theme === "dark"
                  ? "hover:bg-slate-700/40"
                  : "hover:bg-white/20 hover:shadow-md"
                  }`}
                title={isExpanded ? "Exit fullscreen" : "Toggle fullscreen"}
              >
                {isExpanded ? (
                  <Minimize2
                    size="1em"
                    className={
                      theme === "dark" ? "text-slate-300/90" : "text-gray-700/90"
                    }
                  />
                ) : (
                  <Maximize2
                    size="1em"
                    className={
                      theme === "dark" ? "text-slate-300/90" : "text-gray-700/90"
                    }
                  />
                )}
              </button>
              <button
                onClick={downloadCode}
                className={`p-2 transition-all duration-200 rounded-md backdrop-blur-sm ${theme === "dark"
                  ? "hover:bg-slate-700/40"
                  : "hover:bg-white/20 hover:shadow-md"
                  }`}
                title="Download code"
              >
                <Download
                  size="1em"
                  className={
                    theme === "dark" ? "text-slate-300/90" : "text-gray-700/90"
                  }
                />
              </button>
              <button
                onClick={copyToClipboard}
                className={`p-2 transition-all duration-200 rounded-md backdrop-blur-sm ${theme === "dark"
                  ? "hover:bg-slate-700/40"
                  : "hover:bg-white/20 hover:shadow-md"
                  }`}
                title="Copy code"
              >
                {copied ? (
                  <Check size="1em" className="text-green-500" />
                ) : (
                  <Copy
                    size="1em"
                    className={
                      theme === "dark" ? "text-slate-300/90" : "text-gray-700/90"
                    }
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {tabsExist && (
          <div
            className={`flex border-b backdrop-blur-sm overflow-x-auto ${theme === "dark"
              ? "border-slate-700/30 bg-slate-800/20"
              : "border-white/10 bg-white/5"
              }`}
            style={{
              backdropFilter: theme === "light"
                ? "blur(8px) saturate(110%)"
                : undefined
            }}
          >
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-4 py-2 text-sm transition-all duration-200 border-b-2 shrink-0 backdrop-blur-sm ${activeTab === index
                  ? theme === "dark"
                    ? "text-white border-blue-400 bg-slate-900/40"
                    : "text-gray-900 border-blue-500 bg-white/20 shadow-sm"
                  : theme === "dark"
                    ? "text-slate-300/80 border-transparent hover:text-slate-100 hover:bg-slate-700/30"
                    : "text-gray-700/80 border-transparent hover:text-gray-900 hover:bg-white/15"
                  }`}
              >
                {getLanguageIcon(tab.language || language)}
                <span className="truncate max-w-[10rem]">{tab.name}</span>
              </button>
            ))}
          </div>
        )}

        {!tabsExist && filename && (
          <div
            className={`flex items-center px-3 py-2 border-b backdrop-blur-sm ${theme === "dark"
              ? "border-slate-700/30 bg-slate-800/20"
              : "border-white/10 bg-white/5"
              }`}
            style={{
              backdropFilter: theme === "light"
                ? "blur(8px) saturate(110%)"
                : undefined
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              {getLanguageIcon(language)}
              <span
                className={`text-sm font-medium truncate ${theme === "dark" ? "text-slate-200/90" : "text-gray-800/90"
                  }`}
              >
                {filename}
              </span>
            </div>
          </div>
        )}

        <div
          className={`relative backdrop-blur-sm ${fullHeight || isExpanded
            ? "flex-1 h-full overflow-auto"
            : "max-h-96 overflow-auto"
            } ${theme === "dark" ? "bg-slate-900/10" : "bg-white/5"}`}
          style={{
            backdropFilter: theme === "light"
              ? "blur(8px) saturate(110%) brightness(102%)"
              : undefined
          }}
        >
          <SyntaxHighlighter
            language={activeLanguage}
            style={theme === "dark" ? atomDark : oneLight}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              fontSize: "0.875rem",
              lineHeight: "1.5",
            }}
            wrapLines={true}
            showLineNumbers={true}
            lineNumberStyle={{
              minWidth: "3em",
              paddingRight: "1em",
              color: theme === "dark" ? "#64748b80" : "#6b728090",
              borderRight: `1px solid ${theme === "dark" ? "#33415550" : "#e2e8f050"
                }`,
              marginRight: "1em",
            }}
            lineProps={(lineNumber: number) => ({
              style: {
                backgroundColor: activeHighlightLines.includes(lineNumber)
                  ? theme === "dark"
                    ? "rgba(59, 130, 246, 0.15)"
                    : "rgba(59, 130, 246, 0.12)"
                  : "transparent",
                display: "block",
                width: "100%",
                borderLeft: activeHighlightLines.includes(lineNumber)
                  ? theme === "dark"
                    ? "3px solid #3b82f680"
                    : "3px solid #3b82f6a0"
                  : "3px solid transparent",
                paddingLeft: "0.5rem",
              },
            })}
            PreTag="div"
          >
            {String(activeCode)}
          </SyntaxHighlighter>
        </div>

        {showStats && stats && (
          <div
            className={`px-3 py-2 border-t text-xs backdrop-blur-sm flex items-center justify-between min-h-[2.5rem] ${theme === "dark"
              ? "border-slate-700/30 bg-slate-800/20 text-slate-300/80"
              : "border-white/10 bg-white/5 text-gray-700/90"
              }`}
            style={{
              backdropFilter: theme === "light"
                ? "blur(8px) saturate(110%)"
                : undefined
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="truncate">{activeLanguage.toUpperCase()}</span>
              <span className="truncate hidden sm:inline">
                {stats.lines} lines
              </span>
              <span className="truncate hidden md:inline">
                {stats.chars} chars
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Settings size="0.75em" />
              <span>UTF-8</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};