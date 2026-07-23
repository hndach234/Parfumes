import React from 'react';
import Hero from '@/components/home/Hero';
import ToPerfumesShowcase from '@/components/home/ToPerfumesShowcase';
import CategoriesSection from '@/components/home/CategoriesSection';
import BrandsSection from '@/components/home/BrandsSection';
import ProductsSection from '@/components/home/ProductsSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import ReviewsSlider from '@/components/home/ReviewsSlider';
import FaqAccordion from '@/components/home/FaqAccordion';

export const metadata = {
  title: "TO PERFUMES (عطور تعبّر عنك) | Haute Parfumerie & Éditions Inspirées",
  description: "Découvrez la collection officielle TO PERFUMES (TO Khamrah, TO Scandal, TO My Way, TO Yum, TO Coco Noir, TO Yara, TO Weekend). Des fragrances d'exception pour exprimer votre personnalité.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ToPerfumesShowcase />
      <CategoriesSection />
      <BrandsSection />
      <ProductsSection />
      <WhyUsSection />
      <ReviewsSlider />
      <FaqAccordion />
    </main>
  );
}
