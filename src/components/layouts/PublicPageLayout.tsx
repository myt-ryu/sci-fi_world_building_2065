import type { ReactNode } from 'react';
import { SiteHeader } from '../common/SiteHeader';

interface PublicPageLayoutProps {
    children: ReactNode;
    className?: string;
}

const baseClassName =
    'min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,_#d9f5fc_0%,_#f3feff_42%,_#edf9f5_100%)] text-[#1f4f65] selection:bg-[#ffd1b4]/70';

export const PublicPageLayout = ({
    children,
    className = '',
}: PublicPageLayoutProps) => {
    return (
        <div className={`${baseClassName} ${className}`.trim()}>
            <SiteHeader />
            {children}
        </div>
    );
};
