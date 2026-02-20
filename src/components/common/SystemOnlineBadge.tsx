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
        <div className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#95d7e9] bg-[linear-gradient(140deg,_rgba(233,250,255,0.96)_0%,_rgba(237,255,248,0.95)_52%,_rgba(250,242,255,0.94)_100%)] px-4 py-1.5 text-xs font-mono tracking-wide text-[#245e76] shadow-[0_10px_28px_rgba(108,182,205,0.3)] backdrop-blur-md md:text-sm ${className}`.trim()}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(143,223,246,0.33),_transparent_55%)]"></div>
            <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#62c4de]/60"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#52b8d7]"></span>
            </span>
            <span className="relative">
                {t(`システムオンライン: ${systemOnlineDateTime}`, `System Online: ${systemOnlineDateTime}`)}
            </span>
        </div>
    );
};
