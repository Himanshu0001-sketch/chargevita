// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider wraps your app and provides auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // On mount, load auth state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const { user, token } = JSON.parse(stored);
      setUser(user);
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Helper to save auth state
  const saveAuth = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("auth", JSON.stringify({ user: userData, token: jwtToken }));
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  };

  // Login function
  const login = async (email, password) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/login`,
      { email, password }
    );
    const { user: userData, token: jwtToken } = response.data;
    saveAuth(userData, jwtToken);
    return userData;
  };

  // Register function
  const register = async (name, email, password) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/register`,
      { name, email, password }
    );
    const { user: userData, token: jwtToken } = response.data;
    saveAuth(userData, jwtToken);
    return userData;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
