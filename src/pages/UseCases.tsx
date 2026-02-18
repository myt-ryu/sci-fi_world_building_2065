import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { SiteFooter } from '../components/common/SiteFooter';

export const UseCases = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#d9f5fc_0%,_#f3feff_42%,_#edf9f5_100%)] text-[#1f4f65] selection:bg-[#ffd1b4]/70">
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
                    className="px-3 py-1.5 text-xs font-mono rounded-xl border border-[#9fd6e6] bg-white/85 backdrop-blur-md hover:bg-[#e9f8fd] text-[#477387] hover:text-[#1f4f65] transition-colors shadow-lg"
                >
                    {language === 'ja' ? 'EN' : 'JA'}
                </button>
            </div>

            <main className="max-w-6xl mx-auto px-6 lg:px-8 py-20 space-y-10">
                <header className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#a6ddea] text-[#3d7e95] text-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#6dc6dd] animate-pulse"></span>
                        {t('活用提案', 'Use Cases')}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#21566f] mb-4">
                        {t('2065年世界設定の活用ガイド', 'Practical Guide to Using the 2065 World')}
                    </h1>
                    <p className="text-[#5b8395] text-lg max-w-4xl mx-auto leading-relaxed">
                        {t(
                            'この世界設定は、科学コミュニケーションのためのSFプロトタイピング基盤です。技術の可能性だけでなく、社会実装時の価値衝突や倫理的論点を対話可能な形にするために活用できます。',
                            'This world setting is an SF prototyping foundation for science communication. It helps people discuss not only technological possibilities but also social conflicts and ethical questions.',
                        )}
                    </p>
                </header>

                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        to="/"
                        className="px-4 py-2 rounded-lg border border-[#a6ddea] bg-white/80 hover:bg-[#ebf9fd] text-[#2e6b84] text-sm font-medium transition-colors"
                    >
                        {t('トップへ戻る', 'Back to Home')}
                    </Link>
                    <Link
                        to="/wiki"
                        className="px-4 py-2 rounded-lg border border-[#a6ddea] bg-white/80 hover:bg-[#ebf9fd] text-[#2e6b84] text-sm font-medium transition-colors"
                    >
                        {t('世界設定を見る', 'Open World Settings')}
                    </Link>
                    <Link
                        to="/about"
                        className="px-4 py-2 rounded-lg border border-[#a6ddea] bg-white/80 hover:bg-[#ebf9fd] text-[#2e6b84] text-sm font-medium transition-colors"
                    >
                        {t('Aboutを見る', 'About Project')}
                    </Link>
                </div>

                <section className="space-y-5">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#22586f]">
                        {t('活用の目的', 'Primary Outcomes')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <article className="rounded-2xl border border-[#b7e4ee] bg-white/85 p-6 shadow-[0_12px_28px_rgba(111,184,209,0.16)]">
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">
                                {t('複雑な未来像を共有する', 'Share Complex Futures')}
                            </h3>
                            <p className="text-[#4f7d90] leading-relaxed">
                                {t('専門家と非専門家の間で、技術・制度・生活がつながった未来像を共通言語化します。', 'Create shared language between experts and non-experts around technology, policy, and daily life.')}
                            </p>
                        </article>
                        <article className="rounded-2xl border border-[#b7e4ee] bg-white/85 p-6 shadow-[0_12px_28px_rgba(111,184,209,0.16)]">
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">
                                {t('倫理論点を早期に可視化する', 'Surface Ethics Early')}
                            </h3>
                            <p className="text-[#4f7d90] leading-relaxed">
                                {t('研究開発や実装前段階で、便益とリスク、包摂と排除の論点を立体的に抽出します。', 'Before deployment, identify tradeoffs across benefits, risks, inclusion, and exclusion.')}
                            </p>
                        </article>
                        <article className="rounded-2xl border border-[#b7e4ee] bg-white/85 p-6 shadow-[0_12px_28px_rgba(111,184,209,0.16)]">
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">
                                {t('対話から具体アクションへ接続する', 'Connect Dialogue to Action')}
                            </h3>
                            <p className="text-[#4f7d90] leading-relaxed">
                                {t('議論結果を、研究テーマ、ガイドライン、展示企画、教育教材へ落とし込みます。', 'Turn dialogue outcomes into research agendas, guidelines, exhibition plans, and learning materials.')}
                            </p>
                        </article>
                    </div>
                </section>

                <section className="space-y-5">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#22586f]">
                        {t('活用シーン', 'Suggested Contexts')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <article className="rounded-2xl border border-[#b7e4ee] bg-white/85 p-6">
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">{t('教育・ワークショップ', 'Education and Workshops')}</h3>
                            <p className="text-[#4f7d90]">{t('高校・大学・市民講座で、未来の社会課題を題材に討論と創作を行う。', 'Use future social challenges as prompts for debate and creative prototyping in schools and public programs.')}</p>
                        </article>
                        <article className="rounded-2xl border border-[#b7e4ee] bg-white/85 p-6">
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">{t('研究コミュニケーション', 'Research Communication')}</h3>
                            <p className="text-[#4f7d90]">{t('研究成果を生活者視点の物語に翻訳し、研究の意義と影響を伝える。', 'Translate research into citizen-centered narratives to communicate significance and impact.')}</p>
                        </article>
                        <article className="rounded-2xl border border-[#b7e4ee] bg-white/85 p-6">
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">{t('政策・企業対話', 'Policy and Industry Dialogues')}</h3>
                            <p className="text-[#4f7d90]">{t('制度設計や事業構想の初期段階で、ステークホルダー間の価値観のズレを確認する。', 'At early planning stages, align stakeholder values and reveal potential conflicts.')}</p>
                        </article>
                        <article className="rounded-2xl border border-[#b7e4ee] bg-white/85 p-6">
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">{t('展示・メディア企画', 'Exhibitions and Media')}</h3>
                            <p className="text-[#4f7d90]">{t('来場者参加型の未来体験として、問いを持ち帰れる展示導線を設計する。', 'Design participatory futures experiences where audiences leave with questions to explore.')}</p>
                        </article>
                    </div>
                </section>

                <section className="space-y-5">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#22586f]">
                        {t('90分ワークショップの基本構成', '90-Minute Workshop Template')}
                    </h2>
                    <div className="rounded-2xl border border-[#b7e4ee] bg-white/85 p-6 md:p-8">
                        <ol className="space-y-4 text-[#4f7d90]">
                            <li>
                                <span className="font-bold text-[#22586f]">{t('1. 導入（10分）', '1. Intro (10 min)')}</span>
                                <p>{t('テーマと問いを提示し、参加者の前提をそろえる。', 'Set the theme and central question to align participant assumptions.')}</p>
                            </li>
                            <li>
                                <span className="font-bold text-[#22586f]">{t('2. 世界設定インプット（20分）', '2. World Briefing (20 min)')}</span>
                                <p>{t('Wikiを使って技術・社会・倫理の背景を共有する。', 'Use the wiki to share technology, social, and ethical context.')}</p>
                            </li>
                            <li>
                                <span className="font-bold text-[#22586f]">{t('3. 論点選定（15分）', '3. Focus Selection (15 min)')}</span>
                                <p>{t('各チームが扱う課題を1つ選び、対象者と場面を定義する。', 'Each team chooses one issue and defines its stakeholders and scenario.')}</p>
                            </li>
                            <li>
                                <span className="font-bold text-[#22586f]">{t('4. SFプロトタイピング（30分）', '4. SF Prototyping (30 min)')}</span>
                                <p>{t('未来のプロダクト、制度、サービスを短い物語として構築する。', 'Build a short narrative around a future product, policy, or service.')}</p>
                            </li>
                            <li>
                                <span className="font-bold text-[#22586f]">{t('5. 共有と振り返り（15分）', '5. Share and Reflect (15 min)')}</span>
                                <p>{t('便益・リスク・必要条件を整理し、次アクションを言語化する。', 'Capture benefits, risks, prerequisites, and next actions.')}</p>
                            </li>
                        </ol>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
};
