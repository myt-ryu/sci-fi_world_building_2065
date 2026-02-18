import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { WikiLayout } from './WikiLayout';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getArticlesByCategory } from '../../../data/wiki';
import wiredGraphicImage from '../../../assets/images/world/wired-graphic-record.png';
import wiredGraphicPdf from '../../../assets/images/world/WIREDグラレコのコピー.pdf';

const sectionTitlePattern = /^\d+\.\s*.+/;
const sectionMetaPattern = /^（.+）$/;
const topicPattern = /^【.+】$/;
const markerPattern = /^■.+/;
const footerPattern = /^(SCI-FI PROTOTYPING LAB|© Condé Nast Japan)$/;
type ReadingMode = 'original' | 'easy';

const headingBlockPattern = /^#{1,6}\s/;
const listBlockPattern = /^[-*>]\s/;
const h3BlockPattern = /^###\s/;
const iobHeadingPattern = /^###\s*IoB\b/i;
const cyberneticAvatarHeadingPattern = /^###\s*サイバネティックアバター/;
const sentenceEndPattern = /[。！？!?」』）]$/;
const textStartPattern = /^[ぁ-んァ-ヶ一-龠a-zA-Z0-9「『（]/;
const iobEasyBody = [
    '人間の脳をインターネットのようにつなぐ新しい技術があります。',
    'この技術では、考えていることや感じていることを、直接ほかの人と共有できます。言葉や画面を使わなくても、脳と脳で情報をやり取りする「ブレイン・トゥ・ブレイン通信」が可能になります。',
    'この仕組みを使うと、人はそれぞれ自分専用の「見え方の設定」を持つことができます。たとえば、同じ景色を見ていても、人によって強調される情報や感じ方が違う、そんな「自分だけの現実体験」が生まれます。',
    'また、この脳のネットワークは、人間の知識や知恵を集めて保存する場所にもなっています。',
    '過去の偉人や、すでに亡くなった人の考え方や経験をデータとして残し、未来の人たちが学べるようにする――これを「未来遺産」と呼びます。',
    'このような脳のネットワークは、社会のあらゆる場面で使われるようになり、人と人のコミュニケーションの仕方や、みんなで物事を決める方法そのものを、大きく変えていきました。',
].join('\n');
const cyberneticAvatarEasyBody = [
    '自分の代わりとなる分身（アバター）を、現実の世界や仮想空間で遠くから操作できる技術があります。',
    'このアバターは、ロボットの体だったり、仮想空間のキャラクターだったりしますが、人の考えや動きをほぼ同時に反映して動きます。',
    'この技術を使えば、ひとりの人が同時にいくつもの仕事をしたり、離れた場所にいながら作業を行ったりすることができます。たとえば、自宅にいながら遠隔地の仕事をしたり、危険な場所に行かずに安全な場所から作業を進めることが可能になります。',
    'そのため、働く人が足りないという問題を助けたり、災害現場や宇宙、深海など人が行きにくい環境での作業、さらに介護や医療のサポートなど、さまざまな分野での活用が期待されています。',
    '特に、高齢者や身体に障害があり、外に出て働くことが難しい人でも、アバターを通して社会に参加できるようになる点は、大きな変化をもたらします。',
    'この技術は、人口が少ない地域でのサービス提供や、社会全体の人手不足を支える方法としても注目されています。',
    'このようなサイバネティックアバターを実現するためには、いくつかの重要な技術が必要だと考えられています。',
].join('\n');

const keyTermGlossary: Array<{ term: string; meaning: string }> = [
    {
        term: 'サイバネティックアバター',
        meaning: 'ネット越しに動かす分身です。ロボットや仮想の体として使います。',
    },
    {
        term: 'IoB',
        meaning: '脳をネットワークにつなぐ基盤技術です。',
    },
    {
        term: 'BMI',
        meaning: '脳と機械をつなぐ技術です。',
    },
    {
        term: 'パーソナルリアリティ',
        meaning: '人ごとに見える情報や景色が変わる状態です。',
    },
    {
        term: '多層現実',
        meaning: '現実の上に複数の情報レイヤーが重なる社会です。',
    },
    {
        term: '共鳴圏',
        meaning: '人と人の思考や感情をつなぐ集合的なネットワークです。',
    },
    {
        term: '共鳴クラスタ',
        meaning: '共通の関心でつながるコミュニティです。',
    },
    {
        term: 'インプラント',
        meaning: '体の中に入れて使う機器です。',
    },
];

