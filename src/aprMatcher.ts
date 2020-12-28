export function match(raw: string): string[] | null {
    const regexForTarget: RegExp = /[0-9]*\.[0-9]*%/gi;
    if (!raw) return null;
    const matched = [...raw.matchAll(regexForTarget)];
    return matched && matched.length > 0 ? matched.map(item => String(item.pop())) : null;
}

