import React from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { Sparkles, Award, Heart, ShieldCheck, Gem } from 'lucide-react';

export const metadata = {
  title: "À Propos de Nous | L'Art du Parfum",
  description: "Découvrez notre histoire, notre passion pour la haute parfumerie, notre expertise et nos engagements d'excellence.",
};

export default function AboutPage() {
  return (
    <div className="bg-neutral-50 dark:bg-[#111111] min-h-screen pb-20">
      <Breadcrumb items={[{ label: 'À Propos de Notre Maison' }]} />

      {/* Hero Banner */}
      <div className="bg-[#111111] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30 text-center relative overflow-hidden mb-16">
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            L'Excellence Olfactive Depuis 1994
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold">
            Notre Histoire &amp; Passion
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Sublimer les nectars les plus rares, honorer la tradition des Maîtres Parfumeurs de Grasse et offrir à chaque esthète sa signature olfactive unique.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                L'Origine du Projet
              </span>
              <h2 className="font-serif-luxury text-3xl font-bold text-neutral-900 dark:text-white">
                Notre Histoire &amp; Héritage
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
              Fondée en 1994 au cœur du triangle d'or parisien, L'Art du Parfum est née de la vision passionnée de maitres nez souhaitant préserver l'authenticité et l'élégance de la haute parfumerie artisanale.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
              Nous sélectionnons uniquement les flacons d'exception, les essences distillées dans le respect des traditions de Grasse, et les créations contemporaines les plus captivantes des plus grandes maisons françaises et internationales.
            </p>
          </div>

          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80"
              alt="Atelier de haute parfumerie"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Animated Counters Banner */}
        <div className="bg-[#111111] text-white rounded-2xl p-10 sm:p-14 border border-[#D4AF37]/40 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <AnimatedCounter target={5000} prefix="+" duration={2200} />
            <span className="text-xs uppercase tracking-widest text-neutral-400 block font-semibold">
              Clients Privilégiés
            </span>
          </div>

          <div className="space-y-2">
            <AnimatedCounter target={200} prefix="+" duration={2000} />
            <span className="text-xs uppercase tracking-widest text-neutral-400 block font-semibold">
              Parfums d'Exception
            </span>
          </div>

          <div className="space-y-2">
            <AnimatedCounter target={50} prefix="+" duration={1800} />
            <span className="text-xs uppercase tracking-widest text-neutral-400 block font-semibold">
              Maisons Partenaires
            </span>
          </div>

          <div className="space-y-2">
            <AnimatedCounter target={98} suffix="%" duration={1600} />
            <span className="text-xs uppercase tracking-widest text-neutral-400 block font-semibold">
              Satisfaction Clients
            </span>
          </div>
        </div>

        {/* Passion, Expertise & Commitments Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#171717] p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 hover:border-[#D4AF37] transition-all shadow-md">
            <div className="w-12 h-12 rounded-full bg-[#111111] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury font-bold text-xl text-neutral-900 dark:text-white">
              Notre Passion
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
              Nous considérons le parfum comme une œuvre d'art invisible mais inoubliable, capable d'évoquer des souvenirs précieux et de magnifier chaque instant de vie.
            </p>
          </div>

          <div className="bg-white dark:bg-[#171717] p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 hover:border-[#D4AF37] transition-all shadow-md">
            <div className="w-12 h-12 rounded-full bg-[#111111] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center">
              <Gem className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury font-bold text-xl text-neutral-900 dark:text-white">
              Notre Expertise
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
              Nos sommeliers olfactifs formés à Grasse vous guident à travers l'alchimie des pyramides de fragrances afin d'identifier le sillage parfaitement adapté à votre peau.
            </p>
          </div>

          <div className="bg-white dark:bg-[#171717] p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 hover:border-[#D4AF37] transition-all shadow-md">
            <div className="w-12 h-12 rounded-full bg-[#111111] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury font-bold text-xl text-neutral-900 dark:text-white">
              Nos Engagements
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
              Authenticité certifiée à 100%, flacons conservés en cave régulée à 14°C, emballages éco-conçus et service de conciergerie privée disponible 6 jours sur 7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
