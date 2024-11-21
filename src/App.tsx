import React from 'react';
import { Brain, TrendingUp, History } from 'lucide-react';
import { OptionCard } from './components/OptionCard';
import { BacktestChart } from './components/BacktestChart';
import { MarketDataPanel } from './components/MarketDataPanel';
import { format, addDays } from 'date-fns';

// Mock data - in a real app, this would come from your ML model
const recommendations = [
  {
    symbol: 'AAPL',
    strike: 180,
    expiry: '2024-04-19',
    recommendation: 'buy',
    confidence: 87,
    price: 5.45,
    change: 2.3,
  },
  {
    symbol: 'TSLA',
    strike: 200,
    expiry: '2024-05-17',
    recommendation: 'sell',
    confidence: 92,
    price: 8.30,
    change: -1.5,
  },
  {
    symbol: 'NVDA',
    strike: 850,
    expiry: '2024-06-21',
    recommendation: 'hold',
    confidence: 75,
    price: 12.65,
    change: 0.8,
  },
] as const;

// Mock backtest data
const backtestData = Array.from({ length: 30 }, (_, i) => ({
  date: format(addDays(new Date('2024-01-01'), i), 'MMM dd'),
  modelReturn: Math.round(1000 + (Math.random() * 500 + i * 50)) / 10,
  marketReturn: Math.round(1000 + (Math.random() * 300 + i * 30)) / 10,
}));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Options Trader</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Model Accuracy</p>
                <p className="text-2xl font-semibold text-gray-900">92.5%</p>
              </div>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Return</p>
                <p className="text-2xl font-semibold text-green-600">+24.3%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Trades Analyzed</p>
                <p className="text-2xl font-semibold text-gray-900">1,432</p>
              </div>
              <History className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market Data Panel */}
          <div className="lg:col-span-1">
            <MarketDataPanel />
          </div>

          {/* Recommendations */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Recommendations</h2>
            {recommendations.map((rec) => (
              <OptionCard key={`${rec.symbol}-${rec.strike}`} {...rec} />
            ))}
          </div>

          {/* Chart */}
          <div className="lg:col-span-1">
            <BacktestChart data={backtestData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;