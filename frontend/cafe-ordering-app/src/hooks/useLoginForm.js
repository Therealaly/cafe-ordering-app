import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api/authService';

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { user } = await authService.login(formData);
      const redirectPath = authService.getRoleBasedRedirect(user.role);
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToForgotPassword = () => {
    navigate('/forgot-password');
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return {
    formData,
    loading,
    error,
    handleInputChange,
    handleLogin,
    navigateToForgotPassword,
    navigateToRegister
  };
};
