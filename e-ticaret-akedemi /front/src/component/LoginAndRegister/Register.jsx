import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Paper, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Şifreler eşleşmiyor!");
            return;
        }
        
        try {
            const response = await axiosInstance.post('/register', {
                name,
                email,
                password
            });
            
            if (response.data && response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                navigate('/');
            } else {
                alert('Kayıt başarılı, ancak token alınamadı.');
            }
        } catch (error) {
            console.error('Kayıt hatası:', error);
            alert('Kayıt sırasında bir hata oluştu.');
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 20 }}>
            <Paper elevation={3} sx={{ padding: 3, border: 0.1, borderRadius: 3 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Kayıt Ol
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Ad Soyad"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Adres"
                        name="email"
                        autoComplete="email"
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
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Şifreyi Onayla"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleRegister}
                    >
                        Kayıt Ol
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleLoginRedirect}
                            sx={{ textDecoration: 'none', cursor: 'pointer' }}
                        >
                            Zaten hesabınız var mı? Giriş yapın
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Register;
