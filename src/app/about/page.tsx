'use client';
import React from 'react';
import Link from 'next/link';
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
import { FaGraduationCap, FaCode, FaRocket, FaLightbulb } from 'react-icons/fa';

const skills = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 90 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 85 },
  { name: "React", icon: SiReact, color: "#61DAFB", level: 95 },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", level: 90 },
  { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4", level: 88 },
  { name: "Material-UI", icon: SiMui, color: "#007FFF", level: 80 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 85 },
  { name: "FastAPI", icon: SiFastapi, color: "#009688", level: 75 },
  { name: "Express", icon: SiExpress, color: "#000000", level: 88 },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 85 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: 80 },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748", level: 75 },
  { name: "Python", icon: SiPython, color: "#3776AB", level: 82 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", level: 70 },
  { name: "Git", icon: SiGit, color: "#F05032", level: 90 },
  { name: "GitHub", icon: SiGithub, color: "#181717", level: 90 },
  { name: "Vercel", icon: SiVercel, color: "#000000", level: 85 },
  { name: "Swagger", icon: SiSwagger, color: "#85EA2D", level: 75 }
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
    <div className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 retro-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-yellow-900/10" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 mb-8 glass-morphism rounded-full"
          >
            <FaCode className="text-2xl text-blue-400" />
            <span className="pixel-text text-lg text-yellow-400">TABLE OF CONTENTS</span>
          </motion.div>
          
          <h1 className="section-title gradient-text">
            ABOUT ME
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The short story of me: capable, adaptable, and powered by caffeine.
          </p>
        </motion.div>
        
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-20">
          {/* Background Section */}
          <motion.section variants={item} className="retro-card">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <FaLightbulb className="text-2xl text-white" />
              </div>
              <h2 className="pixel-text text-3xl text-blue-400">HELLO</h2>
            </div>
            <div className="text-lg leading-relaxed text-gray-300 space-y-4">
              <p>
                Hope you enjoy my work! I am a passionate <span className="text-yellow-400 font-bold">Full Stack Developer</span> based in 
                <span className="text-blue-400 font-bold"> Kolkata, India</span>, currently pursuing my B.Tech in Computer Science and Engineering.
              </p>
              <p>
                With a strong foundation in both frontend and backend development, I specialize in building 
                <span className="text-green-400 font-bold"> scalable and efficient web applications</span> using modern technologies. 
                I'm particularly interested in creating seamless user experiences and solving complex technical challenges.
              </p>
              <p>
                Creative and detail-oriented developer with exceptional skill level and experience in various fields such as 
                <span className="text-purple-400 font-bold"> MERN Stack, TypeScript, Python</span>, and modern web frameworks.
              </p>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section variants={item} className="retro-card">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <FaCode className="text-2xl text-white" />
              </div>
              <h2 className="pixel-text text-3xl text-green-400">TECHNICAL SKILLS</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="tech-icon group-hover:scale-110">
                      <skill.icon style={{ color: skill.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{skill.name}</h3>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                  </div>
                  
                  {/* Skill Bar */}
                  <div className="loading-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ delay: index * 0.05 + 0.3, duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education & Experience */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <motion.section variants={item} className="retro-card">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <FaGraduationCap className="text-2xl text-white" />
                </div>
                <h2 className="pixel-text text-2xl text-yellow-400">EDUCATION</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-yellow-400 pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                    <span className="text-sm text-gray-400">Expected 2025</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    B.Tech in Computer Science and Engineering
                  </h3>
                  <p className="text-gray-300">
                    Government College of Engineering and Textile Technology, Berhampore
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Experience */}
            <motion.section variants={item} className="retro-card">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                  <FaRocket className="text-2xl text-white" />
                </div>
                <h2 className="pixel-text text-2xl text-purple-400">EXPERIENCE</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-purple-400 pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                    <span className="text-sm text-gray-400">2022 - Present</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Full Stack Developer
                  </h3>
                  <p className="text-gray-300 mb-3">Freelance & Personal Projects</p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Built 15+ full-stack applications</li>
                    <li>• Specialized in MERN stack development</li>
                    <li>• Integrated payment systems and APIs</li>
                    <li>• Deployed scalable applications</li>
                  </ul>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Stats */}
          <motion.section variants={item} className="retro-card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "2+", label: "Years Experience", color: "text-blue-400" },
                { number: "15+", label: "Projects Built", color: "text-green-400" },
                { number: "10+", label: "Technologies", color: "text-yellow-400" },
                { number: "100%", label: "Passion Level", color: "text-purple-400" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className={`pixel-text text-4xl mb-2 ${stat.color} group-hover:scale-110 transition-transform`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.div 
            variants={item}
            className="text-center"
          >
            <div className="retro-card max-w-2xl mx-auto">
              <h3 className="pixel-text text-2xl text-yellow-400 mb-4">LET'S BUILD SOMETHING AMAZING</h3>
              <p className="text-gray-300 mb-8">
                Ready to bring your ideas to life? Let's collaborate and create something extraordinary together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/projects" className="button-primary">
                  VIEW MY WORK
                  <span className="ml-2">→</span>
                </Link>
                <Link href="/contact" className="button-secondary">
                  GET IN TOUCH
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}