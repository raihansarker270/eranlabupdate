import React, { useState, useEffect, useRef } from 'react';
import { FAQ_ITEMS, REWARD_OPTIONS } from '../../constants';
import type { FaqItem } from '../../types';
import { generateHeroImage, generateHowItWorksImages } from '../../lib/gemini';

interface HomePageProps {
    onLogin: () => void;
}

// Custom hook to detect when an element is in view
const useInView = (options?: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options]);

    return [ref, isInView] as const;
};

// Component to animate counting up to a target number
const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
    const target = parseInt(value.replace(/[^0-9]/g, ''), 10);
    const [count, setCount] = useState(0);
    const [ref, isInView] = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = target;
            if (start === end) return;

            const duration = 2000; // ms
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            const increment = (end - start) / totalFrames;
            
            let currentFrame = 0;
            const timer = setInterval(() => {
                currentFrame++;
                start += increment;
                if (currentFrame === totalFrames) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, frameDuration);
            
            return () => clearInterval(timer);
        }
    }, [isInView, target]);

    const formattedCount = count.toLocaleString();
    const prefix = value.startsWith('$') ? '$' : '';

    return <div ref={ref as React.RefObject<HTMLDivElement>}>{`${prefix}${formattedCount}`}</div>;
};

// Accordion item for the FAQ section with smooth transitions
const FaqAccordionItem: React.FC<{ item: FaqItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="border-b border-slate-200 dark:border-slate-700">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left flex justify-between items-center p-6 hover:bg-slate-100/50 dark:hover:bg-slate-700/20 focus:outline-none">
                <span className="font-semibold text-lg text-slate-900 dark:text-white">{item.question}</span>
                <span className={`transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}>
                    <i className="fas fa-chevron-down"></i>
                </span>
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
                className="overflow-hidden transition-all duration-500 ease-in-out"
            >
                <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-400">{item.answer}</div>
            </div>
        </div>
    );
};


const HomePageContent: React.FC<HomePageProps> = ({ onLogin }) => {
  const [mounted, setMounted] = useState(false);
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [isHeroImageLoading, setIsHeroImageLoading] = useState(true);
  const [howItWorksImages, setHowItWorksImages] = useState<string[]>(['', '', '']);
  const [isHowItWorksLoading, setIsHowItWorksLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      setIsHeroImageLoading(true);
      setIsHowItWorksLoading(true);

      const [heroUrl, workImages] = await Promise.all([
        generateHeroImage(),
        generateHowItWorksImages(),
      ]);
      
      setHeroImageUrl(heroUrl);
      setIsHeroImageLoading(false);
      setHowItWorksImages(workImages);
      setIsHowItWorksLoading(false);
    };
    fetchImages();
  }, []);

  const [howItWorksRef, isHowItWorksInView] = useInView({ threshold: 0.15 });
  const [rewardsRef, isRewardsInView] = useInView({ threshold: 0.15 });
  const [statsRef, isStatsInView] = useInView({ threshold: 0.15 });
  const [faqRef, isFaqInView] = useInView({ threshold: 0.15 });
  
  const howItWorksItems = [
    { text: 'Easily Sign up' },
    { text: 'Complete Tasks' },
    { text: 'Get Paid' }
  ];

  return (
    <div className="bg-white dark:bg-[#0b111e] text-slate-700 dark:text-slate-300 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-120px)] flex items-center justify-center bg-cover bg-center py-16 transition-all duration-500" style={{ backgroundImage: heroImageUrl ? `url(${heroImageUrl})` : 'none', backgroundColor: '#0f172a' }}>
            {isHeroImageLoading && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
                </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 text-white p-8 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                <div className="flex-1 text-center lg:text-left">
                    <h1 className={`text-5xl md:text-7xl font-bold mb-4 leading-tight transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Earn rewards. Anywhere, Anytime.</h1>
                    <p className={`text-lg md:text-xl mb-8 text-slate-300 transition-all duration-700 ease-out delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>EarnLab makes earning money online easy and secure. Complete simple, engaging tasks tailored to your schedule and start earning rewards today – anytime, anywhere.</p>
                    <button onClick={onLogin} className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-700 ease-out delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>Get Started</button>
                </div>
                <div className={`w-full lg:w-auto lg:flex-1 bg-slate-900/50 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-slate-700 max-w-md transition-all duration-1000 ease-out delay-200 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                    <h2 className="text-3xl font-bold mb-4 text-center">Get Started!</h2>
                    <p className="mb-6 text-slate-300 text-center">It's free! Sign up and start to earn money!</p>
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
        <section ref={howItWorksRef} className="py-20 bg-slate-50 dark:bg-[#141c2f] text-center">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Your Simple Path To Extra Income</h2>
            <p className="max-w-3xl mx-auto mb-12 text-slate-600 dark:text-slate-400">Complete easy tasks in your spare time and start earning today. Join EarnLab and turn every moment into a rewarding opportunity.</p>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                 {howItWorksItems.map((item, i) => (
                    <div key={i} className={`bg-white dark:bg-[#1e293b] rounded-lg overflow-hidden shadow-lg relative transition-all duration-500 ease-out hover:-translate-y-2 ${isHowItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                        {isHowItWorksLoading ? (
                            <div className="aspect-[4/5] w-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                        ) : (
                            <img src={howItWorksImages[i]} alt={item.text} className="w-full h-auto object-cover aspect-[4/5]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                            <h3 className="text-2xl font-bold text-white">{item.text}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Rewards Section */}
        <section ref={rewardsRef} className="py-20 bg-white dark:bg-[#0f172a] text-center">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Choose Your Reward, Your Way</h2>
            <p className="max-w-3xl mx-auto mb-12 text-slate-600 dark:text-slate-400">From PayPal and gift cards to crypto, EarnLab offers a wide range of withdrawal options. Select the method that works best for you and enjoy your earnings with ease.</p>
            <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-8">
                {REWARD_OPTIONS.map((option, i) => (
                    <div key={option.name} className={`flex items-center justify-center p-6 rounded-lg ${option.bgColor} transition-all duration-300 ease-out hover:scale-105 ${isRewardsInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: `${i * 50}ms` }}>
                        <i className={`${option.logo} text-4xl`}></i>
                    </div>
                ))}
            </div>
        </section>
        
        {/* Stats Section */}
        <section ref={statsRef} className="py-20 bg-slate-50 dark:bg-[#141c2f] text-center">
             <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Join The EarnLab Success Story</h2>
             <p className="max-w-3xl mx-auto mb-12 text-slate-600 dark:text-slate-400">Be part of our growing community and start earning effortlessly. See how thousands are turning simple tasks into real money.</p>
             <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                <div className={`text-center transition-opacity duration-700 ${isStatsInView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-5xl font-bold text-blue-500 dark:text-blue-400"><AnimatedCounter value="415,942" /></div>
                    <div className="text-slate-600 dark:text-slate-400 mt-2">Total Users</div>
                </div>
                 <div className={`text-center transition-opacity duration-700 delay-200 ${isStatsInView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-5xl font-bold text-blue-500 dark:text-blue-400"><AnimatedCounter value="1,438,691" /></div>
                    <div className="text-slate-600 dark:text-slate-400 mt-2">Tasks Completed</div>
                </div>
                 <div className={`text-center transition-opacity duration-700 delay-300 ${isStatsInView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-5xl font-bold text-blue-500 dark:text-blue-400"><AnimatedCounter value="$3,741,246" /></div>
                    <div className="text-slate-600 dark:text-slate-400 mt-2">Total Earned</div>
                </div>
             </div>
             <button onClick={onLogin} className="mt-12 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg">Join Us</button>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className={`py-20 bg-white dark:bg-[#0f172a] transition-opacity duration-1000 ${isFaqInView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="container mx-auto px-8 max-w-4xl">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">Your EarnLab Questions Answered</h2>
                <div className="bg-white dark:bg-[#1e293b] rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
                    {FAQ_ITEMS.map((item, i) => <FaqAccordionItem key={i} item={item} />)}
                </div>
            </div>
        </section>
    </div>
  );
};

export default HomePageContent;