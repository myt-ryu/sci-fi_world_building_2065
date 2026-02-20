import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LanguageToggleButton } from '../common/LanguageToggleButton';
import { SystemOnlineBadge } from '../common/SystemOnlineBadge';

interface PublicPageLayoutProps {
    children: ReactNode;
    className?: string;
    showLanguageToggle?: boolean;
    showSystemOnlineBadge?: boolean;
    quickLinks?: Array<{
        to: string;
        label: string;
    }>;
    quickLinksContainerClassName?: string;
}

const baseClassName =
    'min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,_#d9f5fc_0%,_#f3feff_42%,_#edf9f5_100%)] text-[#1f4f65] selection:bg-[#ffd1b4]/70';

export const PublicPageLayout = ({
    children,
    className = '',
    showLanguageToggle = true,
    showSystemOnlineBadge = true,
    quickLinks = [],
    quickLinksContainerClassName = 'max-w-7xl',
}: PublicPageLayoutProps) => {
    return (
        <div className={`${baseClassName} ${className}`.trim()}>
            {showSystemOnlineBadge && (
                <div className="w-full flex justify-center pt-3">
                    <SystemOnlineBadge />
                </div>
            )}
            {showLanguageToggle && (
                <div className="fixed top-4 right-4 z-50">
                    <LanguageToggleButton />
                </div>
            )}
            {quickLinks.length > 0 && (
                <div className={`w-full ${quickLinksContainerClassName} mx-auto px-6 lg:px-8 ${showSystemOnlineBadge ? 'pt-5' : 'pt-16'}`}>
                    <nav className="flex flex-wrap justify-center gap-3">
                        {quickLinks.map((link) => (
                            <Link
                                key={`${link.to}-${link.label}`}
                                to={link.to}
                                className="group relative overflow-hidden px-4 py-2 rounded-lg border border-[#a6ddea] bg-white/75 text-[#2e6b84] text-sm font-medium transition-all shadow-[0_8px_18px_rgba(124,184,205,0.2)] hover:shadow-[0_12px_26px_rgba(108,176,202,0.28)]"
                            >
                                <span className="relative z-10 transition-colors group-hover:text-white">{link.label}</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-[#53aed0] to-[#ff9f7a] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
            {children}
        </div>
    );
};
