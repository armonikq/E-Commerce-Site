import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Paper, Box, Link, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/e-ticaret-1920x1080.png';
import axiosInstance from '../../utils/axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post('/login', { email, password });
            console.log('Login response:', response.data);
            localStorage.setItem('authToken', response.data.token);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <Container component="main" maxWidth="md" sx={{ marginTop: 20 }}>
            <Paper elevation={3} sx={{ padding: 6, border: 0.1, borderRadius: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <img src={image} alt="E-Ticaret" style={{ width: '100%' ,marginTop : 40}} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Giriş Yapın
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Adres"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Şifre"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleLogin}
                            >
                                Giriş Yap
                            </Button>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={handleRegisterRedirect}
                                    sx={{ textDecoration: 'none', cursor: 'pointer' }}
                                >
                                    Hesabınız yoksa üye olun
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Login;
