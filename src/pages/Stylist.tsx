import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Instagram, Phone, Star, MessageCircle, Upload, Wand2, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateStylingAdvice } from '../services/aiService';

export default function Stylist() {
  const [aiParams, setAiParams] = useState({
    skinTone: 'Fair',
    bodyType: 'Athletic',
    eventType: 'Wedding',
    budget: 'Premium'
  });
  const [aiResult, setAiResult] = useState('');
  const [loading, setLoading] = useState(false);

  const localStylists = [
    { name: 'Ananya Sharma', location: 'Delhi', phone: '+91 98765 43210', exp: '5 years', rating: 4.9, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
    { name: 'Riya Kapoor', location: 'Mumbai, Maharashtra', phone: '+91 91234 56789', exp: '7 years', rating: 4.8, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
    { name: 'Meera Nair', location: 'Kochi, Kerala', phone: '+91 99887 76655', exp: '6 years', rating: 4.7, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Priya Das', location: 'Kolkata, West Bengal', phone: '+91 98333 44444', exp: '4 years', rating: 4.6, img: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=80' },
    { name: 'Zoya Khan', location: 'Hyderabad, Telangana', phone: '+91 91444 55555', exp: '8 years', rating: 4.9, img: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80' },
    { name: 'Sanya Malhotra', location: 'Chandigarh, Punjab', phone: '+91 99555 66666', exp: '5 years', rating: 4.8, img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80' },
    { name: 'Ishani Verma', location: 'Jaipur, Rajasthan', phone: '+91 91666 77777', exp: '6 years', rating: 4.7, img: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=crop&w=400&q=80' },
    { name: 'Kavita Reddy', location: 'Bangalore, Karnataka', phone: '+91 88777 88888', exp: '7 years', rating: 4.8, img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0ad2f01?auto=format&fit=crop&w=400&q=80' },
    { name: 'Neha Gupta', location: 'Lucknow, Uttar Pradesh', phone: '+91 91888 99999', exp: '5 years', rating: 4.6, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { name: 'Arjun Mehta', location: 'Ahmedabad, Gujarat', phone: '+91 99222 33333', exp: '9 years', rating: 4.9, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Simran Kaur', location: 'Amritsar, Punjab', phone: '+91 98111 22222', exp: '6 years', rating: 4.7, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { name: 'Rahul Varma', location: 'Indore, Madhya Pradesh', phone: '+91 91333 44444', exp: '4 years', rating: 4.5, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
  ];

  const handleAiGenerate = async () => {
    setLoading(true);
    const advice = await generateStylingAdvice(aiParams);
    setAiResult(advice || '');
    setLoading(false);
  };

  return (
    <div className="pt-24 pb-24 px-6 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-4">Stylist Module</h1>
          <p className="text-neutral-500 max-w-2xl mx-auto">Get personalized fashion advice from our AI or book a professional local stylist.</p>
        </div>

        {/* AI Stylist Section */}
        <section className="mb-24">
          <div className="glass rounded-3xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 text-gold/10 pointer-events-none">
              <Sparkles size={200} />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold">
                    <Wand2 size={24} />
                  </div>
                  <h2 className="text-3xl font-serif font-bold">AI Wedding Stylist</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Skin Tone</label>
                      <select 
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
                        value={aiParams.skinTone}
                        onChange={(e) => setAiParams({...aiParams, skinTone: e.target.value})}
                      >
                        <option>Fair</option><option>Medium</option><option>Olive</option><option>Deep</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Body Type</label>
                      <select 
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
                        value={aiParams.bodyType}
                        onChange={(e) => setAiParams({...aiParams, bodyType: e.target.value})}
                      >
                        <option>Athletic</option><option>Curvy</option><option>Petite</option><option>Tall</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Event Type</label>
                      <select 
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
                        value={aiParams.eventType}
                        onChange={(e) => setAiParams({...aiParams, eventType: e.target.value})}
                      >
                        <option>Wedding</option><option>Engagement</option><option>Sangeet</option><option>Reception</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Budget Range</label>
                      <select 
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
                        value={aiParams.budget}
                        onChange={(e) => setAiParams({...aiParams, budget: e.target.value})}
                      >
                        <option>Budget Friendly</option><option>Premium</option><option>Luxury</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Upload Photo (Optional)</label>
                    <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-8 text-center hover:border-gold transition-colors cursor-pointer group">
                      <Upload className="mx-auto mb-2 text-neutral-400 group-hover:text-gold transition-colors" />
                      <p className="text-xs text-neutral-500">Click to upload your photo for better analysis</p>
                    </div>
                  </div>

                  <button 
                    onClick={handleAiGenerate}
                    disabled={loading}
                    className="gold-gradient w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 group"
                  >
                    {loading ? 'Generating Look...' : 'Generate My Look'}
                    {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/50 min-h-[400px]">
                {aiResult ? (
                  <div className="markdown-body prose prose-slate max-w-none">
                    <ReactMarkdown>{aiResult}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400">
                    <Sparkles size={48} className="mb-4 opacity-20" />
                    <p>Your personalized AI-generated look will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Local Stylists Section */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Professional Local Stylists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {localStylists.map((stylist, i) => (
              <motion.div
                key={stylist.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-6 text-center group"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-gold/20 group-hover:border-gold transition-colors">
                  <img src={stylist.img} alt={stylist.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-1">{stylist.name}</h3>
                <p className="text-neutral-500 text-sm mb-4">{stylist.location} • {stylist.exp} exp</p>
                
                <div className="flex justify-center gap-1 text-gold mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? 'currentColor' : 'none'} />)}
                  <span className="text-sm font-bold ml-1">{stylist.rating}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a href={`tel:${stylist.phone}`} className="flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 py-3 rounded-xl text-sm font-bold transition-colors">
                    <Phone size={16} /> Call
                  </a>
                  <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-sm font-bold transition-colors">
                    <MessageCircle size={16} /> WhatsApp
                  </button>
                </div>
                <button className="w-full mt-3 flex items-center justify-center gap-2 border border-neutral-200 hover:border-gold py-3 rounded-xl text-sm font-bold transition-colors">
                  <Instagram size={16} /> Instagram Portfolio
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
