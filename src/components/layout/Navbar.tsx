'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Moon, Sun, Menu, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import MobileMenu from './MobileMenu';
import SearchModal from '../ui/SearchModal';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems, setIsWishlistOpen } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Boutique', href: '/boutique' },
    { name: 'Marques', href: '/marques' },
    { name: 'Collections', href: '/collections' },
    { name: 'À Propos', href: '/a-propos' },
    { name: 'Galerie', href: '/galerie' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#111111] text-[#D4AF37] text-xs py-2 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-2 border-b border-[#D4AF37]/20 z-50 relative">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>TO PERFUMES • عطور تعبّر عنك • Livraison Express Offerte dès 150 €</span>
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#111111]/95 backdrop-blur-md shadow-md py-2 border-b border-neutral-200 dark:border-neutral-800'
            : 'bg-white/80 dark:bg-[#111111]/80 backdrop-blur-sm py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-neutral-800 dark:text-neutral-200 hover:text-[#D4AF37] transition-colors"
              aria-label="Ouvrir le menu mobile"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img
              src="/to-perfumes-logo.png"
              alt="TO PERFUMES Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-serif-luxury text-lg sm:text-2xl font-bold tracking-widest text-[#111111] dark:text-white uppercase transition-colors group-hover:text-[#D4AF37]">
                TO PERFUMES
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                عطور تعبّر عنك
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-medium transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#D4AF37] font-semibold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-[#D4AF37] dark:hover:text-[#D4AF37]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] transition-all" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Instant Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors"
              title="Rechercher"
              aria-label="Rechercher un parfum"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors"
              title={theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
              aria-label="Changer le thème"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors relative"
              title="Liste de Souhaits"
              aria-label="Voir la liste de souhaits"
            >
              <Heart className="w-5 h-5" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#111111] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalWishlistItems}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors relative"
              title="Panier"
              aria-label="Voir le panier"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#111111] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />

      {/* Instant Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
