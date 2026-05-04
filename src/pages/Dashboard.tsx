import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Package, Heart, Settings, Bell, User, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Booking } from '../types';

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetch(`/api/user/bookings/${user.id}`)
      .then(res => res.json())
      .then(data => setBookings(data));
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="pt-24 pb-24 px-6 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass p-8 rounded-3xl text-center">
              <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 text-gold text-3xl font-serif font-bold">
                {user?.name?.[0]}
              </div>
              <h2 className="text-2xl font-serif font-bold">{user?.name}</h2>
              <p className="text-neutral-500 text-sm mb-6">{user?.email}</p>
              <button onClick={handleLogout} className="text-red-500 text-sm font-bold flex items-center justify-center gap-2 mx-auto hover:underline">
                <LogOut size={16} /> Logout
              </button>
            </div>

            <div className="glass rounded-3xl overflow-hidden">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-8 py-4 text-sm font-bold transition-all border-b border-black/5 last:border-none ${
                    activeTab === tab.id ? 'bg-gold text-white' : 'hover:bg-black/5 text-neutral-500'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                  <ChevronRight size={16} className="ml-auto opacity-50" />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-8 md:p-12 rounded-3xl min-h-[600px]"
            >
              {activeTab === 'bookings' && (
                <div>
                  <h3 className="text-3xl font-serif font-bold mb-8">My Bookings</h3>
                  {bookings.length > 0 ? (
                    <div className="space-y-6">
                      {bookings.map(booking => (
                        <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-neutral-100 rounded-2xl gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                              <Package size={24} />
                            </div>
                            <div>
                              <h4 className="font-bold">{booking.item_name}</h4>
                              <p className="text-sm text-neutral-500 uppercase tracking-widest">{booking.item_type}</p>
                            </div>
                          </div>
                          <div className="flex flex-col md:items-end">
                            <p className="text-sm font-bold">{new Date(booking.booking_date).toLocaleDateString()}</p>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mt-1 ${
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-24 text-neutral-400">
                      <Calendar size={64} className="mx-auto mb-4 opacity-20" />
                      <p>You have no active bookings yet.</p>
                      <button onClick={() => navigate('/')} className="text-gold font-bold mt-4 hover:underline">Start Planning</button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="text-center py-24 text-neutral-400">
                  <Bell size={64} className="mx-auto mb-4 opacity-20" />
                  <p>No new notifications.</p>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="text-center py-24 text-neutral-400">
                  <Heart size={64} className="mx-auto mb-4 opacity-20" />
                  <p>Your wishlist is empty.</p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <h3 className="text-3xl font-serif font-bold mb-8">Account Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Display Mode</label>
                      <div className="flex gap-4">
                        <button className="flex-1 py-3 border border-gold bg-gold/5 text-gold rounded-xl font-bold">Light Mode</button>
                        <button className="flex-1 py-3 border border-neutral-200 rounded-xl font-bold">Dark Mode</button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Language</label>
                      <select className="w-full py-3 px-4 border border-neutral-200 rounded-xl font-bold outline-none">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Marathi</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
