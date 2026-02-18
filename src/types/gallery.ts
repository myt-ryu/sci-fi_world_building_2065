export type ArtCategory = 'Environment' | 'Character' | 'Concept' | 'Schematic';

export interface Illustration {
    id: string;
    title: string;
    description: string;
    src: string; // Path to asset
    thumbnailSrc?: string; // Optional thumbnail path
    artist?: string;
    category: ArtCategory;
    dateCreated?: string;
    tags?: string[];
    relatedLoreIds?: string[];
}
