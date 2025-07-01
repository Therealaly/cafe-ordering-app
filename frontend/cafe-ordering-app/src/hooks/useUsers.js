import { useState, useEffect } from 'react';
import { userService } from '../services/api/userService';
import { jwtDecode } from 'jwt-decode';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUserRole, setLoggedInUserRole] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      await userService.update(id, userData);
      await fetchUsers(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      await userService.delete(id);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Filter users by search term
  const filterUsers = (searchTerm) => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Sort users by role
  const sortUsersByRole = (usersToSort) => {
    const roleOrder = { admin: 1, kasir: 2, superadmin: 0, user: 3 };
    
    return [...usersToSort].sort((a, b) => {
      const orderA = roleOrder[a.role] !== undefined ? roleOrder[a.role] : Infinity;
      const orderB = roleOrder[b.role] !== undefined ? roleOrder[b.role] : Infinity;
      
      if (orderA === orderB) {
        return a.name.localeCompare(b.name);
      }
      return orderA - orderB;
    });
  };

  useEffect(() => {
    fetchUsers();
    
    // Get logged in user role from token
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setLoggedInUserRole(decodedToken.role);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  return {
    users,
    loading,
    error,
    loggedInUserRole,
    updateUser,
    deleteUser,
    filterUsers,
    sortUsersByRole,
    refetch: fetchUsers,
  };
};
