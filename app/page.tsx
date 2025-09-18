import Image from "next/image";
import NavbarFlow,{HoverLink,FeatureItem,} from "@/components/ui/navbar-flow";
import HeroUI from "@/components/ui/heroui";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <NavbarFlow
        links={[
          {
            text: "Components",
            submenu: (
              <div className="flex flex-col space-y-2">
                <HoverLink url="/components/button">Button</HoverLink>
                <HoverLink url="/components/hero">Hero Section</HoverLink>
                <HoverLink url="/components/navbar">Navbar</HoverLink>
                <HoverLink url="/components/footer">Footer</HoverLink>
                <HoverLink url="/components/cards">Cards</HoverLink>
                <HoverLink url="/components/forms">Forms</HoverLink>
              </div>
            ),
          },
          {
            text: "Templates",
            submenu: (
              <div className="grid grid-cols-1 gap-2 w-48">
                <FeatureItem
                  heading="Portfolio Template"
                  url="/templates/portfolio"
                  info="Clean, personal showcase for designers & developers."
                />
                <FeatureItem
                  heading="Business Template"
                  url="/templates/business"
                  info="Professional website layout for startups & businesses."
                />
                <FeatureItem
                  heading="Blog Template"
                  url="/templates/blog"
                  info="Minimal blog with modern reading experience."
                />
                <FeatureItem
                  heading="Landing Page"
                  url="/templates/landing"
                  info="High-converting landing page for product launches."
                />
              </div>
            ),
          },
          {
            text: "Showcase",
            submenu: (
              <div className="flex flex-col space-y-2">
                <HoverLink url="/showcase/astroship">Astroship</HoverLink>
                <HoverLink url="/showcase/papermod">PaperMod</HoverLink>
                <HoverLink url="/showcase/satori">Satori</HoverLink>
                <HoverLink url="/showcase/scrollx">ScrollX</HoverLink>
                <HoverLink url="/showcase/speedyfolio">Speedyfolio</HoverLink>
              </div>
            ),
          },
          { text: "About", url: "/about" },
        ]}
      />
      <HeroUI />
    </div>
  );
}
