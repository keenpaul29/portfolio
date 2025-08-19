import { NextResponse } from 'next/server';
import { createPost, listPosts } from '@/lib/blogStore';

export async function GET() {
  try {
    const posts = await listPosts();
    return NextResponse.json({ posts });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to list posts';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, excerpt, content, tags } = body ?? {};
    if (!title || !content) {
      return NextResponse.json({ error: 'title and content are required' }, { status: 400 });
    }
    const post = await createPost({ title, excerpt: excerpt ?? '', content, tags: Array.isArray(tags) ? tags : [] });
    return NextResponse.json({ post }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to create post';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
