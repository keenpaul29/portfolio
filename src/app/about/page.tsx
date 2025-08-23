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
  SiDocker,
  SiRedux,
  SiFigma,
  SiFirebase,
  SiPostman,
  SiGitlab,
  SiInsomnia,
  SiUbuntu,
  SiNpm,
  SiGnubash,
  SiBun,
  SiLatex,
  SiCodepen,
  SiNestjs
} from 'react-icons/si';
import SkillIcon from '@/components/SkillIcon';
import { FaGraduationCap, FaCode, FaRocket, FaLightbulb } from 'react-icons/fa';

const skills = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 90 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 85 },
  { name: "React", icon: SiReact, color: "#61DAFB", level: 95 },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", level: 90 },
  { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4", level: 88 },
  { name: "Material-UI", icon: SiMui, color: "#007FFF", level: 80 },
  { name: "Redux", icon: SiRedux, color: "#764ABC", level: 80 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 85 },
  { name: "Nest.js", icon: SiNestjs, color: "#E0234E", level: 65 },
  { name: "FastAPI", icon: SiFastapi, color: "#009688", level: 75 },
  { name: "Express", icon: SiExpress, color: "#000000", level: 88 },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 85 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: 80 },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748", level: 75 },
  { name: "Python", icon: SiPython, color: "#3776AB", level: 82 },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", level: 72 },
  { name: "Figma", icon: SiFigma, color: "#F24E1E", level: 75 },
  { name: "Postman", icon: SiPostman, color: "#FF6C37", level: 78 },
  { name: "Insomnia", icon: SiInsomnia, color: "#4000BF", level: 65 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", level: 70 },
  { name: "Git", icon: SiGit, color: "#F05032", level: 90 },
  { name: "GitHub", icon: SiGithub, color: "#181717", level: 90 },
  { name: "GitLab", icon: SiGitlab, color: "#FC6D26", level: 78 },
  { name: "Vercel", icon: SiVercel, color: "#000000", level: 85 },
  { name: "Swagger", icon: SiSwagger, color: "#85EA2D", level: 75 },
  { name: "Ubuntu", icon: SiUbuntu, color: "#E95420", level: 70 },
  { name: "npm", icon: SiNpm, color: "#CB3837", level: 85 },
  { name: "Bash", icon: SiGnubash, color: "#4EAA25", level: 72 },
  { name: "Bun", icon: SiBun, color: "#000000", level: 60 },
  { name: "LaTeX", icon: SiLatex, color: "#008080", level: 60 },
  { name: "CodePen", icon: SiCodepen, color: "#000000", level: 65 },
  { name: "PuTTY", icon: SiGit, color: "#000000", level: 55 }
];

