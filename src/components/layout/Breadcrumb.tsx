'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
      <Link
        href="/"
        className="flex items-center space-x-1 hover:text-[#D4AF37] transition-colors"
        aria-label="Accueil"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Accueil</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
            {isLast || !item.href ? (
              <span className="text-[#D4AF37] font-semibold truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-[#D4AF37] transition-colors">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
