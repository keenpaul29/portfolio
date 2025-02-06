'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss,
  SiMui, 
  SiNodedotjs, 
  SiFastapi, 
  SiExpress, 
  SiMongodb,
  SiPostgresql, 
  SiPrisma, 
  SiSwagger,
  SiGit,
  SiGithub,
  SiVercel,
  SiPython,
  SiDocker
} from 'react-icons/si';

const skills = [
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-yellow-400"
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "text-blue-500"
  },
  {
    name: "React",
    icon: SiReact,
    color: "text-cyan-400"
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "text-white"
  },
  {
    name: "TailwindCSS",
    icon: SiTailwindcss,
    color: "text-cyan-400"
  },
  {
    name: "Material-UI",
    icon: SiMui,
    color: "text-blue-400"
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "text-green-500"
  },
  {
    name: "FastAPI",
    icon: SiFastapi,
    color: "text-teal-400"
  },
  {
    name: "Express",
    icon: SiExpress,
    color: "text-gray-400"
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "text-green-500"
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "text-blue-400"
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    color: "text-purple-600"
  },
  {
    name: "Python",
    icon: SiPython,
    color: "text-yellow-500"
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "text-blue-500"
  },
  {
    name: "Git",
    icon: SiGit,
    color: "text-orange-500"
  },
  {
    name: "GitHub",
    icon: SiGithub,
    color: "text-gray-400"
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "text-white"
  },
  {
    name: "Swagger",
    icon: SiSwagger,
    color: "text-green-400"
  }
];

export default function About() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold gradient-text mb-6">
            About Me
          </h1>
          <p className="text-xl text-foreground/70">
            Full Stack Developer passionate about creating innovative web solutions
          </p>
        </motion.div>
        
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Background Section */}
          <motion.div variants={item} className="glass-card p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6">Background</h2>
            <p className="text-lg leading-relaxed text-foreground/80">
              I am a passionate Full Stack Developer based in Kolkata, India, currently pursuing my B.Tech in Computer Science 
              and Engineering. With a strong foundation in both frontend and backend development, I specialize in building 
              scalable and efficient web applications using modern technologies. I&apos;m particularly interested in creating 
              seamless user experiences and solving complex technical challenges.
            </p>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={item} className="glass-card p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-8">Technical Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-primary/5 transition-all duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <skill.icon className={`text-4xl mb-2 ${skill.color}`} />
                  <span className="text-sm font-medium text-center">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div variants={item} className="glass-card p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6">Education</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-primary">B.Tech in Computer Science and Engineering</h3>
                <p className="text-foreground/70">Government College of Engineering and Textile Technology, Berhampore</p>
                <p className="text-foreground/60">Expected 2025</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            variants={item}
            className="text-center mt-12"
          >
            <Link href="/projects" className="button-primary">
              View My Projects
              <span className="ml-2">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
