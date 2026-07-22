'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Perfume } from '@/types';

interface WishlistContextType {
  wishlist: Perfume[];
  toggleWishlist: (perfume: Perfume) => void;
  isInWishlist: (perfumeId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Perfume[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('luxe_parfum_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load wishlist', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('luxe_parfum_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  const toggleWishlist = (perfume: Perfume) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === perfume.id);
      if (exists) {
        return prev.filter((p) => p.id !== perfume.id);
      } else {
        return [...prev, perfume];
      }
    });
  };

  const isInWishlist = (perfumeId: string) => {
    return wishlist.some((p) => p.id === perfumeId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        totalWishlistItems: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
