import { parseBackgroundClasses } from "./parseBackgroundClasses";
import { parseBorderClasses } from "./parseBorderClasses";
import { parseDisplayClasses } from "./parseDisplayClasses";
import { parseFlexClasses } from "./parseFlexClasses";
import { parseGridClasses } from "./parseGridClasses";
import { parseListClasses } from "./parseListClasses";
import { parseMarginClasses } from "./parseMarginClasses";
import { parseOutlineClass } from "./parseOutlineClass";
import { parsePaddingClasses } from "./parsePaddingClasses";
import { parsePositioningClasses } from "./parsePositioningClasses";
import { parseRingClasses } from "./parseRingClasses";
import { parseScrollClass } from "./parseScrollClass";
import { parseShadowClass } from "./parseShadowClass";
import { parseSizeClasses } from "./parseSizeClasses";
import { parseSvgClass } from "./parseSvgClass";
import { parseTailwindBreakpoint } from "./parseTailwindBreakpoint";
import { parseTailwindTableClass } from "./parseTailwindTableClass";
import { parseTextClass } from "./parseTextClass";
import { parseTransformClass } from "./parseTransformClass";
import { parseTransitionClass } from "./parseTransitionClass";
import { parseUtilClass } from "./parseUtilClass";
import { parseVisibilityClasses } from "./parseVisibilityClasses";
import { parseAspectRatioClass } from "./parseAspectRatioClass";
import { parseContainerClass } from "./parseContainerClass";
import { parseColumnsClass } from "./parseColumnsClass";
import { parseTouchClass } from "./parseTouchClass";
import { parseContentClass } from "./parseContentClass";
import { parseArbitraryValue } from "./parseArbitraryValues";

type modifier = 
| "className"
| "hover"
| "focus"
| "focusWithin"
| "active"
| "disabled"
| "firstChild"
| "lastChild"
| "evenChild"
| "empty"
| "visited"
| "checked"
| "focusVisible"
| "invalid"
| "required"
| "valid"
| "default"
| "indeterminate"
| "placeholder"
| "selection"
| "firstOfType"
| "lastOfType"
| "only"
| "oddChild"
| "open"
| "target"
| "readOnly"
| "autofill"
| "optional"
| "outOfRange"
| "inRange"
| "onlyChild"
| "group"
| "peer"

interface  MediaQuery {
    'min-width'?: string
    'max-width'?: string
    'min-height'?: string
    'max-height'?: string
    [key: string]: string | boolean | undefined
  }
  export interface StyleVariant {
    id?: string
    className?: string
    class?: string
    hover?: boolean
    focus?: boolean
    focusWithin?: boolean
    'focus-within'?: boolean
    'focus-visible'?: boolean
    focusVisible?: boolean
    checked?: boolean
    active?: boolean
    disabled?: boolean
    firstChild?: boolean
    'first-child'?: boolean
    lastChild?: boolean
    'last-child'?: boolean
    'first-of-type'?: boolean
    firstOfType?: boolean
    'last-of-type'?: boolean
    lastOfType?: boolean
    evenChild?: boolean
    'even-child'?: boolean
    oddChild?: boolean
    'odd-child'?: boolean
    visited?: boolean
    link?: boolean
    invalid?: boolean
    empty?: boolean
    'popover-open'?: boolean
    open?: boolean
    required?: boolean
    valid?: boolean
    default?: boolean
    indeterminate?: boolean
    placeholder?: boolean
    selection?: boolean
    only?: boolean
    target?: boolean
    readOnly?: boolean
    'read-only'?: boolean
    autofill?: boolean
    optional?: boolean
    outOfRange?: boolean
    'out-of-range'?: boolean
    inRange?: boolean
    'in-range'?: boolean
    onlyChild?: boolean
    'only-child'?: boolean
    mediaQuery?: MediaQuery
    darkMode?: boolean
    breakpoint: 'small' | 'medium' | 'large'
    pseudoElement?: string
    style: CSSProperties
    group?: boolean
    peer?: boolean
  }

const TAILWIND_MODIFIERS = new Set<modifier>([
    "className",
    "hover",
    "focus",
    "focusWithin",
    "active",
    "disabled",
    "firstChild",
    "lastChild",
    "evenChild",
    "empty",
    "visited",
    "checked",
    "focusVisible",
    "invalid",
    "required",
    "valid",
    "default",
    "indeterminate",
    "placeholder",
    "selection",
    "firstOfType",
    "lastOfType",
    "only",
    "oddChild",
    "open",
    "target",
    "readOnly",
    "autofill",
    "optional",
    "outOfRange",
    "inRange",
    "onlyChild",
    "group",
    "peer"
  ]);
  
  const TAILWIND_PSEUDO_ELEMENT = new Set([
    "after", 
    "before", 
    "placeholder", 
    "marker", 
    "selection", 
    "first-line", 
    "first-letter", 
    "file", 
    "backdrop"
  ]);

  // Add constants for dark mode and media query modifiers
  const TAILWIND_MEDIA_MODIFIERS = new Set([
    "dark",
    "print",
    "screen",
    "portrait",
    "landscape"
  ]);

  const TAILWIND_DARK_MODE_MODIFIER = new Set(["dark"]);

  // Pattern for standalone group and peer classes
  const GROUP_PEER_STANDALONE = /^(group|peer)$/;
  
  // Pattern for combined group/peer modifiers
  const GROUP_PEER_MODIFIER = /^(group|peer)-([a-zA-Z0-9-]+)$/;

  export const defaultStyles =  {
    "flex-direction": "row",
    display: "block",
    "border-style": "solid",
    "border-width": "0",
  };
  
  export function parseClassString(className: string):{style:Record<string, string>, variants:StyleVariant[]} {
    let style = defaultStyles;
    let variantMap:Record<string, StyleVariant> = {};
    if (className.trim() === "") {
      return { style, variants: [] };
    }
    const classes = className.split(" ").filter((a) => a !== "");
    for (let cls of classes) {
      // Handle standalone group/peer classes
      if (GROUP_PEER_STANDALONE.test(cls)) {
        const type = cls as 'group' | 'peer';
        const key = cls;
        variantMap[key] = variantMap[key] ?? {
          style: {},
        };
        variantMap[key][type] = true;
        continue;
      }
      
      const parts = cls.split(":");
      if (parts.length === 1) {
        style = {
          ...style,
          ...parseClass(parts[0]),
        };
        continue;
      }
      const modifiers = parts.slice(0, parts.length - 1);
      const key = modifiers.join(":");
      variantMap[key] = variantMap[key] ?? {
        style: {},
      };
      let variant = variantMap[key];
      variant.style = {
        ...variant.style,
        ...parseClass(parts[parts.length - 1]),
      };
      for (let modifier of modifiers) {
        if (TAILWIND_MODIFIERS.has(modifier as modifier)) {
          (variant[modifier as modifier] as any) = true;
          continue;
        }
        if (TAILWIND_PSEUDO_ELEMENT.has(modifier)) {
          variant.pseudoElement = modifier;
          continue;
        }
        if (TAILWIND_MEDIA_MODIFIERS.has(modifier)) {
          variant.mediaQuery = variant.mediaQuery || {};
          variant.mediaQuery[modifier] = true;
          continue;
        }
        
        // Handle group-* and peer-* modifiers
        const groupPeerModifierMatch = GROUP_PEER_MODIFIER.exec(modifier);
        if (groupPeerModifierMatch) {
          const [, groupPeer, state] = groupPeerModifierMatch;
          variant[groupPeer as 'group' | 'peer'] = true;
          
          // Map common modifier states to their correct property
          if (state === 'hover') variant.hover = true;
          else if (state === 'focus') variant.focus = true;
          else if (state === 'active') variant.active = true;
          else if (state === 'focus-within' || state === 'focusWithin') {
            variant.focusWithin = true;
          }
          else if (state === 'focus-visible' || state === 'focusVisible') {
            variant.focusVisible = true;
          }
          else if (state === 'disabled') variant.disabled = true;
          else if (state === 'checked') variant.checked = true;
          else if (state === 'required') variant.required = true;
          else if (state === 'valid') variant.valid = true;
          else if (state === 'invalid') variant.invalid = true;
          
          continue;
        }
        
        const breakpoint = parseTailwindBreakpoint(modifier);
        if (breakpoint) {
            variant.mediaQuery = variant.mediaQuery || {};
            variant.mediaQuery[breakpoint.type] = breakpoint.value;
            continue;
        }
        
        // Convert dark mode to media query
        if (TAILWIND_DARK_MODE_MODIFIER.has(modifier)) {
          variant.mediaQuery = variant.mediaQuery || {};
          variant.mediaQuery['dark'] = true;
          continue;
        }
      }
    }
    const result = { style, variants: Object.values(variantMap) };
    return result;
  }
  
  // Background colors
  export const colorMap:ColorMap = {
    transparent: "transparent",
    current: "currentColor",
    black: "#000",
    white: "#fff",
    slate: {
      "50": "#f8fafc",
      "100": "#f1f5f9",
      "200": "#e2e8f0",
      "300": "#cbd5e0",
      "400": "#94a3b8",
      "500": "#64748b",
      "600": "#475569",
      "700": "#334155",
      "800": "#1e293b",
      "900": "#0f172a",
      "950": "#020617",
    },
    gray: {
      "50": "#F9FAFB",
      "100": "#f7fafc",
      "200": "#edf2f7",
      "300": "#e2e8f0",
      "400": "#cbd5e0",
      "500": "#a0aec0",
      "600": "#718096",
      "700": "#4a5568",
      "800": "#2d3748",
      "900": "#1a202c",
      "950": "#030712",
    },
    zinc: {
      "50": "#fafafa",
      "100": "#f4f4f5",
      "200": "#e4e4e7",
      "300": "#d4d4d8",
      "400": "#a1a1aa",
      "500": "#71717a",
      "600": "#52525b",
      "700": "#3f3f46",
      "800": "#27272a",
      "900": "#18181b",
      "950": "#09090b",
    },
    neutral: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#e5e5e5",
      "300": "#d4d4d4",
      "400": "#a3a3a3",
      "500": "#737373",
      "600": "#525252",
      "700": "#404040",
      "800": "#262626",
      "900": "#171717",
      "950": "#0a0a0a",
    },
    stone: {
      "50": "#fafaf9",
      "100": "#f5f5f4",
      "200": "#e7e5e4",
      "300": "#d6d3d1",
      "400": "#a8a29e",
      "500": "#78716c",
      "600": "#57534e",
      "700": "#44403c",
      "800": "#292524",
      "900": "#1c1917",
      "950": "#0c0a09",
    },
    red: {
      "50": "#FEF2F2",
      "100": "#fff5f5",
      "200": "#fed7d7",
      "300": "#feb2b2",
      "400": "#fc8181",
      "500": "#f56565",
      "600": "#e53e3e",
      "700": "#c53030",
      "800": "#9b2c2c",
      "900": "#742a2a",
      "950": "#450a0a",
    },
    orange: {
      "50": "#fff7ed",
      "100": "#fffaf0",
      "200": "#feebc8",
      "300": "#fbd38d",
      "400": "#f6ad55",
      "500": "#ed8936",
      "600": "#dd6b20",
      "700": "#c05621",
      "800": "#9c4221",
      "900": "#7b341e",
      "950": "#431407",
    },
    amber: {
      "50": "#fffbeb",
      "100": "#fef3c7",
      "200": "#fde68a",
      "300": "#fcd34d",
      "400": "#fbbf24",
      "500": "#f59e0b",
      "600": "#d97706",
      "700": "#b45309",
      "800": "#92400e",
      "900": "#78350f",
      "950": "#451a03",
    },
    yellow: {
      "50": "#FFFBEB",
      "100": "#fffff0",
      "200": "#fefcbf",
      "300": "#faf089",
      "400": "#f6e05e",
      "500": "#ecc94b",
      "600": "#d69e2e",
      "700": "#b7791f",
      "800": "#975a16",
      "900": "#744210",
      "950": "#422006",
    },
    lime: {
      "50": "#f7fee7",
      "100": "#ecfccb",
      "200": "#d9f99d",
      "300": "#bef264",
      "400": "#a3e635",
      "500": "#84cc16",
      "600": "#65a30d",
      "700": "#4d7c0f",
      "800": "#3f6212",
      "900": "#365314",
      "950": "#1a2e05",
    },
    green: {
      "50": "#F0FDF4",
      "100": "#f0fff4",
      "200": "#c6f6d5",
      "300": "#9ae6b4",
      "400": "#68d391",
      "500": "#48bb78",
      "600": "#38a169",
      "700": "#2f855a",
      "800": "#276749",
      "900": "#22543d",
      "950": "#052e16",
    },
    emerald: {
      "50": "#ecfdf5",
      "100": "#d1fae5",
      "200": "#a7f3d0",
      "300": "#6ee7b7",
      "400": "#34d399",
      "500": "#10b981",
      "600": "#059669",
      "700": "#047857",
      "800": "#065f46",
      "900": "#064e3b",
      "950": "#022c22",
    },
    teal: {
      "50": "#f0fdfa",
      "100": "#e6fffa",
      "200": "#b2f5ea",
      "300": "#81e6d9",
      "400": "#4fd1c5",
      "500": "#38b2ac",
      "600": "#319795",
      "700": "#2c7a7b",
      "800": "#285e61",
      "900": "#234e52",
      "950": "#042f2e",
    },
    cyan: {
      "50": "#ecfeff",
      "100": "#cffafe",
      "200": "#a5f3fc",
      "300": "#67e8f9",
      "400": "#22d3ee",
      "500": "#06b6d4",
      "600": "#0891b2",
      "700": "#0e7490",
      "800": "#155e75",
      "900": "#164e63",
      "950": "#083344",
    },
    sky: {
      "50": "#f0f9ff",
      "100": "#e0f2fe",
      "200": "#bae6fd",
      "300": "#7dd3fc",
      "400": "#38bdf8",
      "500": "#0ea5e9",
      "600": "#0284c7",
      "700": "#0369a1",
      "800": "#075985",
      "900": "#0c4a6e",
      "950": "#082f49",
    },
    blue: {
      "50": "#EFF6FF",
      "100": "#ebf8ff",
      "200": "#bee3f8",
      "300": "#90cdf4",
      "400": "#63b3ed",
      "500": "#4299e1",
      "600": "#3182ce",
      "700": "#2b6cb0",
      "800": "#2c5282",
      "900": "#2a4365",
      "950": "#172554",
    },
    indigo: {
      "50": "#EEF2FF",
      "100": "#ebf4ff",
      "200": "#c3dafe",
      "300": "#a3bffa",
      "400": "#7f9cf5",
      "500": "#667eea",
      "600": "#5a67d8",
      "700": "#4c51bf",
      "800": "#434190",
      "900": "#3c366b",
      "950": "#1e1b4b",
    },
    violet: {
      "50": "#f5f3ff",
      "100": "#ede9fe",
      "200": "#ddd6fe",
      "300": "#c4b5fd",
      "400": "#a78bfa",
      "500": "#8b5cf6",
      "600": "#7c3aed",
      "700": "#6d28d9",
      "800": "#5b21b6",
      "900": "#4c1d95",
      "950": "#2e1065",
    },
    purple: {
      "50": "#F5F3FF",
      "100": "#faf5ff",
      "200": "#e9d8fd",
      "300": "#d6bcfa",
      "400": "#b794f4",
      "500": "#9f7aea",
      "600": "#805ad5",
      "700": "#6b46c1",
      "800": "#553c9a",
      "900": "#44337a",
      "950": "#3b0764",
    },
    fuchsia: {
      "50": "#fdf4ff",
      "100": "#fae8ff",
      "200": "#f5d0fe",
      "300": "#f0abfc",
      "400": "#e879f9",
      "500": "#d946ef",
      "600": "#c026d3",
      "700": "#a21caf",
      "800": "#86198f",
      "900": "#701a75",
      "950": "#4a044e",
    },
    pink: {
      "50": "#FDF2F8",
      "100": "#fff5f7",
      "200": "#fed7e2",
      "300": "#fbb6ce",
      "400": "#f687b3",
      "500": "#ed64a6",
      "600": "#d53f8c",
      "700": "#b83280",
      "800": "#97266d",
      "900": "#702459",
      "950": "#500724",
    },
    rose: {
      "50": "#fff1f2",
      "100": "#ffe4e6",
      "200": "#fecdd3",
      "300": "#fda4af",
      "400": "#fb7185",
      "500": "#f43f5e",
      "600": "#e11d48",
      "700": "#be123c",
      "800": "#9f1239",
      "900": "#881337",
      "950": "#4c0519",
    },
  };
  
  interface ColorMap {
    [color: string]: string | { [shade: string]: string };
  }
  
  export interface GridRegex {
    regex: RegExp;
    style: { [key: string]: string } | ((match: RegExpMatchArray) => { [key: string]: string });
  }
  
export interface MarginValues {
    [key: string]: string;
  }
  

  
  export interface TableClasses {
    [key: string]: { [key: string]: string };
  }
  
export type CSSProperties = {
    [key: string]: string | number | CSSProperties;
  };
  
  const parsers = [
    parseBackgroundClasses,
    parseBorderClasses,
    parseDisplayClasses,
    parseFlexClasses,
    parseGridClasses,
    parseSizeClasses,
    parseMarginClasses,
    parsePaddingClasses,
    parsePositioningClasses,
    parseListClasses,
    parseVisibilityClasses,
    parseRingClasses,
    parseOutlineClass,
    parseScrollClass,
    parseShadowClass,
    parseSvgClass,
    parseTailwindTableClass,
    parseTextClass,
    parseTransformClass,
    parseUtilClass,
    parseTransitionClass,
    parseAspectRatioClass,
    parseContainerClass,
    parseColumnsClass,
    parseTouchClass,
    parseContentClass,
    parseArbitraryValue,
  ];
  
  function parseClass(cls: string):CSSProperties {
    for (let parser of parsers) {
      let style = parser(cls);
      if (style) {
        return style;
      }
    }
    console.error("COULD NOT PARSE ", cls);
    return {};
  }
