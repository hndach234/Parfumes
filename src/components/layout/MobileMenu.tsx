'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#111111] text-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform border-r border-[#D4AF37]/30">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl font-bold tracking-widest text-[#D4AF37]">
                L'ART DU PARFUM
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400">
                HAUTE PARFUMERIE
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`text-sm uppercase tracking-widest py-2 transition-colors flex items-center justify-between ${
                    isActive ? 'text-[#D4AF37] font-bold border-l-2 border-[#D4AF37] pl-3' : 'text-neutral-300 hover:text-[#D4AF37] pl-1'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="border-t border-neutral-800 pt-6 mt-6 space-y-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>12 Place Vendôme, 75001 Paris</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <span>+33 1 42 68 00 00</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#D4AF37]" />
            <span>conciergerie@lartduparfum-luxe.com</span>
          </div>

          <div className="pt-4 text-center text-[10px] uppercase tracking-widest text-[#D4AF37]">
            © 2026 L'Art du Parfum Paris
          </div>
        </div>
      </div>
    </div>
  );
}
