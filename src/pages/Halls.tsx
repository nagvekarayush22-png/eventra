import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Wind, Home, Search, Filter, ArrowRight } from 'lucide-react';
import { Hall } from '../types';

export default function Halls() {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [city, setCity] = useState('All');
  const [capacity, setCapacity] = useState(0);

  useEffect(() => {
    fetch('/api/halls')
      .then(res => res.json())
      .then(data => setHalls(data));
  }, []);

  const cities = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Udaipur', 'Goa', 'Jaipur'];

  const filteredHalls = halls.filter(hall => {
    const cityMatch = city === 'All' || hall.city === city;
    const capacityMatch = hall.capacity >= capacity;
    return cityMatch && capacityMatch;
  });

  return (
    <div className="pt-24 pb-24 px-6 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-serif font-bold mb-2">Wedding Halls</h1>
            <p className="text-neutral-500">Find the perfect venue for your grand celebration.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="text" 
                placeholder="Search venues..." 
                className="pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-full text-sm focus:ring-2 focus:ring-gold outline-none w-64"
              />
            </div>
            <select 
              className="bg-white border border-neutral-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-gold outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Capacity Filter */}
        <div className="glass p-6 rounded-2xl mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-grow space-y-2 w-full">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex justify-between">
              Minimum Capacity <span>{capacity}+ Guests</span>
            </label>
            <input 
              type="range" min="0" max="2000" step="50"
              className="w-full accent-gold"
              value={capacity}
              onChange={(e) => setCapacity(parseInt(e.target.value))}
            />
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-full border border-neutral-200 text-sm font-bold hover:border-gold transition-colors">Indoor</button>
            <button className="px-6 py-2 rounded-full border border-neutral-200 text-sm font-bold hover:border-gold transition-colors">Outdoor</button>
            <button className="px-6 py-2 rounded-full border border-neutral-200 text-sm font-bold hover:border-gold transition-colors">AC</button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHalls.map((hall, i) => (
            <motion.div
              key={hall.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl overflow-hidden group"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={hall.image} 
                  alt={hall.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-neutral-900 text-xs font-bold">
                  ₹{hall.price_per_day.toLocaleString()}/day
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-4">{hall.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <MapPin size={16} className="text-gold" />
                    <span className="text-sm">{hall.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Users size={16} className="text-gold" />
                    <span className="text-sm">{hall.capacity} Guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Home size={16} className="text-gold" />
                    <span className="text-sm">{hall.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Wind size={16} className="text-gold" />
                    <span className="text-sm">{hall.ac}</span>
                  </div>
                </div>

                <button className="gold-gradient w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 group/book">
                  Book Now <ArrowRight size={18} className="group-hover/book:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
