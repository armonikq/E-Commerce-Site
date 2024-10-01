import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Input,
  Box,
  FormControl,
  AspectRatio,
  CircularProgress,
  Container,
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axiosInstance from '../../utils/axios';

export default function Stoklar() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (q = "") => {
    try {
      const response = await axiosInstance.get('/products', {
        params: q ? { q } : {}  
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Ürünleri getirirken bir hata oluştu:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() !== "") {  
      fetchProducts(value);
    } else {
      fetchProducts();  
    }
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography level="h4" sx={{ mb: 4, textAlign: "center" }}>
        Tüm Ürünler
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <FormControl
          sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "300px" } }}
        >
          <Input
            startDecorator={<SearchIcon />}
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </FormControl>
      </Box>

      <Grid container spacing={6}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={4} lg={4} gap={30}>
            <Card
              variant="outlined"
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <AspectRatio ratio="4/3" objectFit="cover">
                <img src={product.imageURL} alt={product.name} loading="lazy" />
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
                  <Typography level="body-sm">Kategori: {product.category?.name || 'Belirtilmemiş'}</Typography>
                  <Typography level="body-sm">Stok: {product.quantity}</Typography>
                  <Typography level="body-sm">
                    Fiyat: {product.price} TL
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{
                      width: "100%",
                    }}
                    size="sm"
                    variant="solid"
                    color="primary"
                    onClick={() => addToCart(product)}
                    startDecorator={<ShoppingCartIcon />}
                  >
                    Sepete Ekle
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
