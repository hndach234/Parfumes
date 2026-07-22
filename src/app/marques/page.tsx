import React from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { brands } from '@/lib/data';
import { Sparkles, ArrowRight, MapPin, Calendar } from 'lucide-react';

export const metadata = {
  title: "Nos Grandes Maisons de Parfumerie | L'Art du Parfum",
  description: "Découvrez l'histoire et le patrimoine d'exception des plus prestigieuses maisons de parfums : Dior, Chanel, Tom Ford, Creed, Guerlain, YSL...",
};

export default function BrandsPage() {
  return (
    <div className="bg-neutral-50 dark:bg-[#111111] min-h-screen pb-20">
      <Breadcrumb items={[{ label: 'Nos Grandes Maisons' }]} />

      {/* Hero Banner */}
      <div className="bg-[#111111] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30 text-center relative overflow-hidden mb-16">
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Les Maîtres Parfumeurs
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold">
            Nos Prestigieuses Maisons
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Un voyage à travers l'héritage, le savoir-faire artisanal et l'audace des plus grandes signatures de la haute parfumerie internationale.
          </p>
        </div>
      </div>

      {/* Brands List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {brands.map((brand, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={brand.id}
              id={brand.id}
              className="bg-white dark:bg-[#171717] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10"
            >
              {/* Brand Image */}
              <div
                className={`lg:col-span-5 aspect-[4/3] rounded-xl overflow-hidden relative group border border-neutral-200 dark:border-neutral-800 ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <img
                  src={brand.image}
                  alt={brand.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <img
                    src={brand.logo}
                    alt=""
                    className="w-12 h-12 rounded-full border-2 border-[#D4AF37] object-cover bg-white"
                  />
                  <div className="text-white">
                    <span className="font-serif-luxury font-bold text-lg block">{brand.name}</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]">
                      {brand.origin}
                    </span>
                  </div>
                </div>
              </div>

              {/* Brand Info */}
              <div
                className={`lg:col-span-7 space-y-5 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-4 text-xs text-neutral-400 font-medium mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {brand.origin}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Fondée en {brand.foundationYear}
                    </span>
                  </div>
                  <h2 className="font-serif-luxury text-3xl font-bold text-neutral-900 dark:text-white">
                    {brand.fullName}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                  {brand.description}
                </p>

                {/* History box */}
                <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800 space-y-1.5">
                  <h4 className="font-serif-luxury font-bold text-xs uppercase tracking-wider text-[#D4AF37]">
                    Histoire &amp; Patrimoine
                  </h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light">
                    {brand.history}
                  </p>
                </div>

                {/* Popular Fragrances Pills */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 block mb-2">
                    Fragrances Emblématiques :
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {brand.popularPerfumes.map((perfumeName) => (
                      <span
                        key={perfumeName}
                        className="text-xs bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
                      >
                        {perfumeName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA button */}
                <div className="pt-2">
                  <Link
                    href={`/boutique?brand=${brand.id}`}
                    className="inline-flex items-center space-x-2 bg-[#D4AF37] hover:bg-[#b89628] text-[#111111] font-bold text-xs uppercase tracking-widest py-3 px-6 rounded transition-all shadow"
                  >
                    <span>Découvrir les parfums {brand.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
