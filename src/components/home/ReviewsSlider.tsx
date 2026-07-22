'use client';

import React, { useState } from 'react';
import { reviews } from '@/lib/data';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-20 bg-neutral-50 dark:bg-[#141414] transition-colors relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Témoignages Privilégiés
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            L'Avis de nos Esthètes
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
        </div>

        {/* Carousel Card */}
        <div className="relative bg-white dark:bg-[#171717] rounded-2xl p-8 sm:p-12 shadow-2xl border border-[#D4AF37]/30 transition-all duration-500">
          <Quote className="w-12 h-12 text-[#D4AF37]/20 absolute top-6 right-8 pointer-events-none" />

          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            {/* Avatar */}
            <div className="relative">
              <img
                src={currentReview.avatar}
                alt={currentReview.author}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#D4AF37] shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 bg-[#111111] text-[#D4AF37] p-1 rounded-full text-[10px]">
                ✓
              </span>
            </div>

            {/* Stars */}
            <div className="flex items-center space-x-1 text-amber-500">
              {[...Array(currentReview.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-amber-500" />
              ))}
            </div>

            {/* Comment */}
            <p className="font-serif-luxury text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 italic leading-relaxed">
              "{currentReview.comment}"
            </p>

            {/* Author details */}
            <div>
              <h4 className="font-bold text-base text-neutral-900 dark:text-white">
                {currentReview.author}
              </h4>
              <span className="text-xs text-[#D4AF37] uppercase tracking-wider block">
                {currentReview.perfumeName} • {currentReview.location}
              </span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">
                {currentReview.date}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center absolute inset-y-0 inset-x-2 sm:inset-x-4 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto p-3 rounded-full bg-white dark:bg-neutral-900 shadow-lg text-neutral-700 dark:text-neutral-300 hover:bg-[#D4AF37] hover:text-[#111111] transition-all"
              aria-label="Avis précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto p-3 rounded-full bg-white dark:bg-neutral-900 shadow-lg text-neutral-700 dark:text-neutral-300 hover:bg-[#D4AF37] hover:text-[#111111] transition-all"
              aria-label="Avis suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {reviews.slice(0, 8).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentIndex === idx ? 'bg-[#D4AF37] w-6' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
              aria-label={`Aller à l'avis ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
