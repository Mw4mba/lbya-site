'use client';

import { useEffect, useRef } from 'react';

const modelSlabs = [
  'M742 228 L1056 274 L1268 154 L954 108 Z',
  'M716 322 L1040 370 L1262 244 L930 196 Z',
  'M690 416 L1026 466 L1254 336 L906 286 Z',
  'M662 520 L1012 574 L1248 432 L878 378 Z',
];

const modelEdges = [
  'M742 228 L662 520',
  'M1056 274 L1012 574',
  'M1268 154 L1248 432',
  'M954 108 L878 378',
  'M842 242 L774 532',
  'M960 258 L902 556',
  'M1162 214 L1140 498',
];

const facadeLines = [
  'M760 260 L1070 306 L1246 206',
  'M734 356 L1048 404 L1254 284',
  'M708 452 L1030 502 L1250 366',
  'M842 242 L1162 214',
  'M774 532 L1140 498',
  'M960 258 L902 556',
  'M1056 274 L1268 154',
  'M1012 574 L1248 432',
];

const inspectionPaths = [
  {
    id: 'nbc-bim-path-primary',
    d: 'M632 510 L716 322 L954 108 L1268 154 L1248 432 L1012 574',
    stroke: 'url(#nbc-bim-green)',
    width: '1.7',
  },
  {
    id: 'nbc-bim-path-secondary',
    d: 'M878 378 L906 286 L930 196 L1056 274 L1040 370 L1026 466',
    stroke: 'url(#nbc-bim-cyan)',
    width: '1.35',
  },
  {
    id: 'nbc-bim-path-tertiary',
    d: 'M662 520 L878 378 L1248 432',
    stroke: 'url(#nbc-bim-warm)',
    width: '1.25',
  },
];

const modelNodes = [
  { x: 742, y: 228, color: '#A5D6A7', delay: '0s' },
  { x: 954, y: 108, color: '#81D4FA', delay: '0.25s' },
  { x: 1268, y: 154, color: '#A5D6A7', delay: '0.5s' },
  { x: 930, y: 196, color: '#F5F5DC', delay: '0.75s' },
  { x: 1040, y: 370, color: '#81D4FA', delay: '1s' },
  { x: 878, y: 378, color: '#A5D6A7', delay: '1.25s' },
  { x: 1012, y: 574, color: '#F5F5DC', delay: '1.5s' },
  { x: 1248, y: 432, color: '#81D4FA', delay: '1.75s' },
];

const travelDots = [
  { path: '#nbc-bim-path-primary', color: '#A5D6A7', radius: 4.4, duration: '9.4s', begin: '0s' },
  { path: '#nbc-bim-path-primary', color: '#F5F5DC', radius: 3.4, duration: '9.4s', begin: '-3.2s' },
  { path: '#nbc-bim-path-secondary', color: '#81D4FA', radius: 3.8, duration: '7.8s', begin: '-1.6s' },
  { path: '#nbc-bim-path-tertiary', color: '#A5D6A7', radius: 3.2, duration: '6.8s', begin: '-2.4s' },
];

const roomOutlines = [
  'M788 315 L928 336 L928 418 L768 394 Z',
  'M948 340 L1088 360 L1082 448 L928 418 Z',
  'M900 205 L1038 225 L1034 294 L884 274 Z',
];

