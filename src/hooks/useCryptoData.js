import { useState, useEffect } from 'react';
import { getCryptoList, getGlobalStats } from '../services/api';

export const useCryptoData = (start = 0, limit = 15, refreshInterval = 60000) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [globalStats, setGlobalStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsResponse, cryptoResponse] = await Promise.all([
        getGlobalStats(),
        getCryptoList(start, limit)
      ]);
      
      setGlobalStats(statsResponse);
      setCryptoData(cryptoResponse.data);
      setError(null);
    } catch (err) {
      setError('Error occoured in fetch data.');
      console.error('Error in useCryptoData:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [start, limit]);

  return {
    cryptoData,
    globalStats,
    loading,
    error,
    refetch: fetchData
  };
}; 