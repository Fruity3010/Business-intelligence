'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from 'react';
import { useRouter } from 'next/navigation';

import {
  getCurrentUser,
  setCurrentUser,
  isAuthenticated as checkIsAuthenticated,
  getKeepLoggedInPreference,
  setKeepLoggedInPreference,
} from '@/lib/auth';


import {
  performLogin,
  performRegister,
  performLogout,
} from '@/lib/mutations/authMutations';

import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string,
    keepLoggedIn: boolean
  ) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<boolean>;
  logout: () => void;
  keepLoggedIn: boolean;
  setKeepLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INACTIVITY_TIMEOUT_MS = 60 * 1000;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoutRef = useRef<(() => Promise<void>) | null>(null);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    await performLogout();
    setUser(null);
    setKeepLoggedInPreference(false);
    setKeepLoggedIn(false);


    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }

    console.log('AuthProvider: Logout successful, redirecting to /');
    router.push('/');
    setLoading(false);
  }, [router]);

  useEffect(() => {
    handleLogoutRef.current = handleLogout;
  }, [handleLogout]);


  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    const storedKeepLoggedIn = getKeepLoggedInPreference();
    const currentUserInStorage = getCurrentUser();

    if (currentUserInStorage && !storedKeepLoggedIn) {
      inactivityTimerRef.current = setTimeout(() => {
        console.log('AuthProvider: Auto-logging out due to inactivity...');
        if (handleLogoutRef.current) {
          handleLogoutRef.current();
        }
      }, INACTIVITY_TIMEOUT_MS);
    }
  }, []);

  const handleUserActivity = useCallback(() => {
    resetInactivityTimer();
  }, [resetInactivityTimer]);


  useEffect(() => {
    console.log('AuthProvider: Initializing client-side effects...');
    const initializeAuth = () => {
      const storedUser = getCurrentUser();
      const storedKeepLoggedIn = getKeepLoggedInPreference();

      setUser(storedUser);
      setKeepLoggedIn(storedKeepLoggedIn);

      if (storedUser) {
        if (!storedKeepLoggedIn) {
          resetInactivityTimer();
        }
      } else {

        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
          inactivityTimerRef.current = null;
        }
        setCurrentUser(null);
      }
      setLoading(false);
    };

    if (typeof window !== 'undefined') {
      initializeAuth();


      const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
      activityEvents.forEach(event =>
        window.addEventListener(event, handleUserActivity)
      );
    }


    return () => {
      console.log('AuthProvider: Cleaning up effects...');

      const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
      activityEvents.forEach(event =>
        window.removeEventListener(event, handleUserActivity)
      );

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
    };
  }, [handleUserActivity, resetInactivityTimer]);


  const handleLogin = useCallback(
    async (email: string, password: string, rememberMe: boolean) => {
      setLoading(true);
      try {
        const loggedInUser = await performLogin(email, password);
        if (loggedInUser) {
          setUser(loggedInUser);
          setKeepLoggedInPreference(rememberMe)
          setKeepLoggedIn(rememberMe);


          resetInactivityTimer();

          console.log('AuthProvider: Login successful, redirecting to /dashboard');
          router.push('/dashboard');
          return true;
        }
        return false;
      } finally {
        setLoading(false);
      }
    },
    [router, resetInactivityTimer]
  );


  const handleRegister = useCallback(
    async (email: string, password: string, fullName: string) => {
      setLoading(true);
      try {
        const registeredUser = await performRegister(email, password, fullName);
        if (registeredUser) {
          setUser(registeredUser);

          setKeepLoggedInPreference(false);
          setKeepLoggedIn(false);

          resetInactivityTimer();

          console.log('AuthProvider: Registration successful, redirecting to /dashboard');
          router.push('/dashboard');
          return true;
        }
        return false;
      } finally {
        setLoading(false);
      }
    },
    [router, resetInactivityTimer]
  );


  const value = {
    user,
    isAuthenticated: checkIsAuthenticated(),
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    keepLoggedIn,
    setKeepLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};