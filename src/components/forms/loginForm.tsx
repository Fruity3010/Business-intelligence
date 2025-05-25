
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik'; 


import { loginSchema } from './validation/authvalidationSchema'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';


import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const initialValues = {
    email: '',
    password: '',
    keepLoggedIn: false,
  };

  return (
    <Paper elevation={6} className="w-full max-w-md" sx={{ p: 4, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          Login to BI Tool
        </Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema} 
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          try {
            const success = await login(values.email, values.password, values.keepLoggedIn);
            if (!success) {
            
              toast.error('Login failed: Invalid email or password.', {
                position: 'top-right',
                autoClose: 5000,
              });
            }
          } catch (apiError) {
            console.error("API call error:", apiError);
            toast.error('An unexpected error occurred. Please try again.', {
              position: 'top-right',
              autoClose: 5000,
            });

          } finally {
            setLoading(false);
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, dirty, isValid, values, handleChange, handleBlur }) => (
          <Form noValidate> 
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error={touched.email && !!errors.email} 
              helperText={touched.email && errors.email} 
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={values.password} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error={touched.password && !!errors.password} 
              helperText={touched.password && errors.password} 
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="keepLoggedIn" 
                  color="primary"
                  checked={values.keepLoggedIn}
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                />
              }
              label="Keep me logged in"
              sx={{ mt: 1, mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            
              disabled={loading || !dirty || !isValid}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Dont have an account?{' '}
                <Link href="/register" passHref style={{ textDecoration: 'none' }}>
                  <Typography component="span" color="primary" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                    Register
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default LoginForm;