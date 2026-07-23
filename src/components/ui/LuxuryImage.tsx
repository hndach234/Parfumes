'use client';

import React, { useState, useEffect } from 'react';
import { getAssetPath } from '@/lib/utils';

interface LuxuryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
}

export default function LuxuryImage({
  src,
  alt,
  className,
  fallbackSrc = '/to-perfumes-showcase.png',
  ...props
}: LuxuryImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(getAssetPath(src));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(getAssetPath(src));
    setFailed(false);
  }, [src]);

  const handleError = () => {
    if (!failed) {
      setFailed(true);
      setCurrentSrc(getAssetPath(fallbackSrc));
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt || 'Parfum de luxe'}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}
