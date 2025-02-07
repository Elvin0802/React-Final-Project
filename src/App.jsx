import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ApiPage from './pages/ApiPage';
import ExchangesPage from './pages/ExchangesPage';
import CoinDetailPage from './pages/CoinDetailPage';
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exchanges" element={<ExchangesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/api" element={<ApiPage />} />
        <Route path="/coin/:coinId" element={<CoinDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
