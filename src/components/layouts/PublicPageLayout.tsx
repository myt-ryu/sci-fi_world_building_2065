import type { ReactNode } from 'react';
import { SiteHeader } from '../common/SiteHeader';

interface PublicPageLayoutProps {
    children: ReactNode;
    className?: string;
}

export const PublicPageLayout = ({
    children,
    className = '',
}: PublicPageLayoutProps) => {
    return (
        <div className={`min-h-screen flex flex-col bg-[#0a1a24] text-[#c8e6f0] selection:bg-[#57e5ff]/30 grid-pattern ${className}`.trim()}>
            <SiteHeader />
            {children}
        </div>
    );
};
