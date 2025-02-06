'use client';
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full backdrop-blur-md bg-nav-bg z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold gradient-text">
          keenpaul29.me
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
