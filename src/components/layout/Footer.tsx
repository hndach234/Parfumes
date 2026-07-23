'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Truck, Gift, Clock } from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 border-t border-[#D4AF37]/30 relative overflow-hidden">
      {/* Background glow element */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Features Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-neutral-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white">Produits Authentiques</h4>
            <p className="text-xs text-neutral-400">100% certifiés d'origine maison</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white">Livraison Express</h4>
            <p className="text-xs text-neutral-400">Offerte dès 150 € d'achats</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white">Écrin &amp; Échantillons</h4>
            <p className="text-xs text-neutral-400">3 échantillons rares inclus</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white">Conciergerie Privée</h4>
            <p className="text-xs text-neutral-400">Conseillers dédiés 6j/7</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        {/* Brand Description */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <img
              src="/to-perfumes-logo.png"
              alt="TO PERFUMES Logo"
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-serif-luxury text-2xl font-bold tracking-widest text-[#D4AF37] block">
                TO PERFUMES
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] block">
                عطور تعبّر عنك
              </span>
            </div>
          </Link>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
            Maison de haute parfumerie créatrice des gammes TO Khamrah, TO Scandal, TO My Way, TO Yum, TO Coco Noir, TO Yara et TO Weekend. Des fragrances conçues pour exprimer votre personnalité.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-xs text-neutral-400">
            <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Accueil</Link></li>
            <li><Link href="/boutique?brand=to-perfumes" className="hover:text-[#D4AF37] transition-colors">Collection TO PERFUMES</Link></li>
            <li><Link href="/boutique" className="hover:text-[#D4AF37] transition-colors">Boutique Haute Parfumerie</Link></li>
            <li><Link href="/marques" className="hover:text-[#D4AF37] transition-colors">Nos Grandes Marques</Link></li>
            <li><Link href="/collections" className="hover:text-[#D4AF37] transition-colors">Collections Thématiques</Link></li>
            <li><Link href="/a-propos" className="hover:text-[#D4AF37] transition-colors">À Propos de Nous</Link></li>
            <li><Link href="/galerie" className="hover:text-[#D4AF37] transition-colors">Galerie Photo</Link></li>
            <li><Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact &amp; Conciergerie</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">
            Coordonnées
          </h3>
          <ul className="space-y-3 text-xs text-neutral-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>12 Place Vendôme, 75001 Paris, France</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>+33 1 42 68 00 00</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>conciergerie@lartduparfum-luxe.com</span>
            </li>
            <li className="text-[11px] text-neutral-500 pt-1">
              Horaires : Lun - Sam | 10h00 - 19h30
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">
            Cercle Privé Newsletter
          </h3>
          <p className="text-xs text-neutral-400 mb-3">
            Inscrivez-vous pour recevoir nos invitations privées et découvrir nos éditions limitées.
          </p>

          {subscribed ? (
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/50 rounded p-3 text-xs text-[#D4AF37] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Merci pour votre inscription à notre Cercle Privé.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email..."
                  required
                  className="w-full bg-[#1A1A1A] border border-neutral-800 rounded px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#D4AF37] text-[#111111] hover:bg-[#b89628] rounded flex items-center justify-center transition-colors"
                  aria-label="S'inscrire à la newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-neutral-500 block">
                Vos données sont strictement confidentielles.
              </span>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-500 space-y-4 md:space-y-0">
        <div>
          © 2026 TO PERFUMES (عطور تعبّر عنك). Tous droits réservés. Démonstration Client.
        </div>
        <div className="flex space-x-6">
          <Link href="/contact" className="hover:text-neutral-400 transition-colors">Mentions Légales</Link>
          <Link href="/contact" className="hover:text-neutral-400 transition-colors">Politique de Confidentialité</Link>
          <Link href="/contact" className="hover:text-neutral-400 transition-colors">Conditions Générales de Vente</Link>
        </div>
      </div>
    </footer>
  );
}
