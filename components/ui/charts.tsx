"use client";

import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  className?: string;
}

export function LineChart({ data, xKey, yKey, className }: ChartProps) {
  const chartData = {
    labels: data.map(d => d[xKey]),
    datasets: [
      {
        label: yKey,
        data: data.map(d => d[yKey]),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} className={className} />;
}

export function BarChart({ data, xKey, yKey, className }: ChartProps) {
  const chartData = {
    labels: data.map(d => d[xKey]),
    datasets: [
      {
        label: yKey,
        data: data.map(d => d[yKey]),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return <Bar data={chartData} className={className} />;
} 