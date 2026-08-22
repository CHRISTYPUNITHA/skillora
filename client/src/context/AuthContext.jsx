import { createContext, useContext, useState, useEffect } from "react";
import {login,me} from "../services/auth.serivces.js"

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loginUser(data) {
    try {
      setLoading(true);
      setError(null);
      const response = await login(data);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  } 

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await me();
      setUser(response);
    }catch (error) {
      setError(error);
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    loginUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};