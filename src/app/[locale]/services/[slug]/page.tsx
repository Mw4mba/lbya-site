'use client';

import React, { useEffect, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Service data - All 5 service categories
const servicesData = {
    'sustainable-architecture': {
        title: 'Sustainable Architecture',
        heroSubtitle: 'Designing Buildings That Harmonize with Nature',
        image: '/sustainable-architecture-v2.png',
        description: 'We design buildings that harmonize with their environment, integrating passive strategies, renewable energy, and biophilic principles to create spaces that nurture well-being while minimizing ecological impact.',
        sections: [
            {
                title: 'LEED & BREEAM Certification',
                content: 'Our team specializes in achieving top-tier certifications for green buildings. We guide projects through rigorous environmental assessment criteria, ensuring measurable performance in energy efficiency, water conservation, indoor environmental quality, and sustainable materials selection.',
            },
            {
                title: 'Net-Zero Design',
                content: 'We pioneer buildings that produce as much energy as they consume through integrated renewable energy systems, ultra-efficient building envelopes, and advanced energy modeling. Our holistic approach balances operational efficiency with embodied carbon reduction.',
            },
            {
                title: 'Circular Economy Principles',
                content: 'From design to demolition, we embrace circular principles that minimize waste and maximize resource value. We specify materials for disassembly, incorporate recycled content, and create adaptive spaces that evolve with changing needs over time.',
            },
        ],
        keyPoints: [
            'LEED & BREEAM certification guidance',
            'Net-Zero design and energy modeling',
            'Circular economy principles and materials',
        ],
    },
    'structural-engineering': {
        title: 'Structural Engineering',
        heroSubtitle: 'Innovative Solutions for Complex Structures',
        image: '/images/services/structural.jpg',
        description: 'Our core services focus on the design of concrete and steel structures and independent structural design audits. We deliver safe, efficient, and buildable solutions in full compliance with Eurocode, the Swedish National Annex (EKS), and South African structural engineering standards (SANS). Through rigorous analysis and clear documentation, we support developers, consultants, and contractors with reliable designs and professional verification across international projects.',
        sections: [
            {
                title: 'Advanced Structural Analysis',
                content: 'Using cutting-edge computational tools and simulation software, we perform comprehensive structural analyses that optimize material usage while ensuring safety margins exceed code requirements. Our analyses account for dynamic loads, seismic events, and long-term performance.',
            },
            {
                title: 'Concrete & Steel Design',
                content: 'We specialize in innovative concrete and steel structural systems that maximize strength-to-weight ratios. Our designs incorporate high-performance materials, post-tensioning systems, and hybrid structures that reduce construction time and cost.',
            },
            {
                title: 'Independent Design Audits',
                content: 'Our independent design review services provide objective assessment of structural designs, identifying optimization opportunities and ensuring compliance with international standards. We bring fresh perspectives that enhance project outcomes.',
            },
        ],
        keyPoints: [
            'Advanced structural analysis and optimization',
            'Concrete & steel design solutions',
            'Independent design audits and reviews',
        ],
    },
    'building-information-modelling': {
        title: 'Building Information Modelling',
        heroSubtitle: 'Digital Transformation for the Built Environment',
        image: '/images/services/bim.jpg',
        description: 'We leverage BIM technology to transform how buildings are designed, constructed, and operated. Our digital-first approach enhances collaboration, reduces errors, and creates value throughout the project lifecycle.',
        sections: [
            {
                title: 'Model Coordination',
                content: 'Our BIM coordination services bring together architectural, structural, and MEP models to identify and resolve conflicts before construction begins. We use advanced clash detection workflows that save time and reduce costly rework on site.',
            },
            {
                title: '4D/5D Planning',
                content: 'We integrate time and cost dimensions into BIM models, enabling visual construction sequencing and real-time cost tracking. This 4D/5D approach provides stakeholders with unprecedented visibility into project progress and financial performance.',
            },
            {
                title: 'Automation & API Development',
                content: 'Our programming expertise enables custom automation solutions that streamline repetitive tasks and extract valuable insights from BIM data. We develop scripts, plugins, and API integrations that enhance productivity across the project team.',
            },
        ],
        keyPoints: [
            'Model coordination and clash detection',
            '4D/5D planning and cost integration',
            'Automation, scripting, and API development',
        ],
    },
    'it-solutions': {
        title: 'IT Solutions',
        heroSubtitle: 'Technology That Powers Modern Business',
        image: '/images/insights/digital-twin.jpg',
        description: 'We provide comprehensive IT solutions that enable digital transformation and secure business operations. From cloud infrastructure to custom software development, we deliver technology that drives results.',
        sections: [
            {
                title: 'Cloud Infrastructure',
                content: 'We design and deploy scalable cloud solutions on leading platforms including AWS, Azure, and Google Cloud. Our infrastructure-as-code approach ensures reproducible, secure, and cost-optimized deployments that grow with your business needs.',
            },
            {
                title: 'Cybersecurity',
                content: 'Our security experts assess vulnerabilities, implement protective controls, and ensure compliance with industry standards. We provide ongoing monitoring and incident response capabilities that protect your critical assets and data.',
            },
            {
                title: 'Custom Software Development',
                content: 'We build tailored software solutions that address unique business challenges. Our agile development process delivers working software iteratively, incorporating user feedback to ensure final products meet real-world needs.',
            },
        ],
        keyPoints: [
            'Cloud infrastructure and deployment',
            'Cybersecurity assessment and compliance',
            'Custom software development',
        ],
    },
    'mining-consulting': {
        title: 'Mining  Consulting',
        heroSubtitle: 'Strategic Advisory for International Mining Projects',
        image: '/images/insights/carbon-materials.jpg',
        description: 'We provide specialized consulting services that connect mining companies, investors, and technology partners across Africa and Europe. Our role is to bridge regulatory, technical, and operational gaps, enabling mining projects to move efficiently from opportunity to execution. With deep understanding of African mining environments and European standards, governance, and investors\' expectations, we act as a trusted intermediary for cross-border collaboration.',
        sections: [
            {
                title: 'Market Entry & Partner Identification',
                content: 'Identification of strategic mining partners, operators, and investors. Support for European companies entering African mining markets. Facilitation of joint ventures and long-term cooperation.',
            },
            {
                title: 'Technical & Engineering Advisory',
                content: 'Coordination between mining companies and European engineering consultants. Review and alignment of technical documentation with international standards. Support for infrastructure, facilities, and operational planning.',
            },
            {
                title: 'Regulatory & Compliance Support',
                content: 'Guidance on mining regulations, permitting, and governance frameworks. Alignment with ESG, sustainability, and international reporting requirements. Cross-border risk assessment and compliance strategy.',
            },
            {
                title: 'Project & Investment Support',
                content: 'Preparation of technical and strategic documentation for investors. Support during due diligence and feasibility phases. Advisory for project structuring and execution readiness.',
            },
        ],
        keyPoints: [
            'Market entry & strategic partner identification',
            'Technical & engineering advisory',
            'Regulatory & compliance support',
            'Project & investment support',
        ],
    },
};

type ServiceSlug = keyof typeof servicesData;

function ServiceDetailContent() {
    const params = useParams();
    const slug = params.slug as string;
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

    const service = servicesData[slug as ServiceSlug];

    useEffect(() => {
        if (!service) return;

        const ctx = gsap.context(() => {
            // Hero Animation
            if (heroRef.current && textRef.current) {
                gsap.from(textRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: 'power3.out',
                });
            }

            // Section Animations
            sectionsRef.current.forEach((section, index) => {
                if (section) {
                    gsap.from(section, {
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                        },
                        opacity: 0,
                        y: 50,
                        duration: 0.8,
                        delay: index * 0.1,
                    });
                }
            });
        });

        return () => ctx.revert();
    }, [service]);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[70vh] flex flex-col justify-end pb-24 px-6 bg-[#2E7D32]">
                <div className="absolute inset-0">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="100vw"
                        className="object-cover opacity-20"
                    />
                </div>
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-end relative z-10">
                    <div>
                        <p className="text-white/80 text-lg mb-4 font-medium uppercase tracking-wider">Our Services</p>
                        <h1
                            ref={textRef}
                            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none"
                        >
                            {service.title}
                        </h1>
                    </div>
                    <div className="flex justify-start md:justify-end">
                        <p className="text-xl md:text-2xl text-white font-medium leading-snug max-w-md">
                            {service.heroSubtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Description Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-light text-[#2E7D32] mb-6">
                                Overview
                            </h2>
                            <p className="text-lg text-[#37474F]/70 font-light leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                        <div className="bg-[#F5F5DC] p-8 rounded-sm">
                            <h3 className="text-xl font-semibold text-[#2E7D32] mb-6">Key Services</h3>
                            <ul className="space-y-4">
                                {service.keyPoints.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-[#37474F]">
                                        <span className="mt-2 w-2 h-2 rounded-full bg-[#2E7D32] flex-shrink-0" />
                                        <span className="font-light">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Sections */}
            {service.sections.map((section, index) => (
                <div key={index}>
                    {/* Divider */}
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="border-t border-[#2E7D32]/20" />
                    </div>

                    <div
                        ref={(el) => {
                            sectionsRef.current[index] = el;
                        }}
                        className="max-w-7xl mx-auto px-6 lg:px-12 py-16"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-light text-[#2E7D32] mb-6">
                                    {section.title}
                                </h2>
                            </div>
                            <div>
                                <p className="text-lg text-[#37474F]/70 font-light leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* CTA Section */}
            <section className="py-24 bg-[#2E7D32]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-white/80 font-light mb-8 max-w-2xl mx-auto">
                        Contact us to discuss how we can support your project with our specialized consulting services.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-4 bg-white text-[#2E7D32] font-semibold rounded-sm hover:bg-[#A5D6A7] transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default function ServiceDetailPage() {
    return <ServiceDetailContent />;
}
