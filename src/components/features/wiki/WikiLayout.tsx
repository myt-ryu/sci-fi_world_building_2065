import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { wikiCategories } from '../../../data/wiki/categories';
import { SiteFooter } from '../../common/SiteFooter';

export const WikiLayout = ({ children }: { children: React.ReactNode }) => {
    const { language, setLanguage } = useLanguage();
    const { categoryId } = useParams();

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,_#eefbfe_0%,_#f2fffb_100%)] text-[#1f4f65] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#f8feff]/90 border-r border-[#b8e4ef] flex-shrink-0 sticky top-0 h-screen overflow-y-auto backdrop-blur-sm">
                <div className="p-6 border-b border-[#c7e9f2] flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold bg-gradient-to-r from-[#58b2d4] to-[#ff9f7a] bg-clip-text text-transparent">
                        {language === 'ja' ? '2065 世界設定' : '2065 World Settings'}
                    </Link>
                    <button
                        onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
                        className="text-xs font-mono px-2 py-1 rounded-lg border border-[#a8dbe9] hover:bg-[#e8f8fd] text-[#4f8094]"
                    >
                        {language.toUpperCase()}
                    </button>
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
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-8 py-12">
                    {children}
                </div>
                <SiteFooter />
            </main>
        </div>
    );
};
