import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const cartService = {
  // Get cart from sessionStorage
  getCart: () => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  },

  // Save cart to sessionStorage
  saveCart: (cart) => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  },

  // Add item to cart
  addItem: (item) => {
    const cart = cartService.getCart();
    const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += item.quantity || 1;
    } else {
      cart.push({ ...item, quantity: item.quantity || 1 });
    }
    
    cartService.saveCart(cart);
    return cart;
  },

  // Remove item from cart
  removeItem: (itemId) => {
    const cart = cartService.getCart();
    const updatedCart = cart.filter(item => item._id !== itemId);
    cartService.saveCart(updatedCart);
    return updatedCart;
  },

  // Update item quantity
  updateQuantity: (itemId, quantity) => {
    const cart = cartService.getCart();
    const itemIndex = cart.findIndex(item => item._id === itemId);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        return cartService.removeItem(itemId);
      }
      cart[itemIndex].quantity = quantity;
      cartService.saveCart(cart);
    }
    return cart;
  },

  // Clear cart
  clearCart: () => {
    sessionStorage.removeItem('cart');
    return [];
  },

  // Calculate totals
  calculateItemTotal: (item) => item.price * item.quantity,
  
  calculateGrandTotal: (cart) => {
    return cart.reduce((total, item) => total + cartService.calculateItemTotal(item), 0);
  },

  // Create order
  createOrder: async (orderData, token) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/order/`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  }
};
