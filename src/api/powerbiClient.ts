import { MsalAuth } from '../auth/msalAuth.js';
import { logger } from '../logger.js';

const BASE_URL = 'https://api.powerbi.com/v1.0/myorg';

export class PowerBIClient {
    private auth: MsalAuth;

    constructor(auth: MsalAuth) {
        this.auth = auth;
    }

    private async request<T>(
        method: string,
        path: string,
        body?: unknown,
        additionalHeaders?: Record<string, string>,
    ): Promise<T> {
        const token = await this.auth.getAccessToken();
        const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;

        logger.debug('PowerBIClient', `${method} ${url}`);

        const headers: Record<string, string> = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...additionalHeaders,
        };

        const options: RequestInit = { method, headers };
        if (body) {
            options.body = JSON.stringify(body);
        }

        const startTime = Date.now();
        const response = await fetch(url, options);
        const elapsed = Date.now() - startTime;

        logger.debug('PowerBIClient', `${method} ${url} → ${response.status} (${elapsed}ms)`);

        if (!response.ok) {
            let errorDetail = '';
            try {
                const errorBody = await response.json();
                errorDetail = JSON.stringify(errorBody, null, 2);
            } catch {
                errorDetail = await response.text();
            }
            logger.error('PowerBIClient', `API error ${response.status}: ${errorDetail}`);
            throw new Error(
                `Power BI API error ${response.status} ${response.statusText}: ${errorDetail}`,
            );
        }

        // Some endpoints return 202 (accepted) with no body
        if (response.status === 202 || response.status === 204) {
            return {} as T;
        }

        // Check if response has content
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
            return (await response.json()) as T;
        }

        // Binary response (e.g., export file)
        return (await response.arrayBuffer()) as unknown as T;
    }

    async get<T>(path: string): Promise<T> {
        return this.request<T>('GET', path);
    }

    async post<T>(path: string, body?: unknown): Promise<T> {
        return this.request<T>('POST', path, body);
    }

    async patch<T>(path: string, body: unknown): Promise<T> {
        return this.request<T>('PATCH', path, body);
    }

    async delete<T>(path: string): Promise<T> {
        return this.request<T>('DELETE', path);
    }

    async getFile(path: string): Promise<ArrayBuffer> {
        const token = await this.auth.getAccessToken();
        const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;

        logger.debug('PowerBIClient', `GET (file) ${url}`);

        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            logger.error('PowerBIClient', `File download error ${response.status}: ${response.statusText}`);
            throw new Error(
                `Power BI API error ${response.status}: ${response.statusText}`,
            );
        }

        return response.arrayBuffer();
    }
}
