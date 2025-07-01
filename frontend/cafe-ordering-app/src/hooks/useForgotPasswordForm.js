import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api/authService';

export const useForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (value) => {
    setEmail(value);
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.forgotPassword(email);
      setSuccess('If the email is registered, a password reset link has been sent.');
      setEmail(''); // Clear email field on success
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
    email,
    loading,
    error,
    success,
    handleEmailChange,
    handleSubmit,
    navigateToLogin
  };
};
