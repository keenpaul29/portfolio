'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

type ReactionKey = 'like' | 'love' | 'clap';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  tags: string[];
  reactions: Record<ReactionKey, number>;
}

interface Comment {
  id: string;
  postId: string;
  author: string;
  message: string;
  createdAt: string;
}

export default function BlogPost() {
  const params = useParams() as { id?: string | string[] };
  const id = useMemo(() => (Array.isArray(params?.id) ? params.id[0] : params?.id) as string, [params]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commenting, setCommenting] = useState(false);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let mounted = true;
    if (!id) return;
    (async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          fetch(`/api/blogs/${id}`, { cache: 'no-store' }),
          fetch(`/api/blogs/${id}/comments`, { cache: 'no-store' }),
        ]);
        const postJson = await postRes.json();
        const commentsJson = await commentsRes.json();
        if (!postRes.ok) throw new Error(postJson?.error || 'Failed to load post');
        if (!commentsRes.ok) throw new Error(commentsJson?.error || 'Failed to load comments');
        if (mounted) {
          setPost(postJson.post);
          setComments(commentsJson.comments || []);
        }
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Failed to load';
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const react = async (key: ReactionKey) => {
    if (!id) return;
    const res = await fetch(`/api/blogs/${id}/reactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });
    const data = await res.json();
    if (res.ok) setPost(data.post);
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !message.trim()) return;
    try {
      setCommenting(true);
      const res = await fetch(`/api/blogs/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments(prev => [data.comment, ...prev]);
        setAuthor('');
        setMessage('');
      }
    } finally {
      setCommenting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center text-foreground/60">Loading…</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/blog"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg dark:prose-invert mx-auto"
        >
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
            <div className="flex flex-wrap gap-2 mb-8">
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
          {post.excerpt && <p className="text-lg leading-relaxed">{post.excerpt}</p>}
          {post.content && (
            <div className="mt-6 whitespace-pre-wrap leading-relaxed">{post.content}</div>
          )}
        </motion.article>

        <div className="mt-10 glass-card p-6">
          <h3 className="text-xl font-semibold mb-4">Reactions</h3>
          <div className="flex gap-3">
            <button className="button-primary" onClick={() => react('like')}>👍 Like ({post.reactions.like})</button>
            <button className="button-primary" onClick={() => react('love')}>❤️ Love ({post.reactions.love})</button>
            <button className="button-primary" onClick={() => react('clap')}>👏 Clap ({post.reactions.clap})</button>
          </div>
        </div>

        <div className="mt-10 glass-card p-6">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          <form onSubmit={submitComment} className="space-y-3 mb-6">
            <input
              className="w-full input"
              placeholder="Your name (optional)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <textarea
              className="w-full input h-28"
              placeholder="Write a comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button className="button-primary" disabled={commenting}>
              {commenting ? 'Posting…' : 'Post Comment'}
            </button>
          </form>
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-lg bg-foreground/5">
                <div className="text-sm text-foreground/60 mb-1">
                  <span className="font-medium">{c.author || 'Anonymous'}</span> · {new Date(c.createdAt).toLocaleString()}
                </div>
                <div>{c.message}</div>
              </div>
            ))}
            {comments.length === 0 && (
              <div className="text-foreground/60">No comments yet. Be the first!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}