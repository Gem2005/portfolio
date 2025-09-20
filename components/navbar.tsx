"use client";
import NavbarFlow, {
  FeatureItem,
  HoverLink,
} from "@/components/ui/navbar-flow";
import { ThemeSwitch } from "./ui/theme-switch";
import { Sun, Moon, Laptop } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <NavbarFlow
        emblem={
          <div className="w-[200px] h-[72px]" /> // Placeholder with same dimensions
        }
        links={[
          { text: "Home", url: "/" },
          {
            text: "About",
            submenu: (
              <div className="flex flex-col space-y-2">
                <HoverLink url="/about">About Me</HoverLink>
                <HoverLink url="/resume">Resume</HoverLink>
                <HoverLink url="/skills">Skills</HoverLink>
                <HoverLink url="/experience">Experience</HoverLink>
              </div>
            ),
          },
          {
            text: "Projects",
            submenu: (
              <div className="grid grid-cols-1 gap-2 w-64">
                <FeatureItem
                  heading="Web Applications"
                  url="/projects/web-apps"
                  info="Full-stack applications and websites I've built."
                />
                <FeatureItem
                  heading="Mobile Apps"
                  url="/projects/mobile"
                  info="React Native and native mobile applications."
                />
                <FeatureItem
                  heading="Open Source"
                  url="/projects/open-source"
                  info="My contributions to open source projects."
                />
                <FeatureItem
                  heading="UI/UX Design"
                  url="/projects/design"
                  info="Design projects and user interface work."
                />
              </div>
            ),
          },
          {
            text: "Services",
            submenu: (
              <div className="flex flex-col space-y-2">
                <HoverLink url="/services/web-development">Web Development</HoverLink>
                <HoverLink url="/services/mobile-development">Mobile Development</HoverLink>
                <HoverLink url="/services/ui-ux-design">UI/UX Design</HoverLink>
                <HoverLink url="/services/consulting">Consulting</HoverLink>
                <HoverLink url="/services/freelance">Freelance Work</HoverLink>
              </div>
            ),
          },
          { text: "Blog", url: "/blog" },
          { text: "Contact", url: "/contact" },
        ]}
        rightComponent={
          <ThemeSwitch
            variant="icon-click"
            modes={["light", "dark", "system"]}
            icons={[
              <Sun key="sun-icon" size={16} />,
              <Moon key="moon-icon" size={16} />,
              <Laptop key="laptop-icon" size={16} />,
            ]}
            showInactiveIcons="all"
          />
        }
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <NavbarFlow
        emblem={
          <div className="relative">
            <Image
              src="/images/gem_sig_black.svg"
              alt="Gem Signature"
              width={200}
              height={72}
              className={`object-contain transition-opacity duration-300 ${
                isDark ? "opacity-0" : "opacity-100"
              }`}
              priority
            />
            <Image
              src="/images/gem_sig_white.svg"
              alt="Gem Signature"
              width={200}
              height={72}
              className={`object-contain absolute inset-0 transition-opacity duration-300 ${
                isDark ? "opacity-100" : "opacity-0"
              }`}
              priority
            />
          </div>
        }
        links={[
          { text: "Home", url: "/" },
          {
            text: "About",
            submenu: (
              <div className="flex flex-col space-y-2">
                <HoverLink url="/about">About Me</HoverLink>
                <HoverLink url="/resume">Resume</HoverLink>
                <HoverLink url="/skills">Skills</HoverLink>
                <HoverLink url="/experience">Experience</HoverLink>
              </div>
            ),
          },
          {
            text: "Projects",
            submenu: (
              <div className="grid grid-cols-1 gap-2 w-64">
                <FeatureItem
                  heading="Web Applications"
                  url="/projects/web-apps"
                  info="Full-stack applications and websites I've built."
                />
                <FeatureItem
                  heading="Mobile Apps"
                  url="/projects/mobile"
                  info="React Native and native mobile applications."
                />
                <FeatureItem
                  heading="Open Source"
                  url="/projects/open-source"
                  info="My contributions to open source projects."
                />
                <FeatureItem
                  heading="UI/UX Design"
                  url="/projects/design"
                  info="Design projects and user interface work."
                />
              </div>
            ),
          },
          {
            text: "Services",
            submenu: (
              <div className="flex flex-col space-y-2">
                <HoverLink url="/services/web-development">Web Development</HoverLink>
                <HoverLink url="/services/mobile-development">Mobile Development</HoverLink>
                <HoverLink url="/services/ui-ux-design">UI/UX Design</HoverLink>
                <HoverLink url="/services/consulting">Consulting</HoverLink>
                <HoverLink url="/services/freelance">Freelance Work</HoverLink>
              </div>
            ),
          },
          { text: "Blog", url: "/blog" },
          { text: "Contact", url: "/contact" },
        ]}
        rightComponent={
          <ThemeSwitch
            variant="icon-click"
            modes={["light", "dark", "system"]}
            icons={[
              <Sun key="sun-icon" size={16} />,
              <Moon key="moon-icon" size={16} />,
              <Laptop key="laptop-icon" size={16} />,
            ]}
            showInactiveIcons="all"
          />
        }
      />
    </>
  );
}