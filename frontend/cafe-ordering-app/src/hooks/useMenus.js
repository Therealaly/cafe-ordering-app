import { useState, useEffect } from 'react';
import { menuService } from '../services/api/menuService';

export const useMenus = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await menuService.getAll();
      setMenus(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching menus:', err);
    } finally {
      setLoading(false);
    }
  };

  const createMenu = async (menuData) => {
    try {
      await menuService.create(menuData);
      await fetchMenus(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateMenu = async (id, menuData) => {
    try {
      await menuService.update(id, menuData);
      await fetchMenus(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteMenu = async (id) => {
    try {
      await menuService.delete(id);
      setMenus(menus.filter(menu => menu._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Filter menus by category
  const getMenusByCategory = (category) => {
    return menus.filter(menu => menu.category === category);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return {
    menus,
    loading,
    error,
    createMenu,
    updateMenu,
    deleteMenu,
    getMenusByCategory,
    refetch: fetchMenus,
  };
};
