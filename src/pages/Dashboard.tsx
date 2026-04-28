import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Book as BookIcon, Clock, TrendingUp, Sparkles, ChevronRight, Bookmark, ArrowRight, Loader2 } from 'lucide-react';
import { Book } from '../types';
import { getBookRecommendation } from '../services/gemini';
import { useLibrary } from '../hooks/useLibrary';

const Dashboard: React.FC = () => {
  const { books, borrows } = useLibrary();
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loadingRec, setLoadingRec] = useState(false);

  const activeBorrows = borrows.filter(b => b.status === 'active').length;

  useEffect(() => {
    const fetchRec = async () => {
      setLoadingRec(true);
      const rec = await getBookRecommendation(
        `Interested in science and cosmology, current borrowed books: ${activeBorrows}`,
        "University Student",
        books
      );
      setRecommendation(rec || null);
      setLoadingRec(false);
    };
    fetchRec();
  }, [activeBorrows]);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl text-primary mb-2">Welcome back, Explorer</h1>
          <p className="text-gray-500 font-sans">You have {activeBorrows} books borrowed and 0 due this week.</p>
        </div>
        <div className="flex gap-4">
           <div className="text-right">
              <span className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">User Segment</span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-bold uppercase tracking-wider">University Student</span>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Collection', value: books.length.toString(), icon: BookIcon, color: 'text-blue-500' },
          { label: 'Currently Borrowed', value: activeBorrows.toString(), icon: Clock, color: 'text-orange-500' },
          { label: 'Return Rate', value: '100%', icon: TrendingUp, color: 'text-green-500' },
          { label: 'Saved Items', value: '0', icon: Bookmark, color: 'text-purple-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[24px] soft-shadow border border-gray-50 flex items-center gap-4"
          >
            <div className={`p-4 rounded-2xl bg-gray-50 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <span className="block text-sm text-gray-400 font-medium">{stat.label}</span>
              <span className="text-2xl font-bold text-primary">{stat.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-primary rounded-[40px] p-8 md:p-12 overflow-hidden relative group">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                <Sparkles size={12} />
                <span>AI Recommendation</span>
              </div>
              <h2 className="text-4xl text-white mb-4 italic">Tailored for your academic journey</h2>
              {loadingRec ? (
                <div className="flex items-center gap-3 text-white/40 italic">
                  <Loader2 className="animate-spin" size={20} />
                  <span>AI Librarian is thinking...</span>
                </div>
              ) : (
                <p className="text-white/60 font-sans leading-relaxed">
                  {recommendation || 'Based on your recent interest in "Brief History of Time", you might find "The Elegant Universe" fascinating for your Physics course.'}
                </p>
              )}
           </div>
           <button className="bg-white text-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform flex items-center gap-2 group shadow-xl">
              Explorer Recommendation
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] -z-0 -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Recent Activity / New Arrivals Split */}
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-3xl text-primary">Popular in Science</h2>
              <button className="text-accent font-semibold flex items-center gap-2 group">
                 View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
           <div className="grid sm:grid-cols-2 gap-8">
              {books.slice(0, 2).map((book) => (
                <div key={book.id} className="bg-white rounded-[32px] overflow-hidden soft-shadow card-hover group border border-gray-50 flex flex-col h-full">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {!book.available && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/90 text-white text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">
                        Borrowed
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2 block">{book.category}</span>
                      <h3 className="text-xl mb-1 text-primary">{book.title}</h3>
                      <p className="text-gray-400 text-sm italic mb-4">by {book.author}</p>
                    </div>
                    <button className="w-full py-4 border border-primary/10 rounded-2xl font-bold uppercase tracking-widest text-[10px] text-primary hover:bg-primary hover:text-white transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl text-primary">Library Updates</h2>
          <div className="space-y-6">
             {[
               { title: 'New Arrival', desc: 'Sapiens: A Brief History of Humankind', time: '2 hours ago' },
               { title: 'Borrowed', desc: 'You borrowed "The Great Gatsby"', time: 'Yesterday' },
               { title: 'Due Soon', desc: '"Atomic Habits" is due in 2 days', time: '3 hours ago' },
             ].map((update, i) => (
               <div key={i} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-white hover:soft-shadow transition-all group">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 group-hover:scale-150 transition-transform" />
                  <div>
                    <h4 className="font-serif text-primary font-bold">{update.title}</h4>
                    <p className="text-sm text-gray-500 font-sans line-clamp-1">{update.desc}</p>
                    <span className="text-[10px] uppercase font-bold text-gray-300 tracking-widest mt-1 block">{update.time}</span>
                  </div>
               </div>
             ))}
          </div>
          <div className="p-8 bg-primary-light rounded-[32px] border border-primary/5">
             <h4 className="text-xl text-primary mb-4 italic">Quick Pro Tip</h4>
             <p className="text-gray-500 text-sm leading-relaxed font-sans">Lecturers can now reserve specialized research journals directly from the catalog.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