const easyPhraseReplacements: Array<[RegExp, string]> = [
    [/である。/g, 'です。'],
    [/である/g, 'です'],
    [/となっている。/g, 'になっています。'],
    [/となっている/g, 'になっています'],
    [/可能となっている/g, 'できるようになっています'],
    [/可能となる/g, 'できるようになる'],
    [/可能にし/g, 'できるようにし'],
    [/可能である/g, '可能です'],
    [/台頭している/g, '広がっている'],
    [/希薄化/g, '弱まり'],
    [/浸透し/g, '広まり'],
    [/寄与しうる/g, '役立てる'],
    [/寄与する/g, '役立つ'],
    [/一方で/g, 'ただし'],
    [/おこなう/g, '行う'],
    [/おこない/g, '行い'],
    [/おこなわ/g, '行わ'],
    [/在り方/g, 'あり方'],
];

const applyEasyReplacements = (text: string): string => {
    let result = text;
    for (const [pattern, replacement] of easyPhraseReplacements) {
        result = result.replace(pattern, replacement);
    }
    return result;
};

const canMergeBrokenBlocks = (previous: string, next: string): boolean => {
    if (!previous || !next) return false;
    if (headingBlockPattern.test(previous) || headingBlockPattern.test(next)) return false;
    if (listBlockPattern.test(previous) || listBlockPattern.test(next)) return false;
    if (sentenceEndPattern.test(previous)) return false;
    return textStartPattern.test(next);
};

const normalizeAndMergeBlocks = (markdown: string): string[] => {
    const normalized = markdown
        .normalize('NFKC')
        .replace(/\r\n?/g, '\n')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/[ \t]{2,}/g, ' ');

    const roughBlocks = normalized
        .split(/\n{2,}/)
        .map((block) =>
            block
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean)
                .join(' ')
                .replace(/\s+/g, ' ')
                .trim(),
        )
        .filter(Boolean);

    const mergedBlocks: string[] = [];
    for (const block of roughBlocks) {
        if (mergedBlocks.length === 0) {
            mergedBlocks.push(block);
            continue;
        }

        const previous = mergedBlocks[mergedBlocks.length - 1];
        if (canMergeBrokenBlocks(previous, block)) {
            mergedBlocks[mergedBlocks.length - 1] = `${previous}${block}`;
            continue;
        }

        mergedBlocks.push(block);
    }

    return mergedBlocks;
};

const buildEasyGlossary = (text: string): string => {
    const matchedTerms = keyTermGlossary
        .filter(({ term }) => text.includes(term))
        .slice(0, 6);

    if (matchedTerms.length === 0) return '';

    const lines = matchedTerms.map(({ term, meaning }) => `- **${term}**: ${meaning}`);
    return ['##### 用語メモ', ...lines].join('\n');
};

const applyEasySectionOverrides = (blocks: string[]): string[] => {
    const overridden: string[] = [];

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        if (iobHeadingPattern.test(block)) {
            overridden.push(`${block}\n${iobEasyBody}`);
            i += 1;
            while (i < blocks.length && !h3BlockPattern.test(blocks[i])) {
                i += 1;
            }
            i -= 1;
            continue;
        }

        if (cyberneticAvatarHeadingPattern.test(block)) {
            overridden.push(`${block}\n${cyberneticAvatarEasyBody}`);
            const nextBlock = blocks[i + 1];
            if (typeof nextBlock === 'string' && !headingBlockPattern.test(nextBlock)) {
                i += 1;
            }
            continue;
        }

        overridden.push(block);
    }

    return overridden;
};

