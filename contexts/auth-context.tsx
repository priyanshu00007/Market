"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the type for your user object with a role
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user'; // <--- NEW: Role property
  address?: string;
  phone?: string;
  profilePicture?: string;
}

// Define the type for your AuthContext value
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>; // Simplified args for AuthPage
  register: (name: string, email: string, password: string) => Promise<void>; // Simplified args for AuthPage
  logout: () => Promise<void>;
  updateUser: (newUserData: Partial<User>) => Promise<void>;
  loading: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate initial authentication check (e.g., from localStorage or a token)
  useEffect(() => {
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem('mockUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => { // <--- MODIFIED SIGNATURE
    setLoading(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@gmail.com" && password === "admin@789") { // <--- ADMIN CREDENTIALS CHECK
          const adminUser: User = {
            id: 'admin-001',
            name: 'Admin User',
            email: email,
            role: 'admin', // Assign admin role
            profilePicture: 'https://github.com/shadcn.png'
          };
          setUser(adminUser);
          localStorage.setItem('mockUser', JSON.stringify(adminUser));
          resolve();
        } else if (email === "test@example.com" && password === "password123") { // Existing user
          const mockUser: User = {
            id: 'user-123',
            name: 'John Doe',
            email: email,
            role: 'user', // Assign user role
            address: '123 Main St, Anytown, USA',
            phone: '555-123-4567',
            profilePicture: 'https://avatars.githubusercontent.com/u/124599?v=4' // Different avatar for user
          };
          setUser(mockUser);
          localStorage.setItem('mockUser', JSON.stringify(mockUser));
          resolve();
        }
        else {
          reject(new Error("Invalid email or password"));
        }
        setLoading(false);
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string) => { // <--- MODIFIED SIGNATURE
    setLoading(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // In a real app, you'd check if email already exists
        if (email === "admin" || email === "test@example.com") {
          reject(new Error("Email already registered or reserved."));
          setLoading(false);
          return;
        }

        const newUser: User = {
          id: `new-user-${Date.now()}`,
          name: name,
          email: email,
          role: 'user', // <--- NEW: Always assign 'user' role for registration
          profilePicture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}` // Dynamic avatar
        };
        setUser(newUser);
        localStorage.setItem('mockUser', JSON.stringify(newUser));
        resolve();
        setLoading(false);
      }, 1500);
    });
  };

  const logout = async () => {
    setLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(null);
        localStorage.removeItem('mockUser');
        setLoading(false);
        resolve();
      }, 500);
    });
  };

  const updateUser = async (newUserData: Partial<User>) => {
    setLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          const updatedUser = { ...user, ...newUserData };
          setUser(updatedUser);
          localStorage.setItem('mockUser', JSON.stringify(updatedUser));
        }
        setLoading(false);
        resolve();
      }, 500);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};