import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { wikiCategories } from '../../../data/wiki/categories';
import { SiteFooter } from '../../common/SiteFooter';
import { SiteHeader } from '../../common/SiteHeader';

export const WikiLayout = ({ children }: { children: React.ReactNode }) => {
    const { language } = useLanguage();
    const { categoryId } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebar = (
        <nav className="p-4 space-y-1">
            {wikiCategories.map((cat) => (
                <Link
                    key={cat.id}
                    to={`/wiki/${cat.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        categoryId === cat.id
                            ? 'bg-[#57e5ff]/10 text-[#57e5ff] border border-[#57e5ff]/20 shadow-[0_0_12px_rgba(87,229,255,0.08)]'
                            : 'text-[#7aa0b0] hover:bg-[#57e5ff]/5 hover:text-[#a0ddef]'
                    }`}
                >
                    {language === 'ja' ? cat.title.ja : cat.title.en}
                </Link>
            ))}
        </nav>
    );

    return (
        <div className="min-h-screen bg-[#0a1a24] text-[#c8e6f0] flex flex-col grid-pattern">
            <SiteHeader />

            <div className="md:hidden px-4 pt-3">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#57e5ff]/15 bg-[rgba(87,229,255,0.05)] text-[#8ab8c8] text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    {language === 'ja' ? 'カテゴリ' : 'Categories'}
                </button>
            </div>

            {sidebarOpen && (
                <div className="md:hidden fixed inset-0 z-30" onClick={() => setSidebarOpen(false)}>
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                    <div
                        className="absolute left-0 top-0 w-72 h-full bg-[#0d1f2b]/98 border-r border-[#57e5ff]/10 shadow-[4px_0_30px_rgba(0,0,0,0.5)] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-[#57e5ff]/10 flex items-center justify-between">
                            <span className="text-lg font-bold bg-gradient-to-r from-[#57e5ff] to-[#ff9d79] bg-clip-text text-transparent">
                                {language === 'ja' ? '2065 世界設定' : '2065 World'}
                            </span>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-1.5 rounded-lg text-[#7aa0b0] hover:bg-[#57e5ff]/10"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {sidebar}
                    </div>
                </div>
            )}

            <div className="flex flex-1">
                <aside className="hidden md:block w-64 bg-[rgba(10,26,36,0.8)] border-r border-[#57e5ff]/10 flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto backdrop-blur-sm">
                    <div className="p-6 border-b border-[#57e5ff]/10">
                        <span className="text-xl font-bold bg-gradient-to-r from-[#57e5ff] to-[#ff9d79] bg-clip-text text-transparent">
                            {language === 'ja' ? '2065 世界設定' : '2065 World Settings'}
                        </span>
                    </div>
                    {sidebar}
                </aside>

                <main className="flex-1 min-h-screen flex flex-col">
                    <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 md:px-8 pt-8 md:pt-12 pb-12">
                        {children}
                    </div>
                    <SiteFooter className="mt-auto" />
                </main>
            </div>
        </div>
    );
};
