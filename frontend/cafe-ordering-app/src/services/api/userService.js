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

// Helper function to get auth headers
const getAuthHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  },
});

export const userService = {
  // Get all users
  getAll: async () => {
    const response = await apiClient.get(`${API_BASE_URL}/auth`, getAuthHeaders());
    return response.data;
  },

  // Update a user
  update: async (id, userData) => {
    const response = await apiClient.put(
      `${API_BASE_URL}/auth/${id}`, 
      userData, 
      getAuthHeaders()
    );
    return response.data;
  },

  // Delete a user
  delete: async (id) => {
    await apiClient.delete(`${API_BASE_URL}/auth/${id}`, getAuthHeaders());
  },
};
