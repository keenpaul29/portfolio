'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaReact, FaNode, FaPython, FaCode, FaRocket, FaLightbulb } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiExpress, SiNextdotjs } from 'react-icons/si';
import { mouseMoveEvent, mouseEnterEvent, mouseLeaveEvent } from './mouseTracker';
import SplitText from '@/components/SplitText';
import StructuredData from '@/components/StructuredData';

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorAuraRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const personData = {
    name: 'Puspal',
    jobTitle: 'Full Stack Developer',
    url: 'https://portfolio-phi-dun-34.vercel.app',
    sameAs: [
      'https://github.com/keenpaul29',
      'https://linkedin.com/in/puspal-paul',
      'https://twitter.com/paul_puspal'
    ]
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseMoveEvent(e, cursorRef.current, cursorAuraRef.current);
    };

    const handleMouseEnter = () => {
      mouseEnterEvent(cursorRef.current, cursorAuraRef.current);
    };

    const handleMouseLeave = () => {
      mouseLeaveEvent(cursorRef.current, cursorAuraRef.current);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.querySelectorAll('a, button').forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('a, button').forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const FloatingElement = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
      className={`floating-element ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );

  const techStack = [
    { icon: FaReact, name: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { icon: FaNode, name: "Node.js", color: "#339933" },
    { icon: SiExpress, name: "Express", color: "#000000" },
    { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
    { icon: FaPython, name: "Python", color: "#3776AB" },
  ];

  return (
    <>
      <StructuredData type="Person" data={personData} />
      
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden lg:block" />
      <div ref={cursorAuraRef} className="cursor-aura hidden lg:block" />

      {/* Hero Section */}
      <main ref={containerRef} className="relative min-h-screen overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 retro-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-yellow-900/20" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement delay={0.2} className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-20" />
          <FloatingElement delay={0.4} className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30" />
          <FloatingElement delay={0.6} className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl opacity-25" />
          <FloatingElement delay={0.8} className="absolute bottom-20 right-10 w-14 h-14 bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl opacity-20" />
          
          {/* Tech Icons Floating */}
          {techStack.map((tech, index) => (
            <FloatingElement 
              key={tech.name}
              delay={1 + index * 0.1}
              className={`absolute opacity-10 text-4xl`}
              style={{
                top: `${20 + (index * 10)}%`,
                left: `${10 + (index * 12)}%`,
                color: tech.color
              }}
            >
              <tech.icon />
            </FloatingElement>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-6xl mx-auto"
          >
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 mb-8 glass-morphism rounded-full"
            >
              <span className="text-2xl">👋</span>
              <span className="pixel-text text-lg text-yellow-400">HELLO WORLD!</span>
            </motion.div>

            {/* Main Title */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="pixel-text-3d text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #ffeb3b, #ff9800)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite'
                }}
              >
                PUSPAL
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="pixel-text text-2xl sm:text-3xl md:text-4xl text-blue-400 mb-6"
              >
                FULL STACK DEVELOPER
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Crafting digital experiences with <span className="text-yellow-400 font-bold">2+ years</span> of expertise in 
              <span className="text-blue-400 font-bold"> modern web technologies</span>. 
              Passionate about building scalable solutions that make a difference.
            </motion.p>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {techStack.slice(0, 4).map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  className="flex items-center gap-2 px-4 py-2 glass-morphism rounded-full hover:scale-105 transition-transform"
                >
                  <tech.icon className="text-xl" style={{ color: tech.color }} />
                  <span className="text-sm font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Link href="/projects" className="button-primary group flex items-center gap-3">
                <FaRocket className="text-xl group-hover:animate-bounce" />
                <span>VIEW PROJECTS</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>
              
              <Link href="/contact" className="button-secondary group flex items-center gap-3">
                <FaLightbulb className="text-xl group-hover:animate-pulse" />
                <span>LET'S COLLABORATE</span>
              </Link>
              
              <a
                href="/Puspal_Resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary group flex items-center gap-3"
              >
                <FaDownload className="text-xl group-hover:animate-bounce" />
                <span>DOWNLOAD CV</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex justify-center gap-6"
            >
              {[
                { icon: FaGithub, href: "https://github.com/keenpaul29", label: "GitHub", color: "#333" },
                { icon: FaLinkedin, href: "https://linkedin.com/in/puspal-paul", label: "LinkedIn", color: "#0077B5" },
                { icon: FaEnvelope, href: "mailto:puspalpaul8@gmail.com", label: "Email", color: "#EA4335" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon 
                    className="text-2xl transition-colors duration-300" 
                    style={{ color: social.color }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-sm pixel-text">SCROLL DOWN</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </main>

      {/* Quick Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { number: "2+", label: "Years Experience", icon: FaCode },
              { number: "15+", label: "Projects Completed", icon: FaRocket },
              { number: "100%", label: "Client Satisfaction", icon: FaLightbulb }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="retro-card text-center group"
              >
                <stat.icon className="text-4xl text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="pixel-text text-4xl text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}