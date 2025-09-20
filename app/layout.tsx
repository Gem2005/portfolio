import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeParticles } from "@/components/ThemeParticles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Portfolio",
  description: "Your portfolio description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Theme-aware particles background for entire site */}
          <div className="fixed inset-0 z-0">
            <ThemeParticles />
          </div>
        
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}