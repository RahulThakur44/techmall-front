import React from 'react';
import {
  Card, CardMedia, CardContent, Typography, Button, Box, IconButton
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom'; // ✅ Link imported here

const ProductCard = ({
  product,
  onAddToCart,
  onAddToWishlist = () => {},
  viewMode = 'grid',
}) => {
  const imageURL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/${product.image}`;

  return (
    <Card
      sx={{
        width: 250,
        height: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        m: 1,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* ❤️ Wishlist Button Top-Right */}
      <IconButton
        onClick={() => onAddToWishlist(product)}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          backgroundColor: '#ffffffaa',
        }}
      >
        <FavoriteBorderIcon sx={{ color: '#f44336' }} />
      </IconButton>

      {/* 🖼️ Product Image with Link */}
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          image={imageURL}
          alt={product.name}
          sx={{
            height: '250px',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </Link>

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          {/* 🔗 Product Name Link */}
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" noWrap>{product.name}</Typography>
          </Link>

          <Typography variant="body2" color="text.secondary">₹{product.price}</Typography>

          {/* ⭐ Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                sx={{ color: index < Math.floor(product.rating || 4) ? '#FFD700' : '#e0e0e0', fontSize: 20 }}
              />
            ))}
            <Typography variant="body2" color="text.secondary">
              ({product.rating || 4})
            </Typography>
          </Box>

          {/* 📜 Description */}
          {product.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.description}
            </Typography>
          )}
        </Box>

        {/* 🛒 Add to Cart */}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" size="small" onClick={onAddToCart} fullWidth>
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
