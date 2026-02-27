import { describe, it, expect } from 'vitest';
import { safeTool, textResult, getErrorMessage } from '../tools/toolUtils.js';

describe('getErrorMessage', () => {
    it('extracts message from Error instances', () => {
        expect(getErrorMessage(new Error('test error'))).toBe('test error');
    });

    it('converts strings to string', () => {
        expect(getErrorMessage('raw string')).toBe('raw string');
    });

    it('converts numbers to string', () => {
        expect(getErrorMessage(42)).toBe('42');
    });

    it('converts null to string', () => {
        expect(getErrorMessage(null)).toBe('null');
    });

    it('converts undefined to string', () => {
        expect(getErrorMessage(undefined)).toBe('undefined');
    });
});

describe('textResult', () => {
    it('creates a valid MCP text result', () => {
        const result = textResult('hello world');
        expect(result).toEqual({
            content: [{ type: 'text', text: 'hello world' }],
        });
    });

    it('preserves multiline text', () => {
        const result = textResult('line1\nline2\nline3');
        expect(result.content[0].text).toBe('line1\nline2\nline3');
    });
});

describe('safeTool', () => {
    it('passes through successful result', async () => {
        const handler = safeTool(async () => textResult('ok'));
        const result = await handler({});
        expect(result).toEqual({
            content: [{ type: 'text', text: 'ok' }],
        });
    });

    it('catches errors and returns error result', async () => {
        const handler = safeTool(async () => {
            throw new Error('boom');
        });
        const result = await handler({});
        expect(result.isError).toBe(true);
        expect(result.content[0].text).toBe('Error: boom');
    });

    it('handles non-Error throws', async () => {
        const handler = safeTool(async () => {
            throw 'string error';
        });
        const result = await handler({});
        expect(result.isError).toBe(true);
        expect(result.content[0].text).toBe('Error: string error');
    });

    it('passes args through to handler', async () => {
        const handler = safeTool(async (args: { name: string }) =>
            textResult(`hello ${args.name}`),
        );
        const result = await handler({ name: 'world' });
        expect(result.content[0].text).toBe('hello world');
    });
});
