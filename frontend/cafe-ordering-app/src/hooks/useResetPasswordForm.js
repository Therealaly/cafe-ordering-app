import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from '../services/api/authService';

export const useResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { userId, urlToken } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !urlToken) {
      setError('Invalid or expired password reset link.');
    }
  }, [userId, urlToken]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (!formData.newPassword || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirmation password do not match');
      return false;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Create a token from URL params for the API call
      const resetToken = `${userId}/${urlToken}`;
      await authService.resetPassword(resetToken, formData.newPassword);
      
      setSuccess('Password successfully reset! You will be redirected to login.');
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect after 3 seconds
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
    success,
    handleInputChange,
    handleSubmit,
    navigateToLogin,
    isValidToken: !!(userId && urlToken)
  };
};
