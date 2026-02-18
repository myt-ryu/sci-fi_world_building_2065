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

        const lowerQuery = query.toLowerCase();
        const results: SearchResult[] = [];

        for (const article of allWikiArticles) {
            const title = language === 'ja' ? article.title.ja : article.title.en;
            const content = language === 'ja' ? article.content.ja : article.content.en;

            if (title.toLowerCase().includes(lowerQuery) || content.toLowerCase().includes(lowerQuery)) {
                // Simple relevance check: Title match is better than content match
                // For now, just return valid results

                // Extract a snippet around the match
                const matchIndex = content.toLowerCase().indexOf(lowerQuery);
                let excerpt = content.slice(0, 100) + '...'; // Default to start

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
                });
            }
        }

        return results.slice(0, 3); // Limit relative results
    };

    return { search };
};
