import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, AspectRatio, CircularProgress, Container } from '@mui/joy';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';

export default function ProductCards() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        const allProducts = response.data;
     
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error("Ürünleri getirirken bir hata oluştu:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const HandAllProducts = () => {
    navigate('/product');
  };

  const addToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        quantity: 1,
        imageURL: product.imageURL,
      });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    console.log("Ürün sepete eklendi:", product);
    console.log("Güncellenmiş sepet:", currentCart);

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Ürün sepete eklendi");
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="danger">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4  , mt: 10}}>
      <Grid container spacing={6}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
                },
              }}
            >
              <AspectRatio
                ratio="4/3"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <img
                  src={product.imageURL || "https://via.placeholder.com/200"}
                  alt={product.name}
                  loading="lazy"
                />
              </AspectRatio>
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography level="title-md">{product.name}</Typography>
                  <Typography level="body-sm">
                    Kategori: {product.category?.name || "Belirtilmemiş"}
                  </Typography>
                  <Typography level="body-sm">
                    Stok: {product.quantity}
                  </Typography>
                  <Typography level="body-sm">
                    Fiyat: {parseFloat(product.price).toFixed(2)} TL
                  </Typography>
                </Box>
                <Button
                  size="sm"
                  variant="solid"
                  color="primary"
                  onClick={() => addToCart(product)}
                  startDecorator={<ShoppingCartIcon />}
                  sx={{ mt: 2 }}
                >
                  Sepete Ekle
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        size="large"
        variant="outlined"
        color="primary"
        onClick={HandAllProducts}
        sx={{
          display: "block",
          margin: "10rem auto 0", 
          padding: "0.5rem 2rem",
        }}
      >
        Tüm Ürünler
      </Button>
    </Container>
  );
}




