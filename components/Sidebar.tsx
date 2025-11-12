import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import type { SidebarMenuItem } from '../types';
import { HomeIcon, EarnIcon, TaskIcon, SurveyIcon, RewardIcon, AffiliateIcon, BlogIcon, GuideIcon, SupportIcon } from './icons/SidebarIcons';

const SIDEBAR_MENU_ITEMS_TOP: SidebarMenuItem[] = [
  { name: 'Home', icon: <HomeIcon /> },
  { name: 'Offer', icon: <EarnIcon /> },
  { name: 'Tasks', icon: <TaskIcon /> },
  { name: 'Surveys', icon: <SurveyIcon /> },
];

const SIDEBAR_MENU_ITEMS_BOTTOM: SidebarMenuItem[] = [
  { name: 'Rewards', icon: <RewardIcon /> },
  { name: 'Affiliates', icon: <AffiliateIcon /> },
  { name: 'Blog', icon: <BlogIcon /> },
  { name: 'Guides', icon: <GuideIcon /> },
  { name: 'Live Support', icon: <SupportIcon /> },
];

const Sidebar: React.FC = () => {
    const { currentPage, setCurrentPage, isSidebarCollapsed, setIsSidebarCollapsed } = useContext(AppContext);
    const [activeTopTab, setActiveTopTab] = useState('Offer');


    const renderMenuItem = (item: SidebarMenuItem) => {
        const isActive = currentPage === item.name;
        let specialClass = 'hover:bg-slate-700';
        if (item.isSpecial) {
             specialClass = 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/50 hover:bg-yellow-400/20';
        }
        const activeClass = isActive && !item.isSpecial ? 'bg-blue-600 text-white' : '';

        return (
            <li key={item.name}>
                <button
                    onClick={() => setCurrentPage(item.name)}
                    className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-lg transition-colors duration-200 font-medium ${specialClass} ${activeClass}`}
                >
                    <div className="flex items-center space-x-3">
                        {item.icon}
                        <span>{item.name}</span>
                    </div>
                    {item.isHot && <span className="text-xs bg-red-500 text-white font-bold px-2 py-0.5 rounded-full">Hot</span>}
                </button>
            </li>
        );
    };

  return (
    <aside className={`bg-[#141c2f] flex-col hidden lg:flex transition-all duration-300 ease-in-out sticky top-0 h-screen overflow-hidden ${isSidebarCollapsed ? 'w-0' : 'w-64'}`}>
        <div className="p-4 flex flex-col flex-1 min-w-[16rem]">
            <div className="flex items-center gap-2 mb-8">
                <button 
                    onClick={() => setActiveTopTab('Offer')}
                    className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors ${activeTopTab === 'Offer' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                    Offer
                </button>
                <button 
                    onClick={() => setActiveTopTab('Games')}
                    className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors ${activeTopTab === 'Games' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                    Games
                </button>
                <button onClick={() => setIsSidebarCollapsed(true)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <nav className="flex-1 flex flex-col">
                <ul className="space-y-1">
                    {SIDEBAR_MENU_ITEMS_TOP.map(renderMenuItem)}
                </ul>
                <div className="border-t border-slate-700 my-4" />
                <ul className="space-y-1">
                    {SIDEBAR_MENU_ITEMS_BOTTOM.map(renderMenuItem)}
                </ul>
            </nav>
        </div>
    </aside>
  );
};

export default Sidebar;