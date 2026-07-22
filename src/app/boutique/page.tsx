'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { perfumes, brands, categories } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Search, SlidersHorizontal, RotateCcw, Sparkles, Filter, X } from 'lucide-react';

function BoutiqueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialBrand = searchParams.get('brand') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGender, setSelectedGender] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(700);
  const [selectedVolume, setSelectedVolume] = useState('');
  const [selectedNote, setSelectedNote] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'newest'>('popularity');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('');
    setSelectedCategory('');
    setSelectedGender('');
    setMaxPrice(700);
    setSelectedVolume('');
    setSelectedNote('');
    setSortBy('popularity');
  };

  // Filter & Sort Logic
  const filteredPerfumes = useMemo(() => {
    return perfumes
      .filter((p) => {
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.olfactiveFamily.toLowerCase().includes(q) ||
            p.topNotes.some((n) => n.toLowerCase().includes(q)) ||
            p.heartNotes.some((n) => n.toLowerCase().includes(q)) ||
            p.baseNotes.some((n) => n.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // Brand Filter
        if (selectedBrand && p.brandId !== selectedBrand) return false;

        // Category Filter
        if (selectedCategory) {
          if (selectedCategory === 'nouveautes') {
            if (!p.isNew) return false;
          } else if (selectedCategory === 'editions-limitees') {
            if (p.category !== 'editions-limitees') return false;
          } else if (p.category !== selectedCategory && p.gender.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // Gender Filter
        if (selectedGender && p.gender.toLowerCase() !== selectedGender.toLowerCase()) return false;

        // Price Filter
        if (p.price > maxPrice) return false;

        // Volume Filter
        if (selectedVolume && !p.volume.includes(selectedVolume)) return false;

        // Olfactive Note Filter
        if (selectedNote) {
          const noteLower = selectedNote.toLowerCase();
          const allNotes = [...p.topNotes, ...p.heartNotes, ...p.baseNotes, p.olfactiveFamily].map((n) =>
            n.toLowerCase()
          );
          if (!allNotes.some((n) => n.includes(noteLower))) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        // Default: popularity
        return b.reviewCount * b.rating - a.reviewCount * a.rating;
      });
  }, [searchQuery, selectedBrand, selectedCategory, selectedGender, maxPrice, selectedVolume, selectedNote, sortBy]);

  return (
    <div className="bg-neutral-50 dark:bg-[#111111] min-h-screen pb-20">
      <Breadcrumb items={[{ label: 'Boutique Haute Parfumerie' }]} />

      {/* Header Banner */}
      <div className="bg-[#111111] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30 text-center relative overflow-hidden mb-10">
        <div className="max-w-4xl mx-auto relative z-10 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Catalogue Privé Complété
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold">
            La Galerie des Parfums
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-light">
            Découvrez nos 40+ créations olfactives d'exception issues des plus célèbres maisons de parfum.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="bg-white dark:bg-[#171717] p-4 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Instant Search input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un parfum, une note..."
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className="lg:hidden flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-lg text-xs font-semibold text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700"
            >
              <Filter className="w-4 h-4 text-[#D4AF37]" />
              <span>Filtres</span>
            </button>

            <div className="flex items-center space-x-2 text-xs">
              <span className="text-neutral-500 hidden sm:inline">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] font-semibold"
              >
                <option value="popularity">Popularité &amp; Avis</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="newest">Nouveautés</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white dark:bg-[#171717] p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 h-fit sticky top-28 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
                <h2 className="font-serif-luxury font-bold text-base text-neutral-900 dark:text-white">
                  Filtres Avancés
                </h2>
              </div>
              <button
                onClick={resetFilters}
                className="text-[11px] text-neutral-400 hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
                title="Réinitialiser tous les filtres"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Effacer</span>
              </button>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300">
                Maison de Parfum
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">Toutes les marques (10)</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300">
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">Toutes les catégories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300">
                Genre
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {['', 'Homme', 'Femme', 'Unisexe'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`py-1.5 px-2 rounded text-[11px] font-semibold uppercase tracking-wider border transition-colors ${
                      selectedGender === g
                        ? 'bg-[#D4AF37] text-[#111111] border-[#D4AF37]'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-[#D4AF37]'
                    }`}
                  >
                    {g || 'Tous'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider Filter */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <label className="uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300">
                  Prix Maximum
                </label>
                <span className="font-serif-luxury font-bold text-[#D4AF37]">
                  {maxPrice} €
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="700"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
            </div>

            {/* Olfactive Note filter */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300">
                Note Olfactive Clé
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['Safran', 'Oud', 'Rose', 'Vanille', 'Lavande', 'Bergamote', 'Patchouli', 'Cèdre'].map((note) => (
                  <button
                    key={note}
                    onClick={() => setSelectedNote(selectedNote === note ? '' : note)}
                    className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                      selectedNote === note
                        ? 'bg-[#111111] text-[#D4AF37] border-[#D4AF37]'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-[#D4AF37]'
                    }`}
                  >
                    {note}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {isFilterDrawerOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setIsFilterDrawerOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-[#171717] p-6 shadow-2xl overflow-y-auto space-y-6 border-r border-[#D4AF37]/30">
                <div className="flex justify-between items-center pb-4 border-b border-neutral-200 dark:border-neutral-800">
                  <h3 className="font-serif-luxury font-bold text-lg">Filtres</h3>
                  <button onClick={() => setIsFilterDrawerOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Brand Mobile */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase font-semibold">Maison de Parfum</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full bg-neutral-100 dark:bg-neutral-900 border rounded p-2 text-xs"
                  >
                    <option value="">Toutes les marques</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                {/* Category Mobile */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase font-semibold">Catégorie</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-neutral-100 dark:bg-neutral-900 border rounded p-2 text-xs"
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full bg-[#D4AF37] text-[#111111] font-bold py-3 text-xs uppercase rounded"
                >
                  Appliquer les filtres ({filteredPerfumes.length})
                </button>
              </div>
            </div>
          )}

          {/* Main Products Grid */}
          <main className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              <span>
                Affichage de <strong className="text-[#D4AF37]">{filteredPerfumes.length}</strong> parfums sur {perfumes.length} disponibles
              </span>

              {(selectedBrand || selectedCategory || selectedGender || selectedNote || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#D4AF37] hover:underline font-semibold"
                >
                  Effacer les filtres
                </button>
              )}
            </div>

            {filteredPerfumes.length === 0 ? (
              <div className="bg-white dark:bg-[#171717] rounded-xl p-12 text-center border border-neutral-200 dark:border-neutral-800 space-y-4">
                <Sparkles className="w-12 h-12 text-neutral-400 mx-auto" />
                <h3 className="font-serif-luxury text-xl font-bold text-neutral-800 dark:text-neutral-200">
                  Aucun parfum ne correspond à vos critères
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Essayez d'élargir vos filtres de prix ou d'effacer la recherche instantanée.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#D4AF37] text-[#111111] font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded"
                >
                  Réinitialiser
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredPerfumes.map((perfume) => (
                  <ProductCard key={perfume.id} perfume={perfume} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function BoutiquePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-[#D4AF37]">Chargement de la Boutique...</div>}>
      <BoutiqueContent />
    </Suspense>
  );
}
