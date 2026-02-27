import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resolvePbixPath, getPbixRoot } from '../pbix/pbixPath.js';

describe('getPbixRoot', () => {
    beforeEach(() => {
        delete process.env.POWERBI_PBIX_ROOT;
    });

    it('returns null when POWERBI_PBIX_ROOT is not set', () => {
        expect(getPbixRoot()).toBeNull();
    });

    it('returns env value when POWERBI_PBIX_ROOT is set', () => {
        process.env.POWERBI_PBIX_ROOT = '/test/pbix/root';
        expect(getPbixRoot()).toBe('/test/pbix/root');
    });

    it('trims whitespace from env value', () => {
        process.env.POWERBI_PBIX_ROOT = '  /test/pbix/root  ';
        expect(getPbixRoot()).toBe('/test/pbix/root');
    });

    it('returns null for empty string env value', () => {
        process.env.POWERBI_PBIX_ROOT = '';
        expect(getPbixRoot()).toBeNull();
    });

    it('returns null for whitespace-only env value', () => {
        process.env.POWERBI_PBIX_ROOT = '   ';
        expect(getPbixRoot()).toBeNull();
    });
});

describe('resolvePbixPath', () => {
    beforeEach(() => {
        delete process.env.POWERBI_PBIX_ROOT;
    });

    it('returns absolute path unchanged', () => {
        const result = resolvePbixPath('/absolute/path/test.pbix');
        expect(result).toBe('/absolute/path/test.pbix');
    });

    it('resolves relative path against PBIX root when set', () => {
        process.env.POWERBI_PBIX_ROOT = '/my/root';
        const result = resolvePbixPath('reports/test.pbix');
        expect(result).toBe('/my/root/reports/test.pbix');
    });

    it('resolves Windows-style path (platform-dependent)', () => {
        const result = resolvePbixPath('C:\\Users\\test\\report.pbix');
        // On macOS, the path won't be detected as absolute, so it gets resolved relative to cwd
        // On Windows, it would be treated as absolute and returned as-is
        if (process.platform === 'win32') {
            expect(result).toBe('C:\\Users\\test\\report.pbix');
        } else {
            expect(result).toContain('report.pbix');
        }
    });

    it('resolves UNC path (platform-dependent)', () => {
        const result = resolvePbixPath('\\\\server\\share\\report.pbix');
        if (process.platform === 'win32') {
            expect(result).toBe('\\\\server\\share\\report.pbix');
        } else {
            expect(result).toContain('report.pbix');
        }
    });
});
