import { createContext, useContext, useState, useEffect } from "react";
import { login, me, logout, signup } from "../services/auth.services.js";

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
      if (response.user) {
        setUser(response.user);
      } else {
        await fetchUser();
      }
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  } 

  async function signupUser(data) {
    try {
      setLoading(true);
      setError(null);
      const response = await signup(data);
      if (response.user) {
        setUser(response.user);
      } else {
        await fetchUser();
      }
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
      setUser(response.user || response);
    }catch (error) {
      setError(error);
      if (error.response && error.response.status !== 401) {
        console.error("Error fetching user:", error);
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  const logoutUser = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    loginUser,
    logoutUser,
    signupUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};