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

export const menuService = {
  // Get all menus
  getAll: async () => {
    const response = await apiClient.get(`${API_BASE_URL}/menu`);
    return response.data;
  },

  // Create a new menu
  create: async (menuData) => {
    const response = await apiClient.post(
      `${API_BASE_URL}/menu`, 
      menuData, 
      getAuthHeaders()
    );
    return response.data;
  },

  // Update a menu
  update: async (id, menuData) => {
    // ✅ ADD: Debug what's being sent to backend
    console.log('📡 Sending to backend API:', {
      id,
      menuData,
      url: `${API_BASE_URL}/menu/${id}`
    });
    
    try {
      const response = await apiClient.put(
        `${API_BASE_URL}/menu/${id}`, 
        menuData, 
        getAuthHeaders()
      );
      console.log('✅ Backend response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Backend error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  },

  // Delete a menu
  delete: async (id) => {
    await apiClient.delete(`${API_BASE_URL}/menu/${id}`, getAuthHeaders());
  },
};
