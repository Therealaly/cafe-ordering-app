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

export const orderService = {
  // Get user orders
  getUserOrders: async () => {
    const response = await apiClient.get(`${API_BASE_URL}/order/user`, getAuthHeaders());
    return response.data;
  },

  // Create a new order
  createOrder: async (orderData) => {
    const response = await apiClient.post(
      `${API_BASE_URL}/order`, 
      orderData, 
      getAuthHeaders()
    );
    return response.data;
  },

  // Update order status (if needed)
  updateOrder: async (id, orderData) => {
    const response = await apiClient.put(
      `${API_BASE_URL}/order/${id}`, 
      orderData, 
      getAuthHeaders()
    );
    return response.data;
  },

  // Cancel order (if needed)
  cancelOrder: async (id) => {
    await apiClient.delete(`${API_BASE_URL}/order/${id}`, getAuthHeaders());
  },
};
