import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Indian Wedding" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-gold font-serif italic text-2xl mb-2 tracking-widest">“The Time Saver”</h2>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tight">
            EVENTRA
          </h1>
          <p className="text-xl md:text-2xl text-ivory/90 mb-10 font-light tracking-wide">
            Plan Every Celebration in Minutes. Premium Indian Event Planning.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/wedding-planning" className="gold-gradient px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 group">
              Plan Wedding <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-white" />
            </Link>
            <Link to="/birthday-events#birthday" className="gold-gradient px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 group">
              Plan Birthday <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-white" />
            </Link>
            <Link to="/birthday-events" className="gold-gradient px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 group">
              Plan Personal Events <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-white" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
