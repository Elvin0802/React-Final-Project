import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1 className="heading-primary">About Us</h1>
      
      <div className="about-content">
        <section className="about-section">
          <h2 className="heading-secondary">Who Are We ?</h2>
          <p>
          Coinlore Independent Cryptocurrency Research Platform: We offer a wide range of metrics including live
           prices, market cap, trading volumes, historical prices, yearly price history, charts, 
           exchange information, buying guides, crypto wallets, ICO data, converter, news,
            and price predictions for both short and long-term periods.
             Coinlore aggregates data from multiple sources to ensure comprehensive coverage of all relevant 
             information and events.
              Additionally, we provide APIs and widgets for developers and enterprise users.
          </p>
        </section>

        <section className="about-section">
          <h2 className="heading-secondary">Our Mission</h2>
          <p>
          Our mission is to simplify your research process by centralizing all necessary information,
           so you don't have to bounce between various sites and forums.
            We offer detailed statistics on price movements, market caps, volume, as well as
             blockchain data like transactions and top holder details.
          </p>
        </section>

        <section className="about-section">
          <h2 className="heading-secondary">Our Features</h2>
          <ul className="features-list">
            <li>Real-time price tracking.</li>
            <li>Detailed market analysis.</li>
            <li>Cryptocurrency charts.</li>
            <li>Portfolio tracking.</li>
            <li>Mobile friendly design.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 