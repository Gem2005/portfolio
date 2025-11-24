import { CodeBlock } from "@/components/ui/codeblock";
import GlowingBorderCard from "./ui/glowingbordercard";
const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Hero Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your Name
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-medium">
                Full Stack Developer & UI/UX Designer
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                I create beautiful, functional, and user-centered digital experiences. 
                Passionate about clean code, modern design, and innovative solutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                View My Work
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 font-semibold rounded-lg transition-all duration-200">
                Download CV
              </button>
            </div>

            {/* Tech Stack */}
            <div className="pt-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                TECH STACK
              </p>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'AWS'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Code Block */}
          <div className="w-full lg:max-w-2xl">
            <GlowingBorderCard  className="w-full h-full" fromColor="purple-600" toColor="purple-600">
              <CodeBlock
              language="typescript"
              filename="portfolio.tsx"
              code={`const developer = {
  name: "Your Name",
  role: "Full Stack Developer",
  location: "Your City",
  
  skills: [
    "React", "TypeScript", "Next.js",
    "Node.js", "Python", "AWS"
  ],
  
  currentProject: "Building amazing UIs",
  
  getIntroduction() {
    return \`Hi! I'm \${this.name}, 
    a passionate \${this.role} 
    from \${this.location}.\`;
  },
  
  collaborate() {
    return "Let's build something amazing together!";
  }
};

// Ready to work on your next project
developer.getIntroduction();
console.log(developer.collaborate());`}
              breadcrumb={['src', 'components', 'portfolio']}
              showStats={true}
              theme="dark"
              highlightLines={[9, 10, 18, 19]}
            />
            </GlowingBorderCard>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;