import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LanguageToggleButton } from '../common/LanguageToggleButton';

interface PublicPageLayoutProps {
    children: ReactNode;
    className?: string;
    showLanguageToggle?: boolean;
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
    quickLinks = [],
    quickLinksContainerClassName = 'max-w-6xl',
}: PublicPageLayoutProps) => {
    return (
        <div className={`${baseClassName} ${className}`.trim()}>
            {showLanguageToggle && (
                <div className="fixed top-4 right-4 z-50">
                    <LanguageToggleButton />
                </div>
            )}
            {quickLinks.length > 0 && (
                <div className={`w-full ${quickLinksContainerClassName} mx-auto px-6 lg:px-8 pt-20`}>
                    <nav className="flex flex-wrap justify-center gap-3">
                        {quickLinks.map((link) => (
                            <Link
                                key={`${link.to}-${link.label}`}
                                to={link.to}
                                className="px-4 py-2 rounded-lg border border-[#a6ddea] bg-white/80 hover:bg-[#ebf9fd] text-[#2e6b84] text-sm font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
            {children}
        </div>
    );
};
