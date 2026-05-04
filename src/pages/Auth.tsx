import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Auth({ defaultIsLogin = true }: { defaultIsLogin?: boolean }) {
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-6">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-royal/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md p-8 md:p-12 rounded-3xl relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold mb-2">EVENTRA</h1>
          <p className="text-neutral-500">{isLogin ? 'Welcome back to luxury.' : 'Join the premier event platform.'}</p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm mb-6 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input 
                  type="text" 
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-gold"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="email" 
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-gold"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="password" 
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-gold"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="gold-gradient w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 group">
            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500 mb-6">Or continue with</p>
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-neutral-200 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-colors">
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-neutral-200 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-colors">
              <Github size={18} /> GitHub
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-gold hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
