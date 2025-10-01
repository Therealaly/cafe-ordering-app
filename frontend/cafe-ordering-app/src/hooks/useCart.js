import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../services/api/cartService';
import { isLoggedIn, getUser } from '../utils/auth';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load cart from sessionStorage on mount
  useEffect(() => {
    const savedCart = cartService.getCart();
    setCart(savedCart);

    // Listen for cart updates
    const handleCartUpdate = () => {
      const updatedCart = cartService.getCart();
      setCart(updatedCart);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Check authentication and table number
  const checkRequirements = () => {
    if (!isLoggedIn()) {
      navigate('/login');
      return false;
    }

    const tableNum = sessionStorage.getItem('tableNumber');
    if (!tableNum) {
      alert('Silakan scan QR meja terlebih dahulu untuk melanjutkan.');
      navigate('/qr-scan');
      return false;
    }

    return true;
  };

  // Add item to cart
  const addItem = (item) => {
    try {
      const updatedCart = cartService.addItem(item);
      setCart(updatedCart);
      setError(null);
      
      // Trigger event for instant updates
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      setError('Failed to add item to cart');
      console.error('Error adding item to cart:', err);
    }
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    try {
      const updatedCart = cartService.removeItem(itemId);
      setCart(updatedCart);
      setError(null);
      
      // Trigger event for instant updates
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error('Error removing item from cart:', err);
    }
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    try {
      const updatedCart = cartService.updateQuantity(itemId, quantity);
      setCart(updatedCart);
      setError(null);
      
      // Trigger event for instant updates
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      setError('Failed to update quantity');
      console.error('Error updating quantity:', err);
    }
  };

  // Clear cart
  const clearCart = () => {
    try {
      const emptyCart = cartService.clearCart();
      setCart(emptyCart);
      setError(null);
      
      // Trigger event for instant updates
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      setError('Failed to clear cart');
      console.error('Error clearing cart:', err);
    }
  };

  // Calculate totals
  const getItemTotal = (item) => cartService.calculateItemTotal(item);
  const getGrandTotal = () => cartService.calculateGrandTotal(cart);

  // Helper function for UpperBar badge
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  // Create order
  const createOrder = async () => {
    if (!checkRequirements()) return;

    if (cart.length === 0) {
      setError('Cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const user = getUser();
      const token = sessionStorage.getItem('token');
      const tableNum = sessionStorage.getItem('tableNumber');

      const orderData = {
        userId: user.id,
        items: cart.map(item => ({
          menuId: item._id,
          quantity: item.quantity,
          options: item.options
        })),
        tableNumber: tableNum,
        status: 'Menunggu Konfirmasi'
      };

      await cartService.createOrder(orderData, token);
      clearCart();
      navigate('/pesanan');
    } catch (err) {
      setError(err.message || 'Failed to create order');
      console.error('Error creating order:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    loading,
    error,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemTotal,
    getGrandTotal,
    createOrder,
    checkRequirements,
    getTotalItems
  };
};
