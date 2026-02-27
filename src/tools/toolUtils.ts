export interface ToolResult {
    [x: string]: unknown;
    content: Array<{ type: 'text'; text: string }>;
    isError?: boolean;
}

/**
 * Extract a human-readable error message from an unknown error value.
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}

/**
 * Wrap a tool handler to catch errors and return a consistent MCP error response.
 * Eliminates try/catch boilerplate from every tool registration.
 */
export function safeTool<T>(
    fn: (args: T) => Promise<ToolResult>,
): (args: T) => Promise<ToolResult> {
    return async (args: T): Promise<ToolResult> => {
        try {
            return await fn(args);
        } catch (error) {
            return {
                content: [{ type: 'text' as const, text: `Error: ${getErrorMessage(error)}` }],
                isError: true,
            };
        }
    };
}

/**
 * Helper: create a text-only MCP tool result.
 */
export function textResult(text: string): ToolResult {
    return { content: [{ type: 'text' as const, text }] };
}
