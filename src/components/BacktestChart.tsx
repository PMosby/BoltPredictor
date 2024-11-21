import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BacktestChartProps {
  data: Array<{
    date: string;
    modelReturn: number;
    marketReturn: number;
  }>;
}

export const BacktestChart: React.FC<BacktestChartProps> = ({ data }) => {
  return (
    <div className="h-[400px] w-full bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Backtest Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="modelReturn"
            stroke="#8b5cf6"
            name="Model Return"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="marketReturn"
            stroke="#9ca3af"
            name="Market Return"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}