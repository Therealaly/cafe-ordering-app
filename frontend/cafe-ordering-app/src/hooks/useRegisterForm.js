import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api/authService';

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  function containsUppercase(str) {
    return /[A-Z]/.test(str);
  }

  function containsInteger(str) {
    return /[0-9]/.test(str);
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    const format = /[!@#$%^&*(),.?":{}|<>]/;

    if (!formData.password.match(format)) {
      setError('Password must contains at least one special character');
      return false;
    }

    if (!containsUppercase(formData.password)) {
      setError('Password must contains at least one uppercase letter');
      return false;
    }

    if (!containsInteger(formData.password)) {
      setError('Password must contains at least one number');
      return false;
    }

    if (!formData.agree) {
      setError('Please agree to the terms and conditions');
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      // Success - navigate to login with success message
      navigate('/login', { 
        state: { message: 'Registration successful! Please login.' }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return {
    formData,
    loading,
    error,
    handleInputChange,
    handleRegister,
    navigateToLogin
  };
};
