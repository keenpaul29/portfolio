//<reference types="react" />
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNode, FaStripe } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiExpress, SiNextdotjs, SiTailwindcss, SiRazorpay} from 'react-icons/si';

// Add Project interface to define the project type
interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  githubLink?: string;
}

// Technology icon mapping
const techIcons: { [key: string]: React.ReactElement } = {
  'React': <FaReact className="text-[#61DAFB]" />,
  'Next.js': <SiNextdotjs className="text-white" />,
  'Node.js': <FaNode className="text-[#339933]" />,
  'Express.js': <SiExpress className="text-white" />,
  'MongoDB': <SiMongodb className="text-[#47A248]" />,
  'TypeScript': <SiTypescript className="text-[#3178C6]" />,
  'TailwindCSS': <SiTailwindcss className="text-[#06B6D4]" />,
  'Stripe': <FaStripe className="text-[#635BFF]" />,
  'Razorpay': <SiRazorpay className="text-[#2D87F3]" />,
  'Gemini API': <FaExternalLinkAlt className="text-blue-500" />,
  'Socket.io': <FaReact className="text-[#010101]" />,
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 space-y-6">
          <h2 className="text-4xl font-bold gradient-text tracking-tight">{project.title}</h2>
          <p className="text-xl text-foreground/80 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-1.5"
              >
                {techIcons[tag] || null}
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 pt-6">
            {project.link && (
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary group flex items-center gap-2"
              >
                <span>Live Demo</span>
                <FaExternalLinkAlt className="text-sm transition-transform group-hover:translate-x-1" />
              </a>
            )}
            {project.githubLink && (
              <a 
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary group flex items-center gap-2"
              >
                <FaGithub className="text-lg" />
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Commentify - Real-time Comment System",
      description: "A modern real-time commenting system with features like instant updates, user presence indicators, and typing notifications. Built with Next.js and Socket.IO, featuring responsive design, theme switching, and robust security measures.",
      tags: ["Next.js", "React", "Node.js", "Socket.io", "PostgreSQL", "TypeScript", "Material-UI"],
      githubLink: "https://github.com/keenpaul29/commentify"
    },
    {
      title: "CryptoX - Cryptocurrency Tracker",
      description: "A comprehensive cryptocurrency tracking application built with modern web technologies. Features real-time price updates, detailed crypto analytics, and interactive charts. Deployed on Vercel for optimal performance.",
      tags: ["React", "JavaScript", "TailwindCSS", "API Integration"],
      link: "https://crypto-x-orcin.vercel.app",
      githubLink: "https://github.com/keenpaul29/cryptoX"
    },
    {
      title: "SecureChat - End-to-End Encrypted Chat",
      description: "A real-time chat application featuring end-to-end encryption for secure communication. Implemented WebSocket for instant messaging and AES-256 encryption for message security. Includes features like real-time typing indicators and message delivery status.",
      tags: ["React", "Node.js", "Socket.io", "MongoDB", "Express.js", "TailwindCSS"],
      githubLink: "https://github.com/keenpaul29/SecureChat"
    },
    {
      title: "LearnFlow - Learning-focused Todo App",
      description: "A full-stack productivity app integrating AI-assisted learning tools, including a study timer, task prioritization, and Gemini API-driven note/resource generation. Achieved 30% faster task completion through AI-optimized study sessions.",
      tags: ["Next.js", "Node.js", "Express.js", "MongoDB", "Gemini API", "TailwindCSS", "TypeScript"],
      link: "https://learnflow-nu.vercel.app",
      githubLink: "https://github.com/keenpaul29/LearnFlow"
    },
    {
      title: "Shopkaro - E-commerce Platform",
      description: "Designed and deployed a highly responsive e-commerce platform using MERN stack capable of handling up to 1,000 concurrent users. Integrated Stripe and Razorpay APIs for secure multi-currency transactions, reducing payment failure rates by 15%.",
      tags: ["React", "Node.js", "MongoDB", "Express.js", "Stripe", "Razorpay"],
      link: "https://shopkaro-six.vercel.app",
      githubLink: "https://github.com/keenpaul29/shopkaro"
    },
    {
      title: "BugSense - AI Code Assistant",
      description: "Built a VS Code extension that provides AI-powered code suggestions, documentation generation, and bug detection. Leverages Gemini API for intelligent code analysis and real-time assistance.",
      tags: ["TypeScript", "Node.js", "Gemini API", "VS Code API", "React"],
      link: "https://marketplace.visualstudio.com/items?itemName=keenpaul29.bugsense",
      githubLink: "https://github.com/keenpaul29/code-assistant"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden animate-fade-in-up">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-gradient-xy pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 animate-blob" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 animate-blob animation-delay-4000" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-6xl relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 gradient-text">
          Featured Projects
        </h1>
        <p className="text-xl text-center text-foreground/80 mb-16 max-w-2xl mx-auto">
          Here are some of my recent projects showcasing my skills in full-stack development,
          UI/UX design, and problem-solving.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="card group cursor-pointer p-6 space-y-4"
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-foreground/80 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-1.5"
                  >
                    {techIcons[tag] || null}
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
