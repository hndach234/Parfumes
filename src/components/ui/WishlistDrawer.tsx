'use client';

import React from 'react';
import Link from 'next/link';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import LuxuryImage from './LuxuryImage';

export default function WishlistDrawer() {
  const { wishlist, toggleWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#111111] text-neutral-900 dark:text-white shadow-2xl flex flex-col justify-between border-l border-[#D4AF37]/30">
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-[#D4AF37] fill-current" />
              <h2 className="font-serif-luxury text-lg font-bold tracking-wider uppercase">
                Vos Coups de Cœur ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label="Fermer la liste de souhaits"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Heart className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto" />
                <p className="font-serif-luxury text-base text-neutral-500">
                  Votre liste de souhaits est vide.
                </p>
                <p className="text-xs text-neutral-400">
                  Cliquez sur l'icône cœur d'un parfum pour l'ajouter ici.
                </p>
              </div>
            ) : (
              wishlist.map((perfume) => (
                <div
                  key={perfume.id}
                  className="flex space-x-4 border-b border-neutral-100 dark:border-neutral-800 pb-4"
                >
                  <LuxuryImage
                    src={perfume.images[0]}
                    alt={perfume.name}
                    className="w-20 h-24 object-cover rounded border border-neutral-200 dark:border-neutral-800 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif-luxury font-bold text-sm text-neutral-900 dark:text-white">
                          <Link
                            href={`/boutique/${perfume.id}`}
                            onClick={() => setIsWishlistOpen(false)}
                          >
                            {perfume.name}
                          </Link>
                        </h4>
                        <button
                          onClick={() => toggleWishlist(perfume)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Retirer des favoris"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#D4AF37] uppercase tracking-wider">
                        {perfume.brand} • {perfume.volume}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-serif-luxury font-bold text-sm text-[#D4AF37]">
                        {formatPrice(perfume.price)}
                      </span>
                      <button
                        onClick={() => {
                          addToCart(perfume);
                        }}
                        className="bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] hover:text-[#111111] font-semibold text-[11px] uppercase tracking-wider py-1.5 px-3 rounded flex items-center space-x-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Panier</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
