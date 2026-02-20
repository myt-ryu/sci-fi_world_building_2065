export interface RealWorldFact {
    id: string;
    title: {
        ja: string;
        en: string;
    };
    content: {
        ja: string;
        en: string;
    };
    links: {
        label: string;
        url: string;
    }[];
}

export const realWorldFacts: RealWorldFact[] = [
    {
        id: 'moonshot-goal1',
        title: {
            ja: 'ムーンショット目標1',
            en: 'Moonshot Goal 1'
        },
        content: {
            ja: '2050年までに、人が身体、脳、空間、時間の制約から解放された社会を実現することを目標としています。サイバネティック・アバター（CA）やブレイン・マシン・インターフェース（BMI）の開発が中心となります。',
            en: 'By 2050, realization of a society in which human beings can be free from limitations of body, brain, space, and time. Focusing on Cybernetic Avatars (CA) and Brain-Machine Interfaces (BMI).'
        },
        links: [
            {
                label: 'ムーンショット目標１（内閣府）',
                url: 'https://www8.cao.go.jp/cstp/moonshot/sub1.html'
            },
            {
                label: 'JST ムーンショット目標１',
                url: 'https://www.jst.go.jp/moonshot/program/goal1/'
            }
        ]
    },
    {
        id: 'kanai-project',
        title: {
            ja: '金井良太プロジェクト',
            en: 'Ryota Kanai Project'
        },
        content: {
            ja: 'プロジェクトマネージャー金井良太氏による「身体的能力と知覚能力の拡張による身体の制約からの解放」プロジェクト。Internet of Brains (IoB) のコンセプトを掲げ、脳とインターネットを接続する未来を模索しています。',
            en: 'A project led by Project Manager Ryota Kanai titled "Realization of a society in which human beings can be free from limitations of body, brain, space, and time through expansion of physical and perceptual capabilities." Searching for a future where brains are connected to the internet (IoB).'
        },
        links: [
            {
                label: '金井プロジェクト公式サイト',
                url: 'https://brains.link/'
            }
        ]
    },
    {
        id: 'iob-original',
        title: {
            ja: 'Internet of Brains (IoB)',
            en: 'Internet of Brains (IoB)'
        },
        content: {
            ja: '2020年代に提唱された概念で、脳活動をデジタルデータとして扱い、インターネットを通じて他者やAI、アバターと直接接続する技術体系。2065年の「共鳴圏」の核心技術となりました。',
            en: 'A concept proposed in the 2020s, a technological system that treats brain activity as digital data and connects directly with others, AIs, and avatars via the internet. It became the core technology for the "Resonance Sphere" in 2065.'
        },
        links: [
            {
                label: 'Internet of Brains 研究概要',
                url: 'https://www.jst.go.jp/moonshot/program/goal1/11_kanai.html'
            }
        ]
    }
];

// 圧縮版：AIプロンプト用に要点のみ抽出（トークン節約）
export const realWorldContext = {
    ja: `・ムーンショット目標1：2050年までにBMI/CAで身体・脳・空間の制約から解放された社会を実現（内閣府）
・金井良太PM：IoB（脳とインターネット接続）で知覚・身体能力を拡張するプロジェクト
・IoB：脳活動をデジタル化し他者/AI/アバターと直接接続する技術。2065年「共鳴圏」の前身`,
    en: `· Moonshot Goal 1 (Japan): By 2050, free humans from body/brain/space limits via BMI & Cybernetic Avatars
· Kanai Project (PM: Ryota Kanai): IoB — connecting brains to internet to expand perception & physical ability
· IoB: Brain activity as digital data, direct connection to others/AI/avatars. Predecessor of 2065 "Resonance Sphere"`,
};
