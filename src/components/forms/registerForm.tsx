
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik'; 


import { registerSchema } from './validation/authvalidationSchema';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '', 
  };

  return (
    <Paper elevation={6} className="w-full max-w-md" sx={{ p: 4, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          Register for BI Tool
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          setLoading(true);
          try {
         
            const success = await register(values.email, values.password, values.fullName);
            if (success) {
              toast.success('Registration successful! Redirecting to dashboard.', {
                position: 'top-right',
                autoClose: 2000,
              });
            } else {

              toast.error('Registration failed. This email might already be in use.', {
                position: 'top-right',
                autoClose: 5000,
              });
             
            }
          } catch (apiError) {
            console.error('API call error during registration:', apiError);
            toast.error('An unexpected error occurred during registration. Please try again.', {
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
              id="full-name"
              label="Full Name"
              name="fullName" 
              autoComplete="name"
              autoFocus
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullName && !!errors.fullName}
              helperText={touched.fullName && errors.fullName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              type="password"
              id="password"
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword" 
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && !!errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword} 
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
          
              disabled={loading || !dirty || !isValid}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link href="/" passHref style={{ textDecoration: 'none' }}>
                  <Typography component="span" color="primary" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                    Login
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

export default RegisterForm;