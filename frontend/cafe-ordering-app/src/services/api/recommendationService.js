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

export const recommendationService = {
  // Get user recommendations
  getUserRecommendations: async (userId) => {
    const response = await apiClient.get(
      `${API_BASE_URL}/recommendation/${userId}`, 
      getAuthHeaders()
    );
    return response.data;
  },
};
