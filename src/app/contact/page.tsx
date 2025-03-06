'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getFieldStatus = (field: keyof typeof formData) => {
    if (!touched[field]) return 'neutral';
    if (field === 'email' && !isEmailValid(formData.email)) return 'error';
    if (!formData[field]) return 'error';
    return 'success';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    // Validate form
    if (!formData.name || !formData.email || !formData.message || !isEmailValid(formData.email)) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      console.error('Failed to send email:', error);
    }
  };

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/keenpaul29', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
    { icon: FaTwitter, url: 'https://twitter.com/yourhandle', label: 'Twitter' },
    { icon: FaEnvelope, url: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold gradient-text mb-6">Get in Touch</h1>
          <p className="text-xl text-foreground/70">
            Have a question or want to work together?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-4 py-2 rounded-lg bg-card-bg border transition-colors duration-200
                      ${getFieldStatus('name') === 'error' ? 'border-red-500 focus:border-red-500 focus:ring-red-500' :
                        getFieldStatus('name') === 'success' ? 'border-green-500 focus:border-green-500 focus:ring-green-500' :
                        'border-card-border focus:border-primary focus:ring-primary'}`}
                    required
                  />
                  <AnimatePresence>
                    {touched.name && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {getFieldStatus('name') === 'error' ? (
                          <FaExclamationCircle className="text-red-500" />
                        ) : (
                          <FaCheckCircle className="text-green-500" />
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                {touched.name && !formData.name && (
                  <p className="mt-1 text-sm text-red-500">Name is required</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-4 py-2 rounded-lg bg-card-bg border transition-colors duration-200
                      ${getFieldStatus('email') === 'error' ? 'border-red-500 focus:border-red-500 focus:ring-red-500' :
                        getFieldStatus('email') === 'success' ? 'border-green-500 focus:border-green-500 focus:ring-green-500' :
                        'border-card-border focus:border-primary focus:ring-primary'}`}
                    required
                  />
                  <AnimatePresence>
                    {touched.email && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {getFieldStatus('email') === 'error' ? (
                          <FaExclamationCircle className="text-red-500" />
                        ) : (
                          <FaCheckCircle className="text-green-500" />
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                {touched.email && (!formData.email || !isEmailValid(formData.email)) && (
                  <p className="mt-1 text-sm text-red-500">
                    {!formData.email ? 'Email is required' : 'Please enter a valid email address'}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onBlur={() => handleBlur('message')}
                    rows={5}
                    className={`w-full px-4 py-2 rounded-lg bg-card-bg border transition-colors duration-200
                      ${getFieldStatus('message') === 'error' ? 'border-red-500 focus:border-red-500 focus:ring-red-500' :
                        getFieldStatus('message') === 'success' ? 'border-green-500 focus:border-green-500 focus:ring-green-500' :
                        'border-card-border focus:border-primary focus:ring-primary'}`}
                    required
                  />
                  <AnimatePresence>
                    {touched.message && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute right-3 top-6"
                      >
                        {getFieldStatus('message') === 'error' ? (
                          <FaExclamationCircle className="text-red-500" />
                        ) : (
                          <FaCheckCircle className="text-green-500" />
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                {touched.message && !formData.message && (
                  <p className="mt-1 text-sm text-red-500">Message is required</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className={`button-primary w-full relative overflow-hidden ${
                  status === 'loading' ? 'cursor-wait' : ''
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {status === 'loading' ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="ml-2">Sending...</span>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 text-green-500"
                  >
                    <FaCheckCircle />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 text-red-500"
                  >
                    <FaExclamationCircle />
                    <span>Failed to send message. Please try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Connect With Me</h2>
            <div className="space-y-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <link.icon className="text-2xl text-primary" />
                  <span className="text-lg">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
