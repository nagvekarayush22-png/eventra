import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WeddingPlanning from './pages/WeddingPlanning';
import Fashion from './pages/Fashion';
import Destinations from './pages/Destinations';
import Halls from './pages/Halls';
import Stylist from './pages/Stylist';
import Vendors from './pages/Vendors';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';

import BirthdayEvents from './pages/BirthdayEvents';

import { Instagram, Facebook, Twitter, Share2, Check } from 'lucide-react';
import { useState } from 'react';

export default function App() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Eventra - The Time Saver',
      text: 'Check out Eventra, India\'s premier luxury event planning platform!',
      url: window.location.origin,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.origin);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Clipboard error:', err);
      }
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wedding-planning" element={<WeddingPlanning />} />
            <Route path="/birthday-events" element={<BirthdayEvents />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/halls" element={<Halls />} />
            <Route path="/stylist" element={<Stylist />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth defaultIsLogin={true} />} />
            <Route path="/signup" element={<Auth defaultIsLogin={false} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="bg-neutral-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-serif font-bold text-gold mb-4 tracking-tighter">EVENTRA</h3>
              <p className="text-neutral-400 max-w-md mb-6">
                Eventra is India's premier luxury event planning platform. We bring elegance and efficiency to your most cherished celebrations.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors cursor-pointer">
                    <Instagram size={20} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors cursor-pointer">
                    <Facebook size={20} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors cursor-pointer">
                    <Twitter size={20} />
                  </a>
                </div>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-gold/10 hover:bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-bold transition-all border border-gold/20"
                >
                  {copied ? <Check size={16} /> : <Share2 size={16} />}
                  {copied ? 'Link Copied!' : 'Share Website'}
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-4">Quick Links</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><Link to="/wedding-planning" className="hover:text-gold transition-colors">Wedding Planning</Link></li>
                <li><Link to="/fashion" className="hover:text-gold transition-colors">Fashion</Link></li>
                <li><Link to="/destinations" className="hover:text-gold transition-colors">Destinations</Link></li>
                <li><Link to="/vendors" className="hover:text-gold transition-colors">Vendor Search</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-4">Support</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
                <li><Link to="/faq" className="hover:text-gold transition-colors">FAQs</Link></li>
                <li><Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-neutral-500 text-sm">
            © 2026 Eventra - The Time Saver. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Helper Link component for footer since Router is defined inside App
import { Link as RouterLink } from 'react-router-dom';
function Link({ to, children, className }: { to: string, children: React.ReactNode, className?: string }) {
  return <RouterLink to={to} className={className}>{children}</RouterLink>;
}
