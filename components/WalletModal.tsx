import React, { useContext, useState } from 'react';
import { AppContext } from '../App';

const WithdrawalForm: React.FC<{
    cryptoName: string;
    onBack: () => void;
}> = ({ cryptoName, onBack }) => {
    const { balance, setBalance } = useContext(AppContext);
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('0');

    const handleCreateWithdrawal = () => {
        const withdrawalAmount = parseFloat(amount);
        if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
            alert('Please enter a valid positive amount.');
            return;
        }
        if (withdrawalAmount > balance) {
            alert('Insufficient funds.');
            return;
        }
        
        setBalance(prev => prev - withdrawalAmount);
        alert(`Successfully created withdrawal of ${withdrawalAmount} ${cryptoName.split(' ')[0]}.`);
        onBack(); // Go back to the main wallet view
    };

    return (
        <div className="text-slate-700 dark:text-slate-300">
            <h2 className="text-sm font-semibold mb-6">
                <span className="text-slate-500 dark:text-slate-400">Crypto</span> &gt; {cryptoName}
            </h2>
            <div className="space-y-6">
                <div>
                    <label htmlFor="chain" className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Chain</label>
                    <div className="relative">
                        <select
                            id="chain"
                            className="w-full bg-slate-100 dark:bg-[#1e293b] border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue={cryptoName}
                        >
                            <option>{cryptoName}</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="wallet-address" className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Wallet Address</label>
                    <div className="relative">
                        <input
                            type="text"
                            id="wallet-address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your Wallet Address..."
                            className="w-full bg-slate-100 dark:bg-[#1e293b] border border-slate-300 dark:border-slate-700 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                         <button className="absolute inset-y-0 right-0 flex items-center justify-center w-12 bg-sky-500 text-white rounded-r-lg hover:bg-sky-600">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                             <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                           </svg>
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="amount" className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Amount</label>
                    <div className="relative flex items-center">
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className="w-full bg-slate-100 dark:bg-[#1e293b] border border-slate-300 dark:border-slate-700 rounded-lg pl-4 pr-32 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button 
                            onClick={() => setAmount(balance.toFixed(2))}
                            className="absolute right-2 bg-sky-500 text-white font-semibold py-1.5 px-4 rounded-md hover:bg-sky-600 text-sm"
                        >
                            Max Amount
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
                 <button onClick={onBack} className="p-3 bg-slate-100 dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg">
                    <i className="fas fa-undo"></i>
                 </button>
                <button 
                    onClick={handleCreateWithdrawal}
                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg"
                >
                    Create Withdrawal
                </button>
            </div>
        </div>
    );
};


const WalletModal: React.FC = () => {
    const { isWalletModalOpen, setIsWalletModalOpen } = useContext(AppContext);
    const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);

    const closeModal = () => {
        setIsWalletModalOpen(false);
        setTimeout(() => setSelectedCrypto(null), 300); // Reset state after closing animation
    };

    if (!isWalletModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
            <div className="bg-white dark:bg-[#141c2f] rounded-lg shadow-xl w-full max-w-md text-slate-800 dark:text-slate-300" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex border-b border-slate-200 dark:border-slate-700">
                           <button className={`px-4 py-2 font-semibold text-slate-900 dark:text-white border-b-2 border-blue-500`}>
                                Withdraw
                            </button>
                        </div>
                        <button onClick={closeModal} className="text-3xl font-light text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">&times;</button>
                    </div>

                    {selectedCrypto ? (
                        <WithdrawalForm 
                            cryptoName={selectedCrypto} 
                            onBack={() => setSelectedCrypto(null)} 
                        />
                    ) : (
                        <div>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Special</h3>
                                    <button className="w-full bg-slate-100 dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-700 p-4 rounded-lg flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <i className="fas fa-dice text-green-400 text-xl"></i>
                                            <span className="font-semibold">Gamdom</span>
                                        </div>
                                        <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">+25%</span>
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Cash</h3>
                                    <button className="w-full bg-slate-100 dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
                                        <i className="fab fa-cc-visa text-blue-400 text-xl"></i>
                                        <span className="font-semibold">Virtual Visa Interna...</span>
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Crypto</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {['Bitcoin (BTC)', 'Ethereum (ETH)', 'Litecoin (LTC)', 'Solana (SOL)', 'Tether (USDT)', 'USD Coin (USDC)', 'Tron (TRX)', 'Ripple (XRP)'].map(crypto => (
                                            <button 
                                              key={crypto} 
                                              onClick={() => setSelectedCrypto(crypto)}
                                              className="bg-slate-100 dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-700 p-4 rounded-lg text-center flex flex-col items-center justify-center gap-2"
                                            >
                                                <i className={`fab fa-${crypto.split(' ')[0].toLowerCase()}`}></i>
                                                <span className="block text-xs font-semibold">{crypto}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="text-center mt-4">
                                        <button className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-semibold">Show All</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WalletModal;