import React from 'react';

const AdGemPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AdGem</h1>
            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-lg border border-slate-200 dark:border-slate-800 min-h-[calc(100vh-8rem)] flex items-center justify-center">
                <p className="text-slate-500 dark:text-slate-400">AdGem iframe/API content would be loaded here.</p>
            </div>
        </div>
    );
};

export default AdGemPage;