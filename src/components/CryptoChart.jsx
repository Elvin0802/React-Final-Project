import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

ChartJS.defaults.color = '#374151';
ChartJS.defaults.borderColor = '#d1d5db';

const CryptoChart = ({ data }) => {
  const sortedData = [...data].sort((a, b) => 
    parseFloat(b.market_cap_usd) - parseFloat(a.market_cap_usd)
  );

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#d1d5db',
        borderWidth: 1,
        padding: 12,
        titleFont: {
          size: window.innerWidth < 768 ? 12 : 14
        },
        bodyFont: {
          size: window.innerWidth < 768 ? 11 : 13
        },
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          },
          maxRotation: 45,
          minRotation: 45,
          autoSkip: false,
          autoSkipPadding: 15
        }
      },
      y: {
        grid: {
          color: '#e5e7eb'
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      }
    }
  };

  const priceChartData = {
    labels: sortedData.map(item => item.symbol),
    datasets: [{
      label: 'Price (USD)',
      data: sortedData.map(item => parseFloat(item.price_usd)),
      borderColor: '#16a34a',
      backgroundColor: '#16a34a',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#16a34a',
      pointBorderColor: '#d1d5db',
      pointHoverRadius: 6,
      borderWidth: 2,
      fill: false
    }]
  };

  const changeChartData = {
    labels: sortedData.map(item => item.symbol),
    datasets: [{
      label: '24 hour Change (%)',
      data: sortedData.map(item => parseFloat(item.percent_change_24h)),
      borderColor: '#dc2626',
      backgroundColor: '#dc2626',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#dc2626',
      pointBorderColor: '#d1d5db',
      pointHoverRadius: 6,
      borderWidth: 2,
      fill: false
    }]
  };

  const priceOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Price (USD)',
        color: '#374151',
        padding: {
          top: 10,
          bottom: 30
        },
        font: {
          size: window.innerWidth < 768 ? 14 : 16,
          weight: 'bold'
        }
      },
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: function(context) {
            return '$' + context.parsed.y.toLocaleString();
          }
        }
      }
    }
  };

  const changeOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: '24 hour Change (%)',
        color: '#374151',
        padding: {
          top: 30,
          bottom: 30
        },
        font: {
          size: window.innerWidth < 768 ? 14 : 16,
          weight: 'bold'
        }
      },
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: function(context) {
            return context.parsed.y.toFixed(2) + '%';
          }
        }
      }
    }
  };

  return (
    <div className="charts-container">
      <div className="chart-wrapper">
        <Line data={priceChartData} options={priceOptions} />
      </div>
      <div className="chart-wrapper">
        <Line data={changeChartData} options={changeOptions} />
      </div>
    </div>
  );
};

export default CryptoChart; 