'use client';
import { useEffect } from 'react';
import { initMouseTracker } from '../app/mouseTracker';

export default function MouseTracker() {
  useEffect(() => {
    const cleanup = initMouseTracker();
    return cleanup;
  }, []);

  return null;
} 