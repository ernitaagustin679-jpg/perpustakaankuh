import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Search, ArrowRight, ShieldCheck, Sparkles, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <nav className="max-w-7xl mx-auto px-8 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="text-primary" size={32} />
          <span className="font-serif text-2xl font-bold text-primary uppercase tracking-tight">Perpustakaanku</span>
        </div>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-500 uppercase tracking-widest">
           <a href="#features" className="hover:text-primary transition-colors">Features</a>
           <a href="#segments" className="hover:text-primary transition-colors">Segments</a>
           <Link to="/dashboard" className="bg-primary text-white px-6 py-3 rounded-full hover:shadow-lg transition-all">Get Started</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-16 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-xs font-semibold uppercase tracking-widest mb-8">
            <Sparkles size={14} />
            <span>AI-Powered Library Experience</span>
          </div>
          <h1 className="text-6xl md:text-8xl leading-[0.9] text-primary mb-8">
            Digital Wisdom, <br />
            <span className="text-accent italic font-light">Redefined.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-md leading-relaxed">
            Perpustakaanku is more than just a catalog. It's a smart ecosystem that understands your reading journey as a student, teacher, or explorer.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard" className="bg-primary text-white px-10 py-5 rounded-full flex items-center gap-3 group hover:shadow-2xl transition-all">
              <span className="font-semibold uppercase tracking-widest text-sm">Enter Dashboard</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2690&auto=format&fit=crop" 
              alt="Modern Library"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent rounded-full blur-3xl opacity-20 -z-10" />
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary rounded-full blur-3xl opacity-10 -z-10" />
        </motion.div>
      </main>

      <section id="features" className="bg-primary py-32 mt-20">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-12">
           <div className="text-white space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Search size={24} className="text-accent" />
              </div>
              <h3 className="text-2xl">Smart Discovery</h3>
              <p className="text-white/60 leading-relaxed font-sans">Our AI analyzes your interests to suggest the perfect next read, tailored to your academic or personal goals.</p>
           </div>
           <div className="text-white space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Users size={24} className="text-accent" />
              </div>
              <h3 className="text-2xl">Role-Based Access</h3>
              <p className="text-white/60 leading-relaxed font-sans">Whether you are a student, lecturer, or general public, the experience adapts to your specific needs.</p>
           </div>
           <div className="text-white space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <ShieldCheck size={24} className="text-accent" />
              </div>
              <h3 className="text-2xl">Digital Security</h3>
              <p className="text-white/60 leading-relaxed font-sans">Borrow, return, and manage your collection with our secure, instant digital tracking system.</p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
