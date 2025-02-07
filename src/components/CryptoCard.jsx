import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const CryptoCard = ({ crypto }) => {
  const isPositiveChange = parseFloat(crypto.percent_change_24h) > 0;

  return (
    <div className="crypto-card">
      <div className="crypto-header">
        <div className="crypto-title">
          {crypto.name} ({crypto.symbol})
        </div>
        <div className="crypto-price mobile-only">
            $ {parseFloat(crypto.price_usd).toLocaleString()}
        </div>
        <div className="crypto-change desktop-only">
          {isPositiveChange ? (
            <TrendingUpIcon style={{ color: 'var(--success-color)' }} />
          ) : (
            <TrendingDownIcon style={{ color: 'var(--error-color)' }} />
          )}
          <span className={isPositiveChange ? 'text-success' : 'text-error'}>
             {crypto.percent_change_24h} %
          </span>
        </div>
      </div>

      <div className="crypto-details desktop-only">
        <div className="crypto-stats">
          Rank: # {crypto.rank}
        </div>
        
        <div className="crypto-price">
           $ {parseFloat(crypto.price_usd).toLocaleString()}
        </div>
        
        <div className="crypto-stats">
          <div>
             Market capacity: $ {parseFloat(crypto.market_cap_usd).toLocaleString()}
          </div>
          <div>
             24 hour Volume: $ {parseFloat(crypto.volume24).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard; 