import React, { useContext } from 'react';
import { AppContext } from '../App';
import { MenuIcon } from './icons/HeaderIcons';

interface LoggedOutHeaderProps {
    onLogin: () => void;
}

const LoggedOutHeader: React.FC<LoggedOutHeaderProps> = ({ onLogin }) => {
    const { isSidebarCollapsed, setIsSidebarCollapsed } = useContext(AppContext);

    return (
        <header className="bg-[#141c2f] p-4 flex justify-between items-center border-b border-slate-700">
            <div>
                 {isSidebarCollapsed && (
                    <button 
                        onClick={() => setIsSidebarCollapsed(false)} 
                        className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white lg:block hidden"
                        aria-label="Open sidebar"
                    >
                        <MenuIcon />
                    </button>
                )}
            </div>
             <div className="flex items-center gap-2">
                <button className="text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700">Withdraw</button>
                <button onClick={onLogin} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300">Sign In</button>
                <button onClick={onLogin} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Sign Up</button>
            </div>
        </header>
    );
};

export default LoggedOutHeader;