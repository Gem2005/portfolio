export const aboutData = {
    name: "Gemini Sharma",
    role: "Software Development Engineer",
    description: "I am a Software Development Engineer and B.Tech student at VIT Chennai. I specialize in Full Stack Development and DevOps, with a strong focus on building scalable, intelligent applications using modern technologies like Next.js, Kubernetes, and AI integration.",
    education: [
        {
            school: "Vellore Institute of Technology, Chennai",
            degree: "B.Tech. in Electronics and Computer Engineering",
            period: "Aug 2023 – July 2027",
            score: "CGPA: 6.36"
        },
        {
            school: "Matrix High School, Sikar",
            degree: "Board of Secondary Education, Rajasthan",
            period: "April 2022 – May 2023",
            score: "86.20%"
        }
    ],
    skills: [
        "Python, Java, C++",
        "Next.js, React, TypeScript",
        "Node.js, Express, PostgreSQL",
        "Kubernetes, Docker, Azure",
        "Terraform, Jenkins, ArgoCD"
    ]
};

export const experienceData = [
    {
        company: "Verfolia",
        role: "Software Development Engineer",
        period: "Nov 2025 – Present",
        description: "Built a full-stack resume platform with Gemini AI. Engineered a scalable serverless backend, cutting DB retrieval times by 90% and achieving <100ms global latency."
    },
    {
        company: "Kreo",
        role: "Campus Ambassador",
        period: "Jan 2025 – Present",
        description: "Partnered with the core team for marketing strategies. Orchestrated outreach initiatives driving a 60% boost in user engagement."
    },
    {
        company: "PlaceXP",
        role: "Tech Lead",
        period: "2025 – Present",
        description: "Directed website development and maintenance, streamlining event registration and increasing participation by 30%."
    }
];

export const projectsData = [
    {
        name: "Personal Task Management System",
        description: "Real-time task manager using Next.js, Supabase, and Drizzle. Cut query times by 80% with <150ms sync latency.",
        techStack: ["Next.js", "TypeScript", "Supabase", "Drizzle"],
        link: "#"
    },
    {
        name: "E-Commerce App on Azure AKS",
        description: "Scalable microservices app deployed on Kubernetes with Helm. Managed 12+ services and resolved critical networking challenges.",
        techStack: ["Kubernetes", "AKS", "Helm", "Microservices"],
        link: "#"
    },
    {
        name: "TrialVision",
        description: "AI-powered clinical trial outcome predictor (95% accuracy) using Random Forest and SHAP, deployed via FastAPI.",
        techStack: ["Python", "ML", "FastAPI", "Gemini API"],
        link: "#"
    }
];

export const contactData = {
    email: "geminisharma2005@gmail.com",
    phone: "+918302033740",
    location: "Chennai, Tamil Nadu",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
};

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
        ${aboutData.description}
      </p>
      
      <h2>Education</h2>
      <ul>
${aboutData.education.map(edu => `        <li>
          <strong>${edu.school}</strong><br/>
          ${edu.degree} (${edu.period})<br/>
          <span className="text-sm text-gray-400">${edu.score}</span>
        </li>`).join('\n')}
      </ul>

      <h2>Skills</h2>
      <ul>
${aboutData.skills.map(skill => `        <li>${skill}</li>`).join('\n')}
      </ul>
    </div>
  );
};`
    },
    "experience.json": {
        name: "experience.json",
        language: "json",
        content: JSON.stringify(experienceData, null, 2)
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

export const projects: Project[] = ${JSON.stringify(projectsData, null, 2).replace(/"([^"]+)":/g, '$1:')};`
    },
    "contact.css": {
        name: "contact.css",
        language: "css",
        content: `.contact-container {
  padding: 2rem;
}

.contact-info {
  margin-bottom: 2rem;
  color: #e0e0e0;
}

.contact-link {
  color: #3b82f6;
  text-decoration: none;
}

.contact-link:hover {
  text-decoration: underline;
}`
    }
};
