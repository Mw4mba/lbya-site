'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function PageLabelSidebar() {
    const pathname = usePathname();

    const getPageTitle = (path: string) => {
        switch (path) {
            case '/':
                return 'Home';
            case '/about':
                return 'About Us';
            case '/projects':
                return 'Projects';
            case '/contact':
                return 'Contact';
            case '/careers':
                return 'Careers';
            case '/privacy':
                return 'Privacy Policy';
            case '/legal':
                return 'Policies & Terms';

            // Explicitly check for other known paths or fall back to formatting
            default:
                // Remove leading slash and existing dashes/underscores
                const cleanPath = path.substring(1).split('/').pop() || '';
                if (!cleanPath) return 'Home';

                // Convert to Title Case
                return cleanPath
                    .replace(/[-_]/g, ' ')
                    .replace(/\b\w/g, (char) => char.toUpperCase());
        }
    };

    const title = getPageTitle(pathname);

    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center justify-center w-14 h-screen pointer-events-none">
            {/* Use mix-blend-difference to ensure visibility on both dark and light backgrounds if needed, 
           but user specifically asked for "white 50%". 
           If the background is white (like about page), white 50% will be invisible. 
           However, sticking to strict user request first. 
           If it's invisible on white pages, I might need to adjust or add mix-blend-mode.
           Let's adhere to "white 50%" as requested, but maybe add a slight shadow or mix-blend mode if it completely disappears.
           User said: "it should be white 50%".
       */}
            <div className="rotate-90 origin-center whitespace-nowrap text-white/50 text-sm font-medium tracking-[0.2em] uppercase">
                {title}
            </div>
        </div>
    );
}
