import { useLanguage } from '../../contexts/LanguageContext';

interface LanguageToggleButtonProps {
    className?: string;
}

export const LanguageToggleButton = ({ className = '' }: LanguageToggleButtonProps) => {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border border-[#57e5ff]/20 bg-[rgba(87,229,255,0.05)] backdrop-blur-md hover:bg-[rgba(87,229,255,0.12)] text-[#8ab8c8] hover:text-[#57e5ff] transition-all ${className}`.trim()}
        >
            {language === 'ja' ? 'EN' : 'JA'}
        </button>
    );
};
