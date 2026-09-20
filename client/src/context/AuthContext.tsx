import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { DEMO_USERS } from '../data/mockData';
import { safeReadStorage, safeWriteStorage, safeRemoveStorage } from '../utils/storage';

interface AuthContextType {
  currentUser: User | null;
  currentRole: Role;
  isAuthenticated: boolean;
  login: (email: string, role?: Role) => boolean;
  logout: () => void;
  switchRole: (role: Role) => void;
  registerUser: (userData: Partial<User>) => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = safeReadStorage<User | null>('agroconnect_user', null);
    return saved || DEMO_USERS[0];
  });

  useEffect(() => {
    if (currentUser) {
      safeWriteStorage('agroconnect_user', currentUser);
    } else {
      safeRemoveStorage('agroconnect_user');
    }
  }, [currentUser]);

  const currentRole: Role = currentUser?.role || 'BUYER';

  const login = (email: string, requestedRole?: Role) => {
    const matched = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || (requestedRole && u.role === requestedRole)
    );
    if (matched) {
      setCurrentUser(matched);
      return true;
    }
    // Create new temporary user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      phone: '+91 98000 11223',
      role: requestedRole || 'BUYER',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
      token: 'jwt-custom-session-token',
    };
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: Role) => {
    const targetUser = DEMO_USERS.find((u) => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
    } else if (currentUser) {
      setCurrentUser({ ...currentUser, role });
    }
  };

  const registerUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || 'New Member',
      email: userData.email || 'member@agroconnect.in',
      phone: userData.phone || '+91 98765 43210',
      role: userData.role || 'BUYER',
      avatarUrl:
        userData.avatarUrl ||
        'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
      token: 'jwt-new-user-token',
    };
    setCurrentUser(newUser);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...userData });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthenticated: !!currentUser,
        login,
        logout,
        switchRole,
        registerUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
