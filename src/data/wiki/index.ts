import type { WikiArticle } from '../../types/wiki';
import { technologyArticles } from './articles/technology';
import { economyArticles } from './articles/economy';
import { societyArticles } from './articles/society';
import { ethicsArticles } from './articles/ethics';
import { energyArticles } from './articles/energy';
import { cultureArticles } from './articles/culture';
import { livingArticles } from './articles/living';
import { timelineArticles } from './articles/timeline';

// Combine all articles here
export const allWikiArticles: WikiArticle[] = [
    ...technologyArticles,
    ...societyArticles,
    ...ethicsArticles,
    ...economyArticles,
    ...energyArticles,
    ...cultureArticles,
    ...livingArticles,
    ...timelineArticles,
];

export const getArticlesByCategory = (categoryId: string) => {
    return allWikiArticles.filter(article => article.categoryId === categoryId);
};
