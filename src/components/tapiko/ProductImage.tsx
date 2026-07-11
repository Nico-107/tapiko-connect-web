import { type ImgHTMLAttributes } from "react";

/**
 * <ProductImage> — labeled image slot. Pass `src` for a real image;
 * without `src` it renders a labeled gradient placeholder so real
 * renders can be dropped in later.
 */
export function ProductImage({
  src,
  alt,
  label,
  className = "",
  ratio = "4 / 5",
  ...rest
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  ratio?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">) {
  if (src) {
    return (
      <div
        className={`overflow-hidden rounded-2xl bg-muted ${className}`}
        style={{ aspectRatio: ratio }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
          {...rest}
        />
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--stone)] bg-gradient-to-br from-[color:var(--stone)]/60 via-[color:var(--paper)] to-[color:var(--stone)]/40 ${className}`}
      style={{ aspectRatio: ratio }}
      aria-label={alt}
    >
      <span className="eyebrow px-4 text-center text-[color:var(--graphite)]">
        {label ?? alt}
      </span>
    </div>
  );
}