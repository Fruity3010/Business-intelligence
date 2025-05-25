import React from "react";
import { Box, Typography } from "@mui/material";
import LineChart from "../../../components/charts/linechart";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const SalesTrendsChart: React.FC = () => {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May"];

  const datasets = [
    {
      label: "2024 Sales",
      data: [120, 150, 140, 180, 200],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
    {
      label: "2023 Sales",
      data: [100, 120, 130, 150, 170],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 180, 99)",
    },
  ];

  return (
    <Box mx="auto" p={2}>
      <Typography variant="h5" component="h4">
        Sales Trends
      </Typography>
      <Typography variant="h4">$10,567</Typography>

      <Box display="flex" alignItems="center">
        <ArrowDropUpIcon sx={{ color: "green", fontSize: 18, mr: 0.5 }} />
        <Typography variant="caption" sx={{ color: "green" }}>
          25%
        </Typography>
      </Box>

      <Box height={400}>
        <LineChart labels={labels} datasets={datasets} />
      </Box>
    </Box>
  );
};

export default SalesTrendsChart;
