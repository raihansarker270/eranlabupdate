import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomePage from './components/pages/HomePage';
import SurveysPage from './components/pages/SurveysPage';
import DashboardPage from './components/pages/DashboardPage';
import WalletModal from './components/WalletModal';
import LiveEarningFeed from './components/LiveEarningFeed';
import { MOCK_USER } from './constants';
import type { User } from './types';
import EarnPage from './components/pages/EarnPage';
import TasksPage from './components/pages/TasksPage';

export const AppContext = React.createContext<{
  isLoggedIn: boolean;
  user: User | null;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}>({
  isLoggedIn: false,
  user: null,
  balance: 0,
  setBalance: () => {},
  setIsLoggedIn: () => {},
  isWalletModalOpen: false,
  setIsWalletModalOpen: () => {},
  currentPage: 'Home',
  setCurrentPage: () => {},
});

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useState<User | null>(MOCK_USER);
  const [balance, setBalance] = useState(125.50);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setCurrentPage('Home');
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentPage('Home'); // Reset to home on logout
  }, []);
  
  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <DashboardPage />;
      case 'Earn':
        return <EarnPage />;
      case 'Tasks':
        return <TasksPage />;
      case 'Surveys':
        return <SurveysPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, user, balance, setBalance, setIsLoggedIn, isWalletModalOpen, setIsWalletModalOpen, currentPage, setCurrentPage }}>
      {isLoggedIn ? (
        <div className="flex min-h-screen bg-[#0f172a] text-slate-300">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header onLogout={handleLogout} />
            <LiveEarningFeed />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
              {renderPage()}
            </main>
          </div>
          <WalletModal />
        </div>
      ) : (
        <HomePage onLogin={handleLogin} />
      )}
    </AppContext.Provider>
  );
};

export default App;
