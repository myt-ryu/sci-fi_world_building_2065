export type Language = 'ja' | 'en';

export interface WikiCategory {
    id: string;
    title: { ja: string; en: string };
    description?: { ja: string; en: string };
    order: number;
}

export interface WikiArticle {
    id: string;
    categoryId: string;
    title: { ja: string; en: string };
    content: { ja: string; en: string }; // Markdown content
    tags?: string[];
}
