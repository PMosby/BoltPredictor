import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { marketDataService, StockQuote, OptionChain } from '../services/marketData';
import { SearchSymbol } from './SearchSymbol';

export const MarketDataPanel: React.FC = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [options, setOptions] = useState<OptionChain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [quoteData, optionsData] = await Promise.all([
        marketDataService.getQuote(symbol),
        marketDataService.getOptionsChain(symbol),
      ]);
      setQuote(quoteData);
      setOptions(optionsData);
    } catch (err) {
      setError('Failed to fetch market data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  const handleSymbolSelect = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Market Data</h2>
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <SearchSymbol onSelect={handleSymbolSelect} />

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {quote && (
          <div className="border-t border-b border-gray-100 py-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{quote.symbol}</h3>
              <span className="text-lg font-semibold">${quote.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Change</span>
              <span className={quote.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                {quote.change >= 0 ? '+' : ''}{quote.change.toFixed(2)} ({quote.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-2">Strike</th>
                <th className="pb-2">Exp</th>
                <th className="pb-2">Last</th>
                <th className="pb-2">Bid</th>
                <th className="pb-2">Ask</th>
                <th className="pb-2">Vol</th>
              </tr>
            </thead>
            <tbody>
              {options.map((option) => (
                <tr key={`${option.strike}-${option.expiration}`} className="border-b last:border-0">
                  <td className="py-2">${option.strike}</td>
                  <td className="py-2">{new Date(option.expiration).toLocaleDateString()}</td>
                  <td className="py-2">${option.lastPrice.toFixed(2)}</td>
                  <td className="py-2">${option.bid.toFixed(2)}</td>
                  <td className="py-2">${option.ask.toFixed(2)}</td>
                  <td className="py-2">{option.volume.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};