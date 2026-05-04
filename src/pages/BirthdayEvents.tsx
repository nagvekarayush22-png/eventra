import React from 'react';
import { motion } from 'motion/react';
import { Gift, Star, Clock, ArrowRight, Heart, Baby, Sparkles } from 'lucide-react';

export default function BirthdayEvents() {
  const sections = [
    { 
      id: 'birthday',
      title: 'Birthday Celebrations', 
      desc: 'From magical kids themes to sophisticated adult milestones, we make every birthday unforgettable.',
      items: [
        { title: 'Kids Birthday Themes', desc: 'Magical worlds for your little ones.', img: 'https://images.unsplash.com/photo-1533294160622-d5fece3e080d?auto=format&fit=crop&w=800&q=80' },
        { title: 'Luxury Adult Birthday', desc: 'Sophisticated celebrations for milestones.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80' },
      ],
      icon: Gift
    },
    { 
      id: 'anniversary',
      title: 'Anniversaries', 
      desc: 'Celebrate your journey of love with an elegant and romantic anniversary event.',
      items: [
        { title: 'Silver Jubilee', desc: '25 years of togetherness celebrated in style.', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80' },
        { title: 'Golden Anniversary', desc: 'A royal celebration for 50 years of love.', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
      ],
      icon: Heart
    },
    { 
      id: 'babyshower',
      title: 'Baby Showers', 
      desc: 'Welcome the new arrival with a beautiful and heartwarming baby shower.',
      items: [
        { title: 'Elegant Baby Shower', desc: 'Soft palettes and refined decor for the mom-to-be.', img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80' },
        { title: 'Themed Baby Celebration', desc: 'Creative and fun themes for your little one.', img: 'https://images.unsplash.com/photo-1558085324-2f298b28c714?auto=format&fit=crop&w=800&q=80' },
      ],
      icon: Baby
    },
    { 
      id: 'engagement',
      title: 'Engagements', 
      desc: 'The perfect start to your forever. Elegant engagement parties tailored to your story.',
      items: [
        { title: 'Royal Engagement', desc: 'A grand celebration for your commitment.', img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80' },
      ],
      icon: Sparkles
    }
  ];

  return (
    <div className="pt-24 pb-24 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif font-bold mb-4">Personal Events</h1>
          <p className="text-neutral-500 max-w-2xl mx-auto">Bespoke planning for life's most precious milestones.</p>
        </div>

        {sections.map((section, idx) => (
          <section key={section.id} id={section.id} className={`py-16 ${idx % 2 === 0 ? '' : 'bg-blush/5 -mx-6 px-6'}`}>
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="md:w-1/3 sticky top-32">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mb-6">
                  <section.icon size={32} />
                </div>
                <h2 className="text-4xl font-serif font-bold mb-4">{section.title}</h2>
                <p className="text-neutral-500 mb-8 leading-relaxed">{section.desc}</p>
                <button className="gold-gradient px-8 py-3 rounded-full font-bold flex items-center gap-2 group">
                  Plan {section.title} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {section.items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-3xl overflow-hidden group"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-serif font-bold mb-2">{item.title}</h3>
                      <p className="text-neutral-500 text-sm mb-6">{item.desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gold">
                          <Clock size={16} />
                          <span className="text-xs font-bold uppercase tracking-widest">Quick Booking</span>
                        </div>
                        <button className="gold-gradient px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 group/theme">
                          Select Theme <ArrowRight size={14} className="group-hover/theme:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
