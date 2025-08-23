'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNode, FaStripe, FaTimes, FaRocket, FaCode } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiExpress, SiNextdotjs, SiTailwindcss, SiRazorpay, SiJavascript} from 'react-icons/si';
import SkillIcon from '@/components/SkillIcon';
import InteractiveCard from '@/components/InteractiveCard';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link?: string;
  githubLink?: string;
  featured: boolean;
  category: string;
}

const techIcons: { [key: string]: React.ReactElement } = {
  // Fallback icons for technologies without local SVGs
  'Stripe': <FaStripe className="text-[#635BFF]" />,
  'Razorpay': <SiRazorpay className="text-[#2D87F3]" />,
  'Gemini API': <FaExternalLinkAlt className="text-blue-500" />,
  'Socket.io': <FaReact className="text-[#010101]" />,
  'Material-UI': <FaCode className="text-[#007FFF]" />,
  'JavaScript': <SiJavascript className="text-[#F7DF1E]" />,
  'API Integration': <FaCode className="text-green-400" />,
  'VS Code API': <FaCode className="text-blue-500" />,
};

const skillIconSrc: Record<string, string> = {
  'React': '/skills/react.svg',
  'Next.js': '/skills/nextjs.svg',
  'Node.js': '/skills/nodejs.svg',
  'Express.js': '/skills/express.svg',
  'MongoDB': '/skills/mongodb.svg',
  'TypeScript': '/skills/typescript.svg',
  'TailwindCSS': '/skills/tailwind.svg',
  'PostgreSQL': '/skills/postgresql.svg',
};

