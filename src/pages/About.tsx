import { useLanguage } from '../contexts/LanguageContext';
import { SiteFooter } from '../components/common/SiteFooter';
import { PublicPageLayout } from '../components/layouts/PublicPageLayout';
import { SEO } from '../components/common/SEO';

const sections = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        ),
        titleJa: 'Projectの目的',
        titleEn: 'Project Goals',
        descJa: '（内容準備中）このプロジェクトが目指す価値、対象読者、活用シーンを整理して掲載予定。',
        descEn: '(Coming soon) This section will outline project value, target audience, and use cases.',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
        ),
        titleJa: '参加者クレジット',
        titleEn: 'Credits',
        descJa: '（内容準備中）企画、執筆、研究、デザイン、技術実装などの参加者情報を掲載予定。',
        descEn: '(Coming soon) Contributors for planning, writing, research, design, and implementation will be listed here.',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
        ),
        titleJa: 'ムーンショット金井プロジェクトの紹介',
        titleEn: 'Moonshot Kanai Project',
        descJa: '（内容準備中）IoBや関連研究との接続を、一次情報へのリンク付きで整理して掲載予定。',
        descEn: '(Coming soon) Connections to IoB and related research will be summarized with primary source links.',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
        ),
        titleJa: 'WIRED Sci-Fiプロトタイピング研究所の紹介',
        titleEn: 'WIRED Sci-Fi Prototyping Lab',
        descJa: '（内容準備中）活動の概要、参考資料、関連プロジェクトとの関係性を掲載予定。',
        descEn: '(Coming soon) Activity overview, references, and related project links will be added.',
    },
];

export const About = () => {
    const { t } = useLanguage();

    return (
        <PublicPageLayout>
            <SEO title={t('About', 'About')} />
            <main className="flex-1 w-full max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-20 space-y-12">
                <header className="text-center">
                    <p className="text-xs font-mono tracking-[0.3em] text-[#57e5ff]/50 uppercase mb-4">About This Project</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#e0f0f8] mb-4 neon-text">
                        {t('About', 'About')}
                    </h1>
                    <p className="text-[#7aa0b0] text-lg">
                        {t('このプロジェクトの背景と構成をまとめるページです。', 'This page summarizes the background and structure of the project.')}
                    </p>
                </header>

                <section className="space-y-4">
                    {sections.map((section, i) => (
                        <article key={i} className="glass-card group rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#57e5ff]/20 to-[#4de8c8]/20 text-[#57e5ff] border border-[#57e5ff]/15 group-hover:border-[#57e5ff]/30 group-hover:shadow-[0_0_16px_rgba(87,229,255,0.15)] transition-all">
                                    {section.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-mono font-bold text-[#57e5ff]/40 tracking-wider">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <h2 className="text-xl md:text-2xl font-bold text-[#e0f0f8]">
                                            {t(section.titleJa, section.titleEn)}
                                        </h2>
                                    </div>
                                    <p className="text-[#7aa0b0] leading-relaxed">
                                        {t(section.descJa, section.descEn)}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
            <SiteFooter className="mt-auto" />
        </PublicPageLayout>
    );
};
