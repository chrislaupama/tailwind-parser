import { CSSProperties } from "./tailwind-parser";

export function parseContentClass(className: string): CSSProperties | null {
  // Content utilities
  if (className === "content-none") {
    return { content: "none" };
  }
  
  if (className === "content-empty") {
    return { content: '""' };
  }

  // String content: content-['hello']
  const contentStringMatch = className.match(/^content-\['([^']+)'\]$/);
  if (contentStringMatch) {
    return { content: `"${contentStringMatch[1]}"` };
  }

  // Symbol content: content-['"']
  const contentSymbolMatch = className.match(/^content-\[["']([^"']+)["']\]$/);
  if (contentSymbolMatch) {
    return { content: `"${contentSymbolMatch[1]}"` };
  }

  // URL/attr content: content-[url(image.jpg)] or content-[attr(title)]
  const contentFuncMatch = className.match(/^content-\[(url|attr)\(([^)]+)\)\]$/);
  if (contentFuncMatch) {
    const func = contentFuncMatch[1];
    const value = contentFuncMatch[2];
    return { content: `${func}(${value})` };
  }

  return null;
}
