import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSegment } from '../types';

interface User {
  id: string;
  name: string;
  email: string;
  segment: UserSegment;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, segment: UserSegment) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('lib_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = JSON.parse(localStorage.getItem('lib_users_db') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        segment: foundUser.segment,
        avatar: foundUser.avatar
      };
      setUser(userData);
      localStorage.setItem('lib_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string, segment: UserSegment) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = JSON.parse(localStorage.getItem('lib_users_db') || '[]');
    if (users.find((u: any) => u.email === email)) return false;

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      segment,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=5A5A40&color=fff`
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('lib_users_db', JSON.stringify(updatedUsers));
    
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      segment: newUser.segment,
      avatar: newUser.avatar
    };
    setUser(userData);
    localStorage.setItem('lib_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lib_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
