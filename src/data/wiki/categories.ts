import type { WikiCategory } from '../../types';

export const wikiCategories: WikiCategory[] = [
    {
        id: 'technology',
        title: { ja: 'テクノロジー', en: 'Technology' },
        description: { ja: 'IoB、サイバネティックアバター、AIなど', en: 'IoB, Cybernetic Avatars, AI' },
        order: 1,
    },
    {
        id: 'society',
        title: { ja: '社会構造', en: 'Social Structure' },
        description: { ja: '共鳴圏、多層現実、集合意識', en: 'Resonance Sphere, Layered Realities' },
        order: 2,
    },
    {
        id: 'ethics',
        title: { ja: '倫理とアイデンティティ', en: 'Ethics & Identity' },
        description: { ja: '自由意志、身体改造、プライバシー', en: 'Free Will, Body Modification, Privacy' },
        order: 3,
    },
    {
        id: 'economy',
        title: { ja: 'お金・経済', en: 'Economy' },
        description: { ja: 'UBI、評価経済、所有から共鳴へ', en: 'UBI, Reputation Economy' },
        order: 4,
    },
    {
        id: 'energy',
        title: { ja: 'エネルギーと資源', en: 'Energy & Resources' },
        description: { ja: '核融合、持続可能性', en: 'Fusion, Sustainability' },
        order: 5,
    },
    {
        id: 'culture',
        title: { ja: '教育・文化・言語', en: 'Education & Culture' },
        description: { ja: '多言語社会、集合的芸術', en: 'Multilingual Society, Collective Art' },
        order: 6,
    },
    {
        id: 'living',
        title: { ja: '居住・都市生活', en: 'Living & Urban Life' },
        description: { ja: '集合住宅、二拠点生活', en: 'Collective Housing, Dual Life' },
        order: 7,
    },
    {
        id: 'timeline',
        title: { ja: '時系列・未来像', en: 'Timeline & Future' },
        description: { ja: '2065年へのロードマップ', en: 'Roadmap to 2065' },
        order: 8,
    },
];
