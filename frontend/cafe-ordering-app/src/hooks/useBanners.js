import { useState, useEffect } from 'react';
import { bannerService } from '../services/api/bannerService';

export const useBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bannerService.getAll();
      setBanners(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching banners:', err);
    } finally {
      setLoading(false);
    }
  };

  const createBanner = async (bannerData) => {
    try {
      await bannerService.create(bannerData);
      await fetchBanners(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateBanner = async (id, bannerData) => {
    try {
      await bannerService.update(id, bannerData);
      await fetchBanners(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteBanner = async (id) => {
    try {
      await bannerService.delete(id);
      setBanners(banners.filter(banner => banner._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const toggleBannerStatus = async (id, isActive) => {
    try {
      await bannerService.toggleStatus(id, isActive);
      setBanners(banners.map(banner => 
        banner._id === id ? { ...banner, isActive: !isActive } : banner
      ));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return {
    banners,
    loading,
    error,
    createBanner,
    updateBanner,
    deleteBanner,
    toggleBannerStatus,
    refetch: fetchBanners,
  };
};
