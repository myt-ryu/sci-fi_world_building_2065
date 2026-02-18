import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { SiteFooter } from '../components/common/SiteFooter';

export const About = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#d9f5fc_0%,_#f3feff_42%,_#edf9f5_100%)] text-[#1f4f65] selection:bg-[#ffd1b4]/70">
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
                    className="px-3 py-1.5 text-xs font-mono rounded-xl border border-[#9fd6e6] bg-white/85 backdrop-blur-md hover:bg-[#e9f8fd] text-[#477387] hover:text-[#1f4f65] transition-colors shadow-lg"
                >
                    {language === 'ja' ? 'EN' : 'JA'}
                </button>
            </div>

            <main className="max-w-5xl mx-auto px-6 lg:px-8 py-20 space-y-10">
                <header className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#a6ddea] text-[#3d7e95] text-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#6dc6dd] animate-pulse"></span>
                        {t('プロジェクト情報', 'Project Information')}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#21566f] mb-4">
                        {t('About', 'About')}
                    </h1>
                    <p className="text-[#5b8395] text-lg">
                        {t('このプロジェクトの背景と構成をまとめるページです。', 'This page summarizes the background and structure of the project.')}
                    </p>
                </header>

                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        to="/"
                        className="px-4 py-2 rounded-lg border border-[#a6ddea] bg-white/80 hover:bg-[#ebf9fd] text-[#2e6b84] text-sm font-medium transition-colors"
                    >
                        {t('トップへ戻る', 'Back to Home')}
                    </Link>
                    <Link
                        to="/wiki"
                        className="px-4 py-2 rounded-lg border border-[#a6ddea] bg-white/80 hover:bg-[#ebf9fd] text-[#2e6b84] text-sm font-medium transition-colors"
                    >
                        {t('世界設定を見る', 'Open World Settings')}
                    </Link>
                </div>

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
            <SiteFooter />
        </div>
    );
};
