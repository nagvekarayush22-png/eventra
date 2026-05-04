import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-24 pb-24 px-6 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-neutral-500 max-w-2xl mx-auto">We're here to help you plan your perfect event. Reach out to us anytime.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl">
              <h2 className="text-3xl font-serif font-bold mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Email Support</h4>
                    <p className="text-neutral-500">support@eventra.com</p>
                    <p className="text-neutral-500 text-sm">Response time: 2-4 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Customer Care</h4>
                    <p className="text-neutral-500">+91 1800-EVENTRA</p>
                    <p className="text-neutral-500 text-sm">Mon-Sat: 9 AM - 8 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold shrink-0">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">WhatsApp Support</h4>
                    <p className="text-neutral-500">+91 98765 43210</p>
                    <p className="text-neutral-500 text-sm">Instant chat support</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Headquarters</h4>
                    <p className="text-neutral-500">Luxury Heights, BKC, Mumbai, MH 400051</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl bg-royal text-white">
              <h3 className="text-2xl font-serif font-bold mb-4 text-gold">Live Chat</h3>
              <p className="text-white/70 mb-6">Need immediate assistance? Our event experts are online to help you with your planning.</p>
              <button className="bg-gold text-white px-8 py-3 rounded-full font-bold hover:bg-gold/90 transition-colors">Start Live Chat</button>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8 md:p-12 rounded-3xl"
          >
            <h2 className="text-3xl font-serif font-bold mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-gold" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-gold" placeholder="you@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Subject</label>
                <select className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-gold">
                  <option>Wedding Planning Inquiry</option>
                  <option>Vendor Partnership</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Message</label>
                <textarea className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-gold h-40 resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="gold-gradient w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 group">
                Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
