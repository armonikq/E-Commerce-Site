import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("Ürünler getiriliyor...");
      const response = await axios.get("/products");
      console.log("Gelen veri:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(
        "Ürünleri getirme hatası:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      try {
        await axios.delete(`/products/${id}`);
        setProducts(products.filter((product) => product.id !== id));
        alert("Ürün başarıyla silindi.");
      } catch (error) {
        console.error("Ürün silinirken hata oluştu:", error);
        alert("Ürün silinirken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 20, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Ürünler
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ürün Adı</TableCell>
                <TableCell align="right">Fiyat</TableCell>
                <TableCell>Açıklama</TableCell>
                <TableCell>Resim URL</TableCell>
                <TableCell align="center">İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.imageUrl}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(product.id)}
                    >
                      Sil
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Products;
