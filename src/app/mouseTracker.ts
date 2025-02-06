'use client';

export function initMouseTracker() {
  if (typeof window === 'undefined') return;

  const handleMouseMove = (e: MouseEvent) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}

export const mouseMoveEvent = (e: MouseEvent, cursor: HTMLElement | null, aura: HTMLElement | null) => {
  if (!cursor || !aura) return;

  // Update cursor position with smooth transition
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  // Update aura position with lag effect
  aura.style.left = `${e.clientX - 75}px`;
  aura.style.top = `${e.clientY - 75}px`;
};

export const mouseEnterEvent = (cursor: HTMLElement | null, aura: HTMLElement | null) => {
  if (!cursor || !aura) return;
  cursor.classList.add('cursor-hover');
  aura.classList.add('aura-hover');
};

export const mouseLeaveEvent = (cursor: HTMLElement | null, aura: HTMLElement | null) => {
  if (!cursor || !aura) return;
  cursor.classList.remove('cursor-hover');
  aura.classList.remove('aura-hover');
};