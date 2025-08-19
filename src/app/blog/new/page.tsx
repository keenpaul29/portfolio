'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NewBlogPost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          excerpt: excerpt.trim(),
          content: content.trim(),
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to create post');
      router.push(`/blog/${data.post.id}`);
    } catch (e: any) {
      setError(e.message || 'Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">New Blog Post</h1>
          <p className="text-foreground/70">Write and publish a new post</p>
        </motion.div>

        <form onSubmit={onSubmit} className="glass-card p-6 space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input className="input w-full" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Excerpt</label>
            <textarea className="input w-full h-24" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Content</label>
            <textarea className="input w-full h-64" value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Tags (comma separated)</label>
            <input className="input w-full" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
          <div className="flex gap-3">
            <button className="button-primary" disabled={submitting}>
              {submitting ? 'Publishing…' : 'Publish'}
            </button>
            <button type="button" className="button-secondary" onClick={() => router.push('/blog')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
