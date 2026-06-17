import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SystemOnlineBadgeProps {
    className?: string;
}

export const SystemOnlineBadge = ({ className = '' }: SystemOnlineBadgeProps) => {
    const { t } = useLanguage();
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const timerId = window.setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => window.clearInterval(timerId);
    }, []);

    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const systemOnlineDateTime = `2065.${month}.${day} ${hours}:${minutes}:${seconds}`;

    return (
        <div className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#57e5ff]/20 bg-[rgba(10,26,36,0.7)] px-4 py-1.5 text-xs font-mono tracking-wide text-[#57e5ff]/80 shadow-[0_0_20px_rgba(87,229,255,0.08)] backdrop-blur-md md:text-sm ${className}`.trim()}>
            <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4de8c8]/60"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4de8c8]"></span>
            </span>
            <span className="relative">
                {t(`システムオンライン: ${systemOnlineDateTime}`, `System Online: ${systemOnlineDateTime}`)}
            </span>
        </div>
    );
};
