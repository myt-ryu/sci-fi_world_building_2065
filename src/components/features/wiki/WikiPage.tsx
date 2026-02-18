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

    const articles = categoryId ? getArticlesByCategory(categoryId) : [];
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
                {articles.map((article) => (
                    <article key={article.id} className="prose prose-slate prose-lg max-w-none">
                        <h1 className="text-3xl font-bold text-[#58b2d4] mb-6 pb-2 border-b border-[#c3e7f1]">
                            {language === 'ja' ? article.title.ja : article.title.en}
                        </h1>
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h2: ({ node, children, ...props }) => {
                                    const processedChildren = typeof children === 'string'
                                        ? children.replace(/【|】/g, '')
                                        : Array.isArray(children)
                                            ? children.map((child) => typeof child === 'string' ? child.replace(/【|】/g, '') : child)
                                            : children;
                                    return (
                                        <h2 className="text-2xl font-bold text-[#1f5f7c] mt-12 mb-6 pl-4 border-l-4 border-[#58b2d4] bg-[#f0f9fc] py-2 rounded-r-lg" {...props}>
                                            {processedChildren}
                                        </h2>
                                    );
                                },
                                h3: ({ node, children, ...props }) => {
                                    const processedChildren = typeof children === 'string'
                                        ? children.replace(/【|】/g, '')
                                        : Array.isArray(children)
                                            ? children.map((child) => typeof child === 'string' ? child.replace(/【|】/g, '') : child)
                                            : children;
                                    return (
                                        <h3 className="text-xl md:text-2xl font-bold text-[#1f5f7c] mt-10 mb-5" {...props}>
                                            {processedChildren}
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
                            }}
                        >
                            {language === 'ja'
                                ? formatJaArticleContent(article.content.ja)
                                : article.content.en}
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
