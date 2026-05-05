import React from 'react';
import { User, Mail, Shield, Settings, Bell, Globe, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl space-y-12">
      <div className="flex flex-col md:flex-row items-center gap-12">
         <div className="relative">
            <div className="w-40 h-40 rounded-[48px] overflow-hidden shadow-2xl bg-primary/5 flex items-center justify-center relative group">
               <img 
                 src={user.avatar || "https://images.unsplash.com/photo-1616763355548-1b606f737f53?q=80&w=1000&auto=format&fit=crop"} 
                 alt={user.name} 
                 className="w-full h-full object-cover opacity-80" 
               />
               <a 
                 href="https://1drv.ms/i/c/A95EB84DE78AEDA3/IQClfSlZNGYyQ4SSI8ESsE3EAWzxU0BqBUfrI0b8JQPV9sQ?e=NC5zzL"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="absolute inset-0 bg-primary/60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity p-4 text-center"
               >
                 <ExternalLink size={24} className="mb-2" />
                 <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">View OneDrive Resource</span>
               </a>
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white border-4 border-bg shadow-lg cursor-pointer hover:scale-110 transition-transform">
               <Settings size={20} />
            </div>
         </div>
         <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest mb-4">
               <Shield size={12} />
               <span>Verified {user.segment}</span>
            </div>
            <h1 className="text-5xl text-primary mb-2 italic">{user.name}</h1>
            <p className="text-gray-500 font-sans flex items-center justify-center md:justify-start gap-2">
               <Mail size={16} />
               {user.email}
            </p>
         </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[40px] soft-shadow border border-gray-50 space-y-8">
            <h3 className="text-xl text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-3">
               <User className="text-accent" size={18} />
               Personal Information
            </h3>
            <div className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">User ID</span>
                    <span className="text-primary font-bold">UID-{user.id.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">User Segment</span>
                    <span className="text-primary font-bold">{user.segment}</span>
                  </div>
               </div>
               <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Preferred Language</span>
                  <div className="flex items-center gap-2 text-primary font-bold">
                     <Globe size={16} className="text-accent" />
                     Indonesian (Bahasa)
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-white p-10 rounded-[40px] soft-shadow border border-gray-50 space-y-8">
            <h3 className="text-xl text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-3">
               <Bell className="text-accent" size={18} />
               Preferences
            </h3>
            <div className="space-y-6">
               {[
                 { label: 'Email Notifications', status: true },
                 { label: 'AI Recommendations', status: true },
                 { label: 'Public Profile Visibility', status: false },
               ].map((pref, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-500 font-sans">{pref.label}</span>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${pref.status ? 'bg-primary' : 'bg-gray-200'}`}>
                       <div className={`w-4 h-4 bg-white rounded-full transition-transform ${pref.status ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Profile;
