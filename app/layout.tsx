import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Particles } from "@/components/ui/particles";

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
          {/* Particles background for entire site */}
          <div className="fixed inset-0 z-0">
            <Particles
              color="#fffff"
              particleCount={25000}
              particleSize={5}
              animate={false}
              className="z-0"
            />
          </div>
        
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}