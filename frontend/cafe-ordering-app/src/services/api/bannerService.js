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

export const bannerService = {
  // Get all banners
  getAll: async () => {
    const response = await apiClient.get(`${API_BASE_URL}/promo`);
    return response.data;
  },

  // Create a new banner
  create: async (bannerData) => {
    const response = await apiClient.post(
      `${API_BASE_URL}/promo`, 
      bannerData, 
      getAuthHeaders()
    );
    return response.data;
  },

  // Update a banner
  update: async (id, bannerData) => {
    const response = await apiClient.put(
      `${API_BASE_URL}/promo/${id}`, 
      bannerData, 
      getAuthHeaders()
    );
    return response.data;
  },

  // Delete a banner
  delete: async (id) => {
    await apiClient.delete(`${API_BASE_URL}/promo/${id}`, getAuthHeaders());
  },

  // Toggle banner status
  toggleStatus: async (id, isActive) => {
    const response = await apiClient.patch(
      `${API_BASE_URL}/promo/${id}`, 
      { isActive: !isActive }, 
      getAuthHeaders()
    );
    return response.data;
  },
};
