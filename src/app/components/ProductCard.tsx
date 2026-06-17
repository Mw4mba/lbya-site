import React from 'react';
import Image from 'next/image';
import type { ProductSummary } from '../content/products';

export default function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <div className="group bg-white hover:shadow-xl transition-all duration-500 overflow-hidden rounded-sm border border-[#2E7D32]/10 flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#2E7D32]/50 to-transparent" />
        <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-[#2E7D32] text-white text-xs font-semibold uppercase tracking-wider">
          {product.acronym}
        </span>
      </div>
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-light text-[#2E7D32] mb-2 group-hover:text-[#1b5e20] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-[#37474F]/60 mb-4 font-medium">{product.tagline}</p>
        <p className="text-[#37474F]/80 leading-relaxed mb-8 font-light flex-1">
          {product.cardCopy}
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-auto">
          <a
            href={product.primaryCta.href}
            className="inline-flex items-center gap-2 text-[#2E7D32] font-semibold text-sm group-hover:gap-4 transition-all"
          >
            <span>{product.primaryCta.label}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          {product.liveCta && (
            <a
              href={product.liveCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#37474F]/60 hover:text-[#2E7D32] font-medium text-sm transition-colors"
            >
              <span>{product.liveCta.label}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
