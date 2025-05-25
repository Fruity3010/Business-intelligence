'use client';

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import PieChart from '../../../components/charts/pieChart';

const CategoryDistributionChart = () => {
  return (
    <Paper elevation={3}   sx={{ p: 3,   }}>
      <Box mx="auto" p={2}>
      <Typography variant="h5" component="h4">
       Distribution
      </Typography>
      <Typography variant="h4">13,567</Typography>

      <Box display="flex" alignItems="center">
        <ArrowDropUpIcon sx={{ color: "green", fontSize: 18, mr: 0.5 }} />
        <Typography variant="caption" sx={{ color: "green" }}>
          25%
        </Typography>
      </Box>

      <PieChart
        labels={['Clothes', 'Rice', 'Meat']}
        data={[40, 30, 30]}
      />
         </Box>
    </Paper>
  );
};

export default CategoryDistributionChart;
