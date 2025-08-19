'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  tags: string[];
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/blogs', { cache: 'no-store' });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Failed to load');
        if (mounted) setPosts(data.posts || []);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Failed to load posts';
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold gradient-text mb-7">Blog</h1>
          <p className="text-xl text-foreground/70">
            Thoughts, tutorials, and insights about web development
          </p>
        </motion.div>

        <div className="space-y-8">
          {loading && (
            <div className="text-center text-foreground/60">Loading posts...</div>
          )}
          {error && (
            <div className="text-center text-red-500">{error}</div>
          )}
          {!loading && !error && posts.length === 0 && (
            <div className="text-center text-foreground/60">No posts yet.</div>
          )}
          {posts.map((post) => (
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

