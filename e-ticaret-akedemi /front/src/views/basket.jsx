import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Avatar, TextField, Grid } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [address, setAddress] = useState({
        fullName: '',
        street: '',
        fullAddress: '',
        city: '',
        zipCode: '',
        country: ''
    });
    const navigate = useNavigate(); 

    useEffect(() => {
        const loadCart = () => {
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            console.log('Yüklenen sepet:', storedCart);
            setCartItems(storedCart);
        };

        loadCart();
        
        window.addEventListener('storage', loadCart);
        
        return () => {
            window.removeEventListener('storage', loadCart);
        };
    }, []);

    const updateLocalStorage = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleIncrease = (id) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const handleDecrease = (id) => {
        const updatedCart = cartItems.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const handleRemove = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handlePurchase = () => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            navigate('/login');
        } else {
            setShowAddressForm(true);
        }
    };

    const handleAddressChange = (event) => {
        setAddress({
            ...address,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmitOrder = async () => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            navigate('/login');
            return;
        }

        try {
            const orderItems = cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            }));

            const response = await axios.post('http://localhost:3000/orders', {
                userId: 1, 
                orderItems: orderItems
            }, {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            if (response.status === 201) {
                console.log('Sipariş başarıyla oluşturuldu:', response.data);
                setCartItems([]);
                localStorage.removeItem('cart');
                navigate('/');
            }
        } catch (error) {
            console.error('Sipariş oluşturulurken hata:', error);

        }
    };

    if (showAddressForm) {
        return (
            <Grid container spacing={2} sx={{ marginTop: 10, padding: 2 }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ad Soyad"
                        name="fullName"
                        value={address.fullName}
                        onChange={handleAddressChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Sokak/Cadde"
                        name="street"
                        value={address.street}
                        onChange={handleAddressChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Tam Adres"
                        name="fullAddress"
                        value={address.fullAddress}
                        onChange={handleAddressChange}
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Şehir"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Posta Kodu"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleAddressChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ülke"
                        name="country"
                        value={address.country}
                        onChange={handleAddressChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmitOrder}>
                        Siparişi Tamamla
                    </Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <TableContainer component={Paper} sx={{marginTop : 10}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Ürün</TableCell>
                        <TableCell>Ürün Adı</TableCell>
                        <TableCell align="right">Fiyat</TableCell>
                        <TableCell align="center">Miktar</TableCell>
                        <TableCell align="right">Toplam</TableCell>
                        <TableCell align="center">İşlemler</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartItems.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Avatar src={item.imageURL} alt={item.name} />
                            </TableCell>
                            <TableCell component="th" scope="row">{item.name}</TableCell>
                            <TableCell align="right">{item.price} ₺</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => handleDecrease(item.id)}>
                                    <Remove />
                                </IconButton>
                                {item.quantity}
                                <IconButton onClick={() => handleIncrease(item.id)}>
                                    <Add />
                                </IconButton>
                            </TableCell>
                            <TableCell align="right">{item.price * item.quantity} ₺</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => handleRemove(item.id)} color="error">
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={3} align="right">Genel Toplam</TableCell>
                        <TableCell align="right">{getTotalPrice()} ₺</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button 
                variant="contained" 
                color="primary" 
                style={{ margin: '20px' }}
                onClick={handlePurchase}
            >
                Satın Al
            </Button>
        </TableContainer>
    );
};

export default Cart;
