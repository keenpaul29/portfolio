'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { IoColorPaletteOutline } from 'react-icons/io5';

const themes = [
  { name: 'light', icon: '🌤️', label: 'Light' },
  { name: 'dark', icon: '🌙', label: 'Dark' },
  { name: 'emerald', icon: '🌿', label: 'Emerald' },
  { name: 'emerald-dark', icon: '🌲', label: 'Emerald Dark' },
  { name: 'rose', icon: '🌸', label: 'Rose' },
  { name: 'rose-dark', icon: '🌺', label: 'Rose Dark' },
  { name: 'amber', icon: '🌅', label: 'Amber' },
  { name: 'amber-dark', icon: '🌄', label: 'Amber Dark' },
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  if (!useState(true)[0]) {
    return null;
  }

  const isDark = theme?.includes('dark');

  const toggleDarkMode = () => {
    // If current theme is a variant, maintain the color but switch light/dark
    if (theme?.includes('-dark')) {
      setTheme(theme.replace('-dark', ''));
    } else if (theme && theme !== 'light' && theme !== 'dark') {
      setTheme(`${theme}-dark`);
    } else {
      setTheme(isDark ? 'light' : 'dark');
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full hover:bg-primary/10 transition-colors"
        aria-label="Toggle dark mode"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <FiMoon className="w-5 h-5" />
          ) : (
            <FiSun className="w-5 h-5" />
          )}
        </motion.div>
      </button>

      {/* Color palette selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          aria-label="Toggle theme selector"
        >
          <IoColorPaletteOutline className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 mt-2 w-48 py-2 bg-card-bg border border-card-border rounded-xl shadow-lg z-50"
            >
              <div className="px-2 py-1 text-sm text-foreground/60">Select Theme</div>
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => {
                    setTheme(t.name);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-primary/10 transition-colors flex items-center gap-2
                    ${theme === t.name ? 'text-primary' : 'text-foreground'}`}
                >
                  <span className="text-lg">{t.icon}</span>
                  <span>{t.label}</span>
                  {theme === t.name && (
                    <motion.div
                      layoutId="activeTheme"
                      className="ml-auto w-2 h-2 rounded-full bg-primary"
                    />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
