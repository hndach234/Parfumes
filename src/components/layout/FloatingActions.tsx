'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const whatsappMessage = encodeURIComponent(
    "Bonjour L'Art du Parfum Paris, je souhaite obtenir des renseignements sur vos fragrances d'exception."
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-3">
      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/33142680000?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group border-2 border-white/20"
        title="Discuter sur WhatsApp avec nos Conseillers Olfactifs"
        aria-label="WhatsApp Conciergerie"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-14 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-[#D4AF37]/40 shadow-lg">
          Conciergerie WhatsApp Privée
        </span>
      </a>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-[#111111] text-[#D4AF37] border border-[#D4AF37]/50 shadow-xl flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300"
          title="Retour en haut de page"
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
