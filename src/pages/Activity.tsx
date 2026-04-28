import React from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle, RotateCcw, AlertCircle } from 'lucide-react';

const Activity: React.FC = () => {
  const activities = [
    { id: '1', type: 'Return', book: 'The Great Gatsby', status: 'Success', date: '2026-04-20', icon: RotateCcw, color: 'text-green-500' },
    { id: '2', type: 'Borrow', book: 'Atomic Habits', status: 'In Progress', date: '2026-04-22', icon: Clock, color: 'text-orange-500' },
    { id: '3', type: 'Overdue', book: 'Brief History of Time', status: 'Warning', date: '2026-04-15', icon: AlertCircle, color: 'text-red-500' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl text-primary mb-2">Track Your Journey</h1>
        <p className="text-gray-500 font-sans">Every book borrowed is a step towards wisdom.</p>
      </div>

      <div className="bg-white rounded-[40px] soft-shadow overflow-hidden border border-gray-50">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
           <h2 className="text-xl text-primary italic">Recent Activity</h2>
           <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">Last 30 Days</span>
        </div>
        <div className="divide-y divide-gray-50">
          {activities.map((act, i) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 flex items-center justify-between hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-6">
                 <div className={`p-4 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform ${act.color}`}>
                    <act.icon size={24} />
                 </div>
                 <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-bold uppercase tracking-widest text-gray-400">{act.type}</span>
                      {act.status === 'Success' && <CheckCircle size={14} className="text-green-500" />}
                    </div>
                    <h3 className="text-xl text-primary font-serif">{act.book}</h3>
                 </div>
              </div>
              <div className="text-right">
                 <span className="block text-primary font-bold text-lg mb-1">{act.date}</span>
                 <span className={`text-[10px] font-bold uppercase tracking-widest ${act.status === 'Warning' ? 'text-red-500' : 'text-gray-400'}`}>
                    {act.status}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
         <div className="p-12 bg-accent/10 rounded-[48px] border border-accent/20">
            <h3 className="text-2xl text-primary mb-4 italic">Achievement Unlocked</h3>
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white shadow-lg">
                  <span className="text-2xl font-bold">10</span>
               </div>
               <div>
                  <p className="text-primary font-bold uppercase tracking-widest text-sm">Consistent Reader</p>
                  <p className="text-gray-500 text-xs font-sans mt-1">Borrowed 10 books in 3 months.</p>
               </div>
            </div>
         </div>
         <div className="p-12 bg-primary-light rounded-[48px] border border-primary/10">
            <h3 className="text-2xl text-primary mb-4 italic">Borrowing Limit</h3>
            <div className="w-full h-4 bg-white rounded-full overflow-hidden mb-4">
               <div className="w-[60%] h-full bg-primary" />
            </div>
            <p className="text-gray-500 text-sm font-sans">You have used 3 of your 5 active borrowing slots.</p>
         </div>
      </div>
    </div>
  );
};

export default Activity;
