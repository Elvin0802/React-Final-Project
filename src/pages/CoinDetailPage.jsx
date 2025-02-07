import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CryptoDetail from '../components/CryptoDetail';

const CoinDetailPage = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();
    
  const handleBack = () => {
    navigate('/');
  };
  
  return (
    <div className="app-container">
      <button className="back-button" onClick={handleBack}>
        ← Return to List
      </button>

      <CryptoDetail cryptoId={parseInt(coinId)} />
      
    </div>
  );
};

export default CoinDetailPage; 