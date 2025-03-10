import { CSSProperties } from "./tailwind-parser";

export function parseColumnsClass(className: string): CSSProperties | null {
  // Column count
  const columnsMatch = className.match(/^columns-([\dxs]+)$/);
  if (columnsMatch) {
    const columnValue = columnsMatch[1];
    const valueMap: Record<string, string> = {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      "10": "10",
      "11": "11",
      "12": "12",
      "auto": "auto",
      "3xs": "16rem",
      "2xs": "18rem",
      "xs": "20rem",
      "sm": "24rem",
      "md": "28rem",
      "lg": "32rem",
      "xl": "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem"
    };
    
    if (valueMap[columnValue]) {
      return { "columns": valueMap[columnValue] };
    }
  }

  // Arbitrary column count: columns-[2]
  const arbitraryColumnsMatch = className.match(/^columns-\[([\d\w]+)]$/);
  if (arbitraryColumnsMatch) {
    return { "columns": arbitraryColumnsMatch[1] };
  }

  // Column rule
  const columnRuleMatch = className.match(/^column-rule-([\w-]+)$/);
  if (columnRuleMatch) {
    const style = columnRuleMatch[1];
    if (["solid", "dashed", "dotted", "double", "none"].includes(style)) {
      return { "column-rule-style": style };
    }

    // Color handling for column rule
    // Would need comprehensive color handling based on your colorMap
    if (style === "transparent") {
      return { "column-rule-color": "transparent" };
    }
  }

  // Column gap
  const columnGapMatch = className.match(/^column-gap-([\d.]+)$/);
  if (columnGapMatch) {
    const value = columnGapMatch[1];
    const gapMap: Record<string, string> = {
      "0": "0px",
      "0.5": "0.125rem",
      "1": "0.25rem",
      "1.5": "0.375rem",
      "2": "0.5rem",
      "2.5": "0.625rem",
      "3": "0.75rem",
      "3.5": "0.875rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "7": "1.75rem",
      "8": "2rem",
      "9": "2.25rem",
      "10": "2.5rem",
      "11": "2.75rem",
      "12": "3rem",
      "14": "3.5rem",
      "16": "4rem",
      "20": "5rem",
      "24": "6rem",
      "28": "7rem",
      "32": "8rem",
      "36": "9rem",
      "40": "10rem",
      "44": "11rem",
      "48": "12rem",
      "52": "13rem",
      "56": "14rem",
      "60": "15rem",
      "64": "16rem",
      "72": "18rem",
      "80": "20rem",
      "96": "24rem"
    };
    
    if (gapMap[value]) {
      return { "column-gap": gapMap[value] };
    }
  }

  // Column span
  if (className === "column-span-all") {
    return { "column-span": "all" };
  }
  
  if (className === "column-span-none") {
    return { "column-span": "none" };
  }

  return null;
}
