'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaCode, FaRocket, FaLightbulb } from 'react-icons/fa';
import SkillIcon from '@/components/SkillIcon';
import { mouseMoveEvent, mouseEnterEvent, mouseLeaveEvent } from './mouseTracker';
import StructuredData from '@/components/StructuredData';
import Image from 'next/image';
import { RxFontFamily } from 'react-icons/rx';
export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorAuraRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const [skillIcons, setSkillIcons] = useState<{ src: string; name: string }[]>([]);
  const [iconPositions, setIconPositions] = useState<Array<{ top: string; left: string }>>([]);

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

  // Fetch skill icons from API (public/skills)
  useEffect(() => {
    const loadSkills = async () => {
      try {
        const res = await fetch('/api/skills');
        const data = await res.json();
        setSkillIcons(Array.isArray(data.icons) ? data.icons : []);
      } catch {
        setSkillIcons([]);
      }
    };
    loadSkills();
  }, []);

  // Generate random positions in edge zones, excluding the central hero area
  useEffect(() => {
    if (!skillIcons.length) return;

    // Allowed bands in percentages: left gutter (0-8%, 0-68%), right gutter (92-100%, 0-68%), top band (8-92%, 0-12%)
    const bands = [
      { x0: 0, x1: 8, y0: 0, y1: 68 },      // left gutter (avoid bottom)
      { x0: 92, x1: 100, y0: 0, y1: 68 },   // right gutter (avoid bottom)
      { x0: 8, x1: 92, y0: 0, y1: 12 },     // top band
    ];

    const count = Math.min(skillIcons.length, 18);
    const positions: Array<{ top: string; left: string }> = [];
    const points: Array<{ x: number; y: number }> = [];
    const minDist = 6; // percentage units, prevents overlaps

    const farEnough = (x: number, y: number) =>
      points.every(p => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.hypot(dx, dy) >= minDist;
      });

    for (let i = 0; i < count; i++) {
      let chosen: { x: number; y: number } | null = null;
      let attempts = 0;
      while (!chosen && attempts < 60) {
        const band = bands[Math.floor(Math.random() * bands.length)];
        const x = band.x0 + Math.random() * (band.x1 - band.x0);
        const y = band.y0 + Math.random() * (band.y1 - band.y0);
        if (farEnough(x, y)) {
          chosen = { x, y };
          points.push(chosen);
          positions.push({ top: `${y}%`, left: `${x}%` });
        }
        attempts++;
      }
      // Fallback: if too dense, still place it in the same band with smaller spacing
      if (!chosen) {
        const band = bands[Math.floor(Math.random() * bands.length)];
        const x = band.x0 + Math.random() * (band.x1 - band.x0);
        const y = band.y0 + Math.random() * (band.y1 - band.y0);
        points.push({ x, y });
        positions.push({ top: `${y}%`, left: `${x}%` });
      }
    }
    setIconPositions(positions);

    const onResize = () => {
      // Recompute to add slight jitter on resize
      const newPositions: Array<{ top: string; left: string }>= [];
      for (let i = 0; i < count; i++) {
        const band = bands[i % bands.length];
        const left = band.x0 + Math.random() * (band.x1 - band.x0);
        const top = band.y0 + Math.random() * (band.y1 - band.y0);
        newPositions.push({ top: `${top}%`, left: `${left}%` });
      }
      setIconPositions(newPositions);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [skillIcons]);

  const FloatingElement = (
    { children, delay = 0, className = "", style }: 
    { children?: React.ReactNode, delay?: number, className?: string, style?: React.CSSProperties }
  ) => (
    <motion.div
      className={`floating-element ${className}`}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );

  const TypingText = ({ text, speed = 80, className = "" }: { text: string; speed?: number; className?: string }) => {
    const [display, setDisplay] = useState("");
    useEffect(() => {
      let i = 0;
      setDisplay("");
      const interval = setInterval(() => {
        i += 1;
        setDisplay(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, [text, speed]);
    return (
      <span className={className}>
        {display}
        <span className="ml-1 text-yellow-400 animate-pulse">|</span>
      </span>
    );
  };

  const techStack = [
    { src: "/skills/react.svg", name: "React" },
    { src: "/skills/nextjs.svg", name: "Next.js" },
    { src: "/skills/typescript.svg", name: "TypeScript" },
    { src: "/skills/nodejs.svg", name: "Node.js" },
    { src: "/skills/express.svg", name: "Express" },
    { src: "/skills/mongodb.svg", name: "MongoDB" },
    { src: "/skills/postgresql.svg", name: "PostgreSQL" },
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

        {/* Main Content with Glassmorphism */}
        <div className="relative z-10 flex items-center justify-center min-h-screen py-20 pb-28 px-4 pl-">
          <div className="glass-morphism rounded-3xl p-8 max-w-7xl w-full">
          <div className="max-w-6xl  w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              {/* Greeting Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-3 px-6 py-3 mb-8 glass-morphism rounded-full"
              >
                <span className="text-2xl">👋</span>
                <TypingText className="text-2xl" text="<> Hello World! </>" speed={60} />
              </motion.div>

              {/* Main Title */}
              <div className="mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 font-normal tracking-wider text-[#DFE386]"
                >
                  PUSPAL
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="simple-text text-2xl sm:text-3xl md:text-4xl mb-6 tracking-wide"
                >
                  FULL STACK DEVELOPER
                </motion.div>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-xl sm:text-2xl text-foreground/80 mb-12 max-w-3xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed tracking-wide"
              >
                Crafting digital experiences with 4+ years of expertise in modern web technologies. Passionate about building scalable solutions that make a difference.
              </motion.p>

              {/* Tech Stack Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12"
              >
                {techStack.slice(0, 4).map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                    className="flex items-center gap-2 px-4 py-2 glass-morphism rounded-full hover:scale-105 transition-transform"
                  >
                    <SkillIcon src={tech.src} name={tech.name} size={22} />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons moved below hero as full-width row */}

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="flex justify-center lg:justify-start gap-6"
              >
                {[
                  { icon: FaGithub, href: "https://github.com/keenpaul29", label: "GitHub" },
                  { icon: FaLinkedin, href: "https://linkedin.com/in/puspal-paul", label: "LinkedIn" },
                  { icon: FaEnvelope, href: "mailto:puspalpaul8@gmail.com", label: "Email" }
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
                      className="text-2xl text-foreground/80 group-hover:text-foreground transition-colors duration-200" 
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Simple Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative z-10 w-full flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg min-h-20">
                {/* Main visual container */}
                <div className="relative aspect-square rounded-3xl overflow-hidden">
                  {/* Central content */}
                  <img src="/hero.png" alt='Hero Image' className="w-[2000px] h-auto"/>
                </div>
              </div>
            </motion.div>

            {/* Full-width CTA Row below hero */}
            <div className="lg:col-span-2 relative z-20 mt-8 mb-3">
              <div className="flex flex-row md:flex-nowrap flex-wrap gap-6 justify-center items-center">
                <Link href="/projects" className="button-primary group flex items-center justify-center gap-3 min-w-[220px] shrink-0">
                  <FaRocket className="text-xl text-gray-500 group-hover:animate-bounce" />
                  <span className="uppercase tracking-wide whitespace-nowrap leading-none text-gray-800">VIEW PROJECTS</span>
                  <motion.span className="text-gray-800" animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                </Link>

                <Link href="/contact" className="button-secondary group flex items-center justify-center gap-3 min-w-[220px] shrink-0">
                  <FaLightbulb className="text-xl text-foreground/90 group-hover:text-white group-hover:animate-pulse" />
                  <span className="uppercase tracking-wide whitespace-nowrap leading-none">LET'S COLLABORATE</span>
                </Link>

                <a
                  href="https://drive.google.com/drive/folders/1k3kNW5FlwWY7qsx2rG46Dc-zk8wFTaaf?usp=drive_link"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary group flex items-center justify-center gap-3 min-w-[220px] shrink-0"
                >
                  <FaDownload className="text-xl text-foreground group-hover:text-white group-hover:animate-bounce" />
                  <span className="uppercase tracking-wide whitespace-nowrap leading-none">DOWNLOAD CV</span>
                </a>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/60 pointer-events-none"
        >
          <span className="text-sm simple-text">SCROLL DOWN</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center shadow-[0_0_10px_rgba(255,255,255,0.15)]"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
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
              { number: "4+", label: "Years Experience", icon: FaCode },
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
                <stat.icon className="text-4xl mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="simple-text text-4xl mb-2">{stat.number}</div>
                <div className="text-foreground/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
