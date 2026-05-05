import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, Library, Loader2, AlertCircle, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserSegment } from '../types';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [segment, setSegment] = useState<UserSegment>(UserSegment.STUDENT);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const success = await register(name, email, password, segment);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email already exists');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
            <Library size={32} />
          </div>
          <h1 className="text-3xl font-serif text-primary mb-2">Join Perpustakaanku</h1>
          <p className="text-gray-500 font-sans">Start your personalized journey</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-medium"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ernita Agustin"
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 transition-all font-sans"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ernita@example.com"
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 transition-all font-sans"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="password" 
                required
                min={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 transition-all font-sans"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">User Segment</label>
            <div className="relative">
              <select 
                value={segment}
                onChange={(e) => setSegment(e.target.value as UserSegment)}
                className="w-full pl-6 pr-12 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 transition-all font-sans appearance-none cursor-pointer"
              >
                {Object.values(UserSegment).map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account? <br />
            <Link to="/login" className="text-primary font-bold hover:underline">Login to your account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
