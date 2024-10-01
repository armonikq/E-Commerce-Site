import React, { useState } from "react";
import axios from "../../utils/axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageURL: "",
    quantity: "",
    categoryId: 1,
  });
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/products", {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        imageURL: product.imageURL,
        quantity: Number(product.quantity),
        categoryId: product.categoryId,
      });
      console.log("Ürün başarıyla eklendi:", response.data);
      setProduct({
        name: "",
        description: "",
        price: 0,
        imageURL: "",
        quantity: 0,
        categoryId: 1,
      });
      alert("Ürün başarıyla eklendi!");
    } catch (error) {
      console.error("Ürün eklenirken hata oluştu:", error);
      alert("Ürün eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Yeni Ürün Ekle
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Ürün Adı"
            name="name"
            value={product.name}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Açıklama"
            name="description"
            multiline
            rows={4}
            value={product.description}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Fiyat"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="imageURL"
            label="Resim URL"
            name="imageURL"
            type="url"
            value={product.imageURL}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="quantity"
            label="Miktar"
            name="quantity"
            type="number"
            value={product.quantity}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ürün Ekle
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddProduct;
