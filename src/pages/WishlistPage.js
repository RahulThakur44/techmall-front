// src/pages/WishlistPage.jsx
import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { Container, Typography, Grid, Button, Card, CardContent, CardMedia } from '@mui/material';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>My Wishlist</Typography>
      {wishlist.length === 0 ? (
        <Typography>No items in wishlist.</Typography>
      ) : (
        <Grid container spacing={2}>
          {wishlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography>₹{item.price}</Typography>
                  <Button variant="outlined" onClick={() => removeFromWishlist(item.id)} sx={{ mt: 1 }}>
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WishlistPage;
