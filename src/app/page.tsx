'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, easeOut } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaReact, FaNode, FaPython } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiExpress } from 'react-icons/si';
import { mouseMoveEvent, mouseEnterEvent, mouseLeaveEvent } from './mouseTracker';
import SplitText from '@/components/SplitText';
import StructuredData from '@/components/StructuredData';

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorAuraRef = useRef<HTMLDivElement>(null);

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };



  return (
    <>
      <StructuredData type="Person" data={personData} />
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorAuraRef} className="cursor-aura" />
      <main className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-background/50">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-gradient-xy" />
        <motion.div
          className="absolute inset-0 w-full h-full bg-noise-pattern opacity-10 pointer-events-none"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [90, 180, 90],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-40 right-20 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [180, 270, 180],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-8 left-40 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          />
        </div>

        {/* Main content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center space-y-10 max-w-5xl px-6 py-24 backdrop-blur-sm"
        >
          <motion.div variants={item} className="space-y-6">
            <div className="inline-block mb-4 px-6 py-2 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
              <SplitText
                text="<> Hello, World! </>"
                className="text-3xl font-semibold text-center"
                delay={150}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing={easeOut}
                threshold={0.2}
                rootMargin="-50px"
                onLetterAnimationComplete={() => console.log('Letter animation completed')}
              />
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold gradient-text leading-tight mb-4">
             I am Puspal
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/80 max-w-3xl mx-auto">
              I am a software engineer with 2+ years of experience in full-stack web development
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-base sm:text-xl text-foreground/80 mt-8">
              <span className="px-4 py-2 rounded-lg bg-card-bg/0 backdrop-blur-sm flex items-center gap-2">
                <span className="flex gap-1">
                  <FaReact className="text-[#61DAFB]" />
                  <SiMongodb className="text-[#47A248]" />
                  <SiExpress className="text-white" />
                  <FaNode className="text-[#339933]" />
                </span>
                MERN Stack
              </span>
              <span className="hidden sm:block text-primary self-center">•</span>
              <span className="px-4 py-2 rounded-lg bg-card-bg/0 backdrop-blur-sm flex items-center gap-2">
                <SiTypescript className="text-[#3178C6]" />
                TypeScript
              </span>
              <span className="hidden sm:block text-primary self-center">•</span>
              <span className="px-4 py-2 rounded-lg bg-card-bg/0 backdrop-blur-sm flex items-center gap-2">
                <FaPython className="text-yellow-500" />
                Python
              </span>
            </div>
          </motion.div>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-6">
            <Link href="/projects" className="button-primary group relative overflow-hidden w-full sm:w-auto">
              <span className="relative z-10">My Projects</span>
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={false}
                animate={{ scale: [0.8, 1.2], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              />
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 group-hover:scale-110">→</span>
            </Link>
            <Link href="/contact" className="button-secondary group relative overflow-hidden w-full sm:w-auto">
              <span className="relative z-10">Contact Me</span>
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={false}
                animate={{ scale: [0.8, 1.2], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              />
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 group-hover:scale-110">→</span>
            </Link>
            <a
              href="/Puspal_Resume.pdf"
              download
              className="button-secondary group flex items-center relative overflow-hidden w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10">Download CV</span>
              <FaDownload className="ml-2 transition-transform group-hover:translate-y-1 group-hover:scale-110" />
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={false}
                animate={{ scale: [0.8, 1.2], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              />
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="pt-12 sm:pt-16 flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center text-foreground/60"
          >
            <a href="https://github.com/keenpaul29" target="_blank" rel="noopener noreferrer" className="social-link group">
              <span className="flex items-center justify-center gap-2 group-hover:text-primary transition-colors">
                <FaGithub className="text-xl" />
                <span>GitHub</span>
              </span>
              <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-primary"></span>
            </a>
            <a href="https://linkedin.com/in/puspal-paul" target="_blank" rel="noopener noreferrer" className="social-link group">
              <span className="flex items-center justify-center gap-2 group-hover:text-primary transition-colors">
                <FaLinkedin className="text-xl" />
                <span>LinkedIn</span>
              </span>
              <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-primary"></span>
            </a>
            <a href="mailto:puspalpaul8@gmail.com" className="social-link group">
              <span className="flex items-center justify-center gap-2 group-hover:text-primary transition-colors">
                <FaEnvelope className="text-xl" />
                <span>Email</span>
              </span>
              <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-primary"></span>
            </a>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
