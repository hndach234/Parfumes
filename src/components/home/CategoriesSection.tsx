'use client';

import React from 'react';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-neutral-50 dark:bg-[#141414] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Univers Olfactifs
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            Nos Catégories Préférées
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-light">
            Explorez nos créations organisées par univers, coffrets et éditions d'exception.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/boutique?category=${cat.id}`}
              className="group relative h-80 rounded-xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800 transition-all duration-500 hover:shadow-2xl hover:border-[#D4AF37]"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity group-hover:opacity-95" />

              {/* Card Text Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold px-2.5 py-1 rounded bg-black/60 backdrop-blur border border-[#D4AF37]/40">
                    {cat.count} Fragrances
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-[#D4AF37] group-hover:text-[#111111] backdrop-blur flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif-luxury text-2xl font-bold group-hover:text-[#D4AF37] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-300 font-light line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
