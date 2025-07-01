import { useState, useEffect } from 'react';
import { orderService } from '../services/api/orderService';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getUserOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    try {
      const newOrder = await orderService.createOrder(orderData);
      await fetchOrders(); // Refresh the list
      return newOrder;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const cancelOrder = async (id) => {
    try {
      await orderService.cancelOrder(id);
      setOrders(orders.filter(order => order._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Filter orders by status
  const getActiveOrders = () => {
    return orders.filter(order =>
      ["Menunggu Konfirmasi", "disiapkan"].includes(order.status)
    );
  };

  const getOrderHistory = () => {
    return orders.filter(order => order.status === "Selesai");
  };

  // Calculate order total
  const calculateOrderTotal = (order) => {
    return order.items.reduce((total, item) => 
      total + item.menuId.price * item.quantity, 0
    );
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    createOrder,
    cancelOrder,
    getActiveOrders,
    getOrderHistory,
    calculateOrderTotal,
    refetch: fetchOrders,
  };
};
