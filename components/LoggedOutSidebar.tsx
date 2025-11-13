import React, { useContext } from 'react';
import { AppContext } from '../App';
import type { SidebarMenuItem } from '../types';
import { HomeIcon, BlogIcon, GuideIcon, SupportIcon } from './icons/SidebarIcons';

const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  { name: 'Home', icon: <HomeIcon /> },
  { name: 'Blog', icon: <BlogIcon /> },
  { name: 'Guides', icon: <GuideIcon /> },
  { name: 'Live Support', icon: <SupportIcon /> },
];

const LoggedOutSidebar: React.FC = () => {
    const { currentPage, isSidebarCollapsed, setIsSidebarCollapsed } = useContext(AppContext);

    const renderMenuItem = (item: SidebarMenuItem) => {
        const isActive = currentPage === item.name;
        const baseClasses = `w-full flex items-center justify-between text-left px-4 py-3 rounded-lg transition-colors duration-200 font-medium`;
        const stateClasses = isActive
            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700';

        return (
            <li key={item.name}>
                <button
                    className={`${baseClasses} ${stateClasses}`}
                >
                    <div className="flex items-center space-x-3">
                        {item.icon}
                        <span>{item.name}</span>
                    </div>
                </button>
            </li>
        );
    };

  return (
    <aside className={`bg-white dark:bg-[#141c2f] flex-col hidden lg:flex transition-all duration-300 ease-in-out sticky top-0 h-screen overflow-hidden ${isSidebarCollapsed ? 'w-0' : 'w-64'} border-r border-slate-200 dark:border-slate-800`}>
        <div className="p-4 flex flex-col flex-1 min-w-[16rem]">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">EarnLab</h1>
                <button onClick={() => setIsSidebarCollapsed(true)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <nav className="flex-1 flex flex-col">
                <ul className="space-y-1">
                    {SIDEBAR_MENU_ITEMS.map(renderMenuItem)}
                </ul>
            </nav>
        </div>
    </aside>
  );
};

export default LoggedOutSidebar;