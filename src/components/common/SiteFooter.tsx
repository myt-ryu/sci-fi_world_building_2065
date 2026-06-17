import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface SiteFooterProps {
    className?: string;
}

export const SiteFooter = ({ className = '' }: SiteFooterProps) => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`border-t border-[#57e5ff]/10 bg-[rgba(10,26,36,0.7)] backdrop-blur-sm ${className}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-sm text-[#5a8a9a] text-center md:text-left">
                    {`© ${currentYear} Sci-Fi World Building 2065. ${t('無断転載を禁じます。', 'All rights reserved.')}`}
                </p>
                <nav className="flex items-center gap-4 text-sm text-[#6a9aaa]">
                    <Link to="/" className="hover:text-[#57e5ff] transition-colors">
                        {t('トップ', 'Home')}
                    </Link>
                    <Link to="/wiki" className="hover:text-[#57e5ff] transition-colors">
                        {t('世界設定', 'World Settings')}
                    </Link>
                    <Link to="/about" className="hover:text-[#57e5ff] transition-colors">
                        {t('About', 'About')}
                    </Link>
                    <Link to="/use-cases" className="hover:text-[#57e5ff] transition-colors">
                        {t('活用提案', 'Use Cases')}
                    </Link>
                </nav>
            </div>
        </footer>
    );
};
