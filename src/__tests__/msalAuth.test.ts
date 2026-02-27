import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MsalAuth } from '../auth/msalAuth.js';

const mockAcquire = vi.fn();

vi.mock('@azure/msal-node', () => ({
    ConfidentialClientApplication: class {
        acquireTokenByClientCredential = mockAcquire;
    },
}));

describe('MsalAuth', () => {
    let auth: MsalAuth;

    beforeEach(() => {
        mockAcquire.mockReset();
        auth = new MsalAuth('tenant-id', 'client-id', 'client-secret');
    });

    it('acquires token and returns access token', async () => {
        mockAcquire.mockResolvedValueOnce({ accessToken: 'test-token-123' });
        const token = await auth.getAccessToken();
        expect(token).toBe('test-token-123');
    });

    it('throws when token acquisition fails', async () => {
        mockAcquire.mockResolvedValueOnce(null);
        await expect(auth.getAccessToken()).rejects.toThrow('Failed to acquire access token');
    });

    it('calls acquireTokenByClientCredential with correct scopes', async () => {
        mockAcquire.mockResolvedValueOnce({ accessToken: 'test-token' });
        await auth.getAccessToken();
        expect(mockAcquire).toHaveBeenCalledWith({
            scopes: ['https://analysis.windows.net/powerbi/api/.default'],
        });
    });
});
