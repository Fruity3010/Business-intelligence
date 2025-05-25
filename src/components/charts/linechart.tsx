'use client';

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography } from '@mui/material';

interface LineChartProps {
  labels: string[];
  datasets: {
    data: number[];
    label: string;
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

const defaultColors = ['#f39c12', '#3498db', '#9b59b6'];

const LineChart: React.FC<LineChartProps> = ({ labels, datasets }) => {
  const series = datasets.map((dataset, index) => ({
    name: dataset.label,
    data: dataset.data,
    color: dataset.borderColor || defaultColors[index % defaultColors.length],
  }));

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      height: 1000,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      categories: labels,
      labels: {
        style: { fontSize: '12px' },
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      labels: {
        style: { fontSize: '12px' },
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      x: { show: true },
      y: {
        formatter: (val: number) => `Value: ${val}`,
      },
    },
    markers: {
      size: 3,
      hover: { sizeOffset: 2 },
    },
    colors: datasets.map(
      (dataset, index) =>
        dataset.borderColor || defaultColors[index % defaultColors.length]
    ),
    grid: {
      borderColor: '#eee',
      row: {
        colors: ['transparent'],
        opacity: 0.5,
      },
    },
  };

  return (
    <Box sx={{ width: '100%' }}>
     
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, flexWrap: 'wrap' }}>
        {datasets.map((dataset, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', alignItems: 'center', mr: 3, mb: 1 }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor:
                  dataset.borderColor || defaultColors[index % defaultColors.length],
                mr: 1,
              }}
            />
            <Typography variant="body2">{dataset.label}</Typography>
          </Box>
        ))}
      </Box>

      <ReactApexChart options={options} series={series} type="line" height={320} />
    </Box>
  );
};

export default LineChart;
