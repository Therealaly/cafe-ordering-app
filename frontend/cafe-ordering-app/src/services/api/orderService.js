import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  },
});

export const orderService = {
  // Get user orders
  getUserOrders: async () => {
    const response = await axios.get(`${API_BASE_URL}/order/user`, getAuthHeaders());
    return response.data;
  },

  // Create a new order
  createOrder: async (orderData) => {
    const response = await axios.post(
      `${API_BASE_URL}/order`, 
      orderData, 
      getAuthHeaders()
    );
    return response.data;
  },

  // Update order status (if needed)
  updateOrder: async (id, orderData) => {
    const response = await axios.put(
      `${API_BASE_URL}/order/${id}`, 
      orderData, 
      getAuthHeaders()
    );
    return response.data;
  },

  // Cancel order (if needed)
  cancelOrder: async (id) => {
    await axios.delete(`${API_BASE_URL}/order/${id}`, getAuthHeaders());
  },
};
