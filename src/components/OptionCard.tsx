import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from 'lucide-react';

type Recommendation = 'buy' | 'sell' | 'hold';

interface OptionCardProps {
  symbol: string;
  strike: number;
  expiry: string;
  recommendation: Recommendation;
  confidence: number;
  price: number;
  change: number;
}

const recommendationConfig = {
  buy: { icon: ArrowUpCircle, color: 'text-green-500', bg: 'bg-green-50' },
  sell: { icon: ArrowDownCircle, color: 'text-red-500', bg: 'bg-red-50' },
  hold: { icon: MinusCircle, color: 'text-yellow-500', bg: 'bg-yellow-50' },
};

export const OptionCard: React.FC<OptionCardProps> = ({
  symbol,
  strike,
  expiry,
  recommendation,
  confidence,
  price,
  change,
}) => {
  const config = recommendationConfig[recommendation];
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{symbol}</h3>
          <p className="text-sm text-gray-500">${strike} Strike · {expiry}</p>
        </div>
        <div className={`p-2 rounded-lg ${config.bg}`}>
          <Icon className={`w-6 h-6 ${config.color}`} />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">AI Recommendation</span>
          <span className={`font-medium capitalize ${config.color}`}>
            {recommendation}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Confidence</span>
          <span className="font-medium">{confidence}%</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Current Price</span>
          <div className="text-right">
            <span className="font-medium">${price}</span>
            <span className={`ml-2 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}