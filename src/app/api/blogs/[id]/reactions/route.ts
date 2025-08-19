import { NextResponse } from 'next/server';
import { addReaction, type ReactionKey } from '@/lib/blogStore';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { key } = body ?? {} as { key: ReactionKey };
    if (!key || !['like','love','clap'].includes(key)) {
      return NextResponse.json({ error: 'invalid reaction key' }, { status: 400 });
    }
    const post = await addReaction(params.id, key as ReactionKey);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ post });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to react' }, { status: 500 });
  }
}
