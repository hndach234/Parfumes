'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Perfume } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductQuickViewModal from './ProductQuickViewModal';

interface ProductCardProps {
  perfume: Perfume;
}

export default function ProductCard({ perfume }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isFavorite = isInWishlist(perfume.id);

  return (
    <>
      <div className="group relative bg-white dark:bg-[#171717] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-[#D4AF37]/60 dark:hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
        {/* Card Header & Badges */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <img
            src={perfume.images[currentImageIndex] || perfume.images[0]}
            alt={perfume.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {perfume.isNew && (
              <span className="bg-[#111111] text-[#D4AF37] text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded uppercase border border-[#D4AF37]/40 shadow">
                Nouveauté
              </span>
            )}
            {perfume.isPopular && (
              <span className="bg-[#D4AF37] text-[#111111] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded uppercase shadow">
                Best-Seller
              </span>
            )}
            {perfume.originalPrice && (
              <span className="bg-red-900 text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">
                Privilège
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(perfume);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
              isFavorite
                ? 'bg-[#D4AF37] text-[#111111]'
                : 'bg-black/40 text-white hover:bg-[#D4AF37] hover:text-[#111111]'
            }`}
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Hover Actions Bar */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="flex-1 bg-white/90 hover:bg-white text-[#111111] text-xs font-medium uppercase tracking-wider py-2 px-3 rounded backdrop-blur flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Aperçu</span>
            </button>
            <button
              onClick={() => addToCart(perfume)}
              className="bg-[#D4AF37] hover:bg-[#b89628] text-[#111111] p-2 rounded transition-colors"
              title="Ajouter au panier"
              aria-label="Ajouter au panier"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Brand & Volume */}
            <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-medium mb-1">
              <span>{perfume.brand}</span>
              <span className="text-neutral-400">{perfume.volume}</span>
            </div>

            {/* Name */}
            <h3 className="font-serif-luxury text-base font-bold text-neutral-900 dark:text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
              <Link href={`/boutique/${perfume.id}`}>{perfume.name}</Link>
            </h3>

            {/* Olfactive Family */}
            <p className="text-xs text-neutral-500 dark:text-neutral-400 italic line-clamp-1 mt-0.5">
              {perfume.olfactiveFamily}
            </p>
          </div>

          {/* Rating & Price */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center space-x-1 text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                {perfume.rating}
              </span>
              <span className="text-[10px] text-neutral-400">({perfume.reviewCount})</span>
            </div>

            <div className="text-right">
              {perfume.originalPrice && (
                <span className="text-xs text-neutral-400 line-through mr-1.5">
                  {formatPrice(perfume.originalPrice)}
                </span>
              )}
              <span className="font-serif-luxury font-bold text-base text-[#D4AF37]">
                {formatPrice(perfume.price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        perfume={perfume}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
