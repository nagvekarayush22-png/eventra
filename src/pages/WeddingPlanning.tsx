import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, MapPin, Palette, IndianRupee, ArrowRight } from 'lucide-react';

export default function WeddingPlanning() {
  const [formData, setFormData] = useState({
    type: 'Traditional',
    budget: 1000000,
    guests: 200,
    state: 'Maharashtra',
    date: '',
    theme: '#D4AF37'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Rajasthan', 'Goa', 'Kerala', 'Tamil Nadu'];
  const types = ['Traditional', 'Beach', 'Palace', 'Temple', 'Modern'];

  return (
    <div className="pt-24 pb-24 px-6 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4">Plan Your Wedding</h1>
          <p className="text-neutral-500">Fill in the details to get an instant planning summary.</p>
        </div>

        {!submitted ? (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="glass p-8 md:p-12 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Wedding Type</label>
              <select 
                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold outline-none"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-neutral-500">State</label>
              <select 
                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold outline-none"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              >
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-neutral-500 flex justify-between">
                Budget <span>₹{(formData.budget / 100000).toFixed(1)} Lakhs</span>
              </label>
              <input 
                type="range" min="100000" max="5000000" step="50000"
                className="w-full accent-gold"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-neutral-500 flex justify-between">
                Guest Count <span>{formData.guests}</span>
              </label>
              <input 
                type="range" min="50" max="2000" step="10"
                className="w-full accent-gold"
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Wedding Date</label>
              <input 
                type="date"
                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold outline-none"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Theme Color</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="color"
                  className="w-12 h-12 rounded-full overflow-hidden border-none cursor-pointer"
                  value={formData.theme}
                  onChange={(e) => setFormData({...formData, theme: e.target.value})}
                />
                <span className="text-sm font-mono text-neutral-400 uppercase">{formData.theme}</span>
              </div>
            </div>

            <div className="md:col-span-2 pt-4">
              <button type="submit" className="gold-gradient w-full py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 group">
                Generate Planning Summary <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-12 rounded-3xl text-center"
          >
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
              <Calendar size={40} />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-8">Your Wedding Summary</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12 text-left">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-neutral-400">Type</p>
                <p className="font-bold text-lg">{formData.type}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-neutral-400">Location</p>
                <p className="font-bold text-lg">{formData.state}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-neutral-400">Budget</p>
                <p className="font-bold text-lg">₹{(formData.budget / 100000).toFixed(1)} Lakhs</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-neutral-400">Guests</p>
                <p className="font-bold text-lg">{formData.guests}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-neutral-400">Date</p>
                <p className="font-bold text-lg">{formData.date || 'TBD'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-neutral-400">Theme</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.theme }}></div>
                  <p className="font-bold text-lg uppercase">{formData.theme}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="gold-gradient px-8 py-3 rounded-full font-bold flex items-center gap-2 group">
                Save to Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setSubmitted(false)} className="px-8 py-3 rounded-full font-bold border border-neutral-200 hover:border-gold transition-colors">Edit Details</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
