import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock users database (in real app, this would be backend)
const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@foodhub.com', password: 'admin123', role: 'admin' as const },
  { id: 2, name: 'John Doe', email: 'john@example.com', password: 'user123', role: 'user' as const },
];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('foodhub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      };
      setUser(userData);
      localStorage.setItem('foodhub_user', JSON.stringify(userData));
      console.log('✅ Login successful:', userData);
      return true;
    }
    
    console.log('❌ Login failed: Invalid credentials');
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      console.log('❌ Signup failed: User already exists');
      return false;
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password,
      role: 'user' as const
    };
    
    mockUsers.push(newUser);
    
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
    
    setUser(userData);
    localStorage.setItem('foodhub_user', JSON.stringify(userData));
    console.log('✅ Signup successful:', userData);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodhub_user');
    console.log('✅ Logout successful');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth ; 