import { siteConfig } from '../data/siteConfig';

export const Home = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="max-w-2xl w-full p-8 bg-white rounded-xl shadow-lg border border-slate-100">
                <h1 className="text-4xl font-extrabold mb-4 text-slate-900 tracking-tight">
                    {siteConfig.title}
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {siteConfig.description}
                </p>

                <div className="p-4 bg-sky-50 rounded-lg border border-sky-100 text-sky-800">
                    <p className="font-medium">Data Source Check:</p>
                    <p className="text-sm mt-1 opacity-80">Author: {siteConfig.author}</p>
                </div>

                <div className="mt-8 flex gap-4">
                    <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm shadow-indigo-200">
                        Get Started
                    </button>
                    <button className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium rounded-lg transition-colors">
                        Documentation
                    </button>
                </div>
            </div>
        </div>
    );
};
