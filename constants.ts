
import type { User, EarningFeedItem, SurveyProvider, FaqItem, RewardOption } from './types';

export const MOCK_USER: User = {
  username: 'raihansarker',
  avatarUrl: 'https://i.pravatar.cc/150?u=raihansarker',
  joinedDate: '11/2/2025',
  id: 'a66b5a5...9731791',
  earnId: '0b3438l...6e33723',
  rank: 'Silver',
  xp: 45000,
  xpToNextLevel: 100000,
  totalEarned: 125.50,
  last30DaysEarned: 25.00,
  completedTasks: 12,
  totalWagered: 0.00,
  totalProfit: 0.00,
  totalWithdrawn: 50.00,
  totalReferrals: 15,
  referralEarnings: 25.75,
  referralLink: 'https://earnlab.com/ref/raihansarker',
};

export const EARNING_FEED_ITEMS: EarningFeedItem[] = [
  { id: 1, user: 'Sparkb6', avatar: 'https://i.pravatar.cc/32?u=sparkb6', task: 'Bitcoin (BTC)', provider: '', amount: 141.96 },
  { id: 2, user: 'SoFi Plus', avatar: 'https://i.pravatar.cc/32?u=sofi', task: '$10 Mont...', provider: 'RevU', amount: 28.13 },
  { id: 3, user: 'Fastslots', avatar: 'https://i.pravatar.cc/32?u=fastslots', task: '[DE/AT/C...', provider: 'AdToWall', amount: 47.85 },
  { id: 4, user: 'JohnDoe', avatar: 'https://i.pravatar.cc/32?u=johndoe', task: 'Sea of Conquest: P...', provider: 'Torox', amount: 24.01 },
  { id: 5, user: 'JaneSmith', avatar: 'https://i.pravatar.cc/32?u=janesmith', task: 'BitLabs - Survey', provider: 'BitLabs', amount: 1.11 },
  { id: 6, user: 'GamerX', avatar: 'https://i.pravatar.cc/32?u=gamerx', task: 'Project Entropy - Ge...', provider: 'Torox', amount: 5.27 },
  { id: 7, user: 'CryptoKing', avatar: 'https://i.pravatar.cc/32?u=cryptoking', task: 'Browinner [DE/BE/...', provider: 'AdToWall', amount: 60.38 },
  { id: 8, user: 'SurveyFan', avatar: 'https://i.pravatar.cc/32?u=surveyfan', task: 'BitLabs - Survey', provider: 'BitLabs', amount: 0.75 },
];

export const SURVEY_PROVIDERS: SurveyProvider[] = [
  { name: 'Prime Surveys', logo: 'https://i.imgur.com/example_prime.png', type: 'Prime Insights' },
  { name: 'CPX Research', logo: 'https://i.imgur.com/example_cpx.png', type: 'CPX RESEARCH' },
  { name: 'Adscend Media Surveys', logo: 'https://i.imgur.com/example_adscend.png', type: 'AdscendMedia' },
  { name: 'BitLabs Surveys', logo: '', type: 'BitLabs', isLocked: true, unlockRequirement: 'Earn $2.50 to unlock' },
  { name: 'inBrain', logo: '', type: 'inBrain', isLocked: true, unlockRequirement: 'Earn $2.50 to unlock' },
  { name: 'TheoremReach', logo: '', type: 'TheoremReach', isLocked: true, unlocksAt: 'Unlocks 12/2/2025, 12:16 PM' },
];

export const FAQ_ITEMS: FaqItem[] = [
    { question: 'What is EarnLab?', answer: 'EarnLab is a platform that allows you to earn money online by completing simple, engaging tasks tailored to your schedule. Become a website and game tester, share your opinions in surveys, and earn cashback on your online shopping.' },
    { question: 'How do I get started?', answer: 'Getting started is easy! Simply sign up for a free account using your email, Google, Facebook, or Steam account. Once registered, you can start browsing available tasks and earn money right away.' },
    { question: 'How do I withdraw Coins?', answer: 'You can withdraw your earnings through a wide range of options, including PayPal, gift cards (like Amazon, Visa, Walmart), and cryptocurrencies. Just go to the "Withdraw" section, select your preferred method, and follow the instructions.' },
    { question: 'How long do withdrawals take?', answer: 'Withdrawal times can vary depending on the method chosen. E-wallets like PayPal are typically fast, while other methods might take a few business days. We strive to process all withdrawals as quickly as possible.' },
];

export const REWARD_OPTIONS: RewardOption[] = [
    { name: 'PayPal', logo: 'fab fa-paypal', bgColor: 'bg-blue-200 text-blue-800' },
    { name: 'VISA', logo: 'fab fa-cc-visa', bgColor: 'bg-indigo-200 text-indigo-800' },
    { name: 'Amazon', logo: 'fab fa-amazon', bgColor: 'bg-amber-400 text-black' },
    { name: 'Walmart', logo: 'fas fa-store', bgColor: 'bg-sky-500 text-white' },
    { name: 'Bitcoin', logo: 'fab fa-bitcoin', bgColor: 'bg-orange-500 text-white' },
    { name: 'Litecoin', logo: 'fas fa-litecoin-sign', bgColor: 'bg-gray-400 text-black' },
    { name: 'Apple', logo: 'fab fa-apple', bgColor: 'bg-gray-800 text-white' },
    { name: 'Google Play', logo: 'fab fa-google-play', bgColor: 'bg-white text-gray-700' },
    { name: 'DoorDash', logo: 'fas fa-truck', bgColor: 'bg-red-500 text-white' },
    { name: 'Nike', logo: 'fas fa-check-double', bgColor: 'bg-black text-white' },
    { name: 'Roblox', logo: 'fas fa-gamepad', bgColor: 'bg-gray-300 text-black' },
    { name: 'Steam', logo: 'fab fa-steam', bgColor: 'bg-gray-900 text-white' },
];