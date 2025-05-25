"use client";

import ProtectedRoute from "@/components/protectedRoute";
import { useAuth } from "@/hooks/auth";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import UserGrowthSection from "./dashboardCharts/userGrowthChart";
import PricingTable from "../dashboard/pticingTable/priceTable";
import SalesTrendsChart from "./dashboardCharts/salesTrendsChart";
import DashboardIndicatorCards from "./dashboardIndicatorCards";
import CategoryDistributionChart from "./dashboardCharts/distributionCategory";

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <Box
        className="flex flex-col justify-center items-center min-h-screen"
        sx={{ bgcolor: "background.default" }}
      >
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Loading 
        </Typography>
      </Box>
    );
  }

  return (
    <ProtectedRoute>
      <Paper elevation={3} sx={{ borderRadius: "0px" }}>
        <Box
          sx={{
            width: "100%",
            p: 2,
            textAlign: "left",
            color: "#485467",
            borderRadius: "0px",
          }}
        >
          <Typography variant="h6">Welcome Back, {user?.fullName}</Typography>
          <Typography
            variant="caption"
            sx={{ display: "block", mt: 0.5, color: "#7a869a" }}
          >
            Here’s what’s happening with your dashboard today.
          </Typography>
        </Box>
      </Paper>
      <Box
        sx={{
          px: { xs: 2, sm: 2, md: 6 },
          py: 4,
          width: "100%",
          margin: "0 auto",
          color: "#485467",
        }}
      >
        <Grid item xs={12} md={6} sx={{ padding: "2rem 0rem" }}>
          <DashboardIndicatorCards />
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
              <PricingTable />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
              <Box>
              <UserGrowthSection />
              
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={4}>
          <CategoryDistributionChart />
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={8} sx={{ height: "100%" }}>
              <SalesTrendsChart />
            </Paper>
          </Grid>
        </Grid>

        <Box mt={6} textAlign="center">
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={logout}
            sx={{ py: 1.5, px: 4 }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
