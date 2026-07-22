'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { perfumes } from '@/lib/data';
import { formatPrice } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPerfumes = query.trim()
    ? perfumes.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.olfactiveFamily.toLowerCase().includes(q) ||
          p.topNotes.some((n) => n.toLowerCase().includes(q)) ||
          p.heartNotes.some((n) => n.toLowerCase().includes(q)) ||
          p.baseNotes.some((n) => n.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Search Box Panel */}
      <div className="relative bg-white dark:bg-[#171717] rounded-xl max-w-2xl w-full shadow-2xl z-10 border border-[#D4AF37]/30 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#D4AF37]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par nom, maison, note olfactive (ex: Sauvage, Oud, Dior, Safran)..."
            autoFocus
            className="w-full bg-transparent text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xs font-semibold uppercase"
            >
              Effacer
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="py-8 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto animate-pulse" />
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">
                Tapez le nom d'un parfum, d'une grande maison ou d'un ingrédient noble
              </p>

              {/* Suggestions Tag Cloud */}
              <div className="pt-3 flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['Dior Sauvage', 'Bleu de Chanel', 'Creed Aventus', 'Oud Wood', 'Baccarat Rouge 540', 'Vanille', 'Safran'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-[11px] bg-neutral-100 dark:bg-neutral-800 hover:bg-[#D4AF37] hover:text-[#111111] dark:hover:bg-[#D4AF37] dark:hover:text-[#111111] px-3 py-1 rounded-full text-neutral-700 dark:text-neutral-300 transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filteredPerfumes.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-xs">
              Aucun parfum ne correspond à "<span className="text-[#D4AF37]">{query}</span>".
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider px-2">
                {filteredPerfumes.length} fragrance{filteredPerfumes.length > 1 ? 's' : ''} trouvée{filteredPerfumes.length > 1 ? 's' : ''}
              </div>

              {filteredPerfumes.map((perfume) => (
                <Link
                  key={perfume.id}
                  href={`/boutique/${perfume.id}`}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                >
                  <img
                    src={perfume.images[0]}
                    alt={perfume.name}
                    className="w-12 h-14 object-cover rounded border border-neutral-200 dark:border-neutral-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-serif-luxury font-bold text-sm text-neutral-900 dark:text-white truncate group-hover:text-[#D4AF37] transition-colors">
                        {perfume.name}
                      </h4>
                      <span className="font-serif-luxury font-bold text-xs text-[#D4AF37] ml-2">
                        {formatPrice(perfume.price)}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 uppercase tracking-widest truncate">
                      {perfume.brand} • {perfume.olfactiveFamily}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#D4AF37] transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
