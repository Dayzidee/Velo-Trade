
import React, { useState } from 'react';
import { View } from '../App';

interface LoginProps {
  navigateTo: (view: View) => void;
}

const Login: React.FC<LoginProps> = ({ navigateTo }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in...', formData);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-md z-10">
        <div className="bg-zinc-900/40 backdrop-blur-3xl border border-zinc-800/80 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(124,58,237,0.05)]">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Welcome Back</h2>
            <p className="text-zinc-500 font-medium">Log in to your Velo account to continue trading.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email or Username</label>
              <input 
                type="text" 
                placeholder="Enter your identifier"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
                value={formData.identifier}
                onChange={(e) => setFormData({...formData, identifier: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors">Forgot?</button>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full velo-gradient py-4 rounded-xl text-lg font-black text-white shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest mt-4 border border-white/10"
            >
              Log In
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center">
            <p className="text-zinc-500 text-sm font-medium">
              Don't have an account?{' '}
              <button 
                onClick={() => navigateTo('register')}
                className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
              >
                Sign Up for Free
              </button>
            </p>
          </div>
        </div>

        {/* Social Login Hint */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Or continue with</p>
          <div className="flex gap-4">
            <button className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center hover:bg-zinc-800 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.896 4.076-1.228 1.216-3.144 2.388-6.744 2.388-5.728 0-10.2-4.632-10.2-10.38s4.472-10.38 10.2-10.38c3.088 0 5.304 1.184 7.004 2.76l2.304-2.304C18.42 1.488 15.696 0 12.48 0 5.856 0 0 5.376 0 12s5.856 12 12.48 12c3.552 0 6.456-1.128 8.916-3.708 2.532-2.532 3.336-6.144 3.336-9.084 0-.84-.072-1.632-.204-2.352H12.48z"/>
              </svg>
            </button>
            <button className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center hover:bg-zinc-800 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
