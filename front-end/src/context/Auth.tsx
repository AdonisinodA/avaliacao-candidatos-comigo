
'use client'

import React, { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import localStorageService, { User } from '../service/localStorage';
import api from '@/api/axios';

interface AuthContextType {
  logout: () => void;
  login: (data: User, keepConnected: boolean) => void;
  verifyUserLogin: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
 
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

    useEffect(()=>{
      verifyUserLogin()
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
            return router.push('/');
            }
            return Promise.reject(error);
        }
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[router])

  const logout = () => {
    localStorageService.removeUser();
    router.push('/');
  };

  const login = (data: User, keepConnected: boolean) => {
      localStorageService.setUser({
        email: data.email,
        name: data.name,
        role: data.role,
        token: data.token,
        keepConnected:keepConnected
      });
    
    router.push('/initialPage');
  };

  const verifyUserLogin = () => {
    const user = localStorageService.getUser();
    if (!user) {
      return;
    }
    if(!user.keepConnected){
     localStorageService.removeUser();
     return router.push('/');
    }
    router.push('/initialPage');
  };

  return (
    <AuthContext.Provider value={{ logout, login, verifyUserLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
