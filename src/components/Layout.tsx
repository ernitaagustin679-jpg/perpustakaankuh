import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Book, LayoutDashboard, Search, User, LogOut, Library, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Catalog', path: '/catalog', icon: Search },
    { name: 'My Activity', path: '/activity', icon: Library, badge: true },
    { name: 'Digital Reader', path: '/reader', icon: BookOpen },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col">
        <div className="p-8">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
              <Library size={24} />
            </div>
            <span className="font-serif text-xl font-bold text-primary">Library Hub</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200",
                  isActive 
                    ? "bg-primary text-white shadow-lg" 
                    : "text-gray-500 hover:bg-primary-light hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && !isActive && (
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 space-y-4">
          {user && (
            <div className="flex items-center gap-3 p-3 bg-primary-light rounded-2xl border border-primary/5">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-primary truncate">{user.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{user.segment}</p>
              </div>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors w-full px-4"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-20 bg-white/50 backdrop-blur-sm sticky top-0 z-10 px-8 flex items-center justify-between md:hidden border-b border-gray-100">
           <Link to="/dashboard" className="flex items-center gap-2">
            <Library className="text-primary" size={24} />
            <span className="font-serif text-lg font-bold text-primary">Library Hub</span>
          </Link>
          <div className="flex items-center gap-4">
            {user && <img src={user.avatar} className="w-8 h-8 rounded-full shadow-sm" alt="U" />}
          </div>
        </header>
        
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
