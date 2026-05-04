import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Users, Calendar } from 'lucide-react';

export default function Home() {
  const sections = [
    { title: 'Wedding Planning', desc: 'Plan your dream wedding in minutes.', link: '/wedding-planning', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
    { title: 'Birthday & Personal Events', desc: 'Memorable celebrations for every milestone.', link: '/birthday-events', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80' },
    { title: 'Destination Weddings', desc: 'Royal palaces to serene beaches.', link: '/destinations', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80' },
    { title: 'Bride & Groom Fashion', desc: 'Curated luxury fashion for the big day.', link: '/fashion', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="bg-ivory">
      <Hero />

      {/* Categories Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Services</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">Everything you need to plan a perfect celebration, all in one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
            >
              <img src={section.img} alt={section.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-serif font-bold mb-2">{section.title}</h3>
                <p className="text-sm text-white/70 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{section.desc}</p>
                <Link to={section.link} className="flex items-center gap-2 text-gold font-bold text-sm group/link">
                  Explore <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform text-gold" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-24 bg-blush/10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-2">Top Rated Vendors</h2>
              <p className="text-neutral-500">The best in the industry, handpicked for you.</p>
            </div>
            <Link to="/vendors" className="text-gold font-bold flex items-center gap-2 hover:underline group/all">
              View All <ArrowRight size={18} className="group-hover/all:translate-x-1 transition-transform text-gold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((v) => (
              <div key={v} className="glass rounded-2xl overflow-hidden group">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${v === 1 ? '1519225421980-715cb0215aed' : v === 2 ? '1537633552985-df8429e8048b' : '1555244162-803834f70033'}?auto=format&fit=crop&w=800&q=80`} 
                    alt="Vendor" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-bold">Royal Decorators</h3>
                    <div className="flex items-center gap-1 text-gold">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-bold">4.8</span>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-sm mb-4 flex items-center gap-1">
                    <MapPin size={14} /> Mumbai, Maharashtra
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Decorator</span>
                    <button className="text-gold font-bold text-sm hover:underline flex items-center gap-1 group/book">
                      Book Now <ArrowRight size={14} className="group-hover/book:translate-x-1 transition-transform text-gold" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-royal text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-5xl font-serif font-bold text-gold mb-2">0</div>
            <div className="text-sm uppercase tracking-widest text-white/60">Events Planned</div>
          </div>
          <div>
            <div className="text-5xl font-serif font-bold text-gold mb-2">0</div>
            <div className="text-sm uppercase tracking-widest text-white/60">Happy Clients</div>
          </div>
          <div>
            <div className="text-5xl font-serif font-bold text-gold mb-2">0</div>
            <div className="text-sm uppercase tracking-widest text-white/60">Top Vendors</div>
          </div>
          <div>
            <div className="text-5xl font-serif font-bold text-gold mb-2">0</div>
            <div className="text-sm uppercase tracking-widest text-white/60">Destinations</div>
          </div>
        </div>
      </section>
    </div>
  );
}
