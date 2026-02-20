import { allWikiArticles } from '../../../data/wiki';
import { useLanguage } from '../../../contexts/LanguageContext';

export interface SearchResult {
    articleId: string;
    categoryId: string;
    title: string;
    excerpt: string;
}

export const useWorldSearch = () => {
    const { language } = useLanguage();

    const search = (query: string): SearchResult[] => {
        if (!query.trim()) return [];

        const queryText = query.toLowerCase();
        // 記号や助詞などを除いてキーワードを抽出
        const keywords = queryText
            .split(/[\s、。,.!?:;！？：；(（)）「」『』【】[\]{}<>""'`-]+/)
            .filter(k => k.length >= 2 || (k.length === 1 && /[ぁ-んァ-ヶ一-龠]/.test(k)));

        const results: (SearchResult & { score: number })[] = [];

        for (const article of allWikiArticles) {
            const title = language === 'ja' ? article.title.ja : article.title.en;
            const content = language === 'ja' ? article.content.ja : article.content.en;

            const lowerTitle = title.toLowerCase();
            const lowerContent = content.toLowerCase();

            // いずれかのキーワードが含まれているかチェック
            const hitKeywords = keywords.filter(k => lowerTitle.includes(k) || lowerContent.includes(k));

            if (hitKeywords.length > 0) {
                // スコアリング：キーワードの数やタイトル一致を重視
                const score = hitKeywords.length + (lowerTitle.includes(queryText.slice(0, 5)) ? 10 : 0);

                // 抜粋の作成：最初のヒットキーワードの周辺を切り出す
                const firstHit = hitKeywords[0];
                const matchIndex = lowerContent.indexOf(firstHit);
                let excerpt = content.slice(0, 100) + '...';

                if (matchIndex >= 0) {
                    const start = Math.max(0, matchIndex - 30);
                    const end = Math.min(content.length, matchIndex + 70);
                    excerpt = (start > 0 ? '...' : '') + content.slice(start, end) + (end < content.length ? '...' : '');
                }

                results.push({
                    articleId: article.id,
                    categoryId: article.categoryId,
                    title,
                    excerpt,
                    score,
                });
            }
        }

        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(({ score, ...rest }) => rest);
    };

    return { search };
};
