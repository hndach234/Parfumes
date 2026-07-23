import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function getAssetPath(url: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;

  // If in browser and hosted on GitHub Pages subpath (/Parfumes)
  if (typeof window !== 'undefined' && window.location.pathname.toLowerCase().includes('/parfumes')) {
    return `/Parfumes${cleanUrl}`;
  }

  // Environment base path if specified
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${cleanUrl}`;
}
