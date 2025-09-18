import NavbarFlow, {
  FeatureItem,
  HoverLink,
} from "@/components/ui/navbar-flow";
import { ThemeSwitch } from "./ui/theme-switch";
import { Sun, Moon, Laptop } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <NavbarFlow
        emblem={<Image
            src="/images/gem_sig.png"
            alt="Gem Signature"
            width={120}
            height={40}
            className="object-contain"
            priority
          />}
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