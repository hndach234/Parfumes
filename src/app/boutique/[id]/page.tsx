import React from 'react';
import { notFound } from 'next/navigation';
import { getPerfumeById, perfumes } from '@/lib/data';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return perfumes.map((p) => ({
    id: p.id,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const perfume = getPerfumeById(resolvedParams.id);

  if (!perfume) {
    notFound();
  }

  return <ProductDetailClient perfume={perfume} />;
}
