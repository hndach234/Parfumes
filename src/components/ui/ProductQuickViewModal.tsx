'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, Sparkles, Check } from 'lucide-react';
import { Perfume } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductQuickViewModalProps {
  perfume: Perfume;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickViewModal({
  perfume,
  isOpen,
  onClose,
}: ProductQuickViewModalProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState(perfume.volume);
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

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
          perfume.price *
            (volumes.find((v) => v.label === selectedVolume)?.multiplier || 1.0)
        );

  const handleAddToCart = () => {
    addToCart(perfume, selectedVolume);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white dark:bg-[#171717] rounded-xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#D4AF37]/30 my-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <img
                src={perfume.images[selectedImage] || perfume.images[0]}
                alt={perfume.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {perfume.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {perfume.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded border-2 overflow-hidden shrink-0 transition-all ${
                      selectedImage === idx
                        ? 'border-[#D4AF37]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                {perfume.brand} • {perfume.gender}
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mt-1">
                {perfume.name}
              </h2>
              <p className="text-xs text-neutral-500 italic mt-1">{perfume.olfactiveFamily}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 text-amber-500 text-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                ))}
              </div>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                {perfume.rating} / 5
              </span>
              <span className="text-xs text-neutral-400">({perfume.reviewCount} avis authentiques)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="font-serif-luxury text-3xl font-bold text-[#D4AF37]">
                {formatPrice(currentPrice)}
              </span>
              <span className="text-xs text-neutral-400">TVA incluse • Livraison offerte</span>
            </div>

            {/* Description */}
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {perfume.description}
            </p>

            {/* Olfactive Pyramid */}
            <div className="bg-neutral-50 dark:bg-neutral-900/60 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-2 text-xs">
              <div className="font-semibold text-[#D4AF37] uppercase tracking-wider text-[11px]">
                Pyramide Olfactive
              </div>
              <div>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">Notes de Tête : </span>
                <span className="text-neutral-600 dark:text-neutral-400">{perfume.topNotes.join(', ')}</span>
              </div>
              <div>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">Notes de Cœur : </span>
                <span className="text-neutral-600 dark:text-neutral-400">{perfume.heartNotes.join(', ')}</span>
              </div>
              <div>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">Notes de Fond : </span>
                <span className="text-neutral-600 dark:text-neutral-400">{perfume.baseNotes.join(', ')}</span>
              </div>
            </div>

            {/* Volume Picker */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-semibold mb-2">
                Contenance
              </label>
              <div className="flex gap-3">
                {volumes.map((v) => (
                  <button
                    key={v.label}
                    onClick={() => setSelectedVolume(v.label)}
                    className={`py-2 px-4 rounded text-xs font-semibold tracking-wider transition-all border ${
                      selectedVolume === v.label
                        ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] border-[#D4AF37]'
                        : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-[#D4AF37]'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-green-700 text-white'
                    : 'bg-[#D4AF37] hover:bg-[#b89628] text-[#111111]'
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
                onClick={() => toggleWishlist(perfume)}
                className={`p-3 rounded border transition-colors ${
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

            {/* Full Details link */}
            <div className="pt-2 text-center">
              <Link
                href={`/boutique/${perfume.id}`}
                onClick={onClose}
                className="text-xs uppercase tracking-widest text-[#D4AF37] hover:underline font-semibold"
              >
                Consulter la Fiche Parfum Complète &amp; Histoire →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
