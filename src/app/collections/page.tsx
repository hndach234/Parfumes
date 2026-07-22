import React from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { collections, perfumes } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Collections de Parfums Thématiques | L'Art du Parfum",
  description: "Explorez nos collections thématiques : Homme, Femme, Unisexe, Luxe, Orientale, Florale et Boisée.",
};

export default function CollectionsPage() {
  return (
    <div className="bg-neutral-50 dark:bg-[#111111] min-h-screen pb-20">
      <Breadcrumb items={[{ label: 'Collections Thématiques' }]} />

      {/* Hero Banner */}
      <div className="bg-[#111111] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30 text-center relative overflow-hidden mb-16">
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Parfum d'Auteur
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold">
            Nos Collections Thématiques
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Chaque collection reflète une alchimie particulière : du cuir envoûtant d'Orient à la délicatesse des fleurs de Grasse.
          </p>
        </div>
      </div>

      {/* Collections Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {collections.map((coll) => {
          const collectionPerfumes = perfumes
            .filter((p) => p.collection === coll.id)
            .slice(0, 4);

          return (
            <section key={coll.id} id={coll.slug} className="space-y-8">
              {/* Collection Banner Header */}
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-800">
                <img
                  src={coll.image}
                  alt={coll.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-center max-w-2xl text-white space-y-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                    {coll.subtitle}
                  </span>
                  <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold">
                    {coll.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {coll.description}
                  </p>
                </div>
              </div>

              {/* Fragrances grid for this collection */}
              {collectionPerfumes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {collectionPerfumes.map((perfume) => (
                    <ProductCard key={perfume.id} perfume={perfume} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-400 text-xs italic">
                  Catalogue en cours de mise à jour pour cette collection.
                </div>
              )}

              {/* View all CTA */}
              <div className="text-right">
                <Link
                  href={`/boutique?category=${coll.slug}`}
                  className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Explorer toute la {coll.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
