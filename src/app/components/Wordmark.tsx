import Image from 'next/image';
import type { CSSProperties } from 'react';

type WordmarkProps = {
  className?: string;
  imageClassName?: string;
  imageStyle?: CSSProperties;
  priority?: boolean;
  sizes?: string;
};

export default function Wordmark({
  className = '',
  imageClassName = '',
  imageStyle,
  priority = false,
  sizes = '160px',
}: WordmarkProps) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <Image
        src="/lbya-wordmark.png"
        alt="LBYA"
        fill
        sizes={sizes}
        className={`object-contain ${imageClassName}`}
        style={imageStyle}
        priority={priority}
      />
    </span>
  );
}
