import { buildSystemPrompt, type PromptLanguage } from '../../../data/wiki/aiPrompt';

export interface AIResponse {
    text: string;
    isRateLimited: boolean;
    isError: boolean;
    errorReason?: string;
    usedModel?: string;
}

type Language = PromptLanguage;

const LOCAL_GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();
const LOCAL_GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL?.trim() || 'gemini-2.0-flash';
const USE_LOCAL_GEMINI = import.meta.env.DEV && !!LOCAL_GEMINI_KEY && LOCAL_GEMINI_KEY !== 'your_api_key_here';

const extractErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    try {
        return JSON.stringify(error);
    } catch {
        return 'Unknown error';
    }
};

const callLocalGemini = async (
    query: string,
    language: Language
): Promise<AIResponse> => {
    if (!LOCAL_GEMINI_KEY) {
        return {
            text: '',
            isRateLimited: false,
            isError: true,
            errorReason: 'VITE_GEMINI_API_KEY is missing.',
        };
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(LOCAL_GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(LOCAL_GEMINI_KEY)}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: buildSystemPrompt(language, query) }],
                    },
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: query }],
                        },
                    ],
                    generationConfig: {
                        maxOutputTokens: 200,
                    },
                }),
            }
        );

        const payload = await response.json().catch(() => ({} as Record<string, unknown>));

        if (response.status === 429) {
            return {
                text: '',
                isRateLimited: true,
                isError: false,
                errorReason: typeof payload.error === 'string' ? payload.error : 'Gemini rate limit reached.',
                usedModel: LOCAL_GEMINI_MODEL,
            };
        }

        if (!response.ok) {
            return {
                text: '',
                isRateLimited: false,
                isError: true,
                errorReason: `Gemini request failed (${response.status}).`,
                usedModel: LOCAL_GEMINI_MODEL,
            };
        }

        const text =
            typeof (payload as {
                candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
            }).candidates?.[0]?.content?.parts?.[0]?.text === 'string'
                ? ((payload as {
                    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
                }).candidates?.[0]?.content?.parts?.[0]?.text ?? '').trim()
                : '';

        if (!text) {
            return {
                text: '',
                isRateLimited: false,
                isError: true,
                errorReason: 'Gemini returned an empty response.',
                usedModel: LOCAL_GEMINI_MODEL,
            };
        }

        return {
            text,
            isRateLimited: false,
            isError: false,
            usedModel: LOCAL_GEMINI_MODEL,
        };
    } catch (error: unknown) {
        const reason = extractErrorMessage(error);
        return {
            text: '',
            isRateLimited: false,
            isError: true,
            errorReason: `Gemini request failed: ${reason}`,
            usedModel: LOCAL_GEMINI_MODEL,
        };
    }
};

export const askAI = async (
    query: string,
    language: Language
): Promise<AIResponse> => {
    if (USE_LOCAL_GEMINI) {
        return callLocalGemini(query, language);
    }

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, language }),
        });

        const data = await response.json().catch(() => ({} as Record<string, unknown>));

        if (response.status === 429) {
            return {
                text: '',
                isRateLimited: true,
                isError: false,
                errorReason: typeof data.error === 'string' ? data.error : 'Rate limited by AI provider.',
                usedModel: typeof data.model === 'string' ? data.model : undefined,
            };
        }

        if (!response.ok) {
            return {
                text: '',
                isRateLimited: false,
                isError: true,
                errorReason: typeof data.error === 'string'
                    ? data.error
                    : `AI request failed (${response.status}).`,
                usedModel: typeof data.model === 'string' ? data.model : undefined,
            };
        }

        const text = typeof data.text === 'string' ? data.text.trim() : '';
        if (!text) {
            return {
                text: '',
                isRateLimited: false,
                isError: true,
                errorReason: 'AI returned an empty response.',
                usedModel: typeof data.model === 'string' ? data.model : undefined,
            };
        }

        return {
            text,
            isRateLimited: false,
            isError: false,
            usedModel: typeof data.model === 'string' ? data.model : undefined,
        };
    } catch (error: unknown) {
        const reason = extractErrorMessage(error);
        return {
            text: '',
            isRateLimited: false,
            isError: true,
            errorReason: `AI endpoint unreachable: ${reason}`,
        };
    }
};
