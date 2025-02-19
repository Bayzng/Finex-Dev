import React from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./Analytics.css";

interface DataPoint {
  name: string;
  [key: string]: number | string; // Allowing other properties to be of number or string type
}

interface AnalyticsProps {
  title: string;
  data: DataPoint[];
  dataKey: string;
  grid?: boolean;
}

const Analytics: React.FC<AnalyticsProps> = ({ title, data, dataKey, grid }) => {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
