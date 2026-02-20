import { useLanguage } from '../contexts/LanguageContext';
import { SiteFooter } from '../components/common/SiteFooter';
import { PublicPageLayout } from '../components/layouts/PublicPageLayout';
import { SEO } from '../components/common/SEO';

export const UseCases = () => {
    const { t } = useLanguage();

    return (
        <PublicPageLayout
            quickLinks={[
                { to: '/', label: t('トップへ戻る', 'Back to Home') },
                { to: '/wiki', label: t('世界設定を見る', 'Open World Settings') },
                { to: '/about', label: t('Aboutを見る', 'About Project') },
            ]}
            quickLinksContainerClassName="max-w-7xl"
        >
            <SEO title={t('活用ガイド', 'Practical Guide')} />
            <main className="relative flex-1 w-full max-w-7xl xl:max-w-[88rem] mx-auto px-6 lg:px-8 pt-10 pb-20 space-y-16 overflow-hidden">
                <div className="pointer-events-none absolute -top-20 -left-24 h-56 w-56 rounded-full bg-[#9fe9de]/35 blur-[95px]"></div>
                <div className="pointer-events-none absolute top-56 -right-20 h-64 w-64 rounded-full bg-[#8ad9ef]/28 blur-[110px]"></div>
                <div className="pointer-events-none absolute bottom-24 left-1/3 h-48 w-48 rounded-full bg-[#ffd8c9]/20 blur-[100px]"></div>

                <header className="relative overflow-hidden rounded-[2.25rem] border border-[#b8e6ef] bg-[linear-gradient(135deg,_rgba(237,251,255,0.95)_0%,_rgba(241,255,248,0.96)_45%,_rgba(248,243,255,0.92)_100%)] px-6 py-12 md:px-12 md:py-14 text-center shadow-[0_24px_56px_rgba(112,191,214,0.24)]">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#57afd2] to-[#ff9d79] mb-5">
                        {t('2065年世界設定の活用ガイド', 'Practical Guide to Using the 2065 World')}
                    </h1>
                    <p className="text-[#4b7b8f] text-lg max-w-5xl mx-auto leading-relaxed">
                        {t(
                            'この世界設定は、科学コミュニケーションのためのSFプロトタイピング基盤です。技術の可能性だけでなく、社会実装時の価値衝突や倫理的論点を対話可能な形にするために活用できます。',
                            'This world setting is an SF prototyping foundation for science communication. It helps people discuss not only technological possibilities but also social conflicts and ethical questions.',
                        )}
                    </p>
                </header>

                <section className="relative overflow-hidden rounded-[2rem] border border-[#b8e6ef]/80 bg-[linear-gradient(150deg,_rgba(232,249,255,0.84)_0%,_rgba(237,255,245,0.84)_100%)] px-7 py-8 md:px-10 md:py-10 space-y-5 shadow-[0_18px_46px_rgba(108,186,209,0.18)]">
                    <div className="pointer-events-none absolute -right-10 top-2 h-32 w-32 rounded-full bg-[#9edcf0]/30 blur-[70px]"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#22586f]">
                        {t('目的', 'Purpose')}
                    </h2>
                    <p className="text-[#3f6f84] leading-[2.05] md:text-lg max-w-6xl first-letter:text-4xl first-letter:font-bold first-letter:text-[#58b2d4] first-letter:mr-1">
                        {t(
                            '2026年のSci-fi世界設定はムーンショット型研究開発制度 目標1 金井プロジェクト Internet of Brains（IoB）内で活動しているサイエンスコミュニケーションプロジェクトであるNeu Worldの施策の一つです。Neu Worldでは、SFプロトタイピングの手法を用いて、まだ社会実装されていないニューロテックのような科学技術について、これから先の未来でどういった社会実装をしていきたいか、専門家だけではなく、今を生きる皆さん一人ひとりの期待や不安を反映しながら研究開発を進めていくためのコミュニケーションをするプロジェクトとなります。皆さんが自由にこの世界設定をもとにいろんな可能性であったりとか、課題について考えていただくための素材として制作しました。この世界設定を用いて、例えばワークショップをしてみる、実際に自分で2050年ニューロテックが社会実装された世界のSFを作ってみる、皆さんそれぞれが使いやすいようにこの世界設定を活用していただくことを目標に制作しました。',
                            'The 2026 sci-fi world setting is one of the initiatives of Neu World, a science communication project within the Moonshot R&D Program Goal 1, Ryota Kanai Project, Internet of Brains (IoB). Neu World uses SF prototyping to create communication around future social implementation of emerging technologies such as neurotech that are not yet deployed in society. The goal is to advance research and development by reflecting not only expert perspectives, but also the hopes and concerns of people living today. This world setting was created as material to help people freely think about possibilities and challenges. It is intended to be used in ways that fit each person, for example by running workshops or creating your own SF scenarios of a 2050 world where neurotech has been socially implemented.',
                        )}
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#22586f]">
                        {t('活用シーン', 'Suggested Contexts')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <article className="group relative overflow-hidden rounded-[1.65rem] border border-[#b7e4ee]/85 px-6 py-5 bg-[linear-gradient(145deg,_rgba(228,249,255,0.95)_0%,_rgba(237,255,247,0.96)_100%)] shadow-[0_14px_32px_rgba(106,185,208,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(109,190,214,0.22)]">
                            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#86d8ec]/32 blur-2xl"></div>
                            <span className="inline-flex items-center rounded-full border border-[#9ad8e9] bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-[#4f7f93] mb-3">SCENE 01</span>
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">{t('教育・ワークショップ', 'Education and Workshops')}</h3>
                            <p className="text-[#4f7d90] leading-relaxed">{t('高校・大学・市民講座で、未来の社会課題を題材に討論と創作を行う。', 'Use future social challenges as prompts for debate and creative prototyping in schools and public programs.')}</p>
                        </article>
                        <article className="group relative overflow-hidden rounded-[1.65rem] border border-[#b7e4ee]/85 px-6 py-5 bg-[linear-gradient(145deg,_rgba(232,247,255,0.96)_0%,_rgba(245,248,255,0.9)_100%)] shadow-[0_14px_32px_rgba(106,185,208,0.16)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(109,190,214,0.22)]">
                            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#9fcff9]/30 blur-2xl"></div>
                            <span className="inline-flex items-center rounded-full border border-[#a7d7f0] bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-[#4f7f93] mb-3">SCENE 02</span>
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">{t('研究コミュニケーション', 'Research Communication')}</h3>
                            <p className="text-[#4f7d90] leading-relaxed">{t('研究成果を生活者視点の物語に翻訳し、研究の意義と影響を伝える。', 'Translate research into citizen-centered narratives to communicate significance and impact.')}</p>
                        </article>
                        <article className="group relative overflow-hidden rounded-[1.65rem] border border-[#b7e4ee]/85 px-6 py-5 bg-[linear-gradient(145deg,_rgba(238,250,255,0.95)_0%,_rgba(233,248,255,0.92)_100%)] shadow-[0_14px_32px_rgba(106,185,208,0.16)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(109,190,214,0.22)]">
                            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#95d4f1]/28 blur-2xl"></div>
                            <span className="inline-flex items-center rounded-full border border-[#a0d8eb] bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-[#4f7f93] mb-3">SCENE 03</span>
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">{t('政策・企業対話', 'Policy and Industry Dialogues')}</h3>
                            <p className="text-[#4f7d90] leading-relaxed">{t('制度設計や事業構想の初期段階で、ステークホルダー間の価値観のズレを確認する。', 'At early planning stages, align stakeholder values and reveal potential conflicts.')}</p>
                        </article>
                        <article className="group relative overflow-hidden rounded-[1.65rem] border border-[#b7e4ee]/85 px-6 py-5 bg-[linear-gradient(145deg,_rgba(230,247,255,0.94)_0%,_rgba(235,255,250,0.96)_100%)] shadow-[0_14px_32px_rgba(106,185,208,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(109,190,214,0.22)]">
                            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#ffcdbd]/30 blur-2xl"></div>
                            <span className="inline-flex items-center rounded-full border border-[#ffcdbd] bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-[#4f7f93] mb-3">SCENE 04</span>
                            <h3 className="text-xl font-bold text-[#22586f] mb-2">{t('展示・メディア企画', 'Exhibitions and Media')}</h3>
                            <p className="text-[#4f7d90] leading-relaxed">{t('来場者参加型の未来体験として、問いを持ち帰れる展示導線を設計する。', 'Design participatory futures experiences where audiences leave with questions to explore.')}</p>
                        </article>
                    </div>
                </section>

                <section className="relative overflow-hidden rounded-[2rem] border border-[#b7e4ee]/90 bg-[linear-gradient(145deg,_rgba(235,251,255,0.92)_0%,_rgba(238,255,249,0.93)_100%)] p-6 md:p-8 space-y-6 shadow-[0_16px_42px_rgba(109,187,210,0.18)]">
                    <div className="pointer-events-none absolute -right-16 bottom-4 h-44 w-44 rounded-full bg-[#8dd9ee]/28 blur-[90px]"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#22586f]">
                        {t('Projectからの問い', 'Questions from the Project')}
                    </h2>
                    <div className="relative mt-2">
                        <p className="text-[#4b7b8f] text-[0.95rem] md:text-base leading-relaxed mb-8">
                            {t(
                                'Neu Worldのプロジェクトチームが、2065年の世界設定を通じて皆さんと一緒に考えたい「10の問い」です。ワークショップやディスカッションの出発点としてご活用ください。',
                                'These are 10 questions the Neu World project team wants to explore with you through the 2065 world setting. Use them as a starting point for workshops and discussions.'
                            )}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
                            {[
                                {
                                    j: '脳波データを企業に提供する代わりに豊かな生活保障が得られるとしたら、あなたはその条件を受け入れますか？',
                                    e: 'If you could receive comprehensive life support in exchange for providing your continuous brainwave data to a corporation, would you accept those terms?'
                                },
                                {
                                    j: 'もしあなたの家族が「すれ違いをなくすために、互いの感情を常にクラウドで共有したい」と望んだら、あなたはどう答えますか？',
                                    e: 'If your family member wanted to "constantly share emotions via the cloud to prevent misunderstandings," how would you respond?'
                                },
                                {
                                    j: '記憶の編集が可能になった社会で、「トラウマとなる辛い過去を消してほしい」と願う友人に対し、あなたなら賛成しますか、止めますか？',
                                    e: 'In a society where memory editing is possible, would you support or try to stop a friend who wishes to "erase a painful, traumatic memory"?'
                                },
                                {
                                    j: '誰もが仮想空間で「理想の姿」を手に入れられる世界において、あなたが最後まで手放したくない「現実の自分」の部分は何ですか？',
                                    e: 'In a world where everyone can obtain their "ideal appearance" in virtual space, what part of your "real self" would you least want to let go of?'
                                },
                                {
                                    j: 'ニューロ技術にアクセスできず「生身の脳」のまま生きることを選んだ人々から見て、感覚や知能が拡張された社会はどう映ると思いますか？',
                                    e: 'From the perspective of those who choose to live with "natural brains" and cannot access neuro-augmentation, how do you think they perceive the augmented society?'
                                },
                                {
                                    j: 'あなたの思考を完璧にコピーしたAIが、あなたの代わりに誰かを深く傷つけてしまったとき、あなたは被害者にどう謝罪しますか？',
                                    e: 'When an AI agent that perfectly copies your thoughts deeply hurts someone on your behalf, how would you sincerely apologize to the victim?'
                                },
                                {
                                    j: '言葉を介さず感覚を直接共有（ブレイン・ネットワーキング）することが当たり前の世界で、それに適応できない、あるいは拒否する人々の居場所はどう作ればよいでしょうか？',
                                    e: 'In a world where direct sensory sharing (brain networking) is the norm, how should we create spaces for those who cannot adapt to or choose to refuse it?'
                                },
                                {
                                    j: '死者の意識をAIとして永遠に身近に残せる社会で育つ子供たちは、「命の尊さ」や「別れ」をどのように解釈すると思いますか？',
                                    e: 'How do you think children growing up in a society where the consciousness of the deceased can be kept nearby forever as AI will interpret the "sanctity of life" and "parting"?'
                                },
                                {
                                    j: '努力せずとも「スキルの直接インストール」で能力を得られる世界において、学校の先生は生徒たちに何を教える存在になるべきでしょうか？',
                                    e: 'In a world where capabilities can be gained through "direct skill installation" without effort, what role do you think school teachers should play for their students?'
                                },
                                {
                                    j: 'もしあなたがこの2065年のインフラ（IoB社会）を設計する最高責任者だとしたら、社会を守るために「絶対に実装してはいけない機能」は何だと考えますか？',
                                    e: 'If you were the chief architect designing the infrastructure of this 2065 IoB society, what function would you consider "absolutely must not be implemented" to protect humanity?'
                                }
                            ].map((q, i) => (
                                <article key={i} className="group flex items-start space-x-4 rounded-2xl border border-[#b7e3ee]/80 px-6 py-5 bg-white/72 backdrop-blur-sm shadow-[0_8px_20px_rgba(105,182,205,0.12)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(105,182,205,0.22)]">
                                    <span className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(145deg,_#67bfdc,_#7bd6ec)] text-white font-bold shadow-[0_6px_14px_rgba(87,174,203,0.3)] text-sm group-hover:scale-105 transition-transform">
                                        Q{i + 1}
                                    </span>
                                    <div className="flex-1 pt-0.5">
                                        <p className="font-bold text-[#22586f] leading-[1.7] text-[0.95rem]">
                                            {t(q.j, q.e)}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter className="mt-auto" />
        </PublicPageLayout>
    );
};
