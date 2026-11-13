interface CourtifyLogoProps {
  size?: 'header' | 'footer' | 'hero';
  className?: string;
}

/**
 * Renders the official Courtify SVG logo (/assets/aistudio/Courtify_logo_2b8a91ed.svg),
 * tightly framed around the artwork's bounding box inside its 1440x810 canvas.
 */
export function CourtifyLogo({ size = 'header', className = '' }: CourtifyLogoProps) {
  if (size === 'footer') {
    return (
      <div className={`relative w-[118px] h-[64px] overflow-hidden shrink-0 ${className}`}>
        <img
          src="/assets/aistudio/Courtify_logo_2b8a91ed.svg"
          alt="Courtify"
          className="absolute max-w-none w-[216px] h-[122px] -left-[46px] -top-[27px] select-none pointer-events-none"
        />
      </div>
    );
  }

  if (size === 'hero') {
    return (
      <div className={`relative w-[160px] h-[86px] overflow-hidden shrink-0 ${className}`}>
        <img
          src="/assets/aistudio/Courtify_logo_2b8a91ed.svg"
          alt="Courtify"
          className="absolute max-w-none w-[290px] h-[164px] -left-[62px] -top-[36px] select-none pointer-events-none"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-[104px] h-[52px] overflow-hidden shrink-0 ${className}`}>
      <img
        src="/assets/aistudio/Courtify_logo_2b8a91ed.svg"
        alt="Courtify"
        className="absolute max-w-none w-[184px] h-[104px] -left-[39px] -top-[22px] select-none pointer-events-none"
      />
    </div>
  );
}
