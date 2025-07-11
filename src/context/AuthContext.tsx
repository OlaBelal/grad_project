import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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





// // src/context/AuthContext.tsx لما يتربط بالapi
// import { authService } from '../services/authService';

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   // إعداد axios لإرفاق التوكن تلقائيًا
//   useEffect(() => {
//     axios.interceptors.request.use((config) => {
//       const token = localStorage.getItem('token'); // أو من HTTP-only cookie
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     });

//     // تحميل المستخدم عند بدء التطبيق
//     const loadUser = async () => {
//       const user = await authService.getCurrentUser();
//       setUser(user);
//       setLoading(false);
//     };
//     loadUser();
//   }, []);

//   // ... باقي الدوال (register, login, logout)
// };