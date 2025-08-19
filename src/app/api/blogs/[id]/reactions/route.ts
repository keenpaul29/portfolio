import { NextResponse } from 'next/server';
import { addReaction, type ReactionKey } from '@/lib/blogStore';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    const { key } = (body ?? {}) as { key?: ReactionKey };
    if (!key || !['like','love','clap'].includes(key)) {
      return NextResponse.json({ error: 'invalid reaction key' }, { status: 400 });
    }
    const { id } = await params;
    const post = await addReaction(id, key as ReactionKey);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ post });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to react';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
