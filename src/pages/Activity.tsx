import React from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle, RotateCcw, AlertCircle, Heart, Star, ArrowRight } from 'lucide-react';
import { useLibrary } from '../hooks/useLibrary';
import { Link } from 'react-router-dom';

const Activity: React.FC = () => {
  const { books, borrows, favorites, returnBook, toggleFavorite } = useLibrary();

  const activeBorrows = borrows.filter(b => b.status === 'active');
  const pastBorrows = borrows.filter(b => b.status !== 'active');
  const favoriteBooks = books.filter(b => favorites.includes(b.id));

  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl md:text-5xl text-primary mb-2 italic">Your Reading Journey</h1>
        <p className="text-gray-500 font-sans">Track your borrows, manage your wishlist, and explore history.</p>
      </div>

      {/* Active Borrows */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl text-primary font-serif">Active Orders</h2>
          <span className="px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">{activeBorrows.length} Active</span>
        </div>
        
        {activeBorrows.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeBorrows.map((record) => {
              const book = books.find(b => b.id === record.bookId);
              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-8 rounded-[40px] soft-shadow border border-gray-50 flex gap-6 items-center"
                >
                  <img src={book?.coverImage} className="w-24 h-32 object-cover rounded-2xl shadow-md" alt={book?.title} />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-orange-500 tracking-widest mb-1 block">Due {new Date(record.dueDate).toLocaleDateString()}</span>
                    <h3 className="text-xl text-primary font-bold truncate">{book?.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">by {book?.author}</p>
                    <button 
                      onClick={() => returnBook(record.id)}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-xl transition-all"
                    >
                      <RotateCcw size={14} />
                      Return Book
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
             <p className="text-gray-400 italic">No active borrows. Time to explore the catalog!</p>
             <Link to="/catalog" className="mt-4 inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:underline">
               Go to Catalog <ArrowRight size={14} />
             </Link>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-3xl text-primary font-serif">Recent History</h2>
          <div className="bg-white rounded-[40px] soft-shadow overflow-hidden border border-gray-50">
            <div className="divide-y divide-gray-50">
              {pastBorrows.length > 0 ? pastBorrows.map((act) => {
                const book = books.find(b => b.id === act.bookId);
                return (
                  <motion.div key={act.id} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-6">
                       <div className="p-4 rounded-2xl bg-green-50 text-green-500 group-hover:scale-110 transition-transform">
                          <CheckCircle size={24} />
                       </div>
                       <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Returned</span>
                          <h3 className="text-xl text-primary font-serif">{book?.title}</h3>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className="block text-primary font-bold text-lg mb-1">{new Date(act.returnDate!).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                );
              }) : (
                <div className="p-12 text-center text-gray-400 italic">No history yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* Wishlist */}
        <div className="space-y-8">
          <h2 className="text-3xl text-primary font-serif">Wishlist</h2>
          <div className="space-y-6">
            {favoriteBooks.length > 0 ? favoriteBooks.map((book) => (
              <div key={book.id} className="flex gap-4 items-center bg-white p-4 rounded-3xl soft-shadow border border-gray-50 group">
                <img src={book.coverImage} className="w-16 h-20 object-cover rounded-xl" alt={book.title} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-primary font-bold truncate">{book.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Star size={12} className="text-accent fill-accent" />
                    <span className="text-xs text-gray-400">{book.rating}</span>
                  </div>
                  <button 
                    onClick={() => toggleFavorite(book.id)}
                    className="mt-2 text-[10px] uppercase font-bold text-red-400 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center bg-primary/5 rounded-[32px] border border-dashed border-primary/10">
                <Heart size={24} className="mx-auto mb-4 text-primary/20" />
                <p className="text-xs text-gray-400 italic">Your wishlist is empty.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
