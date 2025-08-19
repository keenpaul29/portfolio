import { NextResponse } from 'next/server';
import { getPost } from '@/lib/blogStore';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const post = await getPost(params.id);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ post });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to get post' }, { status: 500 });
  }
}
