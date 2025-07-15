// pages/Login.js

import React, { useState } from "react";
import { 
  Button, 
  Typography, 
  Container, 
  Box, 
  Paper, 
  Avatar,
  Fade,
  Divider
} from "@mui/material";
import API from "../services/api";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff, Login as LoginIcon } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ identifier: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);

    toast.success("Login successful! Redirecting...", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored"
    });

    // 👇 Delay redirect so toast can be seen
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);

  } catch (err) {
    toast.error(err.response?.data?.message || "Invalid credentials", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored"
    });
  }
};


  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: 'primary.main',
                  width: 60,
                  height: 60,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 8px 16px rgba(33, 150, 243, 0.3)',
                }}
              >
                <LoginIcon sx={{ fontSize: 30 }} />
              </Avatar>
              
              <Typography 
                variant="h4" 
                component="h1"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                  mb: 1,
                }}
              >
                Welcome Back
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ textAlign: 'center', mb: 2 }}
              >
                Sign in to your account
              </Typography>
              
              <Divider sx={{ width: '100%', mb: 2 }} />
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Username or Email"
                name="identifier"
                margin="normal"
                onChange={handleChange}
                value={form.identifier}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 20px rgba(33, 150, 243, 0.2)',
                    },
                  },
                }}
              />
              
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                onChange={handleChange}
                value={form.password}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 20px rgba(33, 150, 243, 0.2)',
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={handleTogglePassword} 
                        edge="end"
                        sx={{
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ textAlign: 'right', mt: 1, mb: 2 }}>
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'primary.dark',
                    },
                  }}
                >
                  Forgot Password?
                </Button>
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 8px 16px rgba(33, 150, 243, 0.3)',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(33, 150, 243, 0.4)',
                    background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                }}
              >
                Sign In
              </Button>
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Button
                    component={Link}
                    to="/register"
                    variant="text"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'primary.dark',
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;