import { NextResponse } from 'next/server';
import { createComment, listComments } from '@/lib/blogStore';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const comments = await listComments(params.id);
    return NextResponse.json({ comments });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to list comments' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { author, message } = body ?? {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }
    const comment = await createComment(params.id, author ?? '', message);
    return NextResponse.json({ comment }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to create comment' }, { status: 500 });
  }
}
