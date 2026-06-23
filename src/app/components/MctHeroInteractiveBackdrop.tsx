'use client';

import React from 'react';

export default function MctHeroInteractiveBackdrop() {
  return (
    <div className="mct-hero-interactive pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_36%,rgba(165,214,167,0.22),transparent_24%),radial-gradient(circle_at_74%_38%,rgba(129,212,250,0.14),transparent_26%)]" />
      <div
        className="hero-grid-scan absolute inset-y-16 right-0 hidden w-[58%] opacity-35 md:block"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129,212,250,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(165,214,167,0.13) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'linear-gradient(90deg, transparent, black 16%, black 88%, transparent)',
        }}
      />

      <svg className="absolute inset-y-0 right-0 h-full w-full opacity-85" viewBox="0 0 1440 760" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mct-hero-route" x1="15%" y1="75%" x2="100%" y2="18%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.05" />
            <stop offset="42%" stopColor="#A5D6A7" stopOpacity="0.55" />
            <stop offset="74%" stopColor="#81D4FA" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#F5C469" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="mct-hero-route-soft" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#81D4FA" stopOpacity="0.34" />
          </linearGradient>
        </defs>

        {[
          'M112 596 C292 468 398 536 548 404 C704 268 846 352 1022 208 C1152 102 1262 136 1394 78',
          'M446 662 C590 560 676 614 794 492 C946 334 1046 410 1194 286 C1280 214 1348 222 1412 186',
          'M218 356 C392 276 524 326 676 252 C838 174 990 214 1146 142 C1234 102 1320 80 1418 104',
        ].map((path, index) => (
          <path
            key={path}
            className="hero-signal-line mct-hero-route-line"
            d={path}
            fill="none"
            stroke={index === 1 ? 'url(#mct-hero-route-soft)' : 'url(#mct-hero-route)'}
            strokeLinecap="round"
            strokeWidth={index === 1 ? '1.6' : '2.2'}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {[
          'M760 156 H902 V214 H1064',
          'M924 516 H1088 V456 H1294',
          'M612 286 H736 V344 H930 V298 H1114',
          'M1094 620 H1224 V566 H1382',
        ].map((path) => (
          <path
            key={path}
            className="hero-future-line mct-hero-step-line"
            d={path}
            fill="none"
            stroke="url(#mct-hero-route-soft)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {[
          { x: 548, y: 404, color: '#A5D6A7', delay: '0.1s' },
          { x: 794, y: 492, color: '#81D4FA', delay: '0.55s' },
          { x: 1022, y: 208, color: '#F5C469', delay: '0.9s' },
          { x: 1194, y: 286, color: '#A5D6A7', delay: '1.2s' },
          { x: 1294, y: 456, color: '#81D4FA', delay: '1.55s' },
          { x: 1394, y: 78, color: '#F5C469', delay: '1.9s' },
        ].map((node) => (
          <circle
            key={`${node.x}-${node.y}`}
            className="hero-signal-node"
            cx={node.x}
            cy={node.y}
            r="6"
            fill="none"
            stroke={node.color}
            strokeWidth="1.8"
            vectorEffect="non-scaling-stroke"
            style={{ animationDelay: node.delay }}
          />
        ))}
      </svg>
    </div>
  );
}