const toEasyJapaneseMarkdown = (markdown: string): string => {
    const mergedBlocks = normalizeAndMergeBlocks(markdown);
    const simplifiedBlocks = mergedBlocks.map((block) => {
        if (headingBlockPattern.test(block)) {
            return block;
        }
        return applyEasyReplacements(block);
    });

    const overriddenBlocks = applyEasySectionOverrides(simplifiedBlocks);
    const bodyWithOverrides = overriddenBlocks.join('\n\n').replace(/\n{3,}/g, '\n\n');
    const glossary = buildEasyGlossary(bodyWithOverrides);

    if (!glossary) {
        return bodyWithOverrides;
    }
    return `${glossary}\n\n${bodyWithOverrides}`;
};

const internalLinkMap: Record<string, string> = {
    'IoB': '/wiki/technology#iob',
    'サイバネティックアバター': '/wiki/technology#cybernetic-avatar',
    'サイバネティック・アバター': '/wiki/technology#cybernetic-avatar',
    'BMI': '/wiki/technology#bmi',
    'インプラント': '/wiki/technology#bmi',
    'パーソナルリアリティ': '/wiki/society#personal-reality',
    '多層現実': '/wiki/society#personal-reality',
    '共鳴圏': '/wiki/society#resonance-sphere',
    '共鳴クラスタ': '/wiki/society#resonance-cluster',
    '未来遺産': '/wiki/technology#iob',
};

const applyInternalLinks = (markdown: string, articleTitle?: string): string => {
    const lines = markdown.split('\n');
    const terms = Object.keys(internalLinkMap).sort((a, b) => b.length - a.length);
    let currentSectionTitle = articleTitle || '';

    const processedLines = lines.map((line) => {
        const trimmed = line.trim();
        // 見出し行（#）は置換せず、セクションタイトルを更新する
        if (trimmed.startsWith('#')) {
            currentSectionTitle = trimmed.replace(/^#+\s*|【|】/g, '').trim();
            return line;
        }

        let newLine = line;
        for (const term of terms) {
            // 現在のセクションタイトル（見出し）と同じ用語はリンクしない
            if (currentSectionTitle && term === currentSectionTitle) continue;

            const target = internalLinkMap[term];
            const regex = new RegExp(`(?<!\\[|\\(|\\/)${term}(?!\\]|\\))`, 'g');
            newLine = newLine.replace(regex, `[${term}](${target})`);
        }
        return newLine;
    });

    return processedLines.join('\n');
};

const formatJaArticleContent = (raw: string): string => {
    const rawLines = raw
        .replace(/\u000c/g, '\n')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => !footerPattern.test(line));

    const lines: string[] = [];
    for (let i = 0; i < rawLines.length; i++) {
        let line = rawLines[i];

        if (line.startsWith('【') && !line.includes('】')) {
            let merged = line;
            while (i + 1 < rawLines.length && !merged.includes('】')) {
                const nextLine = rawLines[i + 1];
                if (!nextLine) {
                    i += 1;
                    continue;
                }
                merged += nextLine;
                i += 1;
            }
            line = merged;
        }

        if (line === '】' && lines.length > 0) {
            const previous = lines[lines.length - 1];
            if (previous.startsWith('【') && !previous.includes('】')) {
                lines[lines.length - 1] = `${previous}】`;
                continue;
            }
        }

        lines.push(line);
    }

    const blocks: string[] = [];
    let paragraph = '';
    let hasSkippedLeadingSectionTitle = false;

    const flushParagraph = () => {
        if (!paragraph) return;
        blocks.push(paragraph);
        paragraph = '';
    };

    const pushHeading = (prefix: string, text: string) => {
        flushParagraph();
        blocks.push(`${prefix} ${text}`);
    };

    for (const line of lines) {
        if (!line) {
            flushParagraph();
            continue;
        }

        if (sectionTitlePattern.test(line)) {
            if (!hasSkippedLeadingSectionTitle && blocks.length === 0 && !paragraph) {
                hasSkippedLeadingSectionTitle = true;
                continue;
            }
            pushHeading('##', line);
            continue;
        }

        if (sectionMetaPattern.test(line)) {
            const subtitle = line.replace(/^（/, '').replace(/）$/, '').trim();
            if (subtitle) {
                pushHeading('#####', subtitle);
            }
            continue;
        }

        if (topicPattern.test(line)) {
            pushHeading('###', line.replace(/【|】/g, ''));
            continue;
        }

        if (markerPattern.test(line)) {
            pushHeading('####', line.replace(/^■\s*/, ''));
            continue;
        }

        if (!paragraph) {
            paragraph = line;
        } else {
            paragraph += line;
        }
    }

    flushParagraph();

    return blocks.join('\n\n');
};

export const WikiPage = () => {
    const { categoryId } = useParams();
    const { language } = useLanguage();
    const [readingMode, setReadingMode] = useState<ReadingMode>('original');

    const articles = categoryId ? getArticlesByCategory(categoryId) : [];
    const renderedArticles = useMemo(
        () =>
            articles.map((article) => {
                const originalContent = language === 'ja'
                    ? formatJaArticleContent(article.content.ja)
                    : article.content.en;

                const content = language === 'ja' && readingMode === 'easy'
                    ? toEasyJapaneseMarkdown(originalContent)
                    : originalContent;

                const excludeTerm = article.title.ja.replace(/【|】|^\d+\.\s*/g, '').trim();
                const contentWithLinks = applyInternalLinks(content, excludeTerm);

                return { article, content: contentWithLinks };
            }),
        [articles, language, readingMode],
    );

    useEffect(() => {
        if (language !== 'ja' && readingMode !== 'original') {
            setReadingMode('original');
        }
    }, [language, readingMode]);

    const topGraphicSection = (
        <section>
            <a
                href={wiredGraphicPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl hover:opacity-95 transition-opacity"
            >
                <img
                    src={wiredGraphicImage}
                    alt={language === 'ja' ? '2065世界設定グラフィックレコード' : '2065 world setting graphic record'}
                    className="w-full h-auto"
                    loading="lazy"
                />
            </a>
        </section>
    );

    if (!categoryId) {
        return (
            <WikiLayout>
                <div className="space-y-12">
                    <div className="text-center py-20">
                        <h2 className="text-3xl font-bold text-[#22586f] mb-4">
                            {language === 'ja' ? '2065年の世界設定へようこそ' : 'Welcome to the World Settings of 2065'}
                        </h2>
                        <p className="text-[#5b8395]">
                            {language === 'ja'
                                ? 'サイドバーからカテゴリを選ぶと、世界設定を詳しく読めます。'
                                : 'Select a category from the sidebar to explore the world settings.'}
                        </p>
                    </div>
                    {topGraphicSection}
                </div>
            </WikiLayout>
        );
    }

    return (
        <WikiLayout>
            <div className="space-y-12">
                {topGraphicSection}
                {language === 'ja' && articles.length > 0 && (
                    <div className="flex justify-end">
                        <div className="inline-flex items-center gap-1 rounded-xl border border-[#9fd5e5] bg-white/90 p-1 shadow-sm">
                            <button
                                type="button"
                                onClick={() => setReadingMode('original')}
                                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${readingMode === 'original'
                                    ? 'bg-[#58b2d4] text-white'
                                    : 'text-[#3f6f83] hover:bg-[#edf9fd]'
                                    }`}
                            >
                                原文
                            </button>
                            <button
                                type="button"
                                onClick={() => setReadingMode('easy')}
                                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${readingMode === 'easy'
                                    ? 'bg-[#58b2d4] text-white'
                                    : 'text-[#3f6f83] hover:bg-[#edf9fd]'
                                    }`}
                            >
                                やさしい説明
                            </button>
                        </div>
                    </div>
                )}
                {renderedArticles.map(({ article, content }) => (
                    <article key={article.id} className="prose prose-slate prose-lg max-w-none">
                        <h1 className="text-3xl font-bold text-[#58b2d4] mb-6 pb-2 border-b border-[#c3e7f1]">
                            {language === 'ja' ? article.title.ja : article.title.en}
                        </h1>
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h2: ({ node, children, ...props }) => {
                                    const rawText = Array.isArray(children) ? children.join('') : String(children || '');
                                    const processedText = rawText.replace(/【|】/g, '');
                                    const id = processedText
                                        .toLowerCase()
                                        .replace(/[^\w\sぁ-んァ-ヶ一-龠ー]/g, '')
                                        .replace(/\s+/g, '-');

                                    return (
                                        <h2 id={id} className="text-2xl font-bold text-[#1f5f7c] mt-12 mb-6 pl-4 border-l-4 border-[#58b2d4] bg-[#f0f9fc] py-2 rounded-r-lg" {...props}>
                                            {processedText}
                                        </h2>
                                    );
                                },
                                h3: ({ node, children, ...props }) => {
                                    const rawText = Array.isArray(children) ? children.join('') : String(children || '');
                                    const processedText = rawText.replace(/【|】/g, '');
                                    const id = processedText
                                        .toLowerCase()
                                        .replace(/[^\w\sぁ-んァ-ヶ一-龠ー]/g, '')
                                        .replace(/\s+/g, '-');

                                    const slugMap: Record<string, string> = {
                                        'iob': 'iob',
                                        'internet-of-brains': 'iob',
                                        'サイバネティックアバター': 'cybernetic-avatar',
                                        'サイバネティック・アバター': 'cybernetic-avatar',
                                        '生体センサーと-bmi': 'bmi',
                                        '多層現実とパーソナルリアリティ': 'personal-reality',
                                        '共鳴圏-resonance-sphere-と集合意識': 'resonance-sphere',
                                        '社会コミュニティと共鳴クラスタ': 'resonance-cluster',
                                    };

                                    const finalId = slugMap[id] || id;

                                    return (
                                        <h3 id={finalId} className="text-xl md:text-2xl font-bold text-[#1f5f7c] mt-10 mb-5" {...props}>
                                            {processedText}
                                        </h3>
                                    );
                                },
                                h4: ({ node, children, ...props }) => {
                                    const processedChildren = typeof children === 'string'
                                        ? children.replace(/^■\s*/, '')
                                        : Array.isArray(children)
                                            ? children.map((child) => typeof child === 'string' ? child.replace(/^■\s*/, '') : child)
                                            : children;
                                    return (
                                        <h4 className="inline-flex items-center gap-2 text-base md:text-lg font-bold text-[#245f78] mt-6 mb-3 px-3 py-1.5 rounded-full border border-[#9fd5e5] bg-[#f2fbfe]" {...props}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#58b2d4] shrink-0"></span>
                                            {processedChildren}
                                        </h4>
                                    );
                                },
                                h5: ({ node, ...props }) => (
                                    <h5 className="text-sm md:text-base font-semibold text-[#4f7f93] mt-1 mb-6 pl-1" {...props} />
                                ),
                                p: ({ node, ...props }) => (
                                    <p className="text-[#2c5264] leading-loose mb-6 text-lg" {...props} />
                                ),
                                strong: ({ node, ...props }) => (
                                    <strong className="font-bold text-[#1a4a60] bg-[#e1f5fe] px-1 rounded" {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul className="list-disc list-inside space-y-2 mb-6 text-[#2c5264]" {...props} />
                                ),
                                li: ({ node, ...props }) => (
                                    <li className="leading-relaxed" {...props} />
                                ),
                                a: ({ node, ...props }) => {
                                    const isInternal = props.href?.startsWith('/');
                                    return (
                                        <a
                                            className={`${isInternal
                                                ? 'text-[#58b2d4] hover:text-[#4da8cb] font-semibold decoration-[#9fd5e5] decoration-2 underline-offset-4 underline'
                                                : 'text-[#ff9d79] hover:text-[#eb8b66] underline'
                                                } transition-colors pointer-events-auto`}
                                            {...props}
                                        />
                                    );
                                },
                            }}
                        >
                            {content}
                        </Markdown>
                    </article>
                ))}
                {articles.length === 0 && (
                    <div className="text-center py-20 text-[#6f93a3]">
                        No articles found in this category yet.
                    </div>
                )}
            </div>
        </WikiLayout>
    );
};
