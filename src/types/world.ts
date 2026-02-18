export type LoreCategory = 'History' | 'Technology' | 'Society' | 'Geography' | 'Cosmology';

export interface LoreEntry {
    id: string;
    title: string;
    category: LoreCategory;
    summary: string;
    content: string; // Markdown supported
    relatedImageIds?: string[];
    tags?: string[];
}

export interface TimelineEvent {
    year: number;
    title: { ja: string; en: string };
    description: { ja: string; en: string };
    month?: number;
    day?: number;
}

export interface Character {
    id: string;
    name: string;
    age?: number; // In 2065
    role: string;
    affiliation?: string;
    description: string;
    avatarImageId?: string;
    traits: string[];
}

export interface Location {
    id: string;
    name: { ja: string; en: string };
    type: 'City' | 'Space Station' | 'Planet' | 'Region';
    description: { ja: string; en: string };
    population?: string;
    imageIds?: string[];
}
