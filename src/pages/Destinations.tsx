import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, IndianRupee, ArrowRight } from 'lucide-react';

export default function Destinations() {
  const destinations = [
    { title: 'Goa Beach Wedding', budget: '₹15 - 50 Lakhs', season: 'Nov - Feb', types: 'Beach, Resort', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80' },
    { title: 'Udaipur Palace Wedding', budget: '₹50 - 2 Cr', season: 'Oct - Mar', types: 'Palace, Heritage', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80' },
    { title: 'Jaipur Royal Wedding', budget: '₹30 - 1.5 Cr', season: 'Oct - Mar', types: 'Fort, Palace', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
    { title: 'Kerala Backwaters', budget: '₹10 - 30 Lakhs', season: 'Sep - Mar', types: 'Houseboat, Resort', img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80' },
    { title: 'Manali Mountain Wedding', budget: '₹10 - 25 Lakhs', season: 'Apr - Jun', types: 'Resort, Meadow', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80' },
    { title: 'Andaman Island Wedding', budget: '₹20 - 60 Lakhs', season: 'Dec - Mar', types: 'Island, Beach', img: 'https://images.unsplash.com/photo-1589197331516-4d8458bb841e?auto=format&fit=crop&w=800&q=80' },
    { title: 'Shimla Hill Wedding', budget: '₹15 - 40 Lakhs', season: 'Mar - Jun', types: 'Hill Station, Resort', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80' },
    { title: 'Jaisalmer Desert Wedding', budget: '₹25 - 70 Lakhs', season: 'Nov - Feb', types: 'Desert, Fort', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
    { title: 'Rishikesh Riverside', budget: '₹10 - 30 Lakhs', season: 'Sep - Nov', types: 'Riverside, Spiritual', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80' },
    { title: 'Mysore Heritage Wedding', budget: '₹20 - 50 Lakhs', season: 'Oct - Mar', types: 'Heritage, Palace', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="pt-24 pb-24 px-6 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-4">Destination Weddings in India</h1>
          <p className="text-neutral-500 max-w-2xl mx-auto">From royal palaces to serene beaches, find the perfect backdrop for your love story.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl overflow-hidden group"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={dest.img} 
                  alt={dest.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1">
                  <MapPin size={12} /> {dest.title.split(' ')[0]}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-6">{dest.title}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-neutral-500">
                    <IndianRupee size={18} className="text-gold" />
                    <span className="text-sm">Budget: <span className="font-bold text-neutral-900">{dest.budget}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-500">
                    <Calendar size={18} className="text-gold" />
                    <span className="text-sm">Best Season: <span className="font-bold text-neutral-900">{dest.season}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-500">
                    <MapPin size={18} className="text-gold" />
                    <span className="text-sm">Venue Types: <span className="font-bold text-neutral-900">{dest.types}</span></span>
                  </div>
                </div>

                <button className="gold-gradient w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 group">
                  Contact Planner <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
