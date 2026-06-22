'use client';

import { useRef } from 'react';

export type ResourcesHeroVariant =
  | 'resources'
  | 'insights'
  | 'problem-library'
  | 'integrations'
  | 'research-thesis'
  | 'release-notes'
  | 'help-guides';

type VariantConfig = {
  gridOpacity: number;
  signalOpacity: number;
  sweepDuration: string;
  primarySignal: string;
  secondarySignal: string;
  tertiarySignal: string;
};

const variantConfigs: Record<ResourcesHeroVariant, VariantConfig> = {
  resources: {
    gridOpacity: 0.32,
    signalOpacity: 0.55,
    sweepDuration: '9.2s',
    primarySignal: 'M0 328 C160 292 260 330 418 286 C554 248 644 288 774 242 C910 194 1018 242 1200 206',
    secondarySignal: 'M0 392 C176 350 312 404 470 356 C612 312 748 360 892 318 C1022 280 1120 308 1200 296',
    tertiarySignal: 'M96 180 L312 232 L508 190 L742 224 L948 184 L1142 226',
  },
  insights: {
    gridOpacity: 0.36,
    signalOpacity: 0.62,
    sweepDuration: '8.6s',
    primarySignal: 'M0 304 C138 274 268 308 426 268 C584 226 696 274 842 222 C962 180 1078 214 1200 188',
    secondarySignal: 'M0 384 C190 340 322 390 472 348 C632 306 764 350 910 306 C1030 270 1130 290 1200 278',
    tertiarySignal: 'M84 166 L284 214 L512 172 L738 206 L952 170 L1128 210',
  },
  'problem-library': {
    gridOpacity: 0.28,
    signalOpacity: 0.58,
    sweepDuration: '10.1s',
    primarySignal: 'M0 344 C156 302 290 352 444 304 C600 256 722 302 854 254 C996 202 1090 246 1200 216',
    secondarySignal: 'M0 414 C170 370 304 430 462 380 C618 334 764 390 916 338 C1034 296 1128 322 1200 308',
    tertiarySignal: 'M108 196 L302 248 L522 208 L744 238 L954 206 L1138 244',
  },
  integrations: {
    gridOpacity: 0.38,
    signalOpacity: 0.64,
    sweepDuration: '8.2s',
    primarySignal: 'M0 292 C140 252 270 286 422 246 C586 202 700 246 846 202 C972 164 1088 198 1200 176',
    secondarySignal: 'M0 360 C182 318 314 370 466 326 C626 282 758 332 902 290 C1022 252 1124 272 1200 262',
    tertiarySignal: 'M82 152 L302 198 L516 160 L748 190 L968 156 L1146 196',
  },
  'research-thesis': {
    gridOpacity: 0.26,
    signalOpacity: 0.52,
    sweepDuration: '10.8s',
    primarySignal: 'M0 336 C170 296 288 336 448 292 C602 248 710 290 844 242 C986 190 1082 234 1200 204',
    secondarySignal: 'M0 402 C188 360 320 412 478 368 C636 324 776 372 918 328 C1038 292 1132 318 1200 300',
    tertiarySignal: 'M96 188 L310 238 L530 196 L750 228 L960 194 L1132 232',
  },
  'release-notes': {
    gridOpacity: 0.34,
    signalOpacity: 0.6,
    sweepDuration: '8.9s',
    primarySignal: 'M0 298 C148 262 286 300 438 260 C598 216 716 262 856 218 C986 178 1088 214 1200 192',
    secondarySignal: 'M0 372 C180 330 316 382 468 338 C626 294 768 342 914 298 C1032 262 1128 284 1200 272',
    tertiarySignal: 'M88 160 L292 210 L516 170 L742 202 L954 168 L1134 206',
  },
  'help-guides': {
    gridOpacity: 0.24,
    signalOpacity: 0.5,
    sweepDuration: '10.4s',
    primarySignal: 'M0 354 C168 312 286 356 442 314 C594 270 714 314 846 268 C992 216 1086 258 1200 228',
    secondarySignal: 'M0 426 C186 382 320 434 472 390 C630 348 776 398 922 348 C1042 312 1132 336 1200 320',
    tertiarySignal: 'M112 206 L316 258 L536 216 L760 248 L968 214 L1144 252',
  },
};

export default function ResourcesHeroInteractiveBackdrop({ variant = 'resources' }: { variant?: ResourcesHeroVariant }) {
  const config = variantConfigs[variant];
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={rootRef}
      className="resources-hero-interactive pointer-events-none absolute inset-0"
      aria-hidden="true"
      style={{
        '--resources-sweep-duration': config.sweepDuration,
      } as React.CSSProperties}
    >
      <div className="resources-hero-glow absolute inset-0" />
      <div className="resources-hero-sweep absolute inset-0" />
      <div
        className="resources-hero-grid hero-grid-scan absolute inset-0"
        style={{
          opacity: config.gridOpacity,
          backgroundImage:
            'linear-gradient(rgba(129, 212, 250, 0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(165, 214, 167, 0.11) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          maskImage: 'linear-gradient(180deg, black 0%, black 72%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 72%, transparent 100%)',
        }}
      />

      <svg className="absolute inset-0 h-full w-full" style={{ opacity: config.signalOpacity }} viewBox="0 0 1200 560" preserveAspectRatio="none">
        <defs>
          <linearGradient id="resources-signal-green" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0" />
            <stop offset="48%" stopColor="#A5D6A7" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#81D4FA" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="resources-signal-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#81D4FA" stopOpacity="0" />
            <stop offset="50%" stopColor="#81D4FA" stopOpacity="0.74" />
            <stop offset="100%" stopColor="#A5D6A7" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path className="hero-signal-line" d={config.primarySignal} fill="none" stroke="url(#resources-signal-green)" strokeWidth="1.6" />
        <path className="hero-signal-line" d={config.secondarySignal} fill="none" stroke="url(#resources-signal-cyan)" strokeWidth="1.3" style={{ animationDuration: '12s' }} />
        <path className="hero-future-line" d={config.tertiarySignal} fill="none" stroke="url(#resources-signal-cyan)" strokeWidth="1" />

        {[
          [312, 232],
          [508, 190],
          [742, 224],
          [948, 184],
        ].map(([x, y], index) => (
          <circle
            key={`${x}-${y}`}
            className="hero-signal-node"
            cx={x}
            cy={y}
            r="4.5"
            fill={index % 2 === 0 ? '#A5D6A7' : '#81D4FA'}
            style={{ animationDelay: `${index * 0.25}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
