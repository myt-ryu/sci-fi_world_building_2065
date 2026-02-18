import { useLanguage } from '../contexts/LanguageContext';
import { SiteFooter } from '../components/common/SiteFooter';
import { PublicPageLayout } from '../components/layouts/PublicPageLayout';

export const UseCases = () => {
    const { t } = useLanguage();

    return (
        <PublicPageLayout
            quickLinks={[
                { to: '/', label: t('トップへ戻る', 'Back to Home') },
                { to: '/wiki', label: t('世界設定を見る', 'Open World Settings') },
                { to: '/about', label: t('Aboutを見る', 'About Project') },
            ]}
            quickLinksContainerClassName="max-w-6xl"
        >
            <main className="relative flex-1 w-full max-w-6xl mx-auto px-6 lg:px-8 pt-10 pb-20 space-y-14 overflow-hidden">
                <div className="pointer-events-none absolute -top-20 -left-24 h-56 w-56 rounded-full bg-[#9fe9de]/35 blur-[95px]"></div>
                <div className="pointer-events-none absolute top-56 -right-20 h-64 w-64 rounded-full bg-[#8ad9ef]/28 blur-[110px]"></div>

                <header className="relative text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/75 border border-[#a6ddea] text-[#3d7e95] text-sm mb-6 shadow-[0_6px_18px_rgba(117,182,204,0.22)]">
                        <span className="w-2 h-2 rounded-full bg-[#6dc6dd] animate-pulse"></span>
                        {t('活用提案', 'Use Cases')}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#57afd2] to-[#ff9d79] mb-5">
                        {t('2065年世界設定の活用ガイド', 'Practical Guide to Using the 2065 World')}
                    </h1>
                    <p className="text-[#4b7b8f] text-lg max-w-4xl mx-auto leading-relaxed">
                        {t(
                            'この世界設定は、科学コミュニケーションのためのSFプロトタイピング基盤です。技術の可能性だけでなく、社会実装時の価値衝突や倫理的論点を対話可能な形にするために活用できます。',
                            'This world setting is an SF prototyping foundation for science communication. It helps people discuss not only technological possibilities but also social conflicts and ethical questions.',
                        )}
                    </p>
                </header>

                <section className="relative space-y-5">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#22586f]">
                        {t('目的', 'Purpose')}
                    </h2>
                    <p className="text-[#3f6f84] leading-[2.05] md:text-lg max-w-5xl first-letter:text-4xl first-letter:font-bold first-letter:text-[#58b2d4] first-letter:mr-1">
                        {t(
                            '2026年のSci-fi世界設定はムーンショット型研究開発制度 目標1 金井プロジェクト Internet of Brains（IoB）内で活動しているサイエンスコミュニケーションプロジェクトであるNeu Worldの施策の一つです。Neu Worldでは、SFプロトタイピングの手法を用いて、まだ社会実装されていないニューロテックのような科学技術について、これから先の未来でどういった社会実装をしていきたいか、専門家だけではなく、今を生きる皆さん一人ひとりの期待や不安を反映しながら研究開発を進めていくためのコミュニケーションをするプロジェクトとなります。皆さんが自由にこの世界設定をもとにいろんな可能性であったりとか、課題について考えていただくための素材として制作しました。この世界設定を用いて、例えばワークショップをしてみる、実際に自分で2050年ニューロテックが社会実装された世界のSFを作ってみる、皆さんそれぞれが使いやすいようにこの世界設定を活用していただくことを目標に制作しました。',
                            'The 2026 sci-fi world setting is one of the initiatives of Neu World, a science communication project within the Moonshot R&D Program Goal 1, Ryota Kanai Project, Internet of Brains (IoB). Neu World uses SF prototyping to create communication around future social implementation of emerging technologies such as neurotech that are not yet deployed in society. The goal is to advance research and development by reflecting not only expert perspectives, but also the hopes and concerns of people living today. This world setting was created as material to help people freely think about possibilities and challenges. It is intended to be used in ways that fit each person, for example by running workshops or creating your own SF scenarios of a 2050 world where neurotech has been socially implemented.',
                        )}
                    </p>
                </section>

                <section className="space-y-5">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#22586f]">
                        {t('活用シーン', 'Suggested Contexts')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <article className="group relative overflow-hidden rounded-2xl px-6 py-5 bg-[linear-gradient(145deg,_rgba(228,249,255,0.9)_0%,_rgba(237,255,247,0.92)_100%)] shadow-[0_14px_32px_rgba(106,185,208,0.18)] transition-transform hover:-translate-y-0.5">
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">{t('教育・ワークショップ', 'Education and Workshops')}</h3>
                            <p className="text-[#4f7d90] leading-relaxed">{t('高校・大学・市民講座で、未来の社会課題を題材に討論と創作を行う。', 'Use future social challenges as prompts for debate and creative prototyping in schools and public programs.')}</p>
                        </article>
                        <article className="group relative overflow-hidden rounded-2xl px-6 py-5 bg-[linear-gradient(145deg,_rgba(232,247,255,0.92)_0%,_rgba(240,253,255,0.86)_100%)] shadow-[0_14px_32px_rgba(106,185,208,0.16)] transition-transform hover:-translate-y-0.5">
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">{t('研究コミュニケーション', 'Research Communication')}</h3>
                            <p className="text-[#4f7d90] leading-relaxed">{t('研究成果を生活者視点の物語に翻訳し、研究の意義と影響を伝える。', 'Translate research into citizen-centered narratives to communicate significance and impact.')}</p>
                        </article>
                        <article className="group relative overflow-hidden rounded-2xl px-6 py-5 bg-[linear-gradient(145deg,_rgba(238,250,255,0.92)_0%,_rgba(235,248,255,0.88)_100%)] shadow-[0_14px_32px_rgba(106,185,208,0.16)] transition-transform hover:-translate-y-0.5">
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">{t('政策・企業対話', 'Policy and Industry Dialogues')}</h3>
                            <p className="text-[#4f7d90] leading-relaxed">{t('制度設計や事業構想の初期段階で、ステークホルダー間の価値観のズレを確認する。', 'At early planning stages, align stakeholder values and reveal potential conflicts.')}</p>
                        </article>
                        <article className="group relative overflow-hidden rounded-2xl px-6 py-5 bg-[linear-gradient(145deg,_rgba(230,247,255,0.9)_0%,_rgba(235,255,250,0.9)_100%)] shadow-[0_14px_32px_rgba(106,185,208,0.18)] transition-transform hover:-translate-y-0.5">
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">{t('展示・メディア企画', 'Exhibitions and Media')}</h3>
                            <p className="text-[#4f7d90] leading-relaxed">{t('来場者参加型の未来体験として、問いを持ち帰れる展示導線を設計する。', 'Design participatory futures experiences where audiences leave with questions to explore.')}</p>
                        </article>
                    </div>
                </section>

                <section className="space-y-5">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#22586f]">
                        {t('90分ワークショップの基本構成', '90-Minute Workshop Template')}
                    </h2>
                    <div className="relative">
                        <ol className="space-y-5 text-[#4f7d90]">
                            <li className="relative pl-16">
                                <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#66bfdc] text-white font-bold shadow-[0_10px_22px_rgba(87,174,203,0.35)]">1</span>
                                <div className="rounded-2xl px-5 py-4 bg-[linear-gradient(145deg,_rgba(231,249,255,0.92)_0%,_rgba(239,255,248,0.9)_100%)] shadow-[0_10px_24px_rgba(105,182,205,0.14)]">
                                    <span className="font-bold text-[#22586f]">{t('1. 導入（10分）', '1. Intro (10 min)')}</span>
                                    <p>{t('テーマと問いを提示し、参加者の前提をそろえる。', 'Set the theme and central question to align participant assumptions.')}</p>
                                </div>
                            </li>
                            <li className="relative pl-16">
                                <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#66bfdc] text-white font-bold shadow-[0_10px_22px_rgba(87,174,203,0.35)]">2</span>
                                <div className="rounded-2xl px-5 py-4 bg-[linear-gradient(145deg,_rgba(231,249,255,0.92)_0%,_rgba(239,255,248,0.9)_100%)] shadow-[0_10px_24px_rgba(105,182,205,0.14)]">
                                    <span className="font-bold text-[#22586f]">{t('2. 世界設定インプット（20分）', '2. World Briefing (20 min)')}</span>
                                    <p>{t('Wikiを使って技術・社会・倫理の背景を共有する。', 'Use the wiki to share technology, social, and ethical context.')}</p>
                                </div>
                            </li>
                            <li className="relative pl-16">
                                <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#66bfdc] text-white font-bold shadow-[0_10px_22px_rgba(87,174,203,0.35)]">3</span>
                                <div className="rounded-2xl px-5 py-4 bg-[linear-gradient(145deg,_rgba(231,249,255,0.92)_0%,_rgba(239,255,248,0.9)_100%)] shadow-[0_10px_24px_rgba(105,182,205,0.14)]">
                                    <span className="font-bold text-[#22586f]">{t('3. 論点選定（15分）', '3. Focus Selection (15 min)')}</span>
                                    <p>{t('各チームが扱う課題を1つ選び、対象者と場面を定義する。', 'Each team chooses one issue and defines its stakeholders and scenario.')}</p>
                                </div>
                            </li>
                            <li className="relative pl-16">
                                <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#66bfdc] text-white font-bold shadow-[0_10px_22px_rgba(87,174,203,0.35)]">4</span>
                                <div className="rounded-2xl px-5 py-4 bg-[linear-gradient(145deg,_rgba(231,249,255,0.92)_0%,_rgba(239,255,248,0.9)_100%)] shadow-[0_10px_24px_rgba(105,182,205,0.14)]">
                                    <span className="font-bold text-[#22586f]">{t('4. SFプロトタイピング（30分）', '4. SF Prototyping (30 min)')}</span>
                                    <p>{t('未来のプロダクト、制度、サービスを短い物語として構築する。', 'Build a short narrative around a future product, policy, or service.')}</p>
                                </div>
                            </li>
                            <li className="relative pl-16">
                                <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#66bfdc] text-white font-bold shadow-[0_10px_22px_rgba(87,174,203,0.35)]">5</span>
                                <div className="rounded-2xl px-5 py-4 bg-[linear-gradient(145deg,_rgba(231,249,255,0.92)_0%,_rgba(239,255,248,0.9)_100%)] shadow-[0_10px_24px_rgba(105,182,205,0.14)]">
                                    <span className="font-bold text-[#22586f]">{t('5. 共有と振り返り（15分）', '5. Share and Reflect (15 min)')}</span>
                                    <p>{t('便益・リスク・必要条件を整理し、次アクションを言語化する。', 'Capture benefits, risks, prerequisites, and next actions.')}</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </section>
            </main>

            <SiteFooter className="mt-auto" />
        </PublicPageLayout>
    );
};
