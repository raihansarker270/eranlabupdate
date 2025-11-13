import React, { useState } from 'react';

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialEmail: string;
    onSignupSuccess: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, initialEmail, onSignupSuccess }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically have more complex validation and an API call
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }
        console.log(`Registering user: ${initialEmail} with password: ${password}`);
        onSignupSuccess();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-[#141c2f] text-white p-8 rounded-lg shadow-2xl border border-slate-700 max-w-md w-full m-4"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Create your Account</h2>
                    <button 
                        onClick={onClose} 
                        className="text-3xl font-light text-slate-400 hover:text-white"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                        <input 
                            type="email" 
                            id="email"
                            value={initialEmail}
                            readOnly
                            className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
                        />
                    </div>
                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={8}
                            className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                        Create Account
                    </button>
                </form>
                 <p className="text-xs text-slate-500 text-center mt-4">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default SignupModal;