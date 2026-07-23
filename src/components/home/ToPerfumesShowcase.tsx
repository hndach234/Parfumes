'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { perfumes } from '@/lib/data';
import { getAssetPath } from '@/lib/utils';
import ProductCard from '../ui/ProductCard';

export default function ToPerfumesShowcase() {
  const toPerfumesList = perfumes.filter((p) => p.brandId === 'to-perfumes');

  return (
    <section className="py-20 bg-gradient-to-b from-[#0D0D0D] via-[#141414] to-neutral-50 dark:to-[#141414] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Banner Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#171717] rounded-3xl p-8 sm:p-12 border border-[#D4AF37]/40 shadow-2xl">
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-6 aspect-square rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl relative group bg-neutral-900">
            <img
              src={getAssetPath('/to-perfumes-showcase.png')}
              alt="TO PERFUMES Collection sur socle en marbre"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={getAssetPath('/to-perfumes-logo.png')}
                  alt="TO PERFUMES Logo"
                  className="w-12 h-12 rounded-full border border-[#D4AF37] object-contain bg-black/80 p-1"
                />
                <div>
                  <span className="font-serif-luxury text-xl font-bold text-white block">TO PERFUMES</span>
                  <span className="text-xs text-[#D4AF37] font-semibold">عطور تعبّر عنك</span>
                </div>
              </div>
              <span className="bg-[#D4AF37] text-[#111111] text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow">
                Collection Privée 2026
              </span>
            </div>
          </div>

          {/* Right Column: Brand Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                <Sparkles className="w-4 h-4" />
                <span>La Maison Vedette</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
                TO PERFUMES <br />
                <span className="gold-gradient-text">عطور تعبّر عنك</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Inspirée par les plus célèbres jus de la haute parfumerie mondiale, la Maison **TO PERFUMES** crée des élixirs intenses qui subliment votre peau avec une tenue d'exception et une signature olfactive inoubliable.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300 pt-2">
              <div className="flex items-center space-x-2 bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Sillage Intense Longue Tenue</span>
              </div>
              <div className="flex items-center space-x-2 bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Flacons de Prestige Sculptés</span>
              </div>
              <div className="flex items-center space-x-2 bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Ingrédients Nobles Certifiés</span>
              </div>
              <div className="flex items-center space-x-2 bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                <Heart className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>عطور تعبّر عنك (Express Yourself)</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/boutique?brand=to-perfumes"
                className="bg-[#D4AF37] hover:bg-[#b89628] text-[#111111] font-bold text-xs uppercase tracking-widest py-3.5 px-7 rounded-lg transition-all shadow-xl gold-border-glow flex items-center justify-center space-x-2"
              >
                <span>Acheter la Collection TO PERFUMES</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Featured TO PERFUMES Cards Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Les 7 Flacons Phares
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-neutral-900 dark:text-white">
                Gammes TO PERFUMES (عطور تعبّر عنك)
              </h3>
            </div>
            <Link
              href="/boutique?brand=to-perfumes"
              className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:underline hidden sm:block"
            >
              Tout afficher →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {toPerfumesList.map((perfume) => (
              <ProductCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
