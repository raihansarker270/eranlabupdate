import React, { useContext } from 'react';
import { AppContext } from '../App';
import { MenuIcon } from './icons/HeaderIcons';

interface LoggedOutHeaderProps {
    onLogin: () => void;
}

const LoggedOutHeader: React.FC<LoggedOutHeaderProps> = ({ onLogin }) => {
    const { isSidebarCollapsed, setIsSidebarCollapsed } = useContext(AppContext);

    return (
        <header className="bg-white dark:bg-[#141c2f] p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
            <div>
                 {isSidebarCollapsed && (
                    <button 
                        onClick={() => setIsSidebarCollapsed(false)} 
                        className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white lg:block hidden"
                        aria-label="Open sidebar"
                    >
                        <MenuIcon />
                    </button>
                )}
                 <h1 className="text-2xl font-bold text-slate-900 dark:text-white">EarnLab</h1>
            </div>
             <div className="flex items-center gap-2">
                <button onClick={onLogin} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300">Sign In</button>
                <button onClick={onLogin} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Sign Up</button>
            </div>
        </header>
    );
};

export default LoggedOutHeader;