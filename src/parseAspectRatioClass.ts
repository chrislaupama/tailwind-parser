import { CSSProperties } from "./tailwind-parser";

export function parseAspectRatioClass(className: string): CSSProperties | null {
  // Aspect ratio utilities
  const aspectMatch = className.match(/^aspect-(auto|square|video)$/);
  if (aspectMatch) {
    const value = aspectMatch[1];
    if (value === 'auto') {
      return { "aspect-ratio": "auto" };
    } else if (value === 'square') {
      return { "aspect-ratio": "1 / 1" };
    } else if (value === 'video') {
      return { "aspect-ratio": "16 / 9" };
    }
  }

  // Arbitrary aspect ratios: aspect-[4/3]
  const arbitraryAspectMatch = className.match(/^aspect-\[([\d./]+)\]$/);
  if (arbitraryAspectMatch) {
    const aspectValue = arbitraryAspectMatch[1];
    return { "aspect-ratio": aspectValue };
  }

  return null;
}
