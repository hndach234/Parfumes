'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPerfumeById, getPerfumesByBrand, perfumes } from '@/lib/data';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductCard from '@/components/ui/ProductCard';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, Gift, Check, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export function generateStaticParams() {
  return perfumes.map((p) => ({
    id: p.id,
  }));
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const perfume = getPerfumeById(resolvedParams.id);

  if (!perfume) {
    notFound();
  }

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState(perfume.volume);
  const [added, setAdded] = useState(false);
  const [boughtNow, setBoughtNow] = useState(false);

  const isFavorite = isInWishlist(perfume.id);

  const volumes = [
    { label: '50 ml', multiplier: 0.8 },
    { label: '100 ml', multiplier: 1.0 },
    { label: '200 ml', multiplier: 1.6 },
  ];

  const currentPrice =
    selectedVolume === perfume.volume
      ? perfume.price
      : Math.round(
          perfume.price * (volumes.find((v) => v.label === selectedVolume)?.multiplier || 1.0)
        );

  const relatedPerfumes = getPerfumesByBrand(perfume.brandId)
    .filter((p) => p.id !== perfume.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(perfume, selectedVolume);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(perfume, selectedVolume);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
    setBoughtNow(true);
    setTimeout(() => setBoughtNow(false), 3500);
  };

  return (
    <div className="bg-neutral-50 dark:bg-[#111111] min-h-screen pb-20">
      <Breadcrumb
        items={[
          { label: 'Boutique', href: '/boutique' },
          { label: perfume.brand, href: `/boutique?brand=${perfume.brandId}` },
          { label: perfume.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Back Link */}
        <Link
          href="/boutique"
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-neutral-500 hover:text-[#D4AF37] transition-colors mb-6 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au catalogue</span>
        </Link>

        {/* Main Product Container */}
        <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-10 border border-neutral-200 dark:border-neutral-800 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 relative group">
              <img
                src={perfume.images[selectedImage] || perfume.images[0]}
                alt={perfume.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-[#111111] text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded shadow">
                {perfume.gender}
              </span>
            </div>

            {/* Thumbnails */}
            {perfume.images.length > 1 && (
              <div className="flex gap-4">
                {perfume.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImage === idx
                        ? 'border-[#D4AF37] shadow-md scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                {perfume.brand}
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mt-1">
                {perfume.name}
              </h1>
              <p className="text-xs text-neutral-500 italic mt-1 font-light">
                {perfume.olfactiveFamily}
              </p>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center space-x-2 text-amber-500 text-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                ))}
              </div>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                {perfume.rating} / 5
              </span>
              <span className="text-xs text-neutral-400">({perfume.reviewCount} avis de connaisseurs)</span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-baseline justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">
                  Prix Flacon
                </span>
                <span className="font-serif-luxury text-3xl font-bold text-[#D4AF37]">
                  {formatPrice(currentPrice)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 justify-end">
                  <Check className="w-3.5 h-3.5" /> En Stock
                </span>
                <span className="text-[10px] text-neutral-400 block">Expédition sous 24h</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-serif-luxury font-bold text-sm text-neutral-900 dark:text-white uppercase tracking-wider">
                Description &amp; Philosophie Olfactive
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                {perfume.description}
              </p>
            </div>

            {/* Detailed Olfactive Pyramid */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
              <h3 className="font-serif-luxury font-bold text-xs uppercase tracking-widest text-[#D4AF37]">
                Pyramide Olfactive détaillée
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-100 dark:border-neutral-700">
                  <span className="font-bold text-neutral-900 dark:text-white block mb-1">
                    Notes de Tête
                  </span>
                  <p className="text-neutral-500 leading-tight">{perfume.topNotes.join(', ')}</p>
                </div>
                <div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-100 dark:border-neutral-700">
                  <span className="font-bold text-neutral-900 dark:text-white block mb-1">
                    Notes de Cœur
                  </span>
                  <p className="text-neutral-500 leading-tight">{perfume.heartNotes.join(', ')}</p>
                </div>
                <div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-100 dark:border-neutral-700">
                  <span className="font-bold text-neutral-900 dark:text-white block mb-1">
                    Notes de Fond
                  </span>
                  <p className="text-neutral-500 leading-tight">{perfume.baseNotes.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Volume Picker */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300">
                Choisir la Contenance
              </label>
              <div className="flex gap-3">
                {volumes.map((v) => (
                  <button
                    key={v.label}
                    onClick={() => setSelectedVolume(v.label)}
                    className={`py-2.5 px-5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                      selectedVolume === v.label
                        ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] border-[#D4AF37] shadow'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-[#D4AF37]'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Feedback Alert */}
            {boughtNow && (
              <div className="p-4 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37] text-xs text-[#D4AF37] text-center font-semibold animate-bounce">
                Achat simulé avec succès ! Votre panier contient {perfume.name}.
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-lg font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-lg ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#D4AF37] hover:bg-[#b89628] text-[#111111] gold-border-glow'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Ajouté au Panier !</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ajouter au Panier</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-4 px-6 rounded-lg font-bold text-xs uppercase tracking-widest bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-neutral-800 transition-colors shadow-lg"
              >
                Acheter Maintenant (Simulation)
              </button>

              <button
                onClick={() => toggleWishlist(perfume)}
                className={`p-4 rounded-lg border transition-colors ${
                  isFavorite
                    ? 'bg-[#D4AF37] text-[#111111] border-[#D4AF37]'
                    : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-[#D4AF37]'
                }`}
                title="Favoris"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Reassurance Features */}
            <div className="grid grid-cols-3 gap-2 pt-4 text-[11px] text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>100% Authentique</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>Livraison Offerte</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-[#D4AF37]" />
                <span>3 Échantillons Offerts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedPerfumes.length > 0 && (
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Maison {perfume.brand}
              </span>
              <h2 className="font-serif-luxury text-2xl font-bold">
                Autres Créations de la Maison
              </h2>
              <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedPerfumes.map((rel) => (
                <ProductCard key={rel.id} perfume={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
