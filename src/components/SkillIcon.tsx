import Image from 'next/image';
import React from 'react';

type SkillIconProps = {
  src: string; // e.g., "/skills/react.svg"
  name: string;
  size?: number; // pixel size for both width and height
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
};

export default function SkillIcon({ src, name, size = 24, className = '', style, priority = false }: SkillIconProps) {
  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className={className}
      style={style}
      priority={priority}
    />
  );
}
