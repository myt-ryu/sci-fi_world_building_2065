import { GoogleGenerativeAI } from '@google/generative-ai';
import { allWikiArticles } from '../../../data/wiki';
import { realWorldContext } from '../../../data/wiki/real_world';

// サイトのwikiデータをテキストとして整形
const buildWorldContext = (language: 'ja' | 'en'): string => {
    const articles = allWikiArticles.map((article) => {
        const title = language === 'ja' ? article.title.ja : article.title.en;
        const content = language === 'ja' ? article.content.ja : article.content.en;
        return `【${title}】\n${content}`;
    });

    // 現実世界のコンテキストを追加
    const history = language === 'ja' ? realWorldContext.ja : realWorldContext.en;
    articles.push(history);

    return articles.join('\n\n---\n\n');
};

const buildSystemPrompt = (language: 'ja' | 'en'): string => {
    const worldContext = buildWorldContext(language);

    if (language === 'ja') {
        return `あなたは2065年の世界を案内するAIガイドです。
以下の世界観データベースをもとに、訪問者の質問に答えてください。

【ルール】
- 必ず日本語で回答してください
- 2065年の世界の住人として、自然な口調で話してください
- データベースに記載のない情報については「その情報は記録にありません」と答えてください
- ただし、2020年代〜2050年の技術史（ムーンショット計画など）については「歴史的事実」として回答可能です
- 回答は簡潔に、200文字以内を目安にしてください

【2065年の世界データベース】
${worldContext}`;
    } else {
        return `You are an AI guide for the world of 2065.
Answer visitors' questions based on the following world database.

【Rules】
- Always respond in English
- Speak naturally as an inhabitant of the world of 2065
- If information is not in the database, say "That information is not in our records"
- However, you can answer questions about technological history (2020s-2050s, Moonshot goals, etc.) as "historical facts"
- Keep responses concise, around 200 characters

【World Database of 2065】
${worldContext}`;
    }
};

export interface GeminiResponse {
    text: string;
    isRateLimited: boolean;
    isError: boolean;
    errorReason?: string;
    usedModel?: string;
}

const DEFAULT_MODEL_CANDIDATES = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
];

const extractErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    try {
        return JSON.stringify(error);
    } catch {
        return 'Unknown error';
    }
};

export const askGemini = async (
    query: string,
    language: 'ja' | 'en'
): Promise<GeminiResponse> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
    const modelFromEnv = import.meta.env.VITE_GEMINI_MODEL?.trim();

    if (!apiKey || apiKey === 'your_api_key_here') {
        return {
            text: '',
            isRateLimited: false,
            isError: true,
            errorReason: 'VITE_GEMINI_API_KEY is missing or invalid.',
        };
    }

    const modelCandidates = modelFromEnv
        ? [modelFromEnv, ...DEFAULT_MODEL_CANDIDATES.filter((m) => m !== modelFromEnv)]
        : DEFAULT_MODEL_CANDIDATES;

    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError = '';

    for (const modelName of modelCandidates) {
        try {
            const model = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction: buildSystemPrompt(language),
            });

            const result = await model.generateContent(query);
            const text = result.response.text().trim();

            if (!text) {
                lastError = `Empty response from model: ${modelName}`;
                continue;
            }

            return {
                text,
                isRateLimited: false,
                isError: false,
                usedModel: modelName,
            };
        } catch (error: unknown) {
            const message = extractErrorMessage(error);

            // 429: レート制限（無料枠上限）
            if (message.includes('429')) {
                return {
                    text: '',
                    isRateLimited: true,
                    isError: false,
                    errorReason: message,
                    usedModel: modelName,
                };
            }

            // 認証/権限系はモデルを変えても解決しないので即返却
            if (message.includes('401') || message.includes('403') || message.toLowerCase().includes('api key')) {
                return {
                    text: '',
                    isRateLimited: false,
                    isError: true,
                    errorReason: message,
                    usedModel: modelName,
                };
            }

            lastError = `${modelName}: ${message}`;
        }
    }

    console.error('Gemini API error:', lastError);
    return {
        text: '',
        isRateLimited: false,
        isError: true,
        errorReason: lastError || 'All Gemini model attempts failed.',
    };
};
