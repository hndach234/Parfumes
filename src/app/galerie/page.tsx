'use client';

import React, { useState } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Lightbox from '@/components/ui/Lightbox';
import { Sparkles, Maximize2 } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    title: 'Atelier Privé Place Vendôme',
    category: 'Boutique',
    url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 2,
    title: 'Écrin de Flacons de Haute Parfumerie',
    category: 'Produits',
    url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 3,
    title: 'Coffret Prestige Bois Lacqué Or 24k',
    category: 'Coffrets cadeaux',
    url: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 4,
    title: 'Bouteille Sculptée Sauvage Elixir',
    category: 'Nouveautés',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 5,
    title: 'Ambiance Nuit & Flacon Ambré Niche',
    category: 'Ambiance luxe',
    url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
  },
  {
    importId: 6,
    title: 'Collection Flacons en Cristal Millésimés',
    category: 'Collections',
    url: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 7,
    title: 'Maison Creed Aventus Carafe Royale',
    category: 'Produits',
    url: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 8,
    title: 'Salon de Dégustation Olfactive',
    category: 'Boutique',
    url: 'https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 9,
    title: 'Élixir de Rose et Safrans d’Orient',
    category: 'Collections',
    url: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 10,
    title: 'Écrin Cadeau Velours et Ruban de Soie',
    category: 'Coffrets cadeaux',
    url: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 11,
    title: 'Collection Nectars Nouveautés 2026',
    category: 'Nouveautés',
    url: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 12,
    title: 'Lumière et Ombres sur Flacons Or',
    category: 'Ambiance luxe',
    url: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1200&q=85',
  },
];

export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState<string>('Toutes');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    'Toutes',
    'Produits',
    'Boutique',
    'Coffrets cadeaux',
    'Nouveautés',
    'Collections',
    'Ambiance luxe',
  ];

  const filteredItems =
    activeCategory === 'Toutes'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-neutral-50 dark:bg-[#111111] min-h-screen pb-20">
      <Breadcrumb items={[{ label: 'Galerie Luxe' }]} />

      {/* Hero Banner */}
      <div className="bg-[#111111] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30 text-center relative overflow-hidden mb-12">
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Univers Visuel
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold">
            Galerie de la Maison
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Immergez-vous dans l'univers raffiné de nos ateliers, flacons d'exception et coffrets de prestige.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] border border-[#D4AF37] shadow'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-[#D4AF37] border border-neutral-200 dark:border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800 cursor-pointer"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  {item.category}
                </span>
                <h3 className="font-serif-luxury font-bold text-lg">{item.title}</h3>
                <div className="mt-2 flex items-center text-xs text-[#D4AF37] gap-1 font-semibold">
                  <Maximize2 className="w-4 h-4" />
                  <span>Agrandir (Lightbox)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={filteredItems}
        currentIndex={currentIndex}
        onNavigate={(idx) => setCurrentIndex(idx)}
      />
    </div>
  );
}
