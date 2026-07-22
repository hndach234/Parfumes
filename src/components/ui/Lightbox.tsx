'use client';

import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; title: string; category: string }[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex];

  const handlePrev = () => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    onNavigate((currentIndex + 1) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-neutral-400 hover:text-white transition-colors z-50"
        aria-label="Fermer la lightbox"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-[#D4AF37] hover:text-[#111111] transition-all z-50"
        aria-label="Image précédente"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main Image View */}
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center p-2">
        <img
          src={current.url}
          alt={current.title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-[#D4AF37]/30"
        />
        <div className="mt-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
            {current.category}
          </span>
          <h3 className="font-serif-luxury text-lg font-bold text-white mt-1">
            {current.title}
          </h3>
          <span className="text-xs text-neutral-400 block mt-1">
            {currentIndex + 1} sur {images.length}
          </span>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-[#D4AF37] hover:text-[#111111] transition-all z-50"
        aria-label="Image suivante"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
