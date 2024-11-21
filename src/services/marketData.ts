import axios from 'axios';

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export interface OptionChain {
  symbol: string;
  expiration: string;
  strike: number;
  lastPrice: number;
  bid: number;
  ask: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
}

export interface SearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
}

export const marketDataService = {
  async searchSymbols(query: string): Promise<SearchResult[]> {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords: query,
          apikey: API_KEY,
        },
      });

      return response.data.bestMatches?.map((match: any) => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        type: match['3. type'],
        region: match['4. region'],
        currency: match['8. currency'],
      })) || [];
    } catch (error) {
      console.error('Error searching symbols:', error);
      throw new Error('Failed to search symbols');
    }
  },

  async getQuote(symbol: string): Promise<StockQuote> {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: API_KEY,
        },
      });

      const data = response.data['Global Quote'];
      return {
        symbol: data['01. symbol'],
        price: parseFloat(data['05. price']),
        change: parseFloat(data['09. change']),
        changePercent: parseFloat(data['10. change percent'].replace('%', '')),
        volume: parseInt(data['06. volume']),
      };
    } catch (error) {
      console.error('Error fetching quote:', error);
      throw new Error('Failed to fetch stock quote');
    }
  },

  async getOptionsChain(symbol: string): Promise<OptionChain[]> {
    try {
      // Note: This is a mock response as Alpha Vantage's free tier doesn't include options data
      return [
        {
          symbol,
          expiration: '2024-04-19',
          strike: 180,
          lastPrice: 5.45,
          bid: 5.40,
          ask: 5.50,
          volume: 1250,
          openInterest: 5000,
          impliedVolatility: 0.25,
        },
        {
          symbol,
          expiration: '2024-04-19',
          strike: 185,
          lastPrice: 3.75,
          bid: 3.70,
          ask: 3.80,
          volume: 850,
          openInterest: 3500,
          impliedVolatility: 0.28,
        },
      ];
    } catch (error) {
      console.error('Error fetching options chain:', error);
      throw new Error('Failed to fetch options chain');
    }
  },
};