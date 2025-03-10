import { CSSProperties } from "./tailwind-parser";

export function parseTouchClass(className: string): CSSProperties | null {
  // Touch action utilities
  const touchMatch = className.match(/^touch-(auto|none|pan-x|pan-left|pan-right|pan-y|pan-up|pan-down|pinch-zoom|manipulation)$/);
  if (touchMatch) {
    return { "touch-action": touchMatch[1] };
  }

  return null;
}
