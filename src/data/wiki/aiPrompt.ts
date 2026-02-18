import { allWikiArticles } from './index';
import { realWorldContext } from './real_world';

export type PromptLanguage = 'ja' | 'en';

interface PromptBuildOptions {
    maxChunks?: number;
    maxChunksPerArticle?: number;
    chunkCharLimit?: number;
}

interface ContextChunk {
    articleId: string;
    title: string;
    heading: string;
    text: string;
    searchable: string;
    headingSearchable: string;
    titleSearchable: string;
}

const sectionTitlePattern = /^\d+\.\s*.+/;
const topicPattern = /^【.+】$/;
const markerPattern = /^■.+/;

const defaultOptions: Required<PromptBuildOptions> = {
    maxChunks: 8,
    maxChunksPerArticle: 2,
    chunkCharLimit: 650,
};

const contextChunkCache: Partial<Record<PromptLanguage, ContextChunk[]>> = {};

const normalizeSearchText = (value: string): string =>
    value
        .normalize('NFKC')
        .toLowerCase()
        .replace(/[【】■]/g, '')
        .replace(/[、。,.!?:;！？：；()（）「」『』［］\[\]{}<>＜＞"'`´・\-]/g, '')
        .replace(/\s+/g, '');

const buildSearchTerms = (query: string): string[] => {
    const terms = new Set<string>();
    const normalized = normalizeSearchText(query);

    if (normalized.length >= 2) {
        terms.add(normalized);
    }

    const splitTerms = query
        .normalize('NFKC')
        .toLowerCase()
        .split(/[\s、。,.!?:;！？：；/／()（）「」『』【】\[\]{}<>＜＞"'`´・\-]+/)
        .map((term) => normalizeSearchText(term))
        .filter((term) => term.length >= 2);

    splitTerms.forEach((term) => terms.add(term));

    if (terms.size < 6 && normalized.length >= 4) {
        const condensed = normalized.replace(/\s+/g, '');
        for (let i = 0; i < condensed.length - 1 && terms.size < 10; i++) {
            const biGram = condensed.slice(i, i + 2);
            if (biGram.length === 2) terms.add(biGram);
        }
    }

    return Array.from(terms);
};

const countOccurrences = (text: string, term: string): number => {
    if (!term || !text) return 0;
    let count = 0;
    let index = 0;
    while (index < text.length) {
        const found = text.indexOf(term, index);
        if (found === -1) break;
        count += 1;
        index = found + term.length;
    }
    return count;
};

const mergeTopicLines = (raw: string): string[] => {
    const rawLines = raw
        .replace(/\u000c/g, '\n')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

    const lines: string[] = [];
    for (let i = 0; i < rawLines.length; i++) {
        let line = rawLines[i];

        if (line.startsWith('【') && !line.includes('】')) {
            let merged = line;
            while (i + 1 < rawLines.length && !merged.includes('】')) {
                const nextLine = rawLines[i + 1];
                if (!nextLine) {
                    i += 1;
                    continue;
                }
                merged += nextLine;
                i += 1;
            }
            line = merged;
        }

        if (line === '】' && lines.length > 0) {
            const previous = lines[lines.length - 1];
            if (previous.startsWith('【') && !previous.includes('】')) {
                lines[lines.length - 1] = `${previous}】`;
                continue;
            }
        }

        lines.push(line);
    }

    return lines;
};

const cleanHeading = (value: string): string =>
    value
        .replace(/【|】/g, '')
        .replace(/^■\s*/, '')
        .trim();

const shouldTreatAsHeading = (line: string): boolean =>
    sectionTitlePattern.test(line) || topicPattern.test(line) || markerPattern.test(line);

const buildChunksForLanguage = (
    language: PromptLanguage,
    chunkCharLimit: number
): ContextChunk[] => {
    const chunks: ContextChunk[] = [];

    for (const article of allWikiArticles) {
        const title = language === 'ja' ? article.title.ja : article.title.en;
        const content = language === 'ja' ? article.content.ja : article.content.en;
        const lines = mergeTopicLines(content);

        let currentHeading = '';
        let buffer = '';

        const flush = () => {
            const text = buffer.trim();
            if (!text) {
                buffer = '';
                return;
            }

            const chunkText = currentHeading ? `${currentHeading}\n${text}` : text;
            chunks.push({
                articleId: article.id,
                title,
                heading: currentHeading,
                text: chunkText,
                searchable: normalizeSearchText(`${title} ${currentHeading} ${chunkText}`),
                headingSearchable: normalizeSearchText(currentHeading),
                titleSearchable: normalizeSearchText(title),
            });
            buffer = '';
        };

        for (const line of lines) {
            if (shouldTreatAsHeading(line)) {
                flush();
                currentHeading = cleanHeading(line);
                continue;
            }

            const next = buffer ? `${buffer}\n${line}` : line;
            if (buffer && next.length > chunkCharLimit) {
                flush();
            }
            buffer = buffer ? `${buffer}\n${line}` : line;
        }

        flush();
    }

    return chunks;
};

const getContextChunks = (
    language: PromptLanguage,
    chunkCharLimit: number
): ContextChunk[] => {
    const cached = contextChunkCache[language];
    if (cached && cached.length > 0) {
        return cached;
    }

    const generated = buildChunksForLanguage(language, chunkCharLimit);
    contextChunkCache[language] = generated;
    return generated;
};

const scoreChunk = (
    chunk: ContextChunk,
    terms: string[],
    normalizedQuery: string
): number => {
    let score = 0;

    if (normalizedQuery && chunk.searchable.includes(normalizedQuery)) {
        score += 18;
    }

    for (const term of terms) {
        const count = countOccurrences(chunk.searchable, term);
        if (count <= 0) continue;

        score += count * Math.min(10, term.length);
        if (chunk.headingSearchable.includes(term)) score += 6;
        if (chunk.titleSearchable.includes(term)) score += 4;
    }

    return score;
};

const fallbackChunks = (chunks: ContextChunk[], maxChunks: number): ContextChunk[] => {
    const selected: ContextChunk[] = [];
    const seenArticleIds = new Set<string>();

    for (const chunk of chunks) {
        if (seenArticleIds.has(chunk.articleId)) continue;
        selected.push(chunk);
        seenArticleIds.add(chunk.articleId);
        if (selected.length >= maxChunks) break;
    }

    return selected;
};

const selectRelevantChunks = (
    query: string,
    language: PromptLanguage,
    options: Required<PromptBuildOptions>
): ContextChunk[] => {
    const chunks = getContextChunks(language, options.chunkCharLimit);
    const terms = buildSearchTerms(query);
    const normalizedQuery = normalizeSearchText(query);

    const scored = chunks
        .map((chunk) => ({
            chunk,
            score: scoreChunk(chunk, terms, normalizedQuery),
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
        return fallbackChunks(chunks, Math.min(options.maxChunks, 4));
    }

    const selected: ContextChunk[] = [];
    const perArticleCount = new Map<string, number>();

    for (const item of scored) {
        const count = perArticleCount.get(item.chunk.articleId) ?? 0;
        if (count >= options.maxChunksPerArticle) continue;

        selected.push(item.chunk);
        perArticleCount.set(item.chunk.articleId, count + 1);

        if (selected.length >= options.maxChunks) break;
    }

    return selected;
};

export const buildWorldContextForQuery = (
    query: string,
    language: PromptLanguage,
    options: PromptBuildOptions = {}
): string => {
    const mergedOptions: Required<PromptBuildOptions> = {
        ...defaultOptions,
        ...options,
    };

    const selected = selectRelevantChunks(query, language, mergedOptions);
    const body = selected
        .map((chunk) => {
            const source = chunk.heading ? `${chunk.title} / ${chunk.heading}` : chunk.title;
            return `【${source}】\n${chunk.text}`;
        })
        .join('\n\n---\n\n');

    const history = language === 'ja' ? realWorldContext.ja.trim() : realWorldContext.en.trim();
    const historyHeading =
        language === 'ja'
            ? '【現実世界の技術背景（2020年代〜2050年）】'
            : '【Real World Historical Context (2020s - 2050)】';

    return `${body}\n\n---\n\n${historyHeading}\n${history}`;
};

export const buildSystemPrompt = (
    language: PromptLanguage,
    query: string,
    options: PromptBuildOptions = {}
): string => {
    const worldContext = buildWorldContextForQuery(query, language, options);

    if (language === 'ja') {
        return `あなたは「SFプロトタイピング」によって描かれた、2065年の架空の世界を案内するAIガイドです。
以下の世界観データベースをもとに、訪問者の質問に答えてください。

【重要：このプロジェクトの目的】
このプロジェクトは、架空の未来設定を通じて、訪問者と「現実の未来をどうしていきたいか」を対話したり、考えるきっかけ（材料）を提供することを目的としています。
単なる情報提供に留まらず、訪問者が現実の未来について思考を巡らせられるような対話を心がけてください。

【ルール】
- 必ず日本語で回答してください
- 2065年の世界の住人として、自然な口調で話してください
- これはSFプロトタイピングによる「架空の未来設定」であることを、文脈に応じて適切に伝えてください（特に現実世界の技術について聞かれた際など）
- データベースに記載のない情報については「その情報は記録にありません」と答えてください
- ただし、2020年代〜2050年の技術史（ムーンショット計画など）については、この世界における「歴史的事実（前史）」として回答可能です
- 回答は簡潔に、200文字以内を目安にしてください

【2065年の世界データベース（質問に関連する抜粋）】
${worldContext}`;
    }

    return `You are an AI guide for a fictional world of 2065, created through "SF Prototyping."
Answer visitors' questions based on the following world database.

【Purpose of this Project】
This project aims to provide dialogue and material for considering how we want to shape the real future through this fictional setting.
Aim for dialogue that encourages visitors to think about the actual future, rather than just providing information.

【Rules】
- Always respond in English
- Speak naturally as an inhabitant of the world of 2065
- Appropriately convey that this is a "fictional future setting" based on SF prototyping (especially when asked about real-world technology)
- If information is not in the database, say "That information is not in our records"
- However, you can answer questions about technological history (2020s-2050s, Moonshot goals, etc.) as "historical facts (prehistory)" for this world
- Keep responses concise, around 200 characters

【World Database of 2065 (query-relevant excerpts)】
${worldContext}`;
};
