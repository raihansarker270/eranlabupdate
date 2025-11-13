import React, { useContext } from 'react';
import { AppContext } from '../App';

const WalletModal: React.FC = () => {
    const { isWalletModalOpen, setIsWalletModalOpen, balance, setBalance } = useContext(AppContext);

    const handleWithdraw = () => {
        const amount = 10; // Mock withdraw amount
        if (balance >= amount) {
            setBalance(prev => prev - amount);
            alert(`Withdrew $${amount}. New balance: $${(balance - amount).toFixed(2)}`);
        } else {
            alert('Insufficient funds.');
        }
    };

    if (!isWalletModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setIsWalletModalOpen(false)}>
            <div className="bg-[#141c2f] rounded-lg shadow-xl w-full max-w-3xl text-slate-300" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex border-b border-slate-700">
                           <button
                                className={`px-4 py-2 font-semibold text-white border-b-2 border-blue-500`}
                            >
                                Withdraw
                            </button>
                        </div>
                        <button onClick={() => setIsWalletModalOpen(false)} className="text-3xl font-light text-slate-400 hover:text-white">&times;</button>
                    </div>

                    <div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-400 mb-2">Special</h3>
                                <button className="w-full bg-[#1e293b] hover:bg-slate-700 p-4 rounded-lg flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-dice text-green-400 text-xl"></i>
                                        <span className="font-semibold">Gamdom</span>
                                    </div>
                                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">+25%</span>
                                </button>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-400 mb-2">Cash</h3>
                                <button className="w-full bg-[#1e293b] hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
                                    <i className="fab fa-cc-visa text-blue-400 text-xl"></i>
                                    <span className="font-semibold">Virtual Visa Interna...</span>
                                </button>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-400 mb-2">Crypto</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {['Bitcoin (BTC)', 'Ethereum (ETH)', 'Litecoin (LTC)', 'Solana (SOL)', 'Tether (USDT)', 'USD Coin (USDC)', 'Tron (TRX)', 'Ripple (XRP)'].map(crypto => (
                                        <button key={crypto} className="bg-[#1e293b] hover:bg-slate-700 p-4 rounded-lg text-center flex items-center justify-center gap-2">
                                            <i className={`fab fa-${crypto.split(' ')[0].toLowerCase()}`}></i>
                                            <span className="block text-sm font-semibold">{crypto.split(' ')[0]}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="text-center mt-4">
                                    <button className="text-blue-400 hover:text-blue-300 font-semibold">Show All</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletModal;