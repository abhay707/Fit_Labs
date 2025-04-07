import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  id: string;
  profile?: UserProfile;
}

interface UserProfile {
  username: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  fitnessLevel: string;
  workoutFrequency: string;
  workoutDuration: string;
  fitnessGoal: string;
  targetWeight: string;
  heightUnit?: 'cm' | 'inches';
  weightUnit?: 'kg' | 'lbs';
  targetWeightUnit?: 'kg' | 'lbs';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, profile?: UserProfile) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserProfile: (profile: UserProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // TODO: Implement actual authentication logic
    // For now, simulate a successful login
    setUser({ email, id: '1' });
  };

  const signup = async (email: string, password: string, profile?: UserProfile) => {
    // TODO: Implement actual signup logic
    // For now, simulate a successful signup
    setUser({ email, id: '1', profile });
  };

  const logout = () => {
    setUser(null);
  };

    const updateUserProfile = async (profile: UserProfile) => {
    // TODO: Implement actual profile update logic
    // For now, simulate a successful profile update
    if (user) {
      // Create a new user object with the updated profile to ensure React detects the change
      const updatedUser = { 
        ...user, 
        profile: { ...profile } 
      };
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUserProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};