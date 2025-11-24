import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Mail, Send } from "lucide-react";
import { aboutData, experienceData, projectsData, contactData } from "@/lib/data";

export const AboutPreview = () => (
    <div className="p-8 text-gray-200 font-sans">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                About Me
            </h1>
            <p className="text-lg leading-relaxed mb-8 text-gray-300">
                {aboutData.description}
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Education</h2>
            <div className="mb-8 space-y-4">
                {aboutData.education.map((edu, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 p-4 rounded-lg border border-white/10"
                    >
                        <h3 className="font-bold text-white">{edu.school}</h3>
                        <p className="text-gray-300">{edu.degree}</p>
                        <div className="flex justify-between text-sm text-gray-400 mt-1">
                            <span>{edu.period}</span>
                            <span>{edu.score}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Skills</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aboutData.skills.map((skill, i) => (
                    <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/10"
                    >
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        {skill}
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    </div>
);

export const ExperiencePreview = () => {
    return (
        <div className="p-8 font-sans">
            <h2 className="text-3xl font-bold mb-8 text-white">Experience</h2>
            <div className="space-y-8 border-l-2 border-blue-500/30 ml-3 pl-8 relative">
                {experienceData.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#1e1e1e] border-4 border-blue-500" />
                        <h3 className="text-xl font-bold text-blue-400">{exp.role}</h3>
                        <div className="text-sm text-gray-400 mb-2">
                            {exp.company} • {exp.period}
                        </div>
                        <p className="text-gray-300 bg-white/5 p-4 rounded-lg border border-white/10">
                            {exp.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export const ProjectsPreview = () => {
    return (
        <div className="p-8 font-sans">
            <h2 className="text-3xl font-bold mb-8 text-white">Projects</h2>
            <div className="grid gap-6">
                {projectsData.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition-colors group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                {project.name}
                            </h3>
                            <div className="flex gap-2">
                                <Github size={18} className="text-gray-400 hover:text-white cursor-pointer" />
                                <ExternalLink size={18} className="text-gray-400 hover:text-white cursor-pointer" />
                            </div>
                        </div>
                        <p className="text-gray-400 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export const ContactPreview = () => (
    <div className="p-8 font-sans flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">
                Get in Touch
            </h2>
            <div className="mb-6 text-center text-gray-300">
                <p className="mb-2">
                    <span className="font-bold text-blue-400">Email:</span> {contactData.email}
                </p>
                <p>
                    <span className="font-bold text-blue-400">Phone:</span> {contactData.phone}
                </p>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 text-gray-500" size={16} />
                        <input
                            type="email"
                            className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder={contactData.email}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Message
                    </label>
                    <textarea
                        className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-4 text-white h-32 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        placeholder="Your message..."
                    />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Send size={16} />
                    Send Message
                </button>
            </form>
        </div>
    </div>
);
