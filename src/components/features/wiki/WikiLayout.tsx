import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { wikiCategories } from '../../../data/wiki/categories';
import { SiteFooter } from '../../common/SiteFooter';
import { LanguageToggleButton } from '../../common/LanguageToggleButton';
import { SystemOnlineBadge } from '../../common/SystemOnlineBadge';

export const WikiLayout = ({ children }: { children: React.ReactNode }) => {
    const { language } = useLanguage();
    const { categoryId } = useParams();

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,_#eefbfe_0%,_#f2fffb_100%)] text-[#1f4f65] flex flex-col">
            <div className="w-full flex justify-center pt-3">
                <SystemOnlineBadge />
            </div>
            <div className="fixed top-4 right-4 z-50">
                <LanguageToggleButton />
            </div>
            <div className="flex flex-1 mt-4">
                {/* Sidebar */}
                <aside className="w-64 bg-[#f8feff]/88 border-r border-[#b8e4ef] flex-shrink-0 sticky top-0 h-screen overflow-y-auto backdrop-blur-sm">
                    <div className="p-6 border-b border-[#c7e9f2]">
                        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-[#58b2d4] to-[#ff9f7a] bg-clip-text text-transparent">
                            {language === 'ja' ? '2065 世界設定' : '2065 World Settings'}
                        </Link>
                    </div>
                    <nav className="p-4 space-y-1">
                        {wikiCategories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/wiki/${cat.id}`}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${categoryId === cat.id
                                    ? 'bg-[#dcf4fb] text-[#1f5f7c] border border-[#9ed7e7]'
                                    : 'text-[#537f92] hover:bg-[#edfaff] hover:text-[#205a73]'
                                    }`}
                            >
                                {language === 'ja' ? cat.title.ja : cat.title.en}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-h-screen flex flex-col">
                    <div className="max-w-5xl xl:max-w-6xl mx-auto px-8 pt-12 pb-12">
                        {children}
                    </div>
                    <SiteFooter className="mt-auto" />
                </main>
            </div>
        </div>
    );
};
