import { CSSProperties } from "./tailwind-parser";

export function parseArbitraryValue(className: string): CSSProperties | null {
  // Common patterns for arbitrary values
  
  // 1. Size arbitrary values: w-[32px], h-[calc(100%-1rem)]
  const sizeMatch = className.match(/^(w|h|min-w|min-h|max-w|max-h)-\[(.*?)\]$/);
  if (sizeMatch) {
    const [, prop, value] = sizeMatch;
    const propMap: Record<string, string> = {
      'w': 'width',
      'h': 'height',
      'min-w': 'min-width',
      'min-h': 'min-height',
      'max-w': 'max-width',
      'max-h': 'max-height'
    };
    return { [propMap[prop]]: value };
  }

  // 2. Margin/padding arbitrary values: m-[10px], p-[calc(1rem+10px)]
  const spacingMatch = className.match(/^([mp][trblxy]?)-\[(.*?)\]$/);
  if (spacingMatch) {
    const [, prop, value] = spacingMatch;
    let cssProperty = '';
    
    // First character determines margin or padding
    if (prop.startsWith('m')) {
      cssProperty = 'margin';
    } else if (prop.startsWith('p')) {
      cssProperty = 'padding';
    }
    
    // Second character (if exists) determines direction
    if (prop.length > 1) {
      const direction = prop.charAt(1);
      switch (direction) {
        case 't': cssProperty += '-top'; break;
        case 'r': cssProperty += '-right'; break;
        case 'b': cssProperty += '-bottom'; break;
        case 'l': cssProperty += '-left'; break;
        case 'x': return {
          [`${cssProperty}-left`]: value,
          [`${cssProperty}-right`]: value
        };
        case 'y': return {
          [`${cssProperty}-top`]: value,
          [`${cssProperty}-bottom`]: value
        };
      }
    }
    
    return { [cssProperty]: value };
  }

  // 3. Color arbitrary values: bg-[#ff5533], text-[rgb(123,45,67)]
  const colorMatch = className.match(/^(bg|text|border|ring|outline|fill|stroke|shadow|accent|caret|divide|ring-offset)-\[(#[0-9a-fA-F]{3,8}|rgba?\(.*?\)|hsla?\(.*?\))\]$/);
  if (colorMatch) {
    const [, prop, value] = colorMatch;
    let cssProperty = '';
    
    switch (prop) {
      case 'bg': cssProperty = 'background-color'; break;
      case 'text': cssProperty = 'color'; break;
      case 'border': cssProperty = 'border-color'; break;
      case 'ring': cssProperty = 'ring-color'; break;
      case 'outline': cssProperty = 'outline-color'; break;
      case 'fill': cssProperty = 'fill'; break;
      case 'stroke': cssProperty = 'stroke'; break;
      case 'shadow': cssProperty = 'box-shadow-color'; break;
      case 'accent': cssProperty = 'accent-color'; break;
      case 'caret': cssProperty = 'caret-color'; break;
      case 'divide': cssProperty = 'border-color'; break;
      case 'ring-offset': cssProperty = '--tw-ring-offset-color'; break;
      default: return null;
    }
    
    return { [cssProperty]: value };
  }

  // 4. Font size arbitrary values: text-[14px]
  const fontSizeMatch = className.match(/^text-\[(.*?)\]$/);
  if (fontSizeMatch) {
    return { 'font-size': fontSizeMatch[1] };
  }

  // 5. Border width arbitrary values: border-[10px]
  const borderWidthMatch = className.match(/^border-([trblxy]?)-\[(.*?)\]$/);
  if (borderWidthMatch) {
    const [, direction, value] = borderWidthMatch;
    let cssProperty = 'border';
    
    if (direction) {
      switch (direction) {
        case 't': cssProperty += '-top'; break;
        case 'r': cssProperty += '-right'; break;
        case 'b': cssProperty += '-bottom'; break;
        case 'l': cssProperty += '-left'; break;
        case 'x': return {
          'border-left-width': value,
          'border-right-width': value
        };
        case 'y': return {
          'border-top-width': value,
          'border-bottom-width': value
        };
      }
    }
    
    return { [`${cssProperty}-width`]: value };
  }

  // 6. Arbitrary grid values: grid-cols-[repeat(3,_1fr)], grid-rows-[1fr,auto]
  const gridMatch = className.match(/^grid-(cols|rows)-\[(.*?)\]$/);
  if (gridMatch) {
    const [, type, value] = gridMatch;
    return { [`grid-template-${type === 'cols' ? 'columns' : 'rows'}`]: value };
  }

  // 7. Arbitrary positioning: top-[15px], left-[20%]
  const positionMatch = className.match(/^(top|right|bottom|left|inset)-\[(.*?)\]$/);
  if (positionMatch) {
    const [, prop, value] = positionMatch;
    return { [prop]: value };
  }

  // 8. Arbitrary z-index: z-[100]
  const zIndexMatch = className.match(/^z-\[(.*?)\]$/);
  if (zIndexMatch) {
    return { 'z-index': zIndexMatch[1] };
  }

  // 9. Arbitrary gap: gap-[10px], gap-x-[20px]
  const gapMatch = className.match(/^gap-([xy]?)-\[(.*?)\]$/);
  if (gapMatch) {
    const [, direction, value] = gapMatch;
    if (direction) {
      return { [`${direction === 'x' ? 'column' : 'row'}-gap`]: value };
    }
    return { 'gap': value };
  }

  // 10. Arbitrary filters (blur, brightness, etc)
  const filterMatch = className.match(/^(blur|brightness|contrast|saturate|hue-rotate|grayscale|sepia|invert)-\[(.*?)\]$/);
  if (filterMatch) {
    const [, filter, value] = filterMatch;
    if (filter === 'hue-rotate') {
      return { 'filter': `hue-rotate(${value})` };
    }
    return { 'filter': `${filter}(${value})` };
  }

  return null;
}
