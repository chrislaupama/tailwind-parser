import { CSSProperties } from "./tailwind-parser";

export function parseContainerClass(className: string): CSSProperties | null {
  // Basic container
  if (className === "container") {
    return {
      width: "100%",
      "@media (min-width: 640px)": { "max-width": "640px" },
      "@media (min-width: 768px)": { "max-width": "768px" },
      "@media (min-width: 1024px)": { "max-width": "1024px" },
      "@media (min-width: 1280px)": { "max-width": "1280px" },
      "@media (min-width: 1536px)": { "max-width": "1536px" },
    };
  }

  // Container modifiers: @container, container-type, container-name
  const containerTypeMatch = className.match(/^container-(normal|size|inline-size)$/);
  if (containerTypeMatch) {
    return { "container-type": containerTypeMatch[1] };
  }

  const containerNameMatch = className.match(/^container-name-([\w-]+)$/);
  if (containerNameMatch) {
    return { "container-name": containerNameMatch[1] };
  }

  return null;
}
