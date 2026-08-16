import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getMe, loginUser, registerUser, updateProfile as updateProfileApi } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('homeserve_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function hydrate() {
      const stored = localStorage.getItem('homeserve_token');
      if (!stored) {
        setLoading(false);
        return;
      }
      try {
        const currentUser = await getMe();
        setUser(currentUser);
        setToken(stored);
      } catch {
        localStorage.removeItem('homeserve_token');
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }
    hydrate();
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    localStorage.setItem('homeserve_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    localStorage.setItem('homeserve_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('homeserve_token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (payload) => {
    const updated = await updateProfileApi(payload);
    setUser(updated);
    return updated;
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
      updateProfile,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
