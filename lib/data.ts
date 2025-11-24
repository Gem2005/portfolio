export const files = {
    "about.tsx": {
        name: "about.tsx",
        language: "tsx",
        content: `import React from 'react';

export const About = () => {
  return (
    <div className="about-me">
      <h1>About Me</h1>
      <p>
        I am a passionate Full Stack Developer with a love for building
        scalable and user-friendly web applications. I enjoy solving
        complex problems and learning new technologies.
      </p>
      
      <h2>Skills</h2>
      <ul>
        <li>React / Next.js</li>
        <li>TypeScript / JavaScript</li>
        <li>Node.js / Express</li>
        <li>Tailwind CSS</li>
        <li>PostgreSQL / MongoDB</li>
      </ul>
    </div>
  );
};`
    },
    "experience.json": {
        name: "experience.json",
        language: "json",
        content: `[
  {
    "company": "Tech Corp",
    "role": "Senior Frontend Engineer",
    "period": "2022 - Present",
    "description": "Leading the frontend team in building a modern SaaS platform using Next.js and Tailwind CSS."
  },
  {
    "company": "Startup Inc",
    "role": "Full Stack Developer",
    "period": "2020 - 2022",
    "description": "Developed and maintained multiple client projects using MERN stack."
  },
  {
    "company": "Freelance",
    "role": "Web Developer",
    "period": "2018 - 2020",
    "description": "Worked with various clients to deliver custom web solutions."
  }
]`
    },
    "projects.ts": {
        name: "projects.ts",
        language: "typescript",
        content: `interface Project {
  name: string;
  description: string;
  techStack: string[];
  link: string;
}

export const projects: Project[] = [
  {
    name: "E-commerce Platform",
    description: "A full-featured online store with cart and payment integration.",
    techStack: ["Next.js", "Stripe", "Prisma"],
    link: "https://github.com/user/ecommerce"
  },
  {
    name: "Task Management App",
    description: "A collaborative task manager with real-time updates.",
    techStack: ["React", "Firebase", "Tailwind"],
    link: "https://github.com/user/taskmanager"
  },
  {
    name: "Portfolio Website",
    description: "A VS Code themed portfolio website.",
    techStack: ["Next.js", "Framer Motion", "Lucide React"],
    link: "https://github.com/user/portfolio"
  }
];`
    },
    "contact.css": {
        name: "contact.css",
        language: "css",
        content: `.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}`
    }
};
