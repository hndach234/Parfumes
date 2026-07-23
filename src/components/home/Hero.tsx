'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Award } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0D0D0D] text-white">
      {/* Background Image Showcase */}
      <div className="absolute inset-0 z-0 opacity-35">
        <img
          src={getAssetPath('/to-perfumes-showcase.png')}
          alt="TO PERFUMES Collection"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-glow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
      </div>

      {/* Ambient Gold Glows */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-16">
        {/* Brand Ornate Logo Header */}
        <div className="inline-flex flex-col items-center space-y-2">
          <img
            src={getAssetPath('/to-perfumes-logo.png')}
            alt="TO PERFUMES Logo Gold"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-float"
          />
          <div className="inline-flex items-center space-x-2 bg-[#1A1A1A]/90 border border-[#D4AF37]/50 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.25em] text-[#D4AF37] backdrop-blur-md shadow-2xl">
            <Award className="w-3.5 h-3.5" />
            <span>TO PERFUMES • عطور تعبّر عنك</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
          TO PERFUMES <br />
          <span className="gold-gradient-text text-3xl sm:text-5xl lg:text-6xl block mt-1">
            عطور تعبّر عنك
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
          Découvrez notre collection exclusive de fragrances d'exception (TO Khamrah, TO Scandal, TO My Way, TO Yum, TO Coco Noir, TO Yara, TO Weekend). Des sillages intenses conçus pour exprimer votre personnalité.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/boutique?brand=to-perfumes"
            className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#b89628] text-[#111111] font-bold text-xs uppercase tracking-[0.2em] py-4 px-8 rounded transition-all duration-300 shadow-xl gold-border-glow flex items-center justify-center gap-2 group"
          >
            <span>Découvrir la collection TO PERFUMES</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/boutique?category=nouveautes"
            className="w-full sm:w-auto border border-white/40 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white font-medium text-xs uppercase tracking-[0.2em] py-4 px-8 rounded backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Nos Nouveautés Inspirées</span>
          </Link>
        </div>

        {/* Trust Stat bar */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-neutral-400 text-xs border-t border-neutral-800/80">
          <div>
            <span className="font-serif-luxury text-xl font-bold text-white block">100%</span>
            <span className="uppercase tracking-wider text-[10px]">Essences Nobles Certifiées</span>
          </div>
          <div>
            <span className="font-serif-luxury text-xl font-bold text-white block">TO Collection</span>
            <span className="uppercase tracking-wider text-[10px]">7 Flacons Signature</span>
          </div>
          <div>
            <span className="font-serif-luxury text-xl font-bold text-white block">24/48h</span>
            <span className="uppercase tracking-wider text-[10px]">Livraison Express</span>
          </div>
          <div>
            <span className="font-serif-luxury text-xl font-bold text-white block">5.0 / 5</span>
            <span className="uppercase tracking-wider text-[10px]">Satisfaction Client</span>
          </div>
        </div>
      </div>
    </section>
  );
}
