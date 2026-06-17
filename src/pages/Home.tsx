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
            <header className="scanline relative overflow-hidden">
                {/* Ambient blurs */}
                <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#57e5ff]/8 blur-[180px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-40 right-0 w-[600px] h-[600px] bg-[#ff9d79]/6 blur-[200px] rounded-full pointer-events-none"></div>
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#4de8c8]/5 blur-[160px] rounded-full pointer-events-none"></div>

                {/* Floating particles */}
                {[
                    { top: '8%', left: '3%', size: 'w-2 h-2', color: 'bg-[#57e5ff]/40', dur: '7s', del: '0s' },
                    { top: '12%', left: '20%', size: 'w-2.5 h-2.5', color: 'bg-[#ff9d79]/35', dur: '9s', del: '0.4s' },
                    { top: '6%', left: '50%', size: 'w-1.5 h-1.5', color: 'bg-[#4de8c8]/45', dur: '6s', del: '1.2s' },
                    { top: '16%', left: '70%', size: 'w-3 h-3', color: 'bg-[#57e5ff]/30', dur: '8s', del: '0.7s' },
                    { top: '20%', left: '85%', size: 'w-2 h-2', color: 'bg-[#ff9d79]/30', dur: '10s', del: '0.2s' },
                    { top: '35%', left: '8%', size: 'w-2.5 h-2.5', color: 'bg-[#4de8c8]/35', dur: '8s', del: '1.5s' },
                    { top: '40%', left: '42%', size: 'w-3 h-3', color: 'bg-[#57e5ff]/25', dur: '9s', del: '0.9s' },
                    { top: '45%', left: '91%', size: 'w-2 h-2', color: 'bg-[#ff9d79]/35', dur: '6s', del: '1.8s' },
                    { top: '60%', left: '18%', size: 'w-3 h-3', color: 'bg-[#57e5ff]/30', dur: '7s', del: '1s' },
                    { top: '65%', left: '66%', size: 'w-2 h-2', color: 'bg-[#4de8c8]/40', dur: '6s', del: '4s' },
                    { top: '80%', left: '38%', size: 'w-2.5 h-2.5', color: 'bg-[#57e5ff]/30', dur: '6s', del: '1.6s' },
                    { top: '85%', left: '79%', size: 'w-1.5 h-1.5', color: 'bg-[#ff9d79]/40', dur: '10s', del: '0.9s' },
                ].map((p, i) => (
                    <div
                        key={i}
                        className={`particle absolute ${p.size} rounded-full ${p.color}`}
                        style={{ top: p.top, left: p.left, '--duration': p.dur, '--delay': p.del } as React.CSSProperties}
                    />
                ))}

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-32">
                    <div className="text-center mb-12">
                        <p className="text-xs font-mono tracking-[0.3em] text-[#57e5ff]/50 uppercase mb-6">
                            Sci-Fi World Building Project
                        </p>
                        <h1
                            className="glitch text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#57e5ff] via-[#a0f0ff] to-[#ff9d79] mb-8 neon-text"
                            data-text={t('2065年のSci-Fi世界設定', 'Sci-Fi World Settings for 2065')}
                        >
                            {t('2065年のSci-Fi世界設定', 'Sci-Fi World Settings for 2065')}
                        </h1>

                        <p className="typewriter text-base md:text-xl text-[#8ab8c8] max-w-3xl mx-auto mb-12 leading-relaxed inline-block">
                            {t(
                                '2065年、パーソナル・リアリティが交差する多層現実（Layered Realities）の社会',
                                'In 2065, a layered-reality society where personal realities intersect.',
                            )}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/wiki" className="group relative px-10 py-4 bg-gradient-to-r from-[#57e5ff]/90 to-[#4de8c8]/90 text-[#0a1a24] font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(87,229,255,0.3)] hover:shadow-[0_0_50px_rgba(87,229,255,0.5)] hover:-translate-y-1 text-lg">
                                <span className="flex items-center gap-2">
                                    {t('2065の世界へ', 'Enter the World of 2065')}
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </Link>
                            <Link to="/about" className="glass-card px-6 py-4 rounded-xl text-[#8ab8c8] font-medium hover:text-[#57e5ff]">
                                {t('Aboutを見る', 'About Project')}
                            </Link>
                            <Link to="/use-cases" className="glass-card px-6 py-4 rounded-xl text-[#8ab8c8] font-medium hover:text-[#57e5ff]">
                                {t('活用提案を見る', 'Use Cases')}
                            </Link>
                        </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden border border-[#57e5ff]/15 shadow-[0_0_60px_rgba(87,229,255,0.1)]">
                        <img
                            src={mainVisual}
                            alt={t('2065年の未来都市メインビジュアル', 'Main visual of a future city in 2065')}
                            className="w-full h-auto object-contain"
                            loading="eager"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a1a24] via-[#0a1a24]/60 to-transparent"></div>
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a1a24]/40 to-transparent"></div>
                    </div>
                </div>
            </header>

            {/* Top Line (World Overview) */}
            <section className="relative py-24 border-t border-[#57e5ff]/10">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a24] via-[#0d2030] to-[#0a1a24]"></div>
                <div className="relative max-w-5xl xl:max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-[#57e5ff] text-3xl md:text-4xl font-bold tracking-tight mb-4 neon-text">
                            {t('世界観概要', 'World Overview')}
                        </h2>
                        <h3 className="text-lg md:text-2xl font-semibold text-[#a0d0e0] leading-relaxed max-w-5xl mx-auto">
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

                    <div className="space-y-6">
                        {(language === 'ja' ? topLineText.ja : topLineText.en)
                            .split('\n\n')
                            .map((paragraph, i) => (
                                <p
                                    key={i}
                                    className={`text-[#8ab8c8] text-base md:text-lg leading-[2] ${i === 0 ? 'first-letter:text-3xl first-letter:font-bold first-letter:text-[#57e5ff] first-letter:mr-0.5' : ''}`}
                                >
                                    {paragraph}
                                </p>
                            ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="relative py-28 border-t border-[#57e5ff]/10">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a24] via-[#081620] to-[#0a1a24]"></div>
                <div className="relative max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-20 text-center">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#57e5ff] to-[#ff9d79] neon-text">
                            {t('タイムライン: 2065年への道', 'Timeline: The Road to 2065')}
                        </span>
                    </h2>

                    <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#57e5ff]/30 before:to-transparent">
                        {timeline.map((event, index) => (
                            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#57e5ff]/30 bg-[#0a1a24] group-hover:border-[#ff9d79]/50 transition-all shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_20px_rgba(87,229,255,0.15)] group-hover:shadow-[0_0_24px_rgba(255,157,121,0.2)]"
                                    style={{ animation: 'pulse-glow 3s ease-in-out infinite', animationDelay: `${index * 0.3}s` }}
                                >
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#57e5ff] group-hover:bg-[#ff9d79] transition-colors"></div>
                                </div>

                                <div className="glass-card w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl">
                                    <span className="text-2xl font-mono font-bold text-[#57e5ff] mb-2 block">{event.year}</span>
                                    <h3 className="text-xl font-bold text-[#e0f0f8] mb-2">
                                        {language === 'ja' ? event.title.ja : event.title.en}
                                    </h3>
                                    <p className="text-[#7aa0b0] text-sm leading-relaxed">
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
                <section className="relative py-28 border-t border-[#57e5ff]/10">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a24] via-[#0d2030] to-[#0a1a24]"></div>
                    <div className="relative max-w-7xl xl:max-w-[88rem] mx-auto px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center text-[#e0f0f8] neon-text">
                            {t('主要ロケーション', 'Key Locations')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {locations.map((loc) => (
                                <div key={loc.id} className="glass-card group rounded-xl overflow-hidden">
                                    <div className="h-40 bg-gradient-to-br from-[#57e5ff]/8 to-[#4de8c8]/5 relative overflow-hidden flex items-center justify-center">
                                        <svg className="w-14 h-14 text-[#57e5ff]/20 group-hover:text-[#57e5ff]/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div className="absolute bottom-3 left-4">
                                            <span className="px-2.5 py-1 bg-[#ff9d79]/10 border border-[#ff9d79]/25 text-[#ff9d79] text-xs font-mono rounded-full uppercase tracking-wider">{loc.type}</span>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-[#e0f0f8] mb-1.5 group-hover:text-[#57e5ff] transition-colors">
                                            {language === 'ja' ? loc.name.ja : loc.name.en}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs text-[#5a8a9a] font-mono mb-3">
                                            <span>{t('人口:', 'Pop:')}</span>
                                            {loc.population}
                                        </div>
                                        <p className="text-[#7aa0b0] text-sm line-clamp-3 leading-relaxed">
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
