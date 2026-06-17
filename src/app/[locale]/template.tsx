'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Template({ children }: { children: React.ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(elementRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all'
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={elementRef} className="w-full">
      {children}
    </div>
  );
}
