import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

// Or create a custom axios instance:
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await apiClient.post(`${API_BASE_URL}/auth/login`, credentials);
      const { token, user } = response.data;
      
      // Store in sessionStorage
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await apiClient.post(`${API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post(`${API_BASE_URL}/auth/send-reset-password`, { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  },

  // Reset password
  resetPassword: async (userId, urlToken, newPassword) => {
    try { 
      const response = await apiClient.post(`${API_BASE_URL}/auth/reset-password/${userId}/${urlToken}`, {
        newPassword
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  },

  // Logout user
  logout: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('cart');
  },

  // Get current user from sessionStorage
  getCurrentUser: () => {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get token from sessionStorage
  getToken: () => {
    return sessionStorage.getItem('token');
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!sessionStorage.getItem('token');
  },

  // Get user role-based redirect path
  getRoleBasedRedirect: (userRole) => {
    switch (userRole) {
      case 'kasir':
        return '/kasir/dashboard';
      case 'admin':
      case 'superadmin':
        return '/admin/dashboard';
      default:
        return '/qr-scan';
    }
  }
};
