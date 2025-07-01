import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  },
});

export const menuService = {
  // Get all menus
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/menu`);
    return response.data;
  },

  // Create a new menu
  create: async (menuData) => {
    const response = await axios.post(
      `${API_BASE_URL}/menu`, 
      menuData, 
      getAuthHeaders()
    );
    return response.data;
  },

  // Update a menu
  update: async (id, menuData) => {
    const response = await axios.put(
      `${API_BASE_URL}/menu/${id}`, 
      menuData, 
      getAuthHeaders()
    );
    return response.data;
  },

  // Delete a menu
  delete: async (id) => {
    await axios.delete(`${API_BASE_URL}/menu/${id}`, getAuthHeaders());
  },
};
