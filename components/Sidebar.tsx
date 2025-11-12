import React, { useContext } from 'react';
import { AppContext } from '../App';
import type { SidebarMenuItem } from '../types';
import { HomeIcon, EarnIcon, TaskIcon, SurveyIcon, TrophyIcon, RewardIcon, AffiliateIcon, BlogIcon, GuideIcon, SupportIcon } from './icons/SidebarIcons';

const SIDEBAR_MENU_ITEMS_TOP: SidebarMenuItem[] = [
  { name: 'Home', icon: <HomeIcon /> },
  { name: 'Earn', icon: <EarnIcon /> },
  { name: 'Tasks', icon: <TaskIcon /> },
  { name: 'Surveys', icon: <SurveyIcon /> },
];

const SIDEBAR_MENU_ITEMS_MIDDLE: SidebarMenuItem[] = [
  { name: '$5,000 Monthly Race', icon: <TrophyIcon />, isSpecial: true },
  { name: '$50 Daily Race', icon: <TrophyIcon />, isSpecial: true },
];

const SIDEBAR_MENU_ITEMS_BOTTOM: SidebarMenuItem[] = [
  { name: 'Rewards', icon: <RewardIcon /> },
  { name: 'Affiliates', icon: <AffiliateIcon /> },
  { name: 'Blog', icon: <BlogIcon /> },
  { name: 'Guides', icon: <GuideIcon /> },
  { name: 'Live Support', icon: <SupportIcon /> },
];

const Sidebar: React.FC = () => {
    const { currentPage, setCurrentPage } = useContext(AppContext);

    const renderMenuItem = (item: SidebarMenuItem) => {
        const isActive = currentPage === item.name;
        let specialClass = 'hover:bg-slate-700';
        if (item.isSpecial) {
            specialClass = item.name.includes('Monthly') 
                ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/50 hover:bg-yellow-400/20' 
                : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/50 hover:bg-yellow-400/20';
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
    <aside className="w-64 bg-[#141c2f] p-4 flex-col justify-between hidden lg:flex">
      <div className="flex-1 flex flex-col">
        <div className="text-2xl font-bold text-white mb-8">EarnLab</div>
        <nav className="flex-1 flex flex-col">
            <h3 className="px-4 text-slate-500 text-sm font-semibold uppercase mb-2">Menu</h3>
            <ul className="space-y-1">
                {SIDEBAR_MENU_ITEMS_TOP.map(renderMenuItem)}
            </ul>
            <ul className="space-y-1 mt-4">
                {SIDEBAR_MENU_ITEMS_MIDDLE.map(renderMenuItem)}
            </ul>
        </nav>
      </div>
      <nav>
        <ul className="space-y-1">
            {SIDEBAR_MENU_ITEMS_BOTTOM.map(renderMenuItem)}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
