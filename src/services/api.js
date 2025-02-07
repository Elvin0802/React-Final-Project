import axios from 'axios';

const BASE_URL = 'https://api.coinlore.net/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getGlobalStats = async () => {
  try {
    const response = await api.get('/global/');
    return response.data[0];
  } catch (error) {
    console.error('Error while retrieving global statistics:', error);
    throw error;
  }
};

export const getCryptoList = async (start = 0, limit = 12) => {
  try {
    const response = await api.get(`/tickers/?start=${start}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error while getting crypto list:', error);
    throw error;
  }
};

export const getCryptoDetails = async (id) => {
  try {
    const response = await api.get(`/ticker/?id=${id}`);
    return response.data[0];
  } catch (error) {
    console.error('Error while getting crypto details:', error);
    throw error;
  }
};

export const getCryptoMarkets = async (id) => {
  try {
    const response = await api.get(`/coin/markets/?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error while getting crypto markets:', error);
    throw error;
  }
};

export const getAllExchanges = async () => {
  try {
    const response = await api.get('/exchanges/');
    return response.data;
  } catch (error) {
    console.error('Error while getting exchanges:', error);
    throw error;
  }
};

export const getExchangeDetails = async (id) => {
  try {
    const response = await api.get(`/exchange/?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error while getting exchange details:', error);
    throw error;
  }
};

export const getSocialStats = async (id) => {
  try {
    const response = await api.get(`/coin/social_stats/?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error while retrieving social media statistics:', error);
    throw error;
  }
};