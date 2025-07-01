import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  },
});

export const userService = {
  // Get all users
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/auth`, getAuthHeaders());
    return response.data;
  },

  // Update a user
  update: async (id, userData) => {
    const response = await axios.put(
      `${API_BASE_URL}/auth/${id}`, 
      userData, 
      getAuthHeaders()
    );
    return response.data;
  },

  // Delete a user
  delete: async (id) => {
    await axios.delete(`${API_BASE_URL}/auth/${id}`, getAuthHeaders());
  },
};
