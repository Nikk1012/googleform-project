import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    if (token) {
      setUser({ token, name, email });
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);