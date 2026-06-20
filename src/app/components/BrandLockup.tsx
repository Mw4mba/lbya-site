import Image from 'next/image';
import Wordmark from './Wordmark';

type BrandLockupProps = {
  className?: string;
  symbolClassName?: string;
  wordmarkClassName?: string;
  priority?: boolean;
  wordmarkSizes?: string;
};

export default function BrandLockup({
  className = '',
  symbolClassName = 'h-8 w-8',
  wordmarkClassName = 'h-8 w-28',
  priority = false,
  wordmarkSizes = '160px',
}: BrandLockupProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className={`relative inline-block shrink-0 overflow-hidden ${symbolClassName}`} aria-hidden="true">
        <Image
          src="/brand-symbol.svg"
          alt=""
          fill
          sizes="48px"
          className="object-contain"
          priority={priority}
        />
      </span>
      <Wordmark className={wordmarkClassName} priority={priority} sizes={wordmarkSizes} />
    </span>
  );
}
