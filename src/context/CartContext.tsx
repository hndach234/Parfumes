'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Perfume } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (perfume: Perfume, volume?: string, quantity?: number) => void;
  removeFromCart: (perfumeId: string, volume: string) => void;
  updateQuantity: (perfumeId: string, volume: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toastMessage: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('luxe_parfum_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    }
  }, []);

  // Save cart to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('luxe_parfum_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  const addToCart = (perfume: Perfume, volume = perfume.volume, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.perfume.id === perfume.id && item.selectedVolume === volume
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { perfume, quantity, selectedVolume: volume }];
      }
    });

    setToastMessage(`${perfume.name} ajouté au panier`);
    setIsCartOpen(true);

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const removeFromCart = (perfumeId: string, volume: string) => {
    setCart((prev) => prev.filter((item) => !(item.perfume.id === perfumeId && item.selectedVolume === volume)));
  };

  const updateQuantity = (perfumeId: string, volume: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(perfumeId, volume);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.perfume.id === perfumeId && item.selectedVolume === volume ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.perfume.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
