import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, BookOpen, Download, Star, ExternalLink, ChevronDown, CheckCircle2, XCircle, Sparkles, Heart } from 'lucide-react';
import { useLibrary } from '../hooks/useLibrary';
import ResourceLink from '../components/ResourceLink';

const Catalog: React.FC = () => {
  const { books, borrowBook, favorites, toggleFavorite } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const categories = ['All', 'Classic', 'Self-Help', 'Science', 'Psychology', 'Sci-Fi', 'Adventure'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBorrow = (bookId: string, title: string) => {
    try {
      borrowBook(bookId);
      setToast({ message: `Successfully borrowed "${title}"! Check your activity.`, type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (e) {
      setToast({ message: "Failed to borrow book. Please try again.", type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="space-y-12 relative">
       {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
              toast.type === 'success' ? 'bg-white border-green-100 text-green-600' : 'bg-white border-red-100 text-red-600'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            <span className="font-bold text-sm uppercase tracking-wider">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Segmented Header */}
      <div className="bg-primary/5 rounded-[40px] p-10 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
         <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
               <Sparkles size={12} />
               <span>New Feature</span>
            </div>
            <h2 className="text-3xl text-primary mb-2 italic">Faculty Research Portal</h2>
            <p className="text-gray-500 font-sans text-sm max-w-md">Lecturers and Teachers can now access exclusive digital journals and research papers directly through the catalog.</p>
         </div>
         <div className="flex gap-4">
            <ResourceLink url="https://1drv.ms/i/c/A95EB84DE78AEDA3/IQClfSlZNGYyQ4SSI8ESsE3EAWzxU0BqBUfrI0b8JQPV9sQ?e=NC5zzL" label="View Faculty Guide" />
         </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder="Search by title, author, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-[28px] soft-shadow outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg font-sans"
          />
        </div>
        <button className="flex items-center gap-3 px-8 py-5 bg-white border border-gray-100 rounded-[28px] soft-shadow text-primary font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors">
          <Filter size={18} />
          <span>Filters</span>
          <ChevronDown size={14} className="opacity-40" />
        </button>
      </div>

      {/* Categories Scroller */}
      <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all border ${
              activeCategory === cat 
                ? "bg-primary text-white border-primary shadow-lg" 
                : "bg-white text-gray-500 border-gray-100 hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredBooks.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-[40px] overflow-hidden soft-shadow card-hover border border-gray-50 group flex flex-col"
          >
            <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
               <img 
                 src={book.coverImage} 
                 alt={book.title} 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Link 
                    to={`/reader?bookId=${book.id}`}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:scale-110 transition-transform shadow-lg"
                    title="Read Digital E-Book"
                  >
                    <BookOpen size={20} />
                  </Link>
                  <button 
                    onClick={() => setToast({ message: `Successfully synchronized "${book.title}" with your local reading shelf!`, type: 'success' })}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:scale-110 transition-transform shadow-lg"
                    title="Download offline replica"
                  >
                    <Download size={20} />
                  </button>
               </div>
               <button 
                 onClick={() => toggleFavorite(book.id)}
                 className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg z-10 ${
                   favorites.includes(book.id) 
                     ? 'bg-accent text-white scale-110' 
                     : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-accent'
                 }`}
               >
                 <Heart size={18} fill={favorites.includes(book.id) ? "currentColor" : "none"} />
               </button>
               <div className="absolute bottom-6 left-6 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                 <Star size={12} className="text-accent fill-accent" />
                 <span className="text-xs font-bold text-primary">{book.rating}</span>
               </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                 <div className="flex flex-wrap gap-2 mb-4">
                    {book.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-gray-50 text-gray-400 rounded-lg">{tag}</span>
                    ))}
                 </div>
                 <h3 className="text-2xl text-primary mb-1 leading-tight">{book.title}</h3>
                 <p className="text-gray-400 italic mb-4 font-normal">by {book.author}</p>
                 <p className="text-gray-500 text-sm font-sans line-clamp-2 leading-relaxed">{book.description}</p>
                 {book.pdfUrl && (
                   <div className="mt-4">
                     <ResourceLink url={book.pdfUrl} label="Download Digital Copy" className="w-full justify-center" />
                   </div>
                 )}
              </div>
              <div className="mt-8 flex gap-3">
                 <button 
                   disabled={!book.available}
                   onClick={() => handleBorrow(book.id, book.title)}
                   className={`flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${
                    book.available 
                      ? "bg-primary text-white hover:shadow-xl active:scale-95" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                   }`}
                 >
                   {book.available ? 'Borrow Book' : 'Out of Stock'}
                   <ExternalLink size={14} />
                 </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-20 px-8 bg-white rounded-[40px] border border-dashed border-gray-200">
           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-300" />
           </div>
           <h3 className="text-2xl text-primary mb-2">No books found matching your criteria</h3>
           <p className="text-gray-500 font-sans">Try adjusting your filters or search keywords.</p>
        </div>
      )}
    </div>
  );
};

export default Catalog;
