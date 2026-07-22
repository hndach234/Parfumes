import perfumesData from '../../data/perfumes.json';
import brandsData from '../../data/brands.json';
import categoriesData from '../../data/categories.json';
import collectionsData from '../../data/collections.json';
import reviewsData from '../../data/reviews.json';
import faqData from '../../data/faq.json';
import { Perfume, Brand, Category, Collection, Review, FAQ } from '@/types';

export const perfumes: Perfume[] = perfumesData as Perfume[];
export const brands: Brand[] = brandsData as Brand[];
export const categories: Category[] = categoriesData as Category[];
export const collections: Collection[] = collectionsData as Collection[];
export const reviews: Review[] = reviewsData as Review[];
export const faqs: FAQ[] = faqData as FAQ[];

export function getPerfumeById(id: string): Perfume | undefined {
  return perfumes.find((p) => p.id === id);
}

export function getPopularPerfumes(limit = 12): Perfume[] {
  return perfumes.filter((p) => p.isPopular).slice(0, limit);
}

export function getFeaturedPerfumes(limit = 8): Perfume[] {
  return perfumes.filter((p) => p.isFeatured).slice(0, limit);
}

export function getBrandById(id: string): Brand | undefined {
  return brands.find((b) => b.id === id);
}

export function getPerfumesByBrand(brandId: string): Perfume[] {
  return perfumes.filter((p) => p.brandId === brandId);
}

export function getPerfumesByCategory(category: string): Perfume[] {
  return perfumes.filter((p) => p.category === category || p.gender.toLowerCase() === category.toLowerCase());
}

export function getPerfumesByCollection(collection: string): Perfume[] {
  return perfumes.filter((p) => p.collection === collection);
}
