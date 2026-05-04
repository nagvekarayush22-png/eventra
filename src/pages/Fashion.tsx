import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Filter, Search, ArrowRight } from 'lucide-react';
import { FashionItem } from '../types';

export default function Fashion() {
  const [items, setItems] = useState<FashionItem[]>([]);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  useEffect(() => {
    fetch('/api/fashion')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const categories = ['All', 'Lehenga', 'Saree', 'Gown', 'Sherwani', 'Suit'];

  const filteredItems = items
    .filter(item => filter === 'All' || item.category === filter)
    .sort((a, b) => {
      if (sortBy === 'Price Low to High') return a.price - b.price;
      if (sortBy === 'Price High to Low') return b.price - a.price;
      if (sortBy === 'Rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="pt-24 pb-24 px-6 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-serif font-bold mb-2">Bride & Groom Fashion</h1>
            <p className="text-neutral-500">Luxury couture for your special day.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="text" 
                placeholder="Search designers..." 
                className="pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-full text-sm focus:ring-2 focus:ring-gold outline-none w-64"
              />
            </div>
            <select 
              className="bg-white border border-neutral-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-gold outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Newest</option>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                filter === cat ? 'gold-gradient' : 'bg-white border border-neutral-200 text-neutral-500 hover:border-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-neutral-400 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
                {item.trending && (
                  <span className="absolute top-4 left-4 bg-gold text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Trending</span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="gold-gradient text-white px-6 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2">
                    Book Styling <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-serif text-lg font-bold">{item.name}</h3>
                  <div className="flex items-center gap-1 text-gold">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{item.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 uppercase tracking-widest">{item.designer}</p>
                <p className="text-gold font-bold">₹{item.price.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
