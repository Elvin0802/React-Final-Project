import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, CircularProgress, Alert, TextField } from '@mui/material';
import CryptoCard from '../components/CryptoCard';
import CryptoChart from '../components/CryptoChart';
import { useCryptoData } from '../hooks/useCryptoData';

const ITEMS_PER_PAGE = 15;

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInput, setPageInput] = useState('');
  const navigate = useNavigate();
  
  const { cryptoData, globalStats, loading, error } = useCryptoData(
    currentPage * ITEMS_PER_PAGE,
    ITEMS_PER_PAGE
  );

  const filteredCryptos = useMemo(() => {
    if (!cryptoData) return [];
    if (!searchTerm) return cryptoData;
    
    return cryptoData.filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, cryptoData]);

  const handleCryptoClick = (crypto) => {
    navigate(`/coin/${crypto.id}`);
  };

  const totalPages = globalStats ? Math.ceil(globalStats.coins_count / ITEMS_PER_PAGE) : 0;

  const handleNextPage = () => {
    if (searchTerm) return;
    setCurrentPage(prev => prev + 1 < totalPages ? prev + 1 : prev);
  };

  const handlePrevPage = () => {
    if (searchTerm) return;
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleFirstPage = () => {
    if (searchTerm) return;
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    if (searchTerm) return;
    setCurrentPage(Math.max(0, totalPages - 1));
  };

  const handleGoToPage = () => {
    if (searchTerm || !pageInput) return;
    
    const pageNumber = parseInt(pageInput);
    if (isNaN(pageNumber) || pageNumber < 1) {
      setCurrentPage(0);
    } else if (pageNumber > totalPages) {
      setCurrentPage(totalPages - 1);
    } else {
      setCurrentPage(pageNumber - 1);
    }
    setPageInput('');
  };

  const handlePageInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGoToPage();
    }
  };

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) > 0 && parseInt(value) <= totalPages)) {
      setPageInput(value);
    }
  };

  return (
    <div className="app-container">
      <h1 className="heading-primary">CoinLore</h1>

      {globalStats && (
        <div className="stats-container">
          <Typography variant="h6">
            Total Market Capacity: {parseFloat(globalStats.total_mcap).toLocaleString()} $ 
          </Typography>
          <Typography variant="subtitle1">
            24 hour Volume: {parseFloat(globalStats.total_volume).toLocaleString()} $ 
          </Typography>
          <Typography variant="subtitle2">
            Total Coin Count: {parseInt(globalStats.coins_count).toLocaleString()}
          </Typography>
        </div>
      )}

      <div className="search-container">
        <TextField
          fullWidth
          label="Search Coin Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}

      {error && (
        <div className="error-container">
          <Alert severity="error">{error}</Alert>
        </div>
      )}

      {filteredCryptos.length > 0 && (
        <>
          <div className="chart-container">
            <CryptoChart
              data={filteredCryptos}
              title="Cryptocurrency Price Chart"
            />
          </div>

          <div className="crypto-grid">
            {filteredCryptos.map((crypto) => (
              <div key={crypto.id} onClick={() => handleCryptoClick(crypto)}>
                <CryptoCard crypto={crypto} />
              </div>
            ))}
          </div>

          {!searchTerm && (
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
                ← Previous
              </button>
              <span className="page-info">
                Page {currentPage + 1} / {totalPages}
              </span>
              <div className="page-input-container">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={pageInput}
                  onChange={handlePageInputChange}
                  onKeyDown={handlePageInputKeyDown}
                  placeholder="Page No"
                  className="page-input"
                />
                <button 
                  onClick={handleGoToPage}
                  className="pagination-button"
                  disabled={!pageInput}
                >
                  Go
                </button>
              </div>
              <button 
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className="pagination-button"
              >
                Next →
              </button>
              <button 
                onClick={handleLastPage}
                disabled={currentPage >= totalPages - 1}
                className="pagination-button"
              >
                Last Page
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage; 