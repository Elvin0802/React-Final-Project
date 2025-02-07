import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import {
  getCryptoDetails,
  getCryptoMarkets,
  getSocialStats
} from '../services/api';

const CryptoDetail = ({ cryptoId }) => {
  const [details, setDetails] = useState(null);
  const [markets, setMarkets] = useState([]);
  const [socialStats, setSocialStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [detailsData, marketsData, socialData] = await Promise.all([
          getCryptoDetails(cryptoId),
          getCryptoMarkets(cryptoId),
          getSocialStats(cryptoId)
        ]);

        if (!detailsData) {
          throw new Error('No crypto found.');
        }

        setDetails(detailsData);
        setMarkets(marketsData);
        setSocialStats(socialData);
        setError(null);
      } catch (err) {
        setError('An error occurred while loading details: ' + err.message);
        console.error('Loading details Error: ', err);
      } finally {
        setLoading(false);
      }
    };

    if (cryptoId) {
      fetchDetails();
    }
  }, [cryptoId]);

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

  if (!details) {
    return <div className="error-container">No crypto found</div>;
  }

  return (
    <div className="crypto-detail">
      <div className="detail-header">
        <h2 className="heading-secondary">
          {details.name} ({details.symbol})
        </h2>
        <div className="price-highlight">
          <span className="current-price">${parseFloat(details.price_usd).toLocaleString()}</span>
          <span className={`price-change-badge ${details.percent_change_24h > 0 ? 'text-success' : 'text-error'}`}>
            {details.percent_change_24h} %
          </span>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-section">
          <h3 className="detail-section-title">Price Information</h3>
          <div className="detail-item">
            <span>Rank:</span>
            <span> # {details.rank}</span>
          </div>
          <div className="detail-item">
            <span>1 hour Change:</span>
            <span className={details.percent_change_1h > 0 ? 'text-success' : 'text-error'}>
              {details.percent_change_1h} %
            </span>
          </div>
          <div className="detail-item">
            <span>24 hour Change:</span>
            <span className={details.percent_change_24h > 0 ? 'text-success' : 'text-error'}>
              {details.percent_change_24h} %
            </span>
          </div>
          <div className="detail-item">
            <span>7 day Change:</span>
            <span className={details.percent_change_7d > 0 ? 'text-success' : 'text-error'}>
              {details.percent_change_7d} %
            </span>
          </div>
        </div>

        <div className="detail-section">
          <h3 className="detail-section-title">Market Information</h3>
          <div className="detail-item">
            <span>Market capacity: </span>
            <span> $ {parseFloat(details.market_cap_usd).toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span>24 hour volume: </span>
            <span> $ {parseFloat(details.volume24).toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span>Circulating supply:</span>
            <span> {parseFloat(details.csupply).toLocaleString()} {details.symbol}</span>
          </div>
          {details.msupply && (
            <div className="detail-item">
              <span>Maximum supply:</span>
              <span> {parseFloat(details.msupply).toLocaleString()} {details.symbol}</span>
            </div>
          )}
        </div>

        {socialStats && (
          <div className="detail-section">
            <h3>Social Media Statistics</h3>
            {socialStats.twitter && (
              <div className="detail-item">
                <span>X followers: </span>
                <span>{socialStats.twitter.followers_count?.toLocaleString()}</span>
              </div>
            )}
            {socialStats.reddit && (
              <>
                <div className="detail-item">
                  <span>Reddit subscribers:</span>
                  <span>{socialStats.reddit.subscribers?.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span>Active Reddit users: </span>
                  <span>{socialStats.reddit.avg_active_users?.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>
        )}

        {markets && markets.length > 0 && (
          <div className="detail-section markets">
            <h3>Markets of coin</h3>
            <div className="markets-grid">
              {markets.slice(0, markets.length).map((market, index) => (
                <div key={index} className="market-item">
                  <span>{market.name}</span>
                  <div>
                    <div> $ {parseFloat(market.price_usd).toLocaleString()}</div>
                    <div className="market-volume">
                      Volume: $ {parseFloat(market.volume_usd).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoDetail; 