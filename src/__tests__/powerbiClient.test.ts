import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PowerBIClient } from '../api/powerbiClient.js';
import type { MsalAuth } from '../auth/msalAuth.js';

function createMockAuth(): MsalAuth {
    return {
        getAccessToken: vi.fn().mockResolvedValue('mock-token-xyz'),
    } as unknown as MsalAuth;
}

describe('PowerBIClient', () => {
    let client: PowerBIClient;
    let mockAuth: MsalAuth;

    beforeEach(() => {
        mockAuth = createMockAuth();
        client = new PowerBIClient(mockAuth);
        vi.restoreAllMocks();
    });

    it('sends GET request with auth header', async () => {
        const mockResponse = {
            ok: true,
            status: 200,
            headers: new Headers({ 'content-type': 'application/json' }),
            json: vi.fn().mockResolvedValue({ value: [{ id: '1', name: 'ws1' }] }),
        };
        vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse as unknown as Response);

        const result = await client.get<{ value: { id: string; name: string }[] }>('/groups');
        expect(result.value).toHaveLength(1);
        expect(result.value[0].name).toBe('ws1');

        expect(globalThis.fetch).toHaveBeenCalledWith(
            'https://api.powerbi.com/v1.0/myorg/groups',
            expect.objectContaining({
                method: 'GET',
                headers: expect.objectContaining({
                    Authorization: 'Bearer mock-token-xyz',
                }),
            }),
        );
    });

    it('sends POST request with body', async () => {
        const mockResponse = {
            ok: true,
            status: 202,
            headers: new Headers({}),
        };
        vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse as unknown as Response);

        await client.post('/groups/my-ws/datasets/ds1/refreshes', { notifyOption: 'NoNotification' });

        expect(globalThis.fetch).toHaveBeenCalledWith(
            'https://api.powerbi.com/v1.0/myorg/groups/my-ws/datasets/ds1/refreshes',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ notifyOption: 'NoNotification' }),
            }),
        );
    });

    it('throws on non-ok response', async () => {
        const mockResponse = {
            ok: false,
            status: 404,
            statusText: 'Not Found',
            json: vi.fn().mockResolvedValue({ error: { code: 'NotFound', message: 'Resource not found' } }),
        };
        vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse as unknown as Response);

        await expect(client.get('/groups/nonexistent')).rejects.toThrow('Power BI API error 404');
    });

    it('handles 204 No Content response', async () => {
        const mockResponse = {
            ok: true,
            status: 204,
            headers: new Headers({}),
        };
        vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse as unknown as Response);

        const result = await client.delete('/groups/ws1/reports/r1');
        expect(result).toEqual({});
    });

    it('passes full URL through without base', async () => {
        const mockResponse = {
            ok: true,
            status: 200,
            headers: new Headers({ 'content-type': 'application/json' }),
            json: vi.fn().mockResolvedValue({ test: true }),
        };
        vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse as unknown as Response);

        await client.get('https://custom-api.example.com/data');

        expect(globalThis.fetch).toHaveBeenCalledWith(
            'https://custom-api.example.com/data',
            expect.anything(),
        );
    });
});
