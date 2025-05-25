import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import BarChart from '../../../components/charts/barchart'; 

const UserGrowthSection: React.FC = () => {
  const labels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const datasets = [
    {
      label: 'New Users',
      data: [200, 450, 300, 500, 700, 850, 950, 900, 870, 920, 980, 1000]
    }
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2,  boxShadow: "none"}}>
      <Typography variant="h6" mb={2}>
        User Growth
      </Typography>
      <Box>
        <BarChart labels={labels} datasets={datasets} />
      </Box>
    </Paper>
  );
};

export default UserGrowthSection;
