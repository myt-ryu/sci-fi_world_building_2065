import { buildSystemPrompt, type PromptLanguage } from '../src/data/wiki/aiPrompt';

const DEFAULT_OPENAI_MODEL = 'gpt-4.1-mini';

const jsonResponse = (status: number, payload: Record<string, unknown>) =>
    new Response(JSON.stringify(payload), {
        status,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
        },
    });

const truncate = (value: string, max = 300): string =>
    value.length <= max ? value : `${value.slice(0, max - 3)}...`;

const extractOpenAIText = (payload: unknown): string => {
    if (!payload || typeof payload !== 'object') return '';

    const data = payload as {
        output_text?: unknown;
        output?: Array<{ content?: Array<{ type?: unknown; text?: unknown }> }>;
    };

    if (typeof data.output_text === 'string' && data.output_text.trim()) {
        return data.output_text.trim();
    }

    if (!Array.isArray(data.output)) {
        return '';
    }

    for (const item of data.output) {
        if (!Array.isArray(item.content)) continue;
        for (const chunk of item.content) {
            if (
                (chunk.type === 'output_text' || chunk.type === 'text') &&
                typeof chunk.text === 'string' &&
                chunk.text.trim()
            ) {
                return chunk.text.trim();
            }
        }
    }

    return '';
};

export default async function handler(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
        return jsonResponse(405, { error: 'Method Not Allowed' });
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return jsonResponse(400, { error: 'Invalid JSON body.' });
    }

    const payload = body as { query?: unknown; language?: unknown };
    const query = typeof payload.query === 'string' ? payload.query.trim() : '';
    const language: PromptLanguage = payload.language === 'en' ? 'en' : 'ja';

    if (!query) {
        return jsonResponse(400, { error: 'Query is required.' });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    const model = process.env.OPENAI_MODEL?.trim() || DEFAULT_OPENAI_MODEL;

    if (!apiKey) {
        return jsonResponse(500, { error: 'OPENAI_API_KEY is not configured on server.' });
    }

    const systemPrompt = buildSystemPrompt(language, query);

    let upstream: Response;
    try {
        upstream = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model,
                input: [
                    {
                        role: 'system',
                        content: [{ type: 'input_text', text: systemPrompt }],
                    },
                    {
                        role: 'user',
                        content: [{ type: 'input_text', text: query }],
                    },
                ],
                max_output_tokens: 320,
            }),
        });
    } catch (error: unknown) {
        const reason = error instanceof Error ? error.message : 'Unknown network error';
        return jsonResponse(502, { error: `Failed to reach AI provider: ${reason}` });
    }

    if (upstream.status === 429) {
        return jsonResponse(429, { error: 'AI provider rate limit reached.', model });
    }

    const raw = await upstream.text();
    let upstreamPayload: unknown = null;
    try {
        upstreamPayload = raw ? JSON.parse(raw) : null;
    } catch {
        upstreamPayload = null;
    }

    if (!upstream.ok) {
        return jsonResponse(502, {
            error: `AI provider error (${upstream.status}).`,
            detail: truncate(raw || 'No response body'),
            model,
        });
    }

    const text = extractOpenAIText(upstreamPayload);
    if (!text) {
        return jsonResponse(502, {
            error: 'AI returned an empty response.',
            model,
        });
    }

    return jsonResponse(200, {
        text,
        model,
    });
}
