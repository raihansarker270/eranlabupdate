import React, { useState } from 'react';
import { FAQ_ITEMS, REWARD_OPTIONS } from '../../constants';
import type { FaqItem } from '../../types';

interface HomePageProps {
    onLogin: () => void;
}

const FaqAccordionItem: React.FC<{ item: FaqItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-700">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left flex justify-between items-center p-6 hover:bg-slate-700/20">
                <span className="font-semibold text-lg text-white">{item.question}</span>
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <i className="fas fa-chevron-down"></i>
                </span>
            </button>
            {isOpen && <div className="px-6 pb-6 pt-0 text-slate-400">{item.answer}</div>}
        </div>
    );
};

const HomePageContent: React.FC<HomePageProps> = ({ onLogin }) => {
  return (
    <div className="bg-[#0b111e] text-slate-300">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-120px)] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://i.imgur.com/ODiL3hH.png')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 text-center text-white p-8 max-w-6xl mx-auto flex items-center gap-16">
                <div className="flex-1 text-left">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">Earn rewards. Anywhere, Anytime.</h1>
                    <p className="text-lg md:text-xl mb-8 text-slate-300">EarnLab makes earning money online easy and secure. Complete simple, engaging tasks tailored to your schedule and start earning rewards today – anytime, anywhere.</p>
                    <button onClick={onLogin} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg">Get Started</button>
                </div>
                <div className="flex-1 bg-slate-900/50 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-slate-700">
                    <h2 className="text-3xl font-bold mb-4">Get Started!</h2>
                    <p className="mb-6 text-slate-300">It's free! Sign up and start to earn money!</p>
                    <input type="email" placeholder="Email Address" className="w-full bg-slate-800 text-white p-3 rounded-lg mb-4 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button onClick={onLogin} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg mb-4">Start Earning Now</button>
                    <div className="text-center my-4 text-slate-400 text-sm">or</div>
                    <div className="space-y-3">
                         <button className="w-full bg-[#4285F4] hover:bg-red-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"><i className="fab fa-google"></i> Sign up via Google</button>
                         <button className="w-full bg-[#1877F2] hover:bg-blue-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"><i className="fab fa-facebook"></i> Sign up via Facebook</button>
                         <button className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"><i className="fab fa-steam"></i> Sign up via Steam</button>
                    </div>
                </div>
            </div>
        </section>

        {/* How it works Section */}
        <section className="py-20 bg-[#141c2f] text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Your Simple Path To Extra Income</h2>
            <p className="max-w-3xl mx-auto mb-12 text-slate-400">Complete easy tasks in your spare time and start earning today. Join EarnLab and turn every moment into a rewarding opportunity.</p>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                 {[{img: 'https://i.imgur.com/T0bC2zZ.jpeg', text: 'Easily Sign up'}, {img: 'https://i.imgur.com/4l3z4P4.jpeg', text: 'Complete Tasks'}, {img: 'https://i.imgur.com/uJgJa8Z.jpeg', text: 'Get Paid'}].map((item, i) => (
                    <div key={i} className="bg-[#1e293b] rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 relative">
                        <img src={item.img} alt={`Step ${i+1}`} className="w-full h-auto object-cover aspect-[4/5]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                            <h3 className="text-2xl font-bold text-white">{item.text}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Rewards Section */}
        <section className="py-20 bg-[#0f172a] text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Reward, Your Way</h2>
            <p className="max-w-3xl mx-auto mb-12 text-slate-400">From PayPal and gift cards to crypto, EarnLab offers a wide range of withdrawal options. Select the method that works best for you and enjoy your earnings with ease.</p>
            <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-8">
                {REWARD_OPTIONS.map(option => (
                    <div key={option.name} className={`flex items-center justify-center p-6 rounded-lg ${option.bgColor} transition-transform hover:scale-105`}>
                        <i className={`${option.logo} text-4xl`}></i>
                    </div>
                ))}
            </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-20 bg-[#141c2f] text-center">
             <h2 className="text-4xl font-bold text-white mb-4">Join The EarnLab Success Story</h2>
             <p className="max-w-3xl mx-auto mb-12 text-slate-400">Be part of our growing community and start earning effortlessly. See how thousands are turning simple tasks into real money.</p>
             <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400">415,942</div>
                    <div className="text-slate-400 mt-2">Total Users</div>
                </div>
                 <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400">1,438,691</div>
                    <div className="text-slate-400 mt-2">Tasks Completed</div>
                </div>
                 <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400">$3,741,246</div>
                    <div className="text-slate-400 mt-2">Total Earned</div>
                </div>
             </div>
             <button onClick={onLogin} className="mt-12 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg">Join Us</button>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[#0f172a]">
            <div className="container mx-auto px-8 max-w-4xl">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Your EarnLab Questions Answered</h2>
                <div className="bg-[#1e293b] rounded-lg shadow-lg">
                    {FAQ_ITEMS.map((item, i) => <FaqAccordionItem key={i} item={item} />)}
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#141c2f] border-t border-slate-700 py-12">
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="font-bold text-xl text-white mb-4">EarnLab</h3>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Menu</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">Earn</a></li>
                            <li><a href="#" className="hover:text-white">Tasks</a></li>
                            <li><a href="#" className="hover:text-white">Surveys</a></li>
                            <li><a href="#" className="hover:text-white">Affiliates</a></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white mb-4">Games</h4>
                        <ul className="space-y-2 text-slate-400">
                             <li><a href="#" className="hover:text-white">Boxes</a></li>
                             <li><a href="#" className="hover:text-white">Battles</a></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white mb-4">About</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">Guides</a></li>
                            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                             <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                              <li><a href="#" className="hover:text-white">AML & KYC Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Help</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-white">Frequently Asked</a></li>
                            <li><a href="#" className="hover:text-white">Help Desk</a></li>
                            <li><a href="#" className="hover:text-white">Support</a></li>
                            <li><a href="#" className="hover:text-white">Fairness</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center text-slate-400 text-sm">
                    <p className="mb-4 sm:mb-0">&copy; {new Date().getFullYear()} EarnLab &bull; All rights reserved.</p>
                    <div className="flex space-x-4 text-lg">
                        <a href="#" className="hover:text-white"><i className="fab fa-discord"></i></a>
                        <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="hover:text-white"><i className="fab fa-tiktok"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
};

export default HomePageContent;