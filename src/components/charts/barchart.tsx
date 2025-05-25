import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

interface BarChartProps {
  labels: string[];
  datasets: { data: number[]; label: string }[];
  options?: ChartOptions<'bar'>;
  horizontal?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  disableCurrencyFormat?: boolean;
  stepSize?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  labels,
  datasets,
  options,
  horizontal = false,
  backgroundColor = 'rgba(173, 216, 230, 0.6)', 
  borderColor = 'rgba(173, 216, 230, 1)',     
  stepSize
}) => {
  const chartData: ChartData<'bar'> = {
    labels,
    datasets: datasets.map(dataset => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor,
      borderColor,
      borderWidth: 1,
      borderRadius: { topLeft: 4, topRight: 4 }
    }))
  };

  const defaultOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' : 'x',
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
        border: {
          display: true,
          color: '#E0E0E0'
        },
        ticks: {
          callback: function (value) {
            return value;
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          drawTicks: true,
          tickLength: 10,
          tickWidth: 0,
          tickColor: '#667085'
        },
        border: {
          dash: [6],
          display: false,
          color: '#E0E0E0'
        },
        ticks: {
          stepSize: stepSize || undefined,
          callback: function (value) {
            return value;
          }
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        displayColors: false,
        titleAlign: 'center',
        bodyAlign: 'center',
        footerAlign: 'center',
        callbacks: {
          title: function (tooltipItems) {
            return labels[tooltipItems[0].dataIndex];
          }
        }
      }
    },
    ...options
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px' }}>
      <Bar data={chartData} options={defaultOptions} />
    </Box>
  );
};

export default BarChart;
