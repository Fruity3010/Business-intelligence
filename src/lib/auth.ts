import axios from 'axios';

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
    console.log('📡 Calling MockAPI.io /users endpoint to register with:', { email, fullName });

    const response = await axios.post<User>(`${MOCKAPI_BASE_URL}/users`, {
      email,
      password,
      fullName,
    });

    if (response.status === 201) {
      const registeredUser = response.data;
      console.log('MockAPI.io registration successful:', registeredUser);

      return loginUser(email, password);
    } else {
      console.error('Registration failed with status:', response.status, response.statusText);
      if (response.data && typeof response.data === 'object' && 'message' in response.data) {
        console.error('Registration error details:', (response.data as any).message);
      }
      return null;
    }
  } catch (error: any) {
    if (error.response) {
      console.error('Registration failed:', error.response.status, error.response.data);
      if (error.response.status === 409) {
        console.error('Registration failed: Email already exists.');
      }
    } else {
      console.error('Network or other error during registration:', error.message);
    }
    return null;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    console.log('📡 Calling MockAPI.io /users endpoint to login with email:', email);

    // Step 1: Fetch users with matching email
    const response = await axios.get<User[]>(`${MOCKAPI_BASE_URL}/users`, {
      params: { email: email, password: password },
    });

    if (response.status === 200) {
      const users = response.data;

      // Step 2: If user exists, verify password
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

          console.log('✅ Login successful for:', userWithToken.email);
          return userWithToken;
        } else {
          console.error('❌ Login failed: Incorrect password for email:', email);
          return null;
        }
      } else {
        console.error('❌ Login failed: No user found with email:', email);
        return null;
      }
    } else {
      console.error('❌ Error fetching user with status:', response.status, response.statusText);
      return null;
    }
  } catch (error: any) {
    if (error.response) {
      console.error('❌ Login failed:', error.response.status, error.response.data);
    } else {
      console.error('⚠️ Unexpected error during login:', error.message);
    }
    return null;
  }
};


export const logoutUser = async (): Promise<void> => {
  try {
    console.log('Mock logout endpoint called (client-side token removal is main action).');
  } catch (error: any) {
    console.error('Error during mock logout:', error.message);
  }
};

export const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        return JSON.parse(userString);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
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