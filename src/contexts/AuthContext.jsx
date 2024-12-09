import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? { token: storedToken } : { token: null };
  });

  const login = (userData) => {
    const token = userData.token;
    localStorage.setItem('token', token);
    setAuth({ token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null });
  };



  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;
