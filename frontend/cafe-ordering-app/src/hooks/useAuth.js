import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const user = getUser();
  const isUserValid = user && Object.keys(user).length > 0 && user.name && user.email;

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("tableNumber");
    navigate("/login");
  }, [navigate]);

  const login = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return {
    user,
    isUserValid,
    logout,
    login,
    isAuthenticated: !!user,
  };
};
