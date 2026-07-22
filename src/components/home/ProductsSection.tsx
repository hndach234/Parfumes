'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { perfumes } from '@/lib/data';
import ProductCard from '../ui/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'homme' | 'femme' | 'unisexe' | 'nouveautes'>('all');

  const filteredPerfumes = perfumes.filter((p) => {
    if (activeTab === 'all') return p.isPopular || p.isFeatured;
    if (activeTab === 'homme') return p.category === 'homme' || p.gender === 'Homme';
    if (activeTab === 'femme') return p.category === 'femme' || p.gender === 'Femme';
    if (activeTab === 'unisexe') return p.category === 'unisexe' || p.gender === 'Unisexe';
    if (activeTab === 'nouveautes') return p.isNew;
    return true;
  }).slice(0, 12);

  return (
    <section className="py-20 bg-neutral-50 dark:bg-[#141414] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Sélection Privilège
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            Produits Populaires
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'Toutes les icônes' },
            { id: 'homme', label: 'Parfums Homme' },
            { id: 'femme', label: 'Parfums Femme' },
            { id: 'unisexe', label: 'Niche & Unisexe' },
            { id: 'nouveautes', label: 'Dernières Nouveautés' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] shadow-md border border-[#D4AF37]'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-[#D4AF37] border border-neutral-200 dark:border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 12 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPerfumes.map((perfume) => (
            <ProductCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        {/* CTA to Full Shop */}
        <div className="mt-14 text-center">
          <Link
            href="/boutique"
            className="inline-flex items-center space-x-2 bg-[#D4AF37] hover:bg-[#b89628] text-[#111111] font-bold text-xs uppercase tracking-[0.2em] py-4 px-8 rounded transition-all shadow-xl gold-border-glow"
          >
            <span>Voir l'intégralité du catalogue (+40 parfums)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
