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
        <header className="sticky top-0 z-40 w-full border-b border-[#b8e4ef]/60 bg-[rgba(237,251,255,0.82)] backdrop-blur-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-14">
                <Link to="/" className="text-lg font-bold bg-gradient-to-r from-[#58b2d4] to-[#ff9f7a] bg-clip-text text-transparent shrink-0">
                    2065 World
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive(item.to)
                                    ? 'bg-[#dcf4fb] text-[#1f5f7c]'
                                    : 'text-[#537f92] hover:bg-[#edfaff] hover:text-[#205a73]'
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
                        className="p-2 rounded-lg text-[#537f92] hover:bg-[#edfaff] transition-colors"
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
                <div className="md:hidden border-t border-[#b8e4ef]/40 bg-[rgba(237,251,255,0.96)] backdrop-blur-lg">
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
                                        ? 'bg-[#dcf4fb] text-[#1f5f7c]'
                                        : 'text-[#537f92] hover:bg-[#edfaff] hover:text-[#205a73]'
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
