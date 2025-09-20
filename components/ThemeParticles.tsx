"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Particles } from "./ui/particles";

export function ThemeParticles() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <Particles
        color="#3b82f6"
        particleCount={40000}
        particleSize={5}
        animate={false}
        className="opacity-20"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Particles
      color={isDark ? "#ffffff" : "#1e293b"}
      particleCount={40000}
      particleSize={5}
      animate={true}
      className={isDark ? "opacity-60" : "opacity-80"}
    />
  );
}