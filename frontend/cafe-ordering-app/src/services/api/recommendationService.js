import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  },
});

export const recommendationService = {
  // Get user recommendations
  getUserRecommendations: async (userId) => {
    const response = await axios.get(
      `${API_BASE_URL}/recommendation/${userId}`, 
      getAuthHeaders()
    );
    return response.data;
  },
};
