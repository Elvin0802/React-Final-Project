import React from 'react';

const ApiPage = () => {
  return (
    <div className="api-page">
      <h1 className="heading-primary">API Documentation</h1>
      
      <div className="api-content">
        <section className="api-section">
          <h2 className="heading-secondary">API Owerview</h2>
          <p>
            Crypto Tracking API provides programmatic access to cryptocurrency data. 
            It offers easy integration and fast data access with its RESTful API structure.
          </p>
        </section>

        <section className="api-section">
          <h2 className="heading-secondary">Endpoint's</h2>
          <div className="endpoint-list">
            <div className="endpoint-item">
              <h3>Global Statistics</h3>
              <code>GET /api/global/</code>
              <p>Returns global data such as total market cap, volume, BTC dominance and more.</p>
            </div>

            <div className="endpoint-item">
              <h3>Specific Coin List</h3>
              <code>GET /api/tickers/</code>
              <p>
                  Returns the list of all cryptocurrencies and their underlying data.
                  Max 100 coin per request (start = 0 , limit = 100 or start = 230 , limit = 330)
              </p>
            </div>

            <div className="endpoint-item">
              <h3>Coin Details</h3>
              <code>GET /api/ticker/{'{id}'}</code>
              <p>Returns detailed information about a specific coin.</p>
            </div>

            <div className="endpoint-item">
              <h3>Exchange Markets</h3>
              <code>GET /api/coin/markets/?id={'{id}'}</code>
              <p>Lists the exchanges where a coin is traded.</p>
            </div>
          </div>
        </section>

        <section className="api-section">
          <h2 className="heading-secondary">Usage Limits</h2>
          <ul className="limits-list">
              <li>Free to use</li>
              <li>No API key required</li>
              <li>Maximum 10 requests per second</li>
              <li>Maximum 500 requests per minute</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ApiPage; 