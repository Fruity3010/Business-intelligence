'use client';

import React from 'react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

interface PieChartProps {
  labels: string[];
  data: number[];
  colors?: string[];
}

const defaultColors = ['#60a5fa', '#1e3a8a', '#f39c12'];


const PieChart: React.FC<PieChartProps> = ({ labels, data, colors }) => {
  const pieData = labels.map((label, index) => ({
    name: label,
    value: data[index],
  }));

  const pieColors = colors || defaultColors;

  return (
    <Box sx={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={320}>
        <RePieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            dataKey="value"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
            ))}
          </Pie>
        </RePieChart>
      </ResponsiveContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mt: 2 }}>
        {pieData.map((entry, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', alignItems: 'center', mx: 2, mb: 1 }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: pieColors[index % pieColors.length],
                mr: 1,
              }}
            />
            <Typography variant="body2">{entry.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PieChart;
