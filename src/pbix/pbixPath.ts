import { existsSync } from 'fs';
import { isAbsolute, join, resolve } from 'path';

function looksLikeWindowsAbsolutePath(input: string): boolean {
    return /^[A-Za-z]:[\\/]/.test(input) || input.startsWith('\\\\');
}

export function getPbixRoot(): string | null {
    const envRoot = (process.env.POWERBI_PBIX_ROOT || '').trim();
    if (envRoot) {
        return envRoot;
    }

    return null;
}

export function resolvePbixPath(inputPath: string): string {
    const trimmed = inputPath.trim();
    if (!trimmed) {
        return trimmed;
    }

    if (isAbsolute(trimmed) || looksLikeWindowsAbsolutePath(trimmed)) {
        return resolve(trimmed);
    }

    const root = getPbixRoot();
    if (root) {
        return resolve(join(root, trimmed));
    }

    return resolve(trimmed);
}
