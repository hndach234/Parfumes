export interface Perfume {
  id: string;
  name: string;
  brand: string;
  brandId: string;
  price: number;
  originalPrice?: number;
  volume: string;
  gender: 'Homme' | 'Femme' | 'Unisexe';
  category: string;
  collection: string;
  description: string;
  olfactiveFamily: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  isPopular: boolean;
  isNew: boolean;
  isFeatured: boolean;
}

export interface Brand {
  id: string;
  name: string;
  fullName: string;
  origin: string;
  foundationYear: number;
  description: string;
  history: string;
  logo: string;
  image: string;
  popularPerfumes: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  image: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  perfumeId: string;
  perfumeName: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface CartItem {
  perfume: Perfume;
  quantity: number;
  selectedVolume: string;
}

export interface FilterState {
  searchQuery: string;
  brand: string;
  category: string;
  collection: string;
  gender: string;
  minPrice: number;
  maxPrice: number;
  volume: string;
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'newest';
}
