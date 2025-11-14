import React from 'react';

// Mock data for the offer walls
const offerWalls = [
    { name: 'Torox', logo: 'https://i.imgur.com/Y17wQmd.png', bonus: '+80%' },
    { name: 'Adscend Media', logo: 'https://i.imgur.com/iY9g04E.png', bonus: '+50%' },
    { name: 'AdToWall', logo: 'https://i.imgur.com/x0iP1C9.png' },
    { name: 'RevU', logo: 'https://i.imgur.com/yvC5YyW.png', isLocked: true, unlockRequirement: 'Earn $2.50 to unlock', bonus: '+50%' },
    { name: 'AdGate Media', logo: 'https://i.imgur.com/Q2yG7nS.png' },
    { name: 'MM Wall', logo: 'https://i.imgur.com/6XzWfP1.png' },
    { name: 'Aye-T Studios', logo: 'https://i.imgur.com/J3t5e6E.png' },
    { name: 'Monlix', logo: 'https://i.imgur.com/ePFr12w.png' },
    { name: 'Hang My Ads', logo: 'https://i.imgur.com/yvC5YyW.png', isLocked: true, unlockRequirement: 'Earn $1.00 to unlock' },
    { name: 'Lootably', logo: 'https://i.imgur.com/i9nO27d.png' },
    { name: 'Time Wall', logo: 'https://i.imgur.com/nJgq1t7.png' },
    { name: 'AdGem', logo: 'https://i.imgur.com/r9f5k2Z.png' },
];

const SectionHeader: React.FC<{ title: string, description: string }> = ({ title, description }) => (
    <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
            <p className="text-slate-500 dark:text-slate-400">{description}</p>
        </div>
    </div>
);

const LockIcon: React.FC = () => (
    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
);


const OfferPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <section>
                <SectionHeader title="Offer Walls" description="Each offer wall contains hundreds of offers to complete" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                     {offerWalls.map((wall, index) => (
                        <a 
                            key={index}
                            href={wall.isLocked ? '#' : `/#/${encodeURIComponent(wall.name)}`}
                            target={wall.isLocked ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            onClick={(e) => { if (wall.isLocked) e.preventDefault(); }}
                            className={`bg-white dark:bg-[#1e293b] rounded-lg p-4 flex flex-col items-center justify-center text-center h-40 relative overflow-hidden transition-all duration-300 border border-slate-200 dark:border-slate-800 ${wall.isLocked ? 'cursor-not-allowed' : 'hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer hover:-translate-y-1'}`}>
                            {wall.isLocked && <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>}
                            {wall.bonus && <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full z-20 ${wall.isLocked ? 'bg-gray-500/30 text-gray-300' : 'bg-green-500/20 text-green-300'}`}>{wall.bonus}</div>}
                            
                            <div className={`relative flex flex-col items-center justify-center w-full h-full ${wall.isLocked ? 'opacity-50' : ''}`}>
                                 <img src={wall.logo} alt={wall.name} className="h-12 max-w-[90%] object-contain" />
                                <p className="font-semibold text-slate-900 dark:text-white text-sm mt-3">{wall.name}</p>
                            </div>
                             
                            {wall.isLocked && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-sm text-center z-20 p-2 text-white">
                                    <LockIcon />
                                    {wall.unlockRequirement && <p className="mt-1 font-semibold">{wall.unlockRequirement}</p>}
                                </div>
                            )}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default OfferPage;