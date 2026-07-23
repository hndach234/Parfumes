'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import LuxuryImage from './LuxuryImage';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen, clearCart } =
    useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, (totalPrice / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - totalPrice;

  const handleCheckout = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setIsCheckedOut(true);
    setTimeout(() => {
      clearCart();
      setIsCheckedOut(false);
      setIsCartOpen(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#111111] text-neutral-900 dark:text-white shadow-2xl flex flex-col justify-between border-l border-[#D4AF37]/30">
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-serif-luxury text-lg font-bold tracking-wider uppercase">
                Votre Écrin de Commande
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Checkout Success Message */}
          {isCheckedOut ? (
            <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#D4AF37]">
                Commande Simulée avec Succès !
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-300 max-w-xs leading-relaxed">
                Merci pour cette démonstration. Votre précieux colis sera virtuellement scellé et expédié. Aucune donnée ni paiement réel n'a été prélevé.
              </p>
            </div>
          ) : (
            <>
              {/* Free Shipping Progress */}
              <div className="bg-neutral-50 dark:bg-neutral-900 p-4 border-b border-neutral-200 dark:border-neutral-800 text-xs">
                {remainingForFreeShipping > 0 ? (
                  <p className="text-neutral-600 dark:text-neutral-300 mb-2">
                    Ajoutez encore <strong className="text-[#D4AF37]">{formatPrice(remainingForFreeShipping)}</strong> pour bénéficier de la <strong>Livraison Offerte</strong>.
                  </p>
                ) : (
                  <p className="text-[#D4AF37] font-semibold flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-4 h-4" />
                    Félicitations ! La livraison express est offerte pour cette commande.
                  </p>
                )}
                <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D4AF37] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto" />
                    <p className="font-serif-luxury text-base text-neutral-500">
                      Votre panier est vide pour le moment.
                    </p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={`${item.perfume.id}-${item.selectedVolume}-${idx}`}
                      className="flex space-x-4 border-b border-neutral-100 dark:border-neutral-800 pb-4"
                    >
                      <LuxuryImage
                        src={item.perfume.images[0]}
                        alt={item.perfume.name}
                        className="w-20 h-24 object-cover rounded border border-neutral-200 dark:border-neutral-800 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif-luxury font-bold text-sm text-neutral-900 dark:text-white">
                              {item.perfume.name}
                            </h4>
                            <button
                              onClick={() =>
                                removeFromCart(item.perfume.id, item.selectedVolume)
                              }
                              className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                              aria-label="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#D4AF37] uppercase tracking-wider">
                            {item.perfume.brand} • {item.selectedVolume}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.perfume.id,
                                  item.selectedVolume,
                                  item.quantity - 1
                                )
                              }
                              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.perfume.id,
                                  item.selectedVolume,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-serif-luxury font-bold text-sm text-[#D4AF37]">
                            {formatPrice(item.perfume.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4 bg-neutral-50 dark:bg-neutral-900/40">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-500">
                      <span>Sous-total</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Livraison</span>
                      <span>{totalPrice >= 150 ? 'OFFERTE' : formatPrice(15)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Écrin cadeau &amp; Échantillons</span>
                      <span className="text-[#D4AF37] font-semibold">INCLUS</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-800">
                      <span>Total Estimé</span>
                      <span className="font-serif-luxury text-[#D4AF37]">
                        {formatPrice(totalPrice + (totalPrice >= 150 ? 0 : 15))}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#D4AF37] hover:bg-[#b89628] text-[#111111] font-bold text-xs uppercase tracking-widest py-3.5 rounded transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Finaliser la Commande (Simulation)</span>
                  </button>

                  <p className="text-[10px] text-center text-neutral-400">
                    Projet de démonstration. Aucune donnée bancaire n'est requise.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
