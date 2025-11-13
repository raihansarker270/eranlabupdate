import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { BellIcon, ChevronDownIcon, WalletIcon, LogoutIcon, MenuIcon } from './icons/HeaderIcons';

interface HeaderProps {
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    const { user, balance, setIsWalletModalOpen, isSidebarCollapsed, setIsSidebarCollapsed, setCurrentPage } = useContext(AppContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (!user) return null;

  return (
    <header className="bg-[#141c2f] p-4 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-4">
            {isSidebarCollapsed && (
                <button 
                    onClick={() => setIsSidebarCollapsed(false)} 
                    className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white lg:block hidden"
                    aria-label="Open sidebar"
                >
                    <MenuIcon />
                </button>
            )}
            <h1 className="text-2xl font-bold text-white">EarnLab</h1>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-green-400 font-bold">
                <i className="fas fa-dollar-sign"></i>
                <span>{balance.toFixed(2)}</span>
            </div>
            <button onClick={() => setIsWalletModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                <WalletIcon />
                <span>Wallet</span>
            </button>
            <button className="text-slate-400 hover:text-white">
                <BellIcon />
            </button>
            <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2">
                    <img src={user.avatarUrl} alt={user.username} className="w-8 h-8 rounded-full" />
                    <span className="font-semibold text-white">{user.username}</span>
                    <ChevronDownIcon />
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg py-1 z-10">
                        <button 
                            onClick={() => {
                                setCurrentPage('Profile');
                                setIsDropdownOpen(false);
                            }} 
                            className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                            Profile
                        </button>
                        <a href="#" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">Settings</a>
                        <button onClick={onLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-700">
                            <LogoutIcon />
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    </header>
  );
};

export default Header;