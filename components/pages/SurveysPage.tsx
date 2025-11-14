import React from 'react';
import { SURVEY_PROVIDERS } from '../../constants';
import type { SurveyProvider } from '../../types';
import { StarIcon, LockIcon } from '../icons/SurveyIcons';

const getPageKey = (name: string): string => {
    const mapping: { [key: string]: string } = {
        'Prime Surveys': 'Prime',
        'CPX Research': 'CPX',
        'Adscend Media Surveys': 'AdscendSurveys',
        'BitLabs Surveys': 'BitLabs',
        'inBrain': 'inBrain',
        'TheoremReach': 'TheoremReach',
    };
    return mapping[name] || name.replace(/\s+/g, '');
};

const SurveysPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Surveys</h1>
                    <p className="text-slate-500 dark:text-slate-400">Explore hundreds of surveys to complete from all providers</p>
                </div>
                <div>
                    <select className="bg-white dark:bg-[#1e293b] border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Recommended</option>
                        <option>Highest Paying</option>
                        <option>Newest</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-lg text-center flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700">
                    <div className="bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 dark:text-blue-400 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                         <i className="fas fa-clipboard-list text-4xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Qualification</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">1 minute</p>
                    <div className="mt-4"><StarIcon /></div>
                </div>
            </div>
            
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Survey Walls</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Each survey wall contains hundreds of surveys to complete</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {SURVEY_PROVIDERS.map((provider) => (
                        <SurveyProviderCard key={provider.name} provider={provider} />
                    ))}
                </div>
            </div>

        </div>
    );
};

const SurveyProviderCard: React.FC<{provider: SurveyProvider}> = ({ provider }) => {
    return (
        <a 
            href={provider.isLocked ? '#' : `/${getPageKey(provider.name)}`}
            target={provider.isLocked ? '_self' : '_blank'}
            rel="noopener noreferrer"
            onClick={(e) => { if (provider.isLocked) e.preventDefault(); }}
            className={`bg-white dark:bg-[#1e293b] p-4 rounded-lg text-center flex flex-col items-center justify-center h-40 relative overflow-hidden transition-all duration-300 border border-slate-200 dark:border-slate-800 ${provider.isLocked ? 'cursor-not-allowed' : 'hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer hover:-translate-y-1'}`}>
            {provider.isLocked && <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>}
            
            <div className={`relative z-10 flex flex-col items-center justify-center ${provider.isLocked ? 'opacity-50' : ''}`}>
                <div className="text-2xl font-bold text-blue-500 dark:text-blue-400 mb-2">{provider.type}</div>
                <p className="font-semibold text-slate-900 dark:text-white">{provider.name}</p>
            </div>
            
            {provider.isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-sm text-center z-20 p-2 text-white">
                    <LockIcon />
                    {provider.unlockRequirement && <p className="mt-2 font-semibold">{provider.unlockRequirement}</p>}
                    {provider.unlocksAt && <p className="mt-1">{provider.unlocksAt}</p>}
                </div>
            )}
        </a>
    );
}

export default SurveysPage;