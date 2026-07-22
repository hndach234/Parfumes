'use client';

import React, { useState } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      confetti({
        particleCount: 70,
        spread: 50,
        origin: { y: 0.6 },
      });
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 6000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Bonjour Conciergerie L'Art du Parfum Paris, je souhaite obtenir des renseignements."
  );

  return (
    <div className="bg-neutral-50 dark:bg-[#111111] min-h-screen pb-20">
      <Breadcrumb items={[{ label: 'Contact & Conciergerie' }]} />

      {/* Hero Banner */}
      <div className="bg-[#111111] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30 text-center relative overflow-hidden mb-12">
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Service Client Privilégié
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold">
            Conciergerie Olfactive
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Une question sur une fragrance, une commande sur-mesure ou une invitation privée ? Nos maîtres parfumeurs vous répondent avec attention.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Coordonnées & Quick Actions */}
          <div className="lg:col-span-5 space-y-8 bg-white dark:bg-[#171717] p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                Maison Parisienne
              </span>
              <h2 className="font-serif-luxury text-2xl font-bold text-neutral-900 dark:text-white">
                Nos Coordonnées
              </h2>
            </div>

            <div className="space-y-6 text-xs text-neutral-600 dark:text-neutral-300">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#111111] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Adresse Flagship</h4>
                  <p className="font-light mt-0.5">12 Place Vendôme, 75001 Paris, France</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#111111] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Ligne Directe</h4>
                  <p className="font-light mt-0.5">+33 1 42 68 00 00</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#111111] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Courriel Conciergerie</h4>
                  <p className="font-light mt-0.5">conciergerie@lartduparfum-luxe.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#111111] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Horaires d'Ouverture</h4>
                  <p className="font-light mt-0.5">Lundi au Samedi : 10h00 - 19h30</p>
                  <p className="text-[10px] text-neutral-400">Dimanche : Sur rendez-vous uniquement</p>
                </div>
              </div>
            </div>

            {/* Direct Social / Messenger Buttons */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 block">
                Canaux d'échange direct :
              </span>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={`https://wa.me/33142680000?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] text-white py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 shadow hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 shadow hover:opacity-90 transition-opacity"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 shadow hover:opacity-90 transition-opacity"
                >
                  <FacebookIcon className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#171717] p-8 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                Formulaire de Contact
              </span>
              <h2 className="font-serif-luxury text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                Écrivez-nous un Message
              </h2>
            </div>

            {isSubmitted ? (
              <div className="bg-[#D4AF37]/15 border border-[#D4AF37] p-8 rounded-xl text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto animate-bounce" />
                <h3 className="font-serif-luxury font-bold text-xl text-[#D4AF37]">
                  Votre message a été envoyé avec succès.
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Merci de nous avoir contactés. Notre Conciergerie Olfactive reviendra vers vous sous 24 heures ouvrées. (Simulation active)
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Jean de la Roche"
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ex: +33 6 12 34 56 78"
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
                    Adresse Courriel *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ex: jean.delaroche@exemple.com"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
                    Votre Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez votre demande (recherche de fragrance, commande spéciale, rendez-vous privée)..."
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#b89628] text-[#111111] font-bold text-xs uppercase tracking-widest py-4 rounded-lg transition-all shadow-lg gold-border-glow flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer le Message</span>
                </button>

                <p className="text-[10px] text-center text-neutral-400 pt-1">
                  Aucune donnée n'est sauvegardée sur un serveur (Démonstration Pure React).
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Visual Google Maps Placeholder */}
        <div className="bg-white dark:bg-[#171717] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-4 p-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Localisation Flagship
              </span>
              <h3 className="font-serif-luxury font-bold text-xl">12 Place Vendôme, Paris</h3>
            </div>
            <span className="text-xs text-neutral-400">Google Maps Interactif</span>
          </div>

          <div className="w-full h-80 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative bg-neutral-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.5262799307775!2d2.327663276856488!3d48.86725220008437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e312f2ad769%3A0xb35d07fb8849ad7e!2sPl.%20Vend%C3%B4me%2C%2075001%20Paris!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.1) opacity(0.9)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte Google Maps Place Vendôme Paris"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
