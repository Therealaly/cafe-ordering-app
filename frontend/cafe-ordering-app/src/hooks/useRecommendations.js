import { useState, useEffect } from 'react';
import { recommendationService } from '../services/api/recommendationService';

export const useRecommendations = (userId) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = sessionStorage.getItem("token");
      if (!token || !userId) {
        setLoading(false);
        return;
      }

      const data = await recommendationService.getUserRecommendations(userId);
      setRecommendations(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRecommendations();
    } else {
      setLoading(false);
    }
  }, [userId]); // fetchRecommendations is stable, no need to include

  return {
    recommendations,
    loading,
    error,
    refetch: fetchRecommendations,
  };
};
