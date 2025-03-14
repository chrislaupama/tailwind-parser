export function parseShadowClass(className: string): { "box-shadow": string; } | null {
    const shadowMap: Record<string, string> = {
        "shadow-xs": "0 0 0 1px rgba(0, 0, 0, 0.05)",
        "shadow-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "shadow-md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "shadow-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "shadow-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "shadow-2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "shadow-inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        "shadow-outline": "0 0 0 3px rgba(66, 153, 225, 0.5)",
        "shadow-none": "none",
    };

    const regex = /^shadow(-xs|-sm|-md|-lg|-xl|-2xl|-inner|-outline|-none)?$/;
    const match = className.match(regex);

    if (match) {
        const shadowValue = shadowMap[className];
        return shadowValue ? { "box-shadow": shadowValue } : null;
    }

    return null;
}
