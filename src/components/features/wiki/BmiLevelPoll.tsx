import { useEffect, useMemo, useState } from 'react';

type BmiLevel = 1 | 2 | 3 | 4 | 5 | 'none';

interface BmiLevelOption {
    level: BmiLevel;
    title: string;
    description: string;
    barColorClassName: string;
}

const STORAGE_KEY = 'world2065_bmi_poll_v1';

const bmiOptions: BmiLevelOption[] = [
    {
        level: 1,
        title: 'レベル1（非侵襲）',
        description: '体を傷つけないウェアラブル中心',
        barColorClassName: 'from-[#7fd3ec] to-[#5cb8db]',
    },
    {
        level: 2,
        title: 'レベル2（非侵襲）',
        description: '肌への一時装着で高精度な計測',
        barColorClassName: 'from-[#8ed9dd] to-[#61c7c9]',
    },
    {
        level: 3,
        title: 'レベル3（侵襲）',
        description: '社会で一般化した標準的な接続',
        barColorClassName: 'from-[#7dc6f0] to-[#65b7ee]',
    },
    {
        level: 4,
        title: 'レベル4（侵襲）',
        description: 'より深く神経系に接続する拡張',
        barColorClassName: 'from-[#8bc0f5] to-[#749fe9]',
    },
    {
        level: 5,
        title: 'レベル5（侵襲・不可逆）',
        description: '不可逆レベルの常時接続',
        barColorClassName: 'from-[#9ab0f6] to-[#8f94f0]',
    },
    {
        level: 'none',
        title: 'どれもいやだ',
        description: '今はどのレベルも選びたくない',
        barColorClassName: 'from-[#f7b2a8] to-[#ef8f86]',
    },
];

interface StoredPollState {
    votes: Record<string, number>;
    selected: BmiLevel | null;
}

const createInitialVotes = (): Record<BmiLevel, number> => ({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    none: 0,
});

const normalizeVotes = (input: unknown): Record<BmiLevel, number> => {
    const base = createInitialVotes();
    if (!input || typeof input !== 'object') return base;

    for (const option of bmiOptions) {
        const rawValue = (input as Record<string, unknown>)[String(option.level)];
        if (typeof rawValue !== 'number' || !Number.isFinite(rawValue)) continue;
        base[option.level] = Math.max(0, Math.floor(rawValue));
    }
    return base;
};

const normalizeSelected = (input: unknown): BmiLevel | null => {
    if (input === 'none') return 'none';
    if (typeof input !== 'number' || !Number.isFinite(input)) return null;
    const level = Math.floor(input);
    if (level < 1 || level > 5) return null;
    return level as BmiLevel;
};

const readPollState = (): { votes: Record<BmiLevel, number>; selected: BmiLevel | null } => {
    if (typeof window === 'undefined') {
        return { votes: createInitialVotes(), selected: null };
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return { votes: createInitialVotes(), selected: null };
        }
        const parsed = JSON.parse(raw) as StoredPollState;
        return {
            votes: normalizeVotes(parsed?.votes),
            selected: normalizeSelected(parsed?.selected),
        };
    } catch {
        return { votes: createInitialVotes(), selected: null };
    }
};

export const BmiLevelPoll = () => {
    const [votes, setVotes] = useState<Record<BmiLevel, number>>(() => createInitialVotes());
    const [selected, setSelected] = useState<BmiLevel | null>(null);

    useEffect(() => {
        const initial = readPollState();
        setVotes(initial.votes);
        setSelected(initial.selected);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const payload: StoredPollState = {
            votes: {
                1: votes[1],
                2: votes[2],
                3: votes[3],
                4: votes[4],
                5: votes[5],
                none: votes.none,
            },
            selected,
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }, [selected, votes]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleStorage = (event: StorageEvent) => {
            if (event.key !== STORAGE_KEY) return;
            const next = readPollState();
            setVotes(next.votes);
            setSelected(next.selected);
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const totalVotes = useMemo(() => bmiOptions.reduce((sum, option) => sum + votes[option.level], 0), [votes]);

    const handleVote = (nextLevel: BmiLevel) => {
        setVotes((previous) => {
            const updated: Record<BmiLevel, number> = { ...previous };
            if (selected !== null) {
                updated[selected] = Math.max(0, updated[selected] - 1);
            }
            updated[nextLevel] += 1;
            return updated;
        });
        setSelected(nextLevel);
    };

    return (
        <section className="my-7 rounded-2xl border border-[#a7dbeb] bg-[linear-gradient(145deg,_rgba(231,249,255,0.94)_0%,_rgba(238,255,249,0.94)_100%)] p-5 md:p-6 shadow-[0_14px_30px_rgba(101,179,204,0.18)] not-prose">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#9ed8e8] bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-[#3b6e84]">
                <span className="h-2 w-2 rounded-full bg-[#5bb6d7]"></span>
                コラム：現実世界の意見収集
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h4 className="text-lg md:text-xl font-bold text-[#1f5f7c]">
                    あなたならどのBMIレベルを選びますか？
                </h4>
                <span className="text-xs md:text-sm text-[#4d7f93]">
                    投票数: {totalVotes}
                </span>
            </div>

            <div className="space-y-3">
                {bmiOptions.map((option) => {
                    const count = votes[option.level];
                    const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                    const isSelected = selected === option.level;

                    return (
                        <button
                            key={option.level}
                            type="button"
                            onClick={() => handleVote(option.level)}
                            className={`w-full text-left rounded-xl border px-4 py-3 transition-all ${
                                isSelected
                                    ? 'border-[#5db5d7] bg-white/90 shadow-[0_10px_24px_rgba(101,174,201,0.2)]'
                                    : 'border-[#b8e3ef] bg-white/70 hover:bg-white/85'
                            }`}
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#59b5d6] px-2 text-xs font-bold text-white">
                                        {option.level === 'none' ? 'NO' : `L${option.level}`}
                                    </span>
                                    <div>
                                        <p className="text-sm md:text-base font-semibold text-[#215d78]">
                                            {option.title}
                                        </p>
                                        <p className="text-xs md:text-sm text-[#4f7f93]">
                                            {option.description}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-sm font-semibold text-[#2e6a82]">
                                    {percentage}%
                                </span>
                            </div>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#d8eef5]">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${option.barColorClassName} transition-all duration-500`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>

            <p className="mt-4 text-xs text-[#5b889a]">
                試験版アンケート: 投票はこのブラウザに保存されます。
            </p>
        </section>
    );
};
