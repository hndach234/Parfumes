import React from 'react';
import Hero from '@/components/home/Hero';
import CategoriesSection from '@/components/home/CategoriesSection';
import BrandsSection from '@/components/home/BrandsSection';
import ProductsSection from '@/components/home/ProductsSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import ReviewsSlider from '@/components/home/ReviewsSlider';
import FaqAccordion from '@/components/home/FaqAccordion';

export const metadata = {
  title: "L'Art du Parfum | Haute Parfumerie & Flacons de Luxe",
  description: "Boutique d'exception de parfums de luxe pour homme, femme et unisexe. Découvrez Dior, Chanel, Tom Ford, Creed et nos nectars rares.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CategoriesSection />
      <BrandsSection />
      <ProductsSection />
      <WhyUsSection />
      <ReviewsSlider />
      <FaqAccordion />
    </main>
  );
}
