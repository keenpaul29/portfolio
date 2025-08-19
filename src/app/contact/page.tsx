'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCheckCircle, FaExclamationCircle, FaPaperPlane, FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

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
    
    setTouched({
      name: true,
      email: true,
      message: true,
    });

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
    { icon: FaGithub, url: 'https://github.com/keenpaul29', label: 'GitHub', color: '#333' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/puspal-paul', label: 'LinkedIn', color: '#0077B5' },
    { icon: FaTwitter, url: 'https://twitter.com/paul_puspal', label: 'Twitter', color: '#1DA1F2' },
    { icon: FaEnvelope, url: 'mailto:puspalpaul8@gmail.com', label: 'Email', color: '#EA4335' },
  ];

  const contactInfo = [
    { icon: FaUser, label: 'Name', value: 'Puspal Paul' },
    { icon: FaEnvelope, label: 'Email', value: 'puspalpaul8@gmail.com' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Kolkata, India' },
    { icon: FaPhone, label: 'Available', value: '24/7 for projects' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 retro-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-yellow-900/10" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 mb-8 glass-morphism rounded-full"
          >
            <FaPaperPlane className="text-2xl text-blue-400" />
            <span className="pixel-text text-lg text-yellow-400">LET'S CONNECT</span>
          </motion.div>
          
          <h1 className="section-title gradient-text mb-6">
            GET IN TOUCH
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Have a question or want to work together? I'd love to hear from you.
            Let's create something amazing!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="retro-card"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <FaPaperPlane className="text-2xl text-white" />
              </div>
              <h2 className="pixel-text text-2xl text-blue-400">SEND MESSAGE</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-2 pixel-text">
                  NAME *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-4 py-3 rounded-2xl glass-morphism border-2 transition-all duration-300 focus:outline-none ${
                      getFieldStatus('name') === 'error' ? 'border-red-500 focus:border-red-400' :
                      getFieldStatus('name') === 'success' ? 'border-green-500 focus:border-green-400' :
                      'border-transparent focus:border-blue-400'
                    }`}
                    placeholder="Your awesome name"
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
                  <p className="mt-2 text-sm text-red-400 pixel-text">NAME IS REQUIRED</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2 pixel-text">
                  EMAIL *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-4 py-3 rounded-2xl glass-morphism border-2 transition-all duration-300 focus:outline-none ${
                      getFieldStatus('email') === 'error' ? 'border-red-500 focus:border-red-400' :
                      getFieldStatus('email') === 'success' ? 'border-green-500 focus:border-green-400' :
                      'border-transparent focus:border-blue-400'
                    }`}
                    placeholder="your.email@example.com"
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
                  <p className="mt-2 text-sm text-red-400 pixel-text">
                    {!formData.email ? 'EMAIL IS REQUIRED' : 'PLEASE ENTER A VALID EMAIL'}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-300 mb-2 pixel-text">
                  MESSAGE *
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onBlur={() => handleBlur('message')}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-2xl glass-morphism border-2 transition-all duration-300 focus:outline-none resize-none ${
                      getFieldStatus('message') === 'error' ? 'border-red-500 focus:border-red-400' :
                      getFieldStatus('message') === 'success' ? 'border-green-500 focus:border-green-400' :
                      'border-transparent focus:border-blue-400'
                    }`}
                    placeholder="Tell me about your awesome project idea..."
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
                  <p className="mt-2 text-sm text-red-400 pixel-text">MESSAGE IS REQUIRED</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className={`button-primary w-full relative overflow-hidden ${
                  status === 'loading' ? 'cursor-wait' : ''
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {status === 'loading' ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>SENDING...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <FaPaperPlane />
                      <span>SEND MESSAGE</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-400"
                  >
                    <FaCheckCircle />
                    <span className="pixel-text">MESSAGE SENT SUCCESSFULLY!</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-400"
                  >
                    <FaExclamationCircle />
                    <span className="pixel-text">FAILED TO SEND. TRY AGAIN!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="retro-card">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <FaUser className="text-2xl text-white" />
                </div>
                <h2 className="pixel-text text-2xl text-green-400">CONTACT INFO</h2>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 glass-morphism rounded-2xl hover:scale-105 transition-transform"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                      <info.icon className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 pixel-text">{info.label}</p>
                      <p className="text-black font-medium">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="retro-card">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                  <FaEnvelope className="text-2xl text-white" />
                </div>
                <h2 className="pixel-text text-2xl text-purple-400">SOCIAL MEDIA</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 glass-morphism rounded-2xl hover:scale-105 transition-all group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <link.icon 
                      className="text-2xl group-hover:scale-110 transition-transform" 
                      style={{ color: link.color }}
                    />
                    <span className="text-sm font-medium group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Response */}
            <div className="retro-card">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="pixel-text text-xl text-yellow-400 mb-2">QUICK RESPONSE</h3>
                <p className="text-gray-500 text-sm">
                  I typically respond within 24 hours. For urgent matters, 
                  feel free to reach out on LinkedIn!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}