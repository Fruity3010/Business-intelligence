import {
    loginUser,
    registerUser,
    logoutUser,
    setCurrentUser,
    getCurrentUser,
  } from '@/lib/auth';
  
  import { User } from '@/types/user';
  
  export const performLogin = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    const user = await loginUser(email, password);
    if (user) {
      setCurrentUser(user);
    }
    return user;
  };
  
  export const performRegister = async (
    email: string,
    password: string,
    fullName: string
  ): Promise<User | null> => {
    const user = await registerUser(email, password, fullName);
    if (user) {
      setCurrentUser(user); 
    }
    return user;
  };
  
  export const performLogout = async () => {
    await logoutUser(); 
    setCurrentUser(null);
  };
  