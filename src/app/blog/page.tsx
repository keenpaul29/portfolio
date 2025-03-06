'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building a Modern Web Application with Next.js 15',
    excerpt: 'Learn how to leverage the latest features in Next.js 15 to build fast, responsive web applications...',
    date: '2024-02-15',
    readTime: '5 min read',
    tags: ['Next.js', 'React', 'Web Development'],
  },
  {
    id: '2',
    title: 'Mastering TypeScript: Advanced Tips and Tricks',
    excerpt: 'Dive deep into TypeScript\'s advanced features and learn how to write more maintainable code...',
    date: '2024-02-10',
    readTime: '7 min read',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
  },
  // Add more blog posts
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold gradient-text mb-6">Blog</h1>
          <p className="text-xl text-foreground/70">
            Thoughts, tutorials, and insights about web development
          </p>
        </motion.div>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 hover:shadow-lg transition-shadow"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-foreground/60">
                    <time>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-foreground/80">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
