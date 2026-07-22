'use client';

import React from 'react';
import { ShieldCheck, Truck, Lock, Headphones, Gift } from 'lucide-react';

export default function WhyUsSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Produits Authentiques',
      description: '100% certifiés d\'origine par les maisons de parfumerie officielles.',
    },
    {
      icon: Truck,
      title: 'Livraison Rapide',
      description: 'Expédition sécurisée Chronopost 24/48h avec suivi en temps réel.',
    },
    {
      icon: Lock,
      title: 'Paiement Sécurisé',
      description: 'Cryptage SSL bancaire 256 bits et option de règlement 3x ou 4x.',
    },
    {
      icon: Headphones,
      title: 'Service Client Premium',
      description: 'Conciergerie olfactive dédiée et conseils personnalisés 6j/7.',
    },
    {
      icon: Gift,
      title: 'Cadeaux Exclusifs',
      description: 'Écrin signature noir & or offert et 3 échantillons rares inclus.',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#111111] transition-colors border-y border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Engagement &amp; Excellence
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            Pourquoi Nous Choisir
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[#D4AF37] text-center space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div className="w-14 h-14 rounded-full bg-[#111111] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#111111] transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury font-bold text-base text-neutral-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
