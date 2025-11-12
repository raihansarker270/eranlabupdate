import React, { useContext } from 'react';
import { AppContext } from '../App';
import type { SidebarMenuItem } from '../types';
import { HomeIcon, EarnIcon, TaskIcon, SurveyIcon, TrophyIcon, RewardIcon, AffiliateIcon, BlogIcon, GuideIcon, SupportIcon, BoxIcon, SwordIcon } from './icons/SidebarIcons';

const SIDEBAR_MENU_ITEMS_LOGGED_OUT_TOP: SidebarMenuItem[] = [
  { name: 'Home', icon: <HomeIcon /> },
  { name: 'Earn', icon: <EarnIcon /> },
  { name: 'Tasks', icon: <TaskIcon /> },
  { name: 'Surveys', icon: <SurveyIcon /> },
];

const SIDEBAR_MENU_ITEMS_LOGGED_IN_TOP: SidebarMenuItem[] = [
  { name: 'Home', icon: <HomeIcon /> },
  { name: 'Boxes', icon: <BoxIcon /> },
  { name: 'Battles', icon: <SwordIcon />, isHot: true },
];

const SIDEBAR_MENU_ITEMS_LOGGED_OUT_MIDDLE: SidebarMenuItem[] = [
  { name: '$3,000 Monthly Race', icon: <TrophyIcon />, isSpecial: true },
  { name: '$50 Daily Race', icon: <TrophyIcon />, isSpecial: true },
];

const SIDEBAR_MENU_ITEMS_LOGGED_IN_MIDDLE: SidebarMenuItem[] = [
  { name: '$10,000 Monthly Race', icon: <TrophyIcon />, isSpecial: true },
];

const SIDEBAR_MENU_ITEMS_BOTTOM: SidebarMenuItem[] = [
  { name: 'Rewards', icon: <RewardIcon /> },
  { name: 'Affiliates', icon: <AffiliateIcon /> },
  { name: 'Blog', icon: <BlogIcon /> },
  { name: 'Guides', icon: <GuideIcon /> },
  { name: 'Live Support', icon: <SupportIcon /> },
];

interface SidebarProps {
    isLoggedIn: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isLoggedIn }) => {
    const { currentPage, setCurrentPage } = useContext(AppContext);

    const topItems = isLoggedIn ? SIDEBAR_MENU_ITEMS_LOGGED_IN_TOP : SIDEBAR_MENU_ITEMS_LOGGED_OUT_TOP;
    const middleItems = isLoggedIn ? SIDEBAR_MENU_ITEMS_LOGGED_IN_MIDDLE : SIDEBAR_MENU_ITEMS_LOGGED_OUT_MIDDLE;


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
    <aside className="w-64 bg-[#141c2f] p-4 flex-col justify-between hidden lg:flex">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-2xl font-bold text-white mb-8">
            <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8l4-5v4h3l-4 5z"/></svg>
            <span>EarnLab</span>
        </div>
        <nav className="flex-1 flex flex-col">
            <h3 className="px-4 text-slate-500 text-sm font-semibold uppercase mb-2">Menu</h3>
            <ul className="space-y-1">
                {topItems.map(renderMenuItem)}
            </ul>
            <ul className="space-y-1 mt-4">
                {middleItems.map(renderMenuItem)}
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