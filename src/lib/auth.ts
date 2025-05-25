import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const MOCKAPI_BASE_URL = 'https://6830d6846205ab0d6c3a95ea.mockapi.io/mockapi/v1';

interface User {
  password: string;
  email: string;
  fullName: string;
  token: string;
  id?: string;
}

export const registerUser = async (
  email: string,
  password: string,
  fullName: string
): Promise<User | null> => {
  try {
    const response = await axios.post<User>(`${MOCKAPI_BASE_URL}/users`, {
      email,
      password,
      fullName,
    });

    if (response.status === 201) {
      toast.success('Registration successful! Logging you in...');
      return loginUser(email, password);
    }
    toast.error(`Registration failed: Unexpected status ${response.status}`);
    return null;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      if (axiosError.response.status === 409) {
        toast.error('Registration failed: An account with this email already exists.');
      } else {
        toast.error(`Registration failed: ${axiosError.response.status} - ${axiosError.response.statusText}`);
      }
    } else if (axiosError.request) {
      toast.error('Registration failed: No response from server. Check your network.');
    } else {
      toast.error(`Registration failed: ${axiosError.message}`);
    }
    return null;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const response = await axios.get<User[]>(`${MOCKAPI_BASE_URL}/users`, {
      params: { email: email },
    });

    if (response.status === 200) {
      const users = response.data;

      if (users.length > 0) {
        const loggedInUser = users[0];

        if (loggedInUser.password === password) {
          const userWithToken: User = {
            email: loggedInUser.email,
            fullName: loggedInUser.fullName,
            token: loggedInUser.token || 'mock-generated-token-on-login',
            id: loggedInUser.id,
            password: loggedInUser.password,
          };
          toast.success('Login successful!');
          return userWithToken;
        }
        toast.error('Login failed: Invalid email or password.');
        return null;
      }
      toast.error('Login failed: Invalid email or password.');
      return null;
    }
    toast.error(`Login failed: Unexpected status ${response.status}`);
    return null;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      if (axiosError.response.status === 404) {
        toast.error('Login failed: Invalid email or password.');
      } else {
        toast.error(`Login failed: ${axiosError.response.status} - ${axiosError.response.statusText}`);
      }
    } else if (axiosError.request) {
      toast.error('Login failed: No response from server. Check your network.');
    } else {
      toast.error(`Login failed: ${axiosError.message}`);
    }
    return null;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    toast.info('You have been logged out.');
  } catch (error) {
    const axiosError = error as AxiosError;
    toast.error(`Error during logout: ${axiosError.message}`);
  }
};

export const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        return JSON.parse(userString);
      } catch (error) {
        console.error('Error parsing user data from storage:', error);
        return null;
      }
    }
  }
  return null;
};

export const setCurrentUser = (user: User | null) => {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const getKeepLoggedInPreference = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('keepLoggedIn') === 'true';
  }
  return false;
};

export const setKeepLoggedInPreference = (keepLoggedIn: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('keepLoggedIn', String(keepLoggedIn));
  }
};