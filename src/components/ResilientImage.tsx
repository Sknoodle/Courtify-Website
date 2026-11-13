import { useState } from 'react';
import { Grid } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Courtify Pickleball Court',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FCFFEB] via-[#A1CEA7]/30 to-[#77AD78]/30 text-[#627F65] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Grid className="w-8 h-8 text-[#627F65] mb-2" strokeWidth={1.5} />
        <span className="text-xs font-medium text-[#172E1B]">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
