import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { getAllExchanges } from '../services/api';

const ITEMS_PER_PAGE = 24;

const ExchangesPage = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        setLoading(true);
        const data = await getAllExchanges();
        const exchangeArray = Object.values(data).sort((a, b) => 
          parseFloat(b.volume_usd) - parseFloat(a.volume_usd)
        );
        setExchanges(exchangeArray);
      } catch (err) {
        setError('An error occurred while loading the stock market list.');
        console.error('Stock exchange list loading error: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  const totalPages = Math.ceil(exchanges.length / ITEMS_PER_PAGE);
  const paginatedExchanges = exchanges.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1 < totalPages ? prev + 1 : prev);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(Math.max(0, totalPages - 1));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="exchanges-page">
      <h1 className="heading-primary">Coin Exchanges</h1>
      
      <div className="exchanges-grid">
        {paginatedExchanges.map((exchange) => (
          <div key={exchange.id} className="exchange-card">
            <div className="exchange-header">
              <h2>{exchange.name}</h2>
              {exchange.url && (
                <a 
                  href={exchange.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="exchange-link"
                >
                  Go to Exchange
                </a>
              )}
            </div>
            
            <div className="exchange-details">
              <div className="exchange-stat">
                <span>24 hour Volume: </span>
                <span> $ {parseFloat(exchange.volume_usd).toLocaleString()}</span>
              </div>
              
              <div className="exchange-stat">
                <span>Active Pairs: </span>
                <span>{exchange.active_pairs}</span>
              </div>
              
              {exchange.country && (
                <div className="exchange-stat">
                  <span>Country: </span>
                  <span>{exchange.country}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={handleFirstPage} 
          disabled={currentPage === 0}
          className="pagination-button"
        >
           First Page
        </button>
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 0}
          className="pagination-button"
        >
           ←  Previous
        </button>
        <span className="page-info">
           Page {currentPage + 1} / {totalPages} 
        </span>
        <button 
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
          className="pagination-button"
        >
           Next  → 
        </button>
        <button 
          onClick={handleLastPage}
          disabled={currentPage >= totalPages - 1}
          className="pagination-button"
        >
           Last Page 
        </button>
      </div>
    </div>
  );
};

export default ExchangesPage; 