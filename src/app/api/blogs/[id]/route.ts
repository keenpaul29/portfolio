import { NextResponse } from 'next/server';
import { getPost } from '@/lib/blogStore';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await getPost(id);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ post });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to get post';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
