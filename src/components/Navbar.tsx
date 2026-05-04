import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Bell, Heart, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Wedding Planning', href: '/wedding-planning' },
    { 
      name: 'Personal Events', 
      href: '/birthday-events',
      subLinks: [
        { name: 'Birthdays', href: '/birthday-events#birthday' },
        { name: 'Anniversaries', href: '/birthday-events#anniversary' },
        { name: 'Baby Showers', href: '/birthday-events#babyshower' },
        { name: 'Engagements', href: '/birthday-events#engagement' },
      ]
    },
    { name: 'Fashion', href: '/fashion' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Halls', href: '/halls' },
    { name: 'Vendors', href: '/vendors' },
    { name: 'AI Stylist', href: '/stylist' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "glass py-2" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl font-serif font-bold tracking-tighter text-gold">EVENTRA</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link 
                to={link.href}
                className="text-sm font-medium hover:text-gold transition-colors py-4"
              >
                {link.name}
              </Link>
              {link.subLinks && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="glass rounded-xl p-4 min-w-[200px] shadow-2xl">
                    {link.subLinks.map(sub => (
                      <a 
                        key={sub.name} 
                        href={sub.href}
                        className="block py-2 text-sm text-neutral-600 hover:text-gold transition-colors"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/wishlist" className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
            <Heart size={20} />
          </Link>
          <Link to="/notifications" className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 hover:text-gold transition-colors">
                <User size={20} />
                <span className="text-sm font-medium">{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="gold-gradient px-6 py-2 rounded-full text-sm font-semibold">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 glass border-t border-black/5 p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col gap-2">
                <Link 
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
                {link.subLinks && (
                  <div className="pl-4 flex flex-col gap-2 border-l border-gold/20">
                    {link.subLinks.map(sub => (
                      <a 
                        key={sub.name} 
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-neutral-500 hover:text-gold transition-colors"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <hr className="border-black/5" />
            <div className="flex items-center justify-between">
              <button onClick={toggleDarkMode} className="flex items-center gap-2 text-sm font-medium">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              {user ? (
                <button onClick={handleLogout} className="text-red-500 text-sm font-medium">Logout</button>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)} className="text-gold text-sm font-medium">Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