export default function NbcHeroInteractiveBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updatePointer = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / Math.max(bounds.width, 1);
      const y = (event.clientY - bounds.top) / Math.max(bounds.height, 1);
      const clampedX = Math.min(Math.max(x, 0), 1);
      const clampedY = Math.min(Math.max(y, 0), 1);
      root.style.setProperty('--nbc-pointer-x', clampedX.toFixed(3));
      root.style.setProperty('--nbc-pointer-y', clampedY.toFixed(3));
      root.style.setProperty('--nbc-offset-x', `${((clampedX - 0.5) * -22).toFixed(2)}px`);
      root.style.setProperty('--nbc-offset-y', `${((clampedY - 0.5) * -12).toFixed(2)}px`);
      root.style.setProperty('--nbc-grid-x', `${((clampedX - 0.5) * 18).toFixed(2)}px`);
      root.style.setProperty('--nbc-grid-y', `${((clampedY - 0.5) * 10).toFixed(2)}px`);
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => window.removeEventListener('pointermove', updatePointer);
  }, []);

  return (
    <div
      ref={rootRef}
      className="nbc-hero-interactive pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_calc(var(--nbc-pointer-x,0.74)*100%)_calc(var(--nbc-pointer-y,0.24)*100%),rgba(165,214,167,0.24),transparent_23%),radial-gradient(circle_at_76%_34%,rgba(129,212,250,0.2),transparent_31%),linear-gradient(135deg,rgba(46,125,50,0.22),rgba(55,71,79,0.95)_44%,rgba(31,53,41,0.98))]" />

      <div
        className="hero-grid-scan absolute bottom-[-22%] right-[-8%] hidden h-[72%] w-[72%] opacity-35 md:block"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129,212,250,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(165,214,167,0.13) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(90deg, transparent, black 18%, black 86%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 18%, black 86%, transparent)',
          transform:
            'perspective(900px) rotateX(64deg) rotateZ(-8deg) translate3d(var(--nbc-grid-x,0px), var(--nbc-grid-y,0px), 0)',
          transformOrigin: 'center bottom',
        }}
      />

      <svg className="absolute inset-y-0 right-0 h-full w-full opacity-95" viewBox="0 0 1440 760" preserveAspectRatio="none">
        <defs>
          <linearGradient id="nbc-bim-green" x1="30%" y1="80%" x2="100%" y2="12%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.08" />
            <stop offset="48%" stopColor="#A5D6A7" stopOpacity="0.64" />
            <stop offset="100%" stopColor="#81D4FA" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="nbc-bim-cyan" x1="0%" y1="30%" x2="100%" y2="62%">
            <stop offset="0%" stopColor="#81D4FA" stopOpacity="0.08" />
            <stop offset="58%" stopColor="#81D4FA" stopOpacity="0.58" />
            <stop offset="100%" stopColor="#A5D6A7" stopOpacity="0.36" />
          </linearGradient>
          <linearGradient id="nbc-bim-warm" x1="0%" y1="60%" x2="100%" y2="30%">
            <stop offset="0%" stopColor="#F5F5DC" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#F5F5DC" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="nbc-bim-slab" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.08" />
            <stop offset="58%" stopColor="#81D4FA" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#F5F5DC" stopOpacity="0.035" />
          </linearGradient>
          <filter id="nbc-bim-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="nbc-hero-model" filter="url(#nbc-bim-glow)">
          {modelSlabs.map((path, index) => (
            <path
              key={path}
              className="nbc-hero-slab"
              d={path}
              fill="url(#nbc-bim-slab)"
              stroke={index === 0 ? 'url(#nbc-bim-green)' : 'url(#nbc-bim-cyan)'}
              strokeWidth={index === 0 ? '1.35' : '1'}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {roomOutlines.map((path) => (
            <path
              key={path}
              className="hero-future-line nbc-hero-room-line"
              d={path}
              fill="rgba(129,212,250,0.035)"
              stroke="url(#nbc-bim-cyan)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.95"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {modelEdges.map((path) => (
            <path
              key={path}
              className="nbc-hero-model-line"
              d={path}
              fill="none"
              stroke="url(#nbc-bim-green)"
              strokeLinecap="round"
              strokeWidth="1.05"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {facadeLines.map((path) => (
            <path
              key={path}
              className="hero-future-line nbc-hero-facade-line"
              d={path}
              fill="none"
              stroke="url(#nbc-bim-cyan)"
              strokeLinecap="round"
              strokeWidth="0.9"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path
            className="nbc-hero-scan-plane"
            d="M716 322 L1040 370 L1262 244 L930 196 Z"
            fill="rgba(165,214,167,0.11)"
            stroke="rgba(165,214,167,0.42)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {inspectionPaths.map((line, index) => (
            <path
              id={line.id}
              key={line.id}
              className="hero-signal-line nbc-hero-inspection-line"
              d={line.d}
              fill="none"
              stroke={line.stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={line.width}
              vectorEffect="non-scaling-stroke"
              style={{ animationDuration: `${11 + index * 2}s` }}
            />
          ))}

          {modelNodes.map((node) => (
            <g key={`${node.x}-${node.y}`} className="hero-signal-node nbc-hero-static-node" style={{ animationDelay: node.delay }}>
              <circle cx={node.x} cy={node.y} r="9" fill={node.color} opacity="0.12" />
              <circle cx={node.x} cy={node.y} r="4.6" fill="none" stroke={node.color} strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
            </g>
          ))}

          {travelDots.map((dot, index) => (
            <g key={`${dot.path}-${dot.begin}`} className="nbc-hero-flow-dot" filter="url(#nbc-bim-glow)">
              <circle r={dot.radius + 4} fill={dot.color} opacity="0.12" />
              <circle r={dot.radius} fill={dot.color} opacity="0.94" />
              <animateMotion dur={dot.duration} begin={dot.begin} repeatCount="indefinite" rotate="auto">
                <mpath href={dot.path} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values={index % 2 === 0 ? '0.58;1;0.58' : '0.42;0.88;0.42'}
                dur="2.8s"
                repeatCount="indefinite"
              />
            </g>
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 bg-linear-to-r from-[#37474F] via-[#37474F]/82 to-[#37474F]/16" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#37474F]/38" />
    </div>
  );
}
