interface CourtifyLogoProps {
  size?: 'header' | 'footer' | 'hero';
  className?: string;
}

/**
 * Renders the full Courtify SVG logo (/assets/aistudio/Courtify_logo_2b8a91ed.svg)
 * with object-contain and zero clipping so the entire logo mark is always visible.
 */
export function CourtifyLogo({ size = 'header', className = '' }: CourtifyLogoProps) {
  const sizeClass =
    size === 'footer'
      ? 'h-12 sm:h-14 w-auto'
      : size === 'hero'
        ? 'h-20 sm:h-24 md:h-28 w-auto'
        : 'h-10 sm:h-11 w-auto';

  return (
    <img
      src="/assets/aistudio/Courtify_logo_2b8a91ed.svg"
      alt="Courtify"
      className={`${sizeClass} object-contain select-none bg-transparent ${className}`}
    />
  );
}
