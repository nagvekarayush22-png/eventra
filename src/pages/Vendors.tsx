import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star, Phone, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Vendor } from '../types';

export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [category, setCategory] = useState('All');
  const [city, setCity] = useState('All');

  useEffect(() => {
    fetch('/api/vendors')
      .then(res => res.json())
      .then(data => setVendors(data));
  }, []);

  const categories = ['All', 'Photographer', 'Caterer', 'Decorator', 'Makeup Artist', 'DJ'];
  const cities = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Udaipur', 'Goa', 'Jaipur', 'Chennai', 'Kolkata', 'Chandigarh', 'Shimla', 'Jodhpur'];

  const filteredVendors = vendors.filter(v => {
    const catMatch = category === 'All' || v.category === category;
    const cityMatch = city === 'All' || v.city === city;
    return catMatch && cityMatch;
  });

  return (
    <div className="pt-24 pb-24 px-6 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-serif font-bold mb-2">Local Vendors</h1>
            <p className="text-neutral-500">Connect with the best event professionals in your city.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="text" 
                placeholder="Search business..." 
                className="pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-full text-sm focus:ring-2 focus:ring-gold outline-none w-64"
              />
            </div>
            <select 
              className="bg-white border border-neutral-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-gold outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select 
              className="bg-white border border-neutral-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-gold outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map((vendor, i) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl overflow-hidden group"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={vendor.image} 
                  alt={vendor.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-gold text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                  {vendor.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-serif font-bold">{vendor.name}</h3>
                  <div className="flex items-center gap-1 text-gold">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold">{vendor.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <MapPin size={16} className="text-gold" />
                    <span className="text-sm">{vendor.city}, {vendor.state}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Phone size={16} className="text-gold" />
                    <span className="text-sm">{vendor.contact}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 py-3 rounded-xl text-sm font-bold transition-colors">
                    <ImageIcon size={16} /> Portfolio
                  </button>
                  <button className="gold-gradient py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 group/book">
                    Book Now <ArrowRight size={16} className="group-hover/book:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
