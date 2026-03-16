
import React, { useState } from 'react';
import { View } from '../App';

interface RegisterProps {
  navigateTo: (view: View) => void;
}

const Register: React.FC<RegisterProps> = ({ navigateTo }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering...', formData);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-xl z-10">
        <div className="bg-zinc-900/40 backdrop-blur-3xl border border-zinc-800/80 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(124,58,237,0.05)]">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Join Velo</h2>
            <p className="text-zinc-500 font-medium">Start your free copy-trading journey in minutes.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Confirm</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <div className="md:col-span-2 space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-1 relative w-5 h-5 flex-shrink-0">
                  <input type="checkbox" className="peer absolute opacity-0 cursor-pointer" required />
                  <div className="w-5 h-5 bg-zinc-950 border border-zinc-800 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all"></div>
                  <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  I agree to Velo's <button type="button" className="text-cyan-400 hover:underline">Terms of Service</button> and <button type="button" className="text-cyan-400 hover:underline">Privacy Policy</button>.
                </span>
              </label>

              <button 
                type="submit"
                className="w-full velo-gradient py-5 rounded-xl text-xl font-black text-white shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all uppercase tracking-widest border border-white/10"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-10 pt-10 border-t border-zinc-800/50 text-center">
            <p className="text-zinc-500 font-medium">
              Already have an account?{' '}
              <button 
                onClick={() => navigateTo('login')}
                className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
              >
                Sign In Now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
