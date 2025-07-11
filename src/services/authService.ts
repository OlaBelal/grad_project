import axios from 'axios';

const API_BASE_URL = 'https://journeymate.runasp.net/api/Auth';
const GOOGLE_CLIENT_ID = '822773664134-n09666thqoc67ee4rhkfjetb51ep0vg5.apps.googleusercontent.com';
const RESET_PASSWORD_URL = 'http://localhost:5173/reset-password?';

interface AuthResponse {
  userId?: string;
  userName?: string;
  email?: string;
  token?: string;
  message?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  token?: string;
  avatar?: string;
}

// دالة مساعدة لفك تشفير JWT
function decodeJWT(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export const authService = {
  register: async (userData: { 
    userName: string; 
    email: string; 
    password: string 
  }): Promise<User> => {
    try {
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/register`, {
        userName: userData.userName,
        email: userData.email,
        password: userData.password
      });

      if (!response.data || !response.data.token) {
        throw new Error(response.data?.message || 'Registration failed');
      }

      const user: User = {
        id: response.data.userId || Date.now().toString(),
        name: response.data.userName || userData.userName,
        email: response.data.email || userData.email,
        token: response.data.token
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isAuthenticated', 'true');
      
      return user;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || error.response.data || 'Registration failed');
      } else if (error.request) {
        throw new Error('No response from server');
      } else {
        throw new Error(error.message || 'Registration failed');
      }
    }
  },

  login: async (userNameOrEmail: string, password: string): Promise<User> => {
    try {
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/login`, {
        userName: userNameOrEmail,
        password
      });

      if (!response.data || !response.data.token) {
        throw new Error(response.data?.message || 'Login failed');
      }

      const user: User = {
        id: response.data.userId || Date.now().toString(),
        name: response.data.userName || userNameOrEmail,
        email: response.data.email || '',
        token: response.data.token
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isAuthenticated', 'true');
      
      return user;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || error.response.data || 'Login failed');
      } else if (error.request) {
        throw new Error('No response from server');
      } else {
        throw new Error(error.message || 'Login failed');
      }
    }
  },

  logout: async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(`${API_BASE_URL}/logout`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    }
  },

  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    const isAuth = localStorage.getItem('isAuthenticated');
    return token !== null && isAuth === 'true';
  },

  validatePassword: (password: string): boolean => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 8 && hasLetter && hasNumber && hasSpecialChar;
  },

  forgotPassword: async (email: string): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/forgotpassword`, {
        email: email,
        url: `${RESET_PASSWORD_URL}email=${encodeURIComponent(email)}&token=`, 
      });
    } catch (error) {
      throw new Error("Failed to send reset link");
    }
  },

  resetPassword: async (email: string, token: string, newPassword: string): Promise<void> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/resetpassword`, {
        email,
        token,
        newPassword
      });

      if (response.status === 200) {
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetToken");
      }
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || error.response.data || 'Failed to reset password');
      } else if (error.request) {
        throw new Error('No response from server');
      } else {
        throw new Error(error.message || 'Failed to reset password');
      }
    }
  },

  googleLogin: async (credential: string): Promise<User> => {
    try {
      // فك تشفير الـ credential لاستخراج بيانات المستخدم
      const decodedToken = decodeJWT(credential);
      const { name, email, picture } = decodedToken;

      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/googlelogin`,
        credential,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (!response.data?.token) {
        throw new Error(response.data?.message || 'Authentication failed: No token received');
      }

      const user: User = {
        id: response.data.userId || Date.now().toString(),
        name: name || response.data.userName || email,
        email: email || response.data.email || '',
        token: response.data.token,
        avatar: picture
      };

      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isAuthenticated', 'true');

      return user;
    } catch (error: any) {
      let errorMessage = 'Google login failed';
      if (error.response) {
        errorMessage = error.response.data?.message || 
                       JSON.stringify(error.response.data) || 
                       'Google login failed with server error';
      } else if (error.request) {
        errorMessage = 'No response received from server';
      }
      
      throw new Error(errorMessage);
    }
  },

  updateUser: async (userData: {
    name: string;
    email: string;
    phone?: string;
  }): Promise<User> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.put<AuthResponse>(
        `${API_BASE_URL}/updateuser`,
        {
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.data || !response.data.token) {
        throw new Error(response.data?.message || 'Update failed');
      }

      const user: User = {
        id: response.data.userId || '',
        name: response.data.userName || userData.name,
        email: response.data.email || userData.email,
        phone: userData.phone,
        token: response.data.token
      };

      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || error.response.data || 'Update failed');
      } else if (error.request) {
        throw new Error('No response from server');
      } else {
        throw new Error(error.message || 'Update failed');
      }
    }
  }
};

// دالة لإنشاء هيدر التخويل
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};