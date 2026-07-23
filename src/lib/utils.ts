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

export function getAssetPath(url: string | undefined): string {
  if (!url) return '/to-perfumes-showcase.png';
  
  // External URLs
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Ensure URL starts with /
  let cleanUrl = url.startsWith('/') ? url : `/${url}`;

  // Prevent double prefixing (/Parfumes/Parfumes/...)
  if (cleanUrl.toLowerCase().startsWith('/parfumes/')) {
    cleanUrl = cleanUrl.substring(9);
  }

  // Check if we are running on GitHub Pages
  const isGithubPages =
    (typeof window !== 'undefined' && window.location.pathname.toLowerCase().includes('/parfumes')) ||
    (typeof process !== 'undefined' && process.env.GITHUB_ACTIONS === 'true');

  const prefix = isGithubPages ? '/Parfumes' : (process.env.NEXT_PUBLIC_BASE_PATH || '');

  return `${prefix}${cleanUrl}`;
}
