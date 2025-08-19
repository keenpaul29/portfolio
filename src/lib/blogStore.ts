import { promises as fs } from 'fs';
import path from 'path';

export type ReactionKey = 'like' | 'love' | 'clap';

export interface Comment {
  id: string;
  postId: string;
  author: string;
  message: string;
  createdAt: string; // ISO
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string; // ISO
  readTime: string; // e.g., '5 min read'
  reactions: Record<ReactionKey, number>;
}

const dataFile = path.join(process.cwd(), 'data', 'blogs.json');

async function readFile(): Promise<{ posts: BlogPost[]; comments: Comment[] } | null> {
  try {
    const raw = await fs.readFile(dataFile, 'utf-8');
    const parsed = JSON.parse(raw);
    // Backfill older format (array only)
    if (Array.isArray(parsed)) {
      return { posts: parsed as BlogPost[], comments: [] };
    }
    return parsed;
  } catch (e: unknown) {
    if (typeof e === 'object' && e !== null && 'code' in e && (e as { code?: unknown }).code === 'ENOENT') {
      return { posts: [], comments: [] };
    }
    throw e;
  }
}

async function writeFile(data: { posts: BlogPost[]; comments: Comment[] }) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}

export async function listPosts(): Promise<BlogPost[]> {
  const data = await readFile();
  return data?.posts ?? [];
}

export async function getPost(id: string): Promise<BlogPost | null> {
  const data = await readFile();
  return data?.posts.find(p => p.id === id) ?? null;
}

export async function createPost(input: Omit<BlogPost, 'id' | 'reactions' | 'date' | 'readTime'> & { date?: string; readTime?: string }): Promise<BlogPost> {
  const data = await readFile();
  const posts = data?.posts ?? [];
  const now = new Date();
  const id = `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`;
  const readTime = input.readTime ?? `${Math.max(1, Math.ceil(input.content.split(/\s+/).length / 200))} min read`;
  const post: BlogPost = {
    id,
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
    tags: input.tags ?? [],
    date: input.date ?? now.toISOString(),
    readTime,
    reactions: { like: 0, love: 0, clap: 0 },
  };
  const nextData = { posts: [post, ...posts], comments: data?.comments ?? [] };
  await writeFile(nextData);
  return post;
}

export async function addReaction(id: string, key: ReactionKey): Promise<BlogPost | null> {
  const data = await readFile();
  if (!data) return null;
  const idx = data.posts.findIndex(p => p.id === id);
  if (idx === -1) return null;
  data.posts[idx].reactions[key] = (data.posts[idx].reactions[key] ?? 0) + 1;
  await writeFile(data);
  return data.posts[idx];
}

export async function listComments(postId: string): Promise<Comment[]> {
  const data = await readFile();
  return (data?.comments ?? []).filter(c => c.postId === postId);
}

export async function createComment(postId: string, author: string, message: string): Promise<Comment> {
  const data = await readFile();
  const comments = data?.comments ?? [];
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const comment: Comment = {
    id,
    postId,
    author: author?.trim() || 'Anonymous',
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
  const nextData = { posts: data?.posts ?? [], comments: [...comments, comment] };
  await writeFile(nextData);
  return comment;
}
