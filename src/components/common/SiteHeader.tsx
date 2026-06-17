import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageToggleButton } from './LanguageToggleButton';
import { SystemOnlineBadge } from './SystemOnlineBadge';

const navItems = [
    { to: '/', labelJa: 'トップ', labelEn: 'Home' },
    { to: '/wiki', labelJa: '世界設定', labelEn: 'World' },
    { to: '/use-cases', labelJa: '活用提案', labelEn: 'Use Cases' },
    { to: '/about', labelJa: 'About', labelEn: 'About' },
];

export const SiteHeader = () => {
    const { language } = useLanguage();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-[#57e5ff]/10 bg-[rgba(10,26,36,0.85)] backdrop-blur-xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-14">
                <Link to="/" className="text-lg font-bold bg-gradient-to-r from-[#57e5ff] to-[#ff9d79] bg-clip-text text-transparent shrink-0">
                    2065 World
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                isActive(item.to)
                                    ? 'bg-[#57e5ff]/10 text-[#57e5ff] shadow-[0_0_12px_rgba(87,229,255,0.15)]'
                                    : 'text-[#8ab8c8] hover:bg-[#57e5ff]/5 hover:text-[#a0ddef]'
                            }`}
                        >
                            {language === 'ja' ? item.labelJa : item.labelEn}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <SystemOnlineBadge className="!text-xs !py-1 !px-3" />
                    <LanguageToggleButton />
                </div>

                <div className="flex md:hidden items-center gap-2">
                    <LanguageToggleButton />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 rounded-lg text-[#8ab8c8] hover:bg-[#57e5ff]/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="md:hidden border-t border-[#57e5ff]/10 bg-[rgba(10,26,36,0.95)] backdrop-blur-xl">
                    <div className="flex justify-center py-2">
                        <SystemOnlineBadge className="!text-xs" />
                    </div>
                    <nav className="px-4 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    isActive(item.to)
                                        ? 'bg-[#57e5ff]/10 text-[#57e5ff]'
                                        : 'text-[#8ab8c8] hover:bg-[#57e5ff]/5 hover:text-[#a0ddef]'
                                }`}
                            >
                                {language === 'ja' ? item.labelJa : item.labelEn}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};
