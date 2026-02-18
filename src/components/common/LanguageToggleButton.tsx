import { useLanguage } from '../../contexts/LanguageContext';

interface LanguageToggleButtonProps {
    className?: string;
}

export const LanguageToggleButton = ({ className = '' }: LanguageToggleButtonProps) => {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
            className={`px-3 py-1.5 text-xs font-mono rounded-xl border border-[#9fd6e6] bg-white/85 backdrop-blur-md hover:bg-[#e9f8fd] text-[#477387] hover:text-[#1f4f65] transition-colors shadow-lg ${className}`.trim()}
        >
            {language === 'ja' ? 'EN' : 'JA'}
        </button>
    );
};
