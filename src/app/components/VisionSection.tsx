'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function VisionSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (sectionRef.current && containerRef.current) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=300%', // Scroll distance
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                    },
                });

                itemsRef.current.forEach((item, index) => {
                    if (item) {
                        // 1. Entrance: Slide up and fade in, starting as GREEN
                        tl.fromTo(
                            item,
                            {
                                opacity: 0,
                                y: 60,
                                color: '#2E7D32', // Start Green
                                filter: 'blur(10px)',
                            },
                            {
                                opacity: 1,
                                y: 0,
                                color: '#2E7D32', // Stay Green
                                filter: 'blur(0px)',
                                duration: 1,
                                ease: 'power2.out',
                            }
                        );

                        // 2. If there's a previous item, turn it GREY as this one enters
                        if (index > 0) {
                            const prevItem = itemsRef.current[index - 1];
                            if (prevItem) {
                                tl.to(
                                    prevItem,
                                    {
                                        color: '#CFD8DC', // Light Grey/Neutral
                                        duration: 1,
                                        ease: 'power2.out',
                                    },
                                    "<" // Sync with entrance
                                );
                            }
                        }

                        // Add a pause
                        tl.to({}, { duration: 0.5 });
                    }
                });

                // 3. Final step: Turn the last item GREY as well, so it's "temporary" too
                const lastItem = itemsRef.current[itemsRef.current.length - 1];
                if (lastItem) {
                    tl.to(lastItem, {
                        color: '#CFD8DC',
                        duration: 1,
                        ease: 'power2.out'
                    });
                }
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const visionPoints = [
        "Most teams lose time in the gaps between tools, where information scatters and ownership blurs.",
        "LBYA builds digital control platforms that connect data, documents, and decisions.",
        "Clarity, traceability, and decision readiness, so teams act on a record they can trust.",
        "Rooted in nature, designed for the future, and built for connected industries."
    ];

    return (
        <section ref={sectionRef} className="relative h-screen flex items-center justify-center bg-white overflow-hidden">
            <div ref={containerRef} className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
                <div className="max-w-4xl mx-auto text-center">
                    <ul className="space-y-8 md:space-y-12">
                        {visionPoints.map((point, index) => (
                            <li
                                key={index}
                                ref={(el) => {
                                    itemsRef.current[index] = el;
                                }}
                                className="will-change-transform"
                            >
                                <p className="text-2xl md:text-3xl font-bold leading-tight transition-colors">
                                    {point}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Decorative background element - Subtle gradient */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F5F5DC]/40 to-transparent -z-10 pointer-events-none" />
        </section>
    );
}
