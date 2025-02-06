'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Clear form
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const socialLinks = [
    { icon: FaLinkedin, url: 'https://linkedin.com/in/puspal-paul', color: '#0077B5' },
    { icon: FaGithub, url: 'https://github.com/keenpaul29', color: '#333' },
    { icon: FaTwitter, url: 'https://twitter.com/paul_puspal', color: '#1DA1F2' },
    { icon: FaEnvelope, url: 'mailto:puspalpaul8@gmail.com', color: '#D44638' }
  ];

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
            Let&apos;s Connect
          </h1>
          <p className="text-xl text-foreground/70">
            Have a project in mind? Let&apos;s bring it to life together!
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show">
          <div className="grid md:grid-cols-5 gap-8">
            <motion.div variants={item} className="md:col-span-3">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-card-border bg-card-bg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-card-border bg-card-bg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-card-border bg-card-bg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  <button type="submit" className="button-primary w-full group">
                    Send Message
                    <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div variants={item} className="md:col-span-2">
              <div className="glass-card p-8 h-full">
                <h2 className="text-2xl font-semibold mb-6">Connect With Me</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Email</h3>
                    <a href="mailto:puspalpaulb@gmail.com" className="text-primary hover:text-primary-dark transition-colors">
                      puspalpaul8@gmail.com
                    </a>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Location</h3>
                    <p className="text-foreground/70">Kolkata, India</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Contact</h3>
                    <p className="text-foreground/70">+91 8274996284</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Social Media</h3>
                    <div className="flex space-x-4">
                      <a
                        href="https://linkedin.com/in/puspal-paul"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://github.com/keenpaul29"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4 mt-6">
                    {socialLinks.map((link, index) => (
                      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: link.color }}>
                        <link.icon size={30} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
