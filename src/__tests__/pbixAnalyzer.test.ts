import { describe, it, expect } from 'vitest';
import {
    getErrorMessage,
    truncateText,
    collectPbixFiles,
    summarizeBatch,
    buildReportDescription,
    validateReportDescriptionOutput,
} from '../pbix/pbixAnalyzer.js';
import type { PbixAnalysisResult } from '../pbix/pbixAnalyzer.js';

describe('getErrorMessage', () => {
    it('extracts Error message', () => {
        expect(getErrorMessage(new Error('test'))).toBe('test');
    });

    it('converts non-Error to string', () => {
        expect(getErrorMessage(42)).toBe('42');
    });
});

describe('truncateText', () => {
    it('returns text unchanged when under limit', () => {
        expect(truncateText('short', 100)).toBe('short');
    });

    it('truncates text over limit', () => {
        const long = 'a'.repeat(200);
        const result = truncateText(long, 50);
        expect(result.length).toBeLessThan(200);
        expect(result).toContain('truncated');
        expect(result).toContain('150 chars omitted');
    });
});

describe('collectPbixFiles', () => {
    it('returns empty when no input provided', () => {
        const result = collectPbixFiles(undefined, undefined, true, 50);
        expect(result.files).toHaveLength(0);
    });

    it('adds warning for non-existing file paths', () => {
        const result = collectPbixFiles(['/nonexistent/path.pbix'], undefined, true, 50);
        expect(result.files).toHaveLength(0);
        expect(result.warnings).toHaveLength(1);
        expect(result.warnings[0]).toContain('Path not found');
    });

    it('adds warning for non-existing directory', () => {
        const result = collectPbixFiles(undefined, '/nonexistent/dir', true, 50);
        expect(result.files).toHaveLength(0);
        expect(result.warnings).toHaveLength(1);
        expect(result.warnings[0]).toContain('Directory not found');
    });
});

describe('summarizeBatch', () => {
    it('summarizes empty results', () => {
        const summary = summarizeBatch([]);
        expect(summary.fileCount).toBe(0);
        expect(summary.successCount).toBe(0);
        expect(summary.failedCount).toBe(0);
    });

    it('counts successful and failed results', () => {
        const results: PbixAnalysisResult[] = [
            {
                filePath: '/test/a.pbix',
                fileName: 'a.pbix',
                sizeMB: 5,
                pageCount: 3,
                visualCount: 10,
                dataSources: [{ kind: 'SQL', name: 'db' }],
                tableCount: 5,
                measureCount: 2,
            },
            {
                filePath: '/test/b.pbix',
                fileName: 'b.pbix',
                error: 'parse error',
            },
        ];
        const summary = summarizeBatch(results);
        expect(summary.fileCount).toBe(2);
        expect(summary.successCount).toBe(1);
        expect(summary.failedCount).toBe(1);
        expect(summary.totalPages).toBe(3);
        expect(summary.totalVisuals).toBe(10);
        expect(summary.totalDataSources).toBe(1);
        expect(summary.totalTables).toBe(5);
        expect(summary.totalMeasures).toBe(2);
    });
});

describe('validateReportDescriptionOutput', () => {
    const sampleAnalysis: PbixAnalysisResult = {
        filePath: '/tmp/test.pbix',
        fileName: 'test.pbix',
        measureNames: ['metric_a', 'metric_b'],
    };

    it('passes for generated report description', () => {
        const description = buildReportDescription(sampleAnalysis);
        const validation = validateReportDescriptionOutput(description, sampleAnalysis);

        expect(validation.isValid).toBe(true);
        expect(validation.issues).toHaveLength(0);
        expect(validation.passed).toBe(validation.checks);
    });

    it('fails when required sections are missing', () => {
        const validation = validateReportDescriptionOutput('invalid output', sampleAnalysis);

        expect(validation.isValid).toBe(false);
        expect(validation.issues.length).toBeGreaterThan(0);
    });
});
