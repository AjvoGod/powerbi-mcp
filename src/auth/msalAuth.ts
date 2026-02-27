import type { Configuration, AuthenticationResult } from '@azure/msal-node';
import { ConfidentialClientApplication } from '@azure/msal-node';

const POWERBI_SCOPE = 'https://analysis.windows.net/powerbi/api/.default';

export class MsalAuth {
    private app: ConfidentialClientApplication;
    private cachedToken: AuthenticationResult | null = null;

    constructor(tenantId: string, clientId: string, clientSecret: string) {
        const config: Configuration = {
            auth: {
                clientId,
                clientSecret,
                authority: `https://login.microsoftonline.com/${tenantId}`,
            },
        };
        this.app = new ConfidentialClientApplication(config);
    }

    async getAccessToken(): Promise<string> {
        // Return cached token if still valid (with 5-minute buffer)
        if (this.cachedToken && this.cachedToken.expiresOn) {
            const bufferMs = 5 * 60 * 1000;
            if (this.cachedToken.expiresOn.getTime() - Date.now() > bufferMs) {
                return this.cachedToken.accessToken;
            }
        }

        try {
            this.cachedToken = await this.app.acquireTokenByClientCredential({
                scopes: [POWERBI_SCOPE],
            });

            if (!this.cachedToken || !this.cachedToken.accessToken) {
                throw new Error('Failed to acquire access token — no token returned');
            }

            return this.cachedToken.accessToken;
        } catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            throw new Error(`MSAL authentication failed: ${msg}`);
        }
    }
}