const skillIconSrc: Record<string, string> = {
  'React': '/skills/react.svg',
  'Next.js': '/skills/nextjs.svg',
  'TypeScript': '/skills/typescript.svg',
  'Node.js': '/skills/nodejs.svg',
  'Express': '/skills/express.svg',
  'MongoDB': '/skills/mongodb.svg',
  'PostgreSQL': '/skills/postgresql.svg',
  'TailwindCSS': '/skills/tailwind.svg',
  'Redux': '/skills/redux.svg',
  'Material-UI': '/skills/material-ui.svg',
  'Python': '/skills/python.svg',
  'Firebase': '/skills/firebase.svg',
  'Figma': '/skills/figma.svg',
  'Postman': '/skills/postman.svg',
  'GitLab': '/skills/gitlab.svg',
  'Insomnia': '/skills/insomnia.svg',
  'Ubuntu': '/skills/ubuntu.svg',
  'npm': '/skills/npm.svg',
  'Bash': '/skills/bash.svg',
  'Bun': '/skills/bun.svg',
  'LaTeX': '/skills/LaTeX.svg',
  'CodePen': '/skills/codepen.svg',
  'Nest.js': '/skills/nest.js.svg',
  'NestJS': '/skills/nest.js.svg',
  'PuTTY': '/skills/PuTTY.svg'
};

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
          
          <h1 className="section-title section-title-gradient">
            ABOUT ME
          </h1>
          <p className="flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            The short story of me: capable, adaptable, and powered by caffeine
            <Image src="/chai.png" alt="Chai" width={44} height={44} className="w-11 h-11 object-contain" />
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
            <div className="text-lg leading-relaxed text-foreground/80 space-y-4">
              <p>
                Hope you enjoy my work! I am a passionate <span className="text-yellow-400 font-bold">Full Stack Developer</span> based in 
                <span className="text-blue-400 font-bold"> Kolkata, India</span>, and have completed B.Tech in Computer Science and Engineering.
              </p>
              <p>
                With a strong foundation in both frontend and backend development, I specialize in building 
                <span className="text-green-400 font-bold"> scalable and efficient web applications</span> using industry-level modern technologies. 
                I&apos;m particularly interested in creating seamless user experiences and solving complex technical challenges.
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
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0 p-1">
                      {skillIconSrc[skill.name]
                        ? (
                          <SkillIcon
                            src={skillIconSrc[skill.name]}
                            name={skill.name}
                            size={skill.name === 'MongoDB' ? 36 : 56}
                            className="object-contain"
                          />
                        ) : (
                          <skill.icon
                            size={skill.name === 'MongoDB' ? 28 : 56}
                            style={{ color: skill.color }}
                          />
                        )}
                    </div>
                    <div>
                      <h3 className="font-bold text-green-600">{skill.name}</h3>
                      
                    </div>
                  </div>
                  
                  {/* Skill Bar */}
                  {/* <div className="loading-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ delay: index * 0.05 + 0.3, duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div> */}
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
                {/* B.Tech */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="border-l-4 border-yellow-400 pl-6 group hover:translate-x-1 transition-transform"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex w-3 h-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex w-3 h-3 bg-yellow-400 rounded-full"></span>
                      </span>
                      <span className="text-sm text-foreground/70">2021–2025</span>
                    </div>
                    <span className="text-xs sm:text-sm text-foreground/70">Berhampore, India</span>
                  </div>
                  <h3 className="text-xl font-bold text-yellow-600 mb-2">
                    B.Tech in Computer Science and Engineering
                  </h3>
                  <p className="text-foreground/70">
                    Government College of Engineering and Textile Technology, Berhampore
                  </p>
                </motion.div>

                {/* AISSCE (12th) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                  className="border-l-4 border-yellow-400 pl-6 group hover:translate-x-1 transition-transform"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex w-3 h-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex w-3 h-3 bg-yellow-400 rounded-full"></span>
                      </span>
                      <span className="text-sm text-foreground/70">2021</span>
                    </div>
                    <span className="text-xs sm:text-sm text-foreground/70">Barrackpore, West Bengal, India</span>
                  </div>
                  <h3 className="text-xl font-bold text-yellow-600 mb-1">All India Secondary School Certificate Examination (12th), CBSE</h3>
                  <p className="italic text-foreground/70 mb-2">Kendriya Vidyalaya Barrackpore (Army)</p>
                </motion.div>

                {/* AISSE (10th) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                  className="border-l-4 border-yellow-400 pl-6 group hover:translate-x-1 transition-transform"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex w-3 h-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex w-3 h-3 bg-yellow-400 rounded-full"></span>
                      </span>
                      <span className="text-sm text-foreground/70">2019</span>
                    </div>
                    <span className="text-xs sm:text-sm text-foreground/70">Barrackpore, India</span>
                  </div>
                  <h3 className="text-xl font-bold text-yellow-600 mb-1">All India Senior Secondary Examination (10th), CBSE</h3>
                  <p className="italic text-foreground/70 mb-2">Kendriya Vidyalaya Barrackpore (Army)</p>
                </motion.div>
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
                {/* YoForex Corp */}
                <div className="border-l-4 border-purple-400 pl-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                      <span className="text-sm text-foreground/70">Jul 2025 — Present</span>
                    </div>
                    <span className="text-sm text-foreground/70">India</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-600 mb-1">Full Stack Developer Intern</h3>
                  <p className="italic text-foreground/70 mb-3">YoForex Corp</p>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• Engineered AI-powered trading platform serving <span className="font-semibold">15,000+ users</span>, increasing engagement by <span className="font-semibold">40%</span></li>
                    <li>• Reduced API latency by <span className="font-semibold">35%</span> by optimizing backend services (TypeScript/Python) and implementing caching</li>
                    <li>• Developed responsive UI with Next.js & Tailwind, improving mobile conversion by <span className="font-semibold">25%</span></li>
                    <li>• Accelerated development cycle by <span className="font-semibold">30%</span> through AI tool integration (Gemini, ChatGPT, DeepSeek)</li>
                  </ul>
                </div>

                {/* Hubnex Labs */}
                <div className="border-l-4 border-purple-400 pl-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                      <span className="text-sm text-foreground/70">Dec 2024 — May 2025</span>
                    </div>
                    <span className="text-sm text-foreground/70">Remote</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-600 mb-1">Full Stack Engineering Intern</h3>
                  <p className="italic text-foreground/70 mb-3">Hubnex Labs</p>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• Built MERN stack web apps handling <span className="font-semibold">10k+ MAU</span> with <span className="font-semibold">30+ RESTful APIs</span> and responsive, user-friendly UI</li>
                    <li>• Enhanced security with JWT authentication and Redux state management, boosting retention by <span className="font-semibold">25%</span></li>
                    <li>• Optimized web performance achieving <span className="font-semibold">40%</span> faster load times and <span className="font-semibold">98%</span> device compatibility</li>
                    <li>• Delivered <span className="font-semibold">15+ features</span> in Agile environment through sprint planning and code reviews</li>
                  </ul>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Stats */}
          <motion.section variants={item} className="retro-card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "4+", label: "Years Experience", color: "text-blue-400" },
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
                  <div className="text-foreground/70 text-sm">{stat.label}</div>
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
              <h3 className="pixel-text text-2xl text-yellow-400 mb-4">LET&apos;S BUILD SOMETHING AMAZING!</h3>
              <p className="text-foreground/70 mb-8">
                Ready to bring your ideas to life? Let&apos;s collaborate and create something extraordinary together.
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