'use client';

import React from 'react';
import Link from 'next/link';
import { brands } from '@/lib/data';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function BrandsSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#111111] transition-colors border-y border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Maison Parfumeurs
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Marques Populaires
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
              De Paris à New York, découvrez les maisons légendaires qui ont façonné l'histoire de la parfumerie mondiale.
            </p>
          </div>

          <Link
            href="/marques"
            className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:underline flex items-center gap-1.5"
          >
            <span>Voir toutes les marques</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {brands.slice(0, 10).map((brand) => (
            <Link
              key={brand.id}
              href={`/boutique?brand=${brand.id}`}
              className="group bg-neutral-50 dark:bg-neutral-900/60 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[#D4AF37] text-center flex flex-col items-center justify-between space-y-4 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border border-[#D4AF37]/30 p-1 group-hover:scale-110 transition-transform">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div>
                <h3 className="font-serif-luxury font-bold text-base text-neutral-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">
                  {brand.name}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 block mt-0.5">
                  {brand.origin}
                </span>
              </div>

              <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Découvrir →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
