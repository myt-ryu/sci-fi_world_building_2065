import React from 'react';
import { Link } from 'react-router-dom';
import { timeline } from '../data/world/timeline';
import { locations } from '../data/world/locations';
import { topLineText } from '../data/world/topLine';
import { useLanguage } from '../contexts/LanguageContext';
import mainVisual from '../assets/images/world/250831_0.png';
import { SiteFooter } from '../components/common/SiteFooter';
import { PublicPageLayout } from '../components/layouts/PublicPageLayout';

export const Home = () => {
    const { language, t } = useLanguage();

    return (
        <PublicPageLayout>
            {/* Hero Section */}
            <header className="relative overflow-hidden border-b border-[#b9e5ef]">
                {/* Ambient blurs */}
                <div className="absolute -top-24 left-1/4 w-[460px] h-[460px] bg-[#9fe9de]/40 blur-[140px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] bg-[#8ad9ef]/35 blur-[160px] rounded-full pointer-events-none"></div>

                {/* Floating particles — 30個、5段×6列でヒーロー全体に均等配置 */}
                {/* 上段 */}
                <div className="particle absolute top-8   left-[3%]   w-2.5 h-2.5 rounded-full bg-[#57afd2]/60" style={{ '--duration': '7s', '--delay': '0s' } as React.CSSProperties}></div>
                <div className="particle absolute top-12  left-[20%]  w-3   h-3   rounded-full bg-[#ff9d79]/50" style={{ '--duration': '9s', '--delay': '0.4s' } as React.CSSProperties}></div>
                <div className="particle absolute top-6   left-[36%]  w-2   h-2   rounded-full bg-[#9fe9de]/55" style={{ '--duration': '6s', '--delay': '1.2s' } as React.CSSProperties}></div>
                <div className="particle absolute top-16  left-[52%]  w-3.5 h-3.5 rounded-full bg-[#57afd2]/45" style={{ '--duration': '8s', '--delay': '0.7s' } as React.CSSProperties}></div>
                <div className="particle absolute top-10  left-[68%]  w-2   h-2   rounded-full bg-[#ff9d79]/55" style={{ '--duration': '5s', '--delay': '2s' } as React.CSSProperties}></div>
                <div className="particle absolute top-20  left-[85%]  w-3   h-3   rounded-full bg-[#9fe9de]/60" style={{ '--duration': '10s', '--delay': '0.2s' } as React.CSSProperties}></div>
                {/* 上中段 */}
                <div className="particle absolute top-32  left-[8%]   w-3   h-3   rounded-full bg-[#ff9d79]/45" style={{ '--duration': '8s', '--delay': '1.5s' } as React.CSSProperties}></div>
                <div className="particle absolute top-40  left-[25%]  w-2   h-2   rounded-full bg-[#57afd2]/55" style={{ '--duration': '6s', '--delay': '3s' } as React.CSSProperties}></div>
                <div className="particle absolute top-36  left-[42%]  w-4   h-4   rounded-full bg-[#9fe9de]/40" style={{ '--duration': '9s', '--delay': '0.9s' } as React.CSSProperties}></div>
                <div className="particle absolute top-44  left-[58%]  w-2.5 h-2.5 rounded-full bg-[#ff9d79]/50" style={{ '--duration': '7s', '--delay': '2.5s' } as React.CSSProperties}></div>
                <div className="particle absolute top-32  left-[74%]  w-2   h-2   rounded-full bg-[#57afd2]/60" style={{ '--duration': '11s', '--delay': '0.5s' } as React.CSSProperties}></div>
                <div className="particle absolute top-40  left-[91%]  w-3   h-3   rounded-full bg-[#9fe9de]/50" style={{ '--duration': '6s', '--delay': '1.8s' } as React.CSSProperties}></div>
                {/* 中段 */}
                <div className="particle absolute top-56  left-[2%]   w-2   h-2   rounded-full bg-[#9fe9de]/55" style={{ '--duration': '8s', '--delay': '3.5s' } as React.CSSProperties}></div>
                <div className="particle absolute top-60  left-[18%]  w-3.5 h-3.5 rounded-full bg-[#57afd2]/45" style={{ '--duration': '7s', '--delay': '1s' } as React.CSSProperties}></div>
                <div className="particle absolute top-52  left-[34%]  w-2.5 h-2.5 rounded-full bg-[#ff9d79]/55" style={{ '--duration': '5s', '--delay': '2.2s' } as React.CSSProperties}></div>
                <div className="particle absolute top-64  left-[50%]  w-2   h-2   rounded-full bg-[#9fe9de]/60" style={{ '--duration': '9s', '--delay': '0.3s' } as React.CSSProperties}></div>
                <div className="particle absolute top-56  left-[66%]  w-3   h-3   rounded-full bg-[#57afd2]/50" style={{ '--duration': '6s', '--delay': '4s' } as React.CSSProperties}></div>
                <div className="particle absolute top-60  left-[82%]  w-2   h-2   rounded-full bg-[#ff9d79]/45" style={{ '--duration': '10s', '--delay': '1.3s' } as React.CSSProperties}></div>
                {/* 下中段 */}
                <div className="particle absolute top-72  left-[6%]   w-3   h-3   rounded-full bg-[#ff9d79]/50" style={{ '--duration': '7s', '--delay': '0.6s' } as React.CSSProperties}></div>
                <div className="particle absolute top-80  left-[22%]  w-2   h-2   rounded-full bg-[#9fe9de]/55" style={{ '--duration': '8s', '--delay': '2.8s' } as React.CSSProperties}></div>
                <div className="particle absolute top-76  left-[38%]  w-3.5 h-3.5 rounded-full bg-[#57afd2]/40" style={{ '--duration': '6s', '--delay': '1.6s' } as React.CSSProperties}></div>
                <div className="particle absolute top-72  left-[55%]  w-2.5 h-2.5 rounded-full bg-[#ff9d79]/55" style={{ '--duration': '9s', '--delay': '0.8s' } as React.CSSProperties}></div>
                <div className="particle absolute top-80  left-[71%]  w-2   h-2   rounded-full bg-[#9fe9de]/60" style={{ '--duration': '7s', '--delay': '3.2s' } as React.CSSProperties}></div>
                <div className="particle absolute top-76  left-[88%]  w-3   h-3   rounded-full bg-[#57afd2]/50" style={{ '--duration': '5s', '--delay': '1.1s' } as React.CSSProperties}></div>
                {/* 下段 */}
                <div className="particle absolute bottom-24 left-[4%]  w-2.5 h-2.5 rounded-full bg-[#9fe9de]/55" style={{ '--duration': '8s', '--delay': '2s' } as React.CSSProperties}></div>
                <div className="particle absolute bottom-16 left-[21%] w-3   h-3   rounded-full bg-[#57afd2]/50" style={{ '--duration': '6s', '--delay': '0.4s' } as React.CSSProperties}></div>
                <div className="particle absolute bottom-28 left-[43%] w-2   h-2   rounded-full bg-[#ff9d79]/60" style={{ '--duration': '9s', '--delay': '3.8s' } as React.CSSProperties}></div>
                <div className="particle absolute bottom-20 left-[62%] w-3.5 h-3.5 rounded-full bg-[#9fe9de]/45" style={{ '--duration': '7s', '--delay': '1.4s' } as React.CSSProperties}></div>
                <div className="particle absolute bottom-32 left-[79%] w-2   h-2   rounded-full bg-[#57afd2]/55" style={{ '--duration': '10s', '--delay': '0.9s' } as React.CSSProperties}></div>
                <div className="particle absolute bottom-16 left-[93%] w-3   h-3   rounded-full bg-[#ff9d79]/45" style={{ '--duration': '6s', '--delay': '2.6s' } as React.CSSProperties}></div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
                    <div className="text-center mb-10">
                        <h1
                            className="glitch text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#57afd2] to-[#ff9d79] mb-6"
                            data-text={t('2065年のSci-Fi世界設定', 'Sci-Fi World Settings for 2065')}
                        >
                            {t('2065年のSci-Fi世界設定', 'Sci-Fi World Settings for 2065')}
                        </h1>

                        <p className="typewriter text-lg md:text-xl text-[#4d7f92] max-w-3xl mx-auto mb-10 leading-relaxed inline-block">
                            {t(
                                '2065年、パーソナル・リアリティが交差する多層現実（Layered Realities）の社会',
                                'In 2065, a layered-reality society where personal realities intersect.',
                            )}
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            <Link to="/wiki" className="group relative px-8 py-4 bg-[#58b6d8] hover:bg-[#46a8cd] text-white font-bold rounded-xl transition-all shadow-[0_14px_36px_rgba(98,181,211,0.42)] hover:shadow-[0_20px_44px_rgba(91,172,203,0.5)] overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">
                                    {t('2065の世界へ', 'Enter the World of 2065')}
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#53aed0] to-[#ff9f7a] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                            <Link to="/about" className="group relative px-8 py-4 bg-[#58b6d8] hover:bg-[#46a8cd] text-white font-bold rounded-xl transition-all shadow-[0_14px_36px_rgba(98,181,211,0.42)] hover:shadow-[0_20px_44px_rgba(91,172,203,0.5)] overflow-hidden">
                                <span className="relative z-10">
                                    {t('Aboutを見る', 'About Project')}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#53aed0] to-[#ff9f7a] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                            <Link to="/use-cases" className="group relative px-8 py-4 bg-[#58b6d8] hover:bg-[#46a8cd] text-white font-bold rounded-xl transition-all shadow-[0_14px_36px_rgba(98,181,211,0.42)] hover:shadow-[0_20px_44px_rgba(91,172,203,0.5)] overflow-hidden">
                                <span className="relative z-10">
                                    {t('活用提案を見る', 'Use Cases')}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#53aed0] to-[#ff9f7a] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                        </div>
                    </div>

                    <div className="relative rounded-[2rem] overflow-hidden border border-[#9fd9e8] bg-[#e9fbff] shadow-[0_25px_80px_rgba(111,194,219,0.35)]">
                        <img
                            src={mainVisual}
                            alt={t('2065年の未来都市メインビジュアル', 'Main visual of a future city in 2065')}
                            className="w-full h-auto object-contain"
                            loading="eager"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f3fffe]/90 via-[#f3fffe]/30 to-transparent"></div>
                    </div>
                </div>
            </header>

            {/* Top Line (World Overview) */}
            <section className="py-20 bg-[#f4fdfd]/85 border-b border-[#c4e8f1]">
                <div className="max-w-5xl xl:max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-[#4faeca] text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            {t('世界観概要', 'World Overview')}
                        </h2>
                        <h3 className="text-lg md:text-2xl font-semibold text-[#21566f] leading-relaxed max-w-5xl mx-auto">
                            {language === 'ja' ? (
                                <>
                                    <span>2065年、パーソナル・リアリティが交差する</span>
                                    <br />
                                    <span>多層現実（Layered Realities）の社会</span>
                                </>
                            ) : (
                                'In 2065, a layered-reality society where personal realities intersect.'
                            )}
                        </h3>
                    </div>

                    <div className="prose prose-slate prose-lg mx-auto leading-loose text-[#37697f] font-serif whitespace-pre-wrap">
                        {language === 'ja' ? topLineText.ja : topLineText.en}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-[linear-gradient(180deg,_#effbfe_0%,_#edf8f4_100%)] relative">
                <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-16 text-center">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#57afd2] to-[#ff9d79]">
                            {t('タイムライン: 2065年への道', 'Timeline: The Road to 2065')}
                        </span>
                    </h2>

                    <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#8dc9dc] before:to-transparent">
                        {timeline.map((event, index) => (
                            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                                {/* Icon */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#edf8f4] bg-[#79c2da] group-hover:bg-[#ffae8b] transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_12px_24px_rgba(96,169,196,0.25)]">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:bg-[#20586f] animate-pulse"></div>
                                </div>

                                {/* Content */}
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/90 border border-[#b7e3ee] rounded-xl hover:border-[#72c3da] transition-colors shadow-[0_12px_30px_rgba(113,184,209,0.18)]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl font-mono font-bold text-[#55b2d4]">{event.year}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#22586f] mb-2">
                                        {language === 'ja' ? event.title.ja : event.title.en}
                                    </h3>
                                    <p className="text-[#4f7d90] text-sm leading-relaxed">
                                        {language === 'ja' ? event.description.ja : event.description.en}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Locations Grid */}
            {locations.length > 0 && (
                <section className="py-24 bg-[#f6ffff] border-t border-[#c3e9f2]">
                    <div className="max-w-7xl xl:max-w-[88rem] mx-auto px-6 lg:px-8">
                        <h2 className="text-3xl font-bold mb-12 text-center text-[#21566f]">
                            {t('主要ロケーション', 'Key Locations')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {locations.map((loc) => (
                                <div key={loc.id} className="group relative bg-white/90 rounded-xl overflow-hidden border border-[#b7e4ee] hover:border-[#75c4dc] transition-all hover:shadow-2xl hover:shadow-[#9dd4e3]/30">
                                    <div className="h-48 bg-[linear-gradient(140deg,_#d9f5fb,_#eafbf4)] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-2 py-1 bg-[#ff9f7a]/15 border border-[#ff9f7a]/40 text-[#d87d5c] text-xs rounded-md uppercase tracking-wider">{loc.type}</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-[#22586f] mb-2 group-hover:text-[#4faecf] transition-colors">
                                            {language === 'ja' ? loc.name.ja : loc.name.en}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-[#6f94a5] mb-4">
                                            <span className="text-xs">{t('人口:', 'Population:')}</span>
                                            {loc.population}
                                        </div>
                                        <p className="text-[#4f7d90] text-sm line-clamp-3">
                                            {language === 'ja' ? loc.description.ja : loc.description.en}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <SiteFooter className="mt-auto" />
        </PublicPageLayout>
    );
};
