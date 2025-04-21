import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // In a real app, you'd check localStorage/sessionStorage here
  // For now we'll just use a simple state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);


  const signup = (userData) => {
    // You might want to make an API call here
    setUser({
      name: userData.name,
      email: userData.email,
      userType: userData.userType,
    });
    setIsAuthenticated(true);
    // Store the user type in localStorage if needed
    localStorage.setItem('userType', userData.userType);
  };
  const login = (userData) => {
    setUser({
      userid:userData.userid,
      email: userData.email,
      userType: userData.userType
    });
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
