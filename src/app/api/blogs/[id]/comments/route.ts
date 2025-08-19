import { NextResponse } from 'next/server';
import { createComment, listComments } from '@/lib/blogStore';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const comments = await listComments(id);
    return NextResponse.json({ comments });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to list comments';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    const { author, message } = body ?? {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }
    const { id } = await params;
    const comment = await createComment(id, author ?? '', message);
    return NextResponse.json({ comment }, { status: 201 });
  } catch (e: unknown) {
    const errMsg = e instanceof Error ? e.message : 'Failed to create comment';
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

