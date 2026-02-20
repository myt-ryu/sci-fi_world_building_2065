import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { realWorldFacts } from '../../../data/wiki/real_world';

interface FactConnectionProps {
    categoryId: string;
}

export const FactConnection: React.FC<FactConnectionProps> = ({ categoryId }) => {
    const { language } = useLanguage();

    // カテゴリに応じて関連する事実をフィルタリング（現在はシンプルに特定カテゴリで表示）
    const isRelevant = categoryId === 'technology' || categoryId === 'society';

    if (!isRelevant) return null;

    return (
        <section className="mt-20 pt-12 border-t-2 border-dashed border-[#c3e7f1]">
            <div className="bg-gradient-to-r from-[#f0f9fc] to-white p-6 md:p-8 rounded-2xl border border-[#9fd5e5] shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#58b2d4] text-white text-lg ring-4 ring-[#58b2d4]/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.95 motor1.047a1 1 0 01.897.95V7h5a1 1 0 110 2h-5v7c0 .52-.405.95-.926.996L11 17a1 1 0 01-1-1V9H5a1 1 0 110-2h5V2a1 1 0 011.3-1.047z" clipRule="evenodd" />
                            <path d="M7 2a1 1 0 012 0v5h5a1 1 0 110 2H9v7a1 1 0 11-2 0V9H2a1 1 0 110-2h5V2z" />
                        </svg>
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-[#1f5f7c]">
                        {language === 'ja' ? '2065年から現代への出口' : 'Exit from 2065 to the Present'}
                    </h2>
                </div>

                <p className="text-[#3f6f83] mb-8 text-sm md:text-base leading-relaxed">
                    {language === 'ja'
                        ? 'この世界設定は、2020年代に始まった「ムーンショット目標1」などの現実の科学技術に基づいています。詳細な研究背景については、以下の公式サイトをご覧ください。'
                        : 'This world setting is based on real-world science and technology, such as "Moonshot Goal 1," which began in the 2020s. For more details on the research background, please visit the official sites below.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {realWorldFacts.map((fact) => (
                        <div key={fact.id} className="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-[#c3e7f1] hover:border-[#58b2d4] transition-colors group">
                            <h3 className="font-bold text-[#245f78] mb-2 flex items-center justify-between">
                                {language === 'ja' ? fact.title.ja : fact.title.en}
                                <span className="text-[10px] bg-[#e1f5fe] text-[#58b2d4] px-2 py-0.5 rounded-full uppercase tracking-wider">Fact</span>
                            </h3>
                            <p className="text-xs md:text-sm text-[#4f7f93] mb-4 line-clamp-3">
                                {language === 'ja' ? fact.content.ja : fact.content.en}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {fact.links.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-medium text-[#ff9d79] hover:text-[#eb8b66] bg-white border border-[#ff9d79]/30 px-3 py-1.5 rounded-lg transition-all hover:shadow-md"
                                    >
                                        {link.label}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
