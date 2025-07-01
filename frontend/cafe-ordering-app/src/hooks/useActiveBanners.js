import { useState, useEffect } from 'react';
import { bannerService } from '../services/api/bannerService';

export const useActiveBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActiveBanners = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bannerService.getAll();
      // Filter only active banners
      const activeBanners = data.filter(banner => banner.isActive === true);
      setBanners(activeBanners);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching active banners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveBanners();
  }, []);

  return {
    banners,
    loading,
    error,
    refetch: fetchActiveBanners,
  };
};
