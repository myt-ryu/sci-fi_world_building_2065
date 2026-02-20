import type { WikiArticle } from '../../types/wiki';
import { technologyArticles } from './articles/technology';
import { economyArticles } from './articles/economy';
import { societyArticles } from './articles/society';
import { ethicsArticles } from './articles/ethics';
import { energyArticles } from './articles/energy';
import { cultureArticles } from './articles/culture';
import { livingArticles } from './articles/living';
import { timelineArticles } from './articles/timeline';

export const categoryMap: Record<string, WikiArticle[]> = {
    technology: technologyArticles,
    economy: economyArticles,
    society: societyArticles,
    ethics: ethicsArticles,
    energy: energyArticles,
    culture: cultureArticles,
    living: livingArticles,
    timeline: timelineArticles,
};

export const allWikiArticles: WikiArticle[] = Object.values(categoryMap).flat();

export const getArticlesByCategory = (categoryId: string): WikiArticle[] => {
    return categoryMap[categoryId] || [];
};
