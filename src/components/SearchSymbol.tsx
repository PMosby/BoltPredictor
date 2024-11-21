import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { marketDataService, SearchResult } from '../services/marketData';
import debounce from 'lodash/debounce';

interface SearchSymbolProps {
  onSelect: (symbol: string) => void;
}

export const SearchSymbol: React.FC<SearchSymbolProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const searchResults = await marketDataService.searchSymbols(searchQuery);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSelect = (symbol: string) => {
    onSelect(symbol);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search symbol..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {loading && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
          <div className="text-sm text-gray-500">Searching...</div>
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="max-h-60 overflow-auto">
            {results.map((result) => (
              <li
                key={result.symbol}
                onClick={() => handleSelect(result.symbol)}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{result.symbol}</span>
                  <span className="text-sm text-gray-500">{result.currency}</span>
                </div>
                <div className="text-sm text-gray-600 truncate">{result.name}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};