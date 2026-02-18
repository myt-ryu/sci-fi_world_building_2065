import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useWorldSearch, type SearchResult } from './useWorldSearch';
import { askAI } from './aiService';
import { Link } from 'react-router-dom';

interface Message {
    id: string;
    role: 'user' | 'ai';
    content: React.ReactNode;
}

export const ChatWidget = () => {
    const { language } = useLanguage();
    const { search } = useWorldSearch();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isComposing, setIsComposing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'ai',
            content: language === 'ja'
                ? 'こんにちは。2065年の世界について、何か知りたいことはありますか？（例：IoB、共鳴圏）'
                : 'Hello. Is there anything you would like to know about the world of 2065? (e.g., IoB, Resonance Sphere)',
        },
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const buildFallbackContent = (results: SearchResult[]): React.ReactNode => {
        if (results.length > 0) {
            return (
                <div className="space-y-2">
                    <p>{language === 'ja' ? '関連する情報が見つかりました：' : 'I found some relevant information:'}</p>
                    <ul className="space-y-2">
                        {results.map((res: SearchResult) => (
                            <li key={res.articleId} className="bg-[#ecf8fd] p-2 rounded text-sm border border-[#bfe3ee]">
                                <div className="font-bold text-[#4caacc]">{res.title}</div>
                                <div className="text-[#4f7b8c] text-xs mb-1">{res.excerpt}</div>
                                <Link to={`/wiki/${res.categoryId}`} className="text-[#ff9d79] hover:text-[#eb8b66] text-xs underline">
                                    {language === 'ja' ? '続きを読む' : 'Read more'}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return language === 'ja'
            ? '申し訳ありません。その用語に関する情報は見つかりませんでした。別のキーワードで試してみてください。'
            : 'I apologize. I could not find any information regarding that term. Please try a different keyword.';
    };

    const formatErrorReason = (reason?: string): string => {
        if (!reason) return '';
        const cleaned = reason.replace(/\s+/g, ' ').trim();
        if (cleaned.length <= 120) return cleaned;
        return `${cleaned.slice(0, 117)}...`;
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        const nativeEvent = e.nativeEvent as KeyboardEvent & {
            isComposing?: boolean;
            keyCode?: number;
        };
        const imeComposing = isComposing || nativeEvent.isComposing || nativeEvent.keyCode === 229;

        if (imeComposing) return;

        e.preventDefault();
        void handleSend();
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
        };

        setMessages((prev) => [...prev, userMsg]);
        const query = input;
        setInput('');
        setIsLoading(true);

        try {
            // AI APIを呼び出す
            const aiResult = await askAI(query, language);

            let aiContent: React.ReactNode;

            if (!aiResult.isError && !aiResult.isRateLimited && aiResult.text) {
                // AI回答成功
                aiContent = aiResult.text;
            } else if (aiResult.isRateLimited) {
                // 無料枠上限超過 → キーワード検索にフォールバック
                const results = search(query);
                aiContent = (
                    <div className="space-y-2">
                        <p className="text-xs text-[#9ab5c0] italic">
                            {language === 'ja'
                                ? '⚠️ AIの利用上限に達しました。検索結果を表示します。'
                                : '⚠️ AI limit reached. Showing search results instead.'}
                        </p>
                        {buildFallbackContent(results)}
                    </div>
                );
            } else {
                // APIキー未設定またはその他エラー → キーワード検索にフォールバック
                const results = search(query);
                const reason = formatErrorReason(aiResult.errorReason);
                aiContent = (
                    <div className="space-y-2">
                        <p className="text-xs text-[#9ab5c0] italic">
                            {language === 'ja'
                                ? `⚠️ AI接続に失敗したため検索結果を表示しています${reason ? `（${reason}）` : '。'}`
                                : `⚠️ AI connection failed. Showing search results${reason ? ` (${reason})` : '.'}`}
                        </p>
                        {buildFallbackContent(results)}
                    </div>
                );
            }

            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: 'ai',
                    content: aiContent,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 bg-[#f7feff] border border-[#afdeec] rounded-xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up" style={{ height: '500px' }}>
                    {/* Header */}
                    <div className="bg-[#e8f8fd] p-3 flex justify-between items-center border-b border-[#badfeb]">
                        <h3 className="text-[#24576e] font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#ff9f7a] animate-pulse"></span>
                            AI Guide
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="text-[#668d9f] hover:text-[#1f4f65]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f5fdff]/95">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user'
                                        ? 'bg-[#5cb4d5] text-white rounded-br-none'
                                        : 'bg-white text-[#2a5b72] rounded-bl-none border border-[#c5e6f0]'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {/* タイピングインジケーター */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-[#2a5b72] rounded-2xl rounded-bl-none border border-[#c5e6f0] px-4 py-3">
                                    <div className="flex gap-1 items-center">
                                        <span className="w-2 h-2 rounded-full bg-[#5cb4d5] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 rounded-full bg-[#5cb4d5] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 rounded-full bg-[#5cb4d5] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Disclaimer */}
                    <div className="px-3 py-1 bg-[#edf9fd] border-t border-[#d8eef5]">
                        <p className="text-[10px] text-[#7d9cab] text-center leading-tight">
                            {language === 'ja'
                                ? '※AIは間違えることがあります。設定の詳細はWikiもご確認ください。'
                                : '※AI can make mistakes. Please also check the Wiki for details.'}
                        </p>
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-[#edf9fd] border-t border-[#c3e6ef]">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onCompositionStart={() => setIsComposing(true)}
                                onCompositionEnd={() => setIsComposing(false)}
                                onKeyDown={handleInputKeyDown}
                                placeholder={language === 'ja' ? "質問を入力..." : "Ask a question..."}
                                className="flex-1 bg-white border border-[#add9e7] rounded-lg px-3 py-2 text-sm text-[#24576d] placeholder:text-[#7d9cab] focus:outline-none focus:border-[#5eb6d7] transition-colors"
                                autoFocus
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="bg-[#5eb6d7] hover:bg-[#4da8cb] text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#5db4d6] hover:bg-[#4ea9cb] text-white rounded-full p-4 shadow-lg shadow-[#7ac5dd]/45 transition-all hover:scale-105 active:scale-95 group"
                >
                    <span className="sr-only">Open AI Guide</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffae8c] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff9f7a]"></span>
                    </span>
                </button>
            )}
        </div>
    );
};
