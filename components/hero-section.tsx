import { Particles } from "./ui/particles";

const HeroSection = () => {
  return (
    <section className="relative">
      <Particles
            color="#fffff"
            particleCount={25000}
            particleSize={5}
            animate={false}
            className="z-0"
        />
      <h1 className="text-5xl font-bold">Welcome to Our Website</h1>
    </section>
  );
};

export default HeroSection;
