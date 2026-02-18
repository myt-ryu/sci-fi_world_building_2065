import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Language } from '../types/wiki';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (ja: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('ja');

    const t = (ja: string, en: string) => {
        return language === 'ja' ? ja : en;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
