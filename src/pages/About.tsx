import { useLanguage } from '../contexts/LanguageContext';
import { SiteFooter } from '../components/common/SiteFooter';
import { PublicPageLayout } from '../components/layouts/PublicPageLayout';
import { SEO } from '../components/common/SEO';

export const About = () => {
    const { t } = useLanguage();

    return (
        <PublicPageLayout
            quickLinks={[
                { to: '/', label: t('トップへ戻る', 'Back to Home') },
                { to: '/wiki', label: t('世界設定を見る', 'Open World Settings') },
                { to: '/use-cases', label: t('活用提案を見る', 'Use Cases') },
            ]}
            quickLinksContainerClassName="max-w-6xl"
        >
            <SEO title={t('About', 'About')} />
            <main className="flex-1 w-full max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-20 space-y-10">
                <header className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#21566f] mb-4">
                        {t('About', 'About')}
                    </h1>
                    <p className="text-[#5b8395] text-lg">
                        {t('このプロジェクトの背景と構成をまとめるページです。', 'This page summarizes the background and structure of the project.')}
                    </p>
                </header>

                <section className="space-y-5">
                    <article className="rounded-2xl border border-[#b7e4ee] bg-white/85 p-6 shadow-[0_14px_32px_rgba(111,184,209,0.16)]">
                        <h2 className="text-2xl font-bold text-[#22586f] mb-3">
                            {t('Projectの目的', 'Project Goals')}
                        </h2>
                        <p className="text-[#4f7d90]">
                            {t('（内容準備中）このプロジェクトが目指す価値、対象読者、活用シーンを整理して掲載予定。', '(Coming soon) This section will outline project value, target audience, and use cases.')}
                        </p>
                    </article>

                    <article className="rounded-2xl border border-[#b7e4ee] bg-white/85 p-6 shadow-[0_14px_32px_rgba(111,184,209,0.16)]">
                        <h2 className="text-2xl font-bold text-[#22586f] mb-3">
                            {t('参加者クレジット', 'Credits')}
                        </h2>
                        <p className="text-[#4f7d90]">
                            {t('（内容準備中）企画、執筆、研究、デザイン、技術実装などの参加者情報を掲載予定。', '(Coming soon) Contributors for planning, writing, research, design, and implementation will be listed here.')}
                        </p>
                    </article>

                    <article className="rounded-2xl border border-[#b7e4ee] bg-white/85 p-6 shadow-[0_14px_32px_rgba(111,184,209,0.16)]">
                        <h2 className="text-2xl font-bold text-[#22586f] mb-3">
                            {t('ムーンショット金井プロジェクトの紹介', 'Moonshot Kanai Project')}
                        </h2>
                        <p className="text-[#4f7d90]">
                            {t('（内容準備中）IoBや関連研究との接続を、一次情報へのリンク付きで整理して掲載予定。', '(Coming soon) Connections to IoB and related research will be summarized with primary source links.')}
                        </p>
                    </article>

                    <article className="rounded-2xl border border-[#b7e4ee] bg-white/85 p-6 shadow-[0_14px_32px_rgba(111,184,209,0.16)]">
                        <h2 className="text-2xl font-bold text-[#22586f] mb-3">
                            {t('WIRED Sci-Fiプロトタイピング研究所の紹介', 'WIRED Sci-Fi Prototyping Lab')}
                        </h2>
                        <p className="text-[#4f7d90]">
                            {t('（内容準備中）活動の概要、参考資料、関連プロジェクトとの関係性を掲載予定。', '(Coming soon) Activity overview, references, and related project links will be added.')}
                        </p>
                    </article>
                </section>
            </main>
            <SiteFooter className="mt-auto" />
        </PublicPageLayout>
    );
};
