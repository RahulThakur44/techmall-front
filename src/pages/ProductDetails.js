// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Grid, Button, CircularProgress, Alert, Box, Snackbar
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const image = product.image.startsWith('http')
      ? product.image
      : `http://localhost:5000/uploads/${product.image}`;

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image,
    }));

    setNotification({
      open: true,
      message: `${product.name} added to cart`,
      severity: 'success',
    });
  };

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const alreadyAdded = wishlist.find((item) => item.id === product.id);

    if (!alreadyAdded) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setNotification({
        open: true,
        message: `${product.name} added to wishlist`,
        severity: 'success',
      });
    } else {
      setNotification({
        open: true,
        message: `${product.name} already in wishlist`,
        severity: 'info',
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading) return <Container><CircularProgress /></Container>;
  if (error) return <Container><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={
              product.image.startsWith('http')
                ? product.image
                : `http://localhost:5000/uploads/${product.image}`
            }
            alt={product.name}
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="h6" color="primary" gutterBottom>₹{product.price}</Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>{product.description}</Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="outlined" onClick={handleAddToWishlist}>Add to Wishlist</Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetails;