const renderIcon = (tag: string, size = 16): React.ReactNode => {
  if (skillIconSrc[tag]) {
    return <SkillIcon src={skillIconSrc[tag]} name={tag} size={size} />;
  }
  const el = techIcons[tag];
  if (el) return el;
  // Additional sensible fallbacks for common techs if ever missing
  switch (tag) {
    case 'React': return <FaReact className="text-[#61DAFB]" />;
    case 'Next.js': return <SiNextdotjs className="text-white" />;
    case 'Node.js': return <FaNode className="text-[#339933]" />;
    case 'Express.js': return <SiExpress className="text-white" />;
    case 'MongoDB': return <SiMongodb className="text-[#47A248]" />;
    case 'TypeScript': return <SiTypescript className="text-[#3178C6]" />;
    case 'TailwindCSS': return <SiTailwindcss className="text-[#06B6D4]" />;
    default: return null;
  }
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="retro-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="pixel-text text-3xl md:text-4xl gradient-text mb-2">{project.title}</h2>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
              {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="social-link"
            aria-label="Close modal"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-lg text-gray-300 leading-relaxed">{project.longDescription}</p>
          
          {/* Tech Stack */}
          <div>
            <h3 className="pixel-text text-xl text-yellow-400 mb-4">TECH STACK</h3>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 glass-morphism rounded-full text-sm font-medium hover:scale-105 transition-transform"
                >
                  {renderIcon(tag, 18)}
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
            {project.link && (
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary group flex items-center gap-3"
              >
                <FaExternalLinkAlt className="text-lg group-hover:scale-110 transition-transform" />
                <span>LIVE DEMO</span>
              </a>
            )}
            {project.githubLink && (
              <a 
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary group flex items-center gap-3"
              >
                <FaGithub className="text-lg group-hover:scale-110 transition-transform" />
                <span>VIEW CODE</span>
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
  const [filter, setFilter] = useState('ALL');

  const projects: Project[] = [
    {
      title: "Commentify",
      description: "Real-time commenting system with instant updates, user presence indicators, and typing notifications.",
      longDescription: "A modern real-time commenting system built with Next.js and Socket.IO. Features include instant message updates, user presence indicators, typing notifications, and robust security measures. The system supports threaded conversations, emoji reactions, and user authentication with a responsive design that works seamlessly across all devices.",
      tags: ["Next.js", "React", "Node.js", "Socket.io", "PostgreSQL", "TypeScript", "Material-UI"],
      githubLink: "https://github.com/keenpaul29/commentify",
      featured: true,
      category: "Full Stack"
    },
    {
      title: "CryptoX",
      description: "Comprehensive cryptocurrency tracking application with real-time price updates and interactive charts.",
      longDescription: "A comprehensive cryptocurrency tracking application built with modern web technologies. Features real-time price updates, detailed crypto analytics, interactive charts, portfolio tracking, and market trend analysis. The app provides users with comprehensive insights into the cryptocurrency market with a beautiful, responsive interface.",
      tags: ["React", "JavaScript", "TailwindCSS", "API Integration"],
      link: "https://crypto-x-orcin.vercel.app",
      githubLink: "https://github.com/keenpaul29/cryptoX",
      featured: true,
      category: "Frontend"
    },
    {
      title: "SecureChat",
      description: "End-to-end encrypted chat application with real-time messaging and advanced security features.",
      longDescription: "A real-time chat application featuring end-to-end encryption for secure communication. Implemented WebSocket for instant messaging and AES-256 encryption for message security. Includes features like real-time typing indicators, message delivery status, file sharing, and group chat functionality with a focus on privacy and security.",
      tags: ["React", "Node.js", "Socket.io", "MongoDB", "Express.js", "TailwindCSS"],
      githubLink: "https://github.com/keenpaul29/SecureChat",
      featured: true,
      category: "Full Stack"
    },
    {
      title: "LearnFlow",
      description: "AI-powered learning-focused todo app with study timer and intelligent resource generation.",
      longDescription: "A full-stack productivity app integrating AI-assisted learning tools, including a study timer, task prioritization, and Gemini API-driven note/resource generation. The application achieved 30% faster task completion through AI-optimized study sessions and provides personalized learning recommendations based on user behavior and preferences.",
      tags: ["Next.js", "Node.js", "Express.js", "MongoDB", "Gemini API", "TailwindCSS", "TypeScript"],
      link: "https://learnflow-nu.vercel.app",
      githubLink: "https://github.com/keenpaul29/LearnFlow",
      featured: true,
      category: "Full Stack"
    },
    {
      title: "Shopkaro",
      description: "Highly responsive e-commerce platform with multi-currency payment integration.",
      longDescription: "Designed and deployed a highly responsive e-commerce platform using MERN stack capable of handling up to 1,000 concurrent users. Integrated Stripe and Razorpay APIs for secure multi-currency transactions, reducing payment failure rates by 15%. Features include product catalog, shopping cart, order management, user authentication, and admin dashboard.",
      tags: ["React", "Node.js", "MongoDB", "Express.js", "Stripe", "Razorpay"],
      link: "https://shopkaro-six.vercel.app",
      githubLink: "https://github.com/keenpaul29/shopkaro",
      featured: true,
      category: "E-commerce"
    },
    {
      title: "BugSense",
      description: "AI-powered VS Code extension for intelligent code assistance and bug detection.",
      longDescription: "Built a VS Code extension that provides AI-powered code suggestions, documentation generation, and bug detection. Leverages Gemini API for intelligent code analysis and real-time assistance. The extension helps developers write better code faster with features like auto-completion, error detection, code optimization suggestions, and automated documentation generation.",
      tags: ["TypeScript", "Node.js", "Gemini API", "VS Code API", "React"],
      link: "https://marketplace.visualstudio.com/items?itemName=keenpaul29.bugsense",
      githubLink: "https://github.com/keenpaul29/code-assistant",
      featured: false,
      category: "Tools"
    }
  ];

  const categories = ['ALL', 'Full Stack', 'Frontend', 'E-commerce', 'Tools'];
  const filteredProjects = filter === 'ALL' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 retro-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-yellow-900/10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-7xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 mb-8 glass-morphism rounded-full"
          >
            <FaRocket className="text-2xl text-blue-400" />
            <span className="pixel-text text-lg text-yellow-400">MY PORTFOLIO</span>
          </motion.div>
          
          <h1 className="section-title section-title-gradient mb-6">
            FEATURED PROJECTS
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Here are some of my recent projects showcasing my skills in full-stack development,
            UI/UX design, and problem-solving.
          </p>
        </div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                  : 'glass-morphism text-foreground/70 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20 [perspective:1000px]">
          {filteredProjects.map((project, index) => (
            <InteractiveCard
              key={project.title}
              className={`retro-card group cursor-pointer ${project.featured ? 'lg:col-span-1' : ''}`}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              intensity={8}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="pixel-text text-xl text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>
                {project.featured && (
                  <div className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full text-xs font-bold">
                    FEATURED
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-foreground/80 mb-6 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.slice(0, 4).map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1 glass-morphism rounded-full text-xs font-medium"
                  >
                    {renderIcon(tag, 16)}
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-3 py-1 bg-gray-600/50 text-white rounded-full text-xs font-medium">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-medium hover:scale-105 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt className="text-sm" />
                    <span>DEMO</span>
                  </a>
                )}
                {project.githubLink && (
                  <a 
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 glass-morphism text-foreground/80 rounded-xl font-medium hover:text-white hover:scale-105 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub className="text-sm" />
                    <span>CODE</span>
                  </a>
                )}
              </div>
            </InteractiveCard>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="retro-card max-w-2xl mx-auto">
            <h3 className="pixel-text text-2xl text-yellow-400 mb-4">WANT TO SEE MORE?</h3>
            <p className="text-foreground/70 mb-8">
              Check out my GitHub for more projects and contributions to the open-source community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://github.com/keenpaul29"
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary flex items-center gap-3"
              >
                <FaGithub className="text-xl" />
                <span>VIEW MY GITHUB</span>
              </a>
              <a 
                href="/contact"
                className="button-secondary"
              >
                LET&apos;S COLLABORATE!
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;