import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoggedOutHeader from './components/LoggedOutHeader';
import HomePageContent from './components/pages/HomePage';
import SurveysPage from './components/pages/SurveysPage';
import DashboardPage from './components/pages/DashboardPage';
import WalletModal from './components/WalletModal';
import LiveEarningFeed from './components/LiveEarningFeed';
import Footer from './components/Footer';
import { MOCK_USER } from './constants';
import type { User } from './types';
import OfferPage from './components/pages/OfferPage';
import TasksPage from './components/pages/TasksPage';
import LoggedInHomePage from './components/pages/LoggedInHomePage';
import LoggedOutSidebar from './components/LoggedOutSidebar';
import ReferralsPage from './components/pages/ReferralsPage';
import LeaderboardPage from './components/pages/LeaderboardPage';
import DailyBonusPage from './components/pages/DailyBonusPage';
import AchievementsPage from './components/pages/AchievementsPage';
import ChatPage from './components/pages/ChatPage';

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
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
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
  isSidebarCollapsed: false,
  setIsSidebarCollapsed: () => {},
  isMobileSidebarOpen: false,
  setIsMobileSidebarOpen: () => {},
  theme: 'light',
  setTheme: () => {},
});

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useState<User | null>(MOCK_USER);
  const [balance, setBalance] = useState(125.50);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    return (storedTheme === 'light' || storedTheme === 'dark') ? storedTheme : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setCurrentPage('Home');
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentPage('Home'); // Reset to home on logout
  }, []);
  
  const renderPage = () => {
    const pagePadding = "p-4 sm:p-6 lg:p-8";
    switch (currentPage) {
      case 'Home':
        return <div className={pagePadding}><LoggedInHomePage /></div>;
      case 'Profile':
        return <div className={pagePadding}><DashboardPage /></div>;
      case 'Offer':
        return <div className={pagePadding}><OfferPage /></div>;
      case 'Tasks':
        return <div className={pagePadding}><TasksPage /></div>;
      case 'Surveys':
        return <div className={pagePadding}><SurveysPage /></div>;
      case 'Referrals':
        return <div className={pagePadding}><ReferralsPage /></div>;
      case 'Leaderboard':
        return <div className={pagePadding}><LeaderboardPage /></div>;
      case 'Daily Bonus':
        return <div className={pagePadding}><DailyBonusPage /></div>;
      case 'Achievements':
        return <div className={pagePadding}><AchievementsPage /></div>;
      case 'Chat':
        return <div className={pagePadding}><ChatPage /></div>;
      case 'Boxes':
      case 'Battles':
        // Placeholder for new pages
        return <div className={`text-slate-900 dark:text-white text-3xl font-bold ${pagePadding}`}>{currentPage} Page</div>;
      default:
        return <div className={pagePadding}><LoggedInHomePage /></div>;
    }
  };
  
  const headerContent = isLoggedIn ? <Header onLogout={handleLogout} /> : <LoggedOutHeader onLogin={handleLogin} />;
  const mainContent = isLoggedIn ? renderPage() : <HomePageContent onLogin={handleLogin} />;

  return (
    <AppContext.Provider value={{ isLoggedIn, user, balance, setBalance, setIsLoggedIn, isWalletModalOpen, setIsWalletModalOpen, currentPage, setCurrentPage, isSidebarCollapsed, setIsSidebarCollapsed, isMobileSidebarOpen, setIsMobileSidebarOpen, theme, setTheme }}>
      <div className="flex h-screen bg-slate-100 dark:bg-[#0f172a] text-slate-800 dark:text-slate-300">
        {isLoggedIn ? <Sidebar /> : <LoggedOutSidebar />}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            <header className="sticky top-0 z-20 shrink-0">
                {headerContent}
                <LiveEarningFeed />
            </header>
            <div className="flex-1 flex flex-col">
              <main className="flex-1">
                  {mainContent}
              </main>
              <Footer />
            </div>
        </div>
        {isLoggedIn && <WalletModal />}
      </div>
    </AppContext.Provider>
  );
};

export default App;