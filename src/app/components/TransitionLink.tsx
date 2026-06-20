'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useTransition } from '../context/TransitionContext';

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export default function TransitionLink({ children, href, ...props }: TransitionLinkProps) {
  const { navigate } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.includes('#')) return;

    // Only handle internal links and left clicks
    if (href.startsWith('/') && !href.startsWith('http') && e.button === 0 && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
