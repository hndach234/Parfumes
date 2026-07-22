import { MetadataRoute } from 'next';
import perfumesData from '../../data/perfumes.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lartduparfum-luxe.com';

  const routes = ['', '/boutique', '/marques', '/collections', '/a-propos', '/galerie', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    })
  );

  const productRoutes = perfumesData.map((perfume) => ({
    url: `${baseUrl}/boutique/${perfume.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...routes, ...productRoutes];
}
