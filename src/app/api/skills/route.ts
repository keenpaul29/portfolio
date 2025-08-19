import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const skillsDir = path.join(process.cwd(), 'public', 'skills');
    const files = await fs.readdir(skillsDir);
    const icons = files
      .filter((f) => /\.(svg|png|jpg|jpeg|webp)$/i.test(f))
      .map((f) => ({ name: f.replace(/\.[^.]+$/, ''), src: `/skills/${f}` }));

    return NextResponse.json({ icons });
  } catch (err) {
    console.error('Error reading skills directory', err);
    return NextResponse.json({ icons: [] }, { status: 200 });
  }
}
