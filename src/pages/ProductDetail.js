import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Rating,
  Divider,
  Chip,
  IconButton,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { addToCart } from '../store/cartSlice';

// Sample products data (replace with your actual data source)
const productsData = {
  1: {
    id: 1,
    name: 'iPhone 14 Pro',
    price: 999.99,
    originalPrice: 1099.99,
    images: [
      'https://images.unsplash.com/photo-1678652197831-2d1801b5d793?w=500',
      'https://images.unsplash.com/photo-1678652197831-2d1801b5d793?w=500',
      'https://images.unsplash.com/photo-1678652197831-2d1801b5d793?w=500',
    ],
    description: 'The iPhone 14 Pro takes everything up a notch. It features a 48MP camera for stunning photos, the A16 Bionic chip for incredible performance, and a Dynamic Island that changes how you interact with iPhone.',
    category: 'Smartphones',
    rating: 4.8,
    reviews: 128,
    inStock: true,
    specifications: {
      display: '6.1-inch Super Retina XDR display',
      processor: 'A16 Bionic chip',
      camera: '48MP Main | Ultra Wide | Telephoto',
      battery: 'Up to 23 hours video playback',
      storage: '128GB, 256GB, 512GB, 1TB',
      colors: ['Space Black', 'Silver', 'Gold', 'Deep Purple'],
    },
    features: [
      'Dynamic Island',
      'Always-On display',
      'Emergency SOS via satellite',
      'Crash Detection',
      'Pro camera system',
    ],
  },
  2: {
    id: 2,
    name: 'MacBook Pro M2',
    price: 1299.99,
    originalPrice: 1399.99,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    ],
    description: 'The MacBook Pro with M2 chip delivers exceptional performance and battery life. Featuring a stunning Liquid Retina XDR display, advanced camera system, and all-day battery life.',
    category: 'Laptops',
    rating: 4.9,
    reviews: 256,
    inStock: true,
    specifications: {
      display: '14.2-inch Liquid Retina XDR display',
      processor: 'M2 Pro chip',
      memory: '16GB unified memory',
      storage: '512GB SSD',
      battery: 'Up to 18 hours',
      ports: 'MagSafe 3, Thunderbolt 4, HDMI 2.1',
    },
    features: [
      'M2 Pro chip',
      'Liquid Retina XDR display',
      'Up to 18 hours battery life',
      '1080p FaceTime HD camera',
      'Studio-quality microphones',
    ],
  },
  3: {
    id: 3,
    name: 'Sony WH-1000XM5',
    price: 399.99,
    originalPrice: 449.99,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
    ],
    description: 'Experience the next level of noise cancellation with the Sony WH-1000XM5 headphones. Featuring 8 microphones for crystal-clear calls and 30-hour battery life.',
    category: 'Audio',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    specifications: {
      'Noise Cancellation': 'Industry-leading noise cancellation',
      'Battery Life': 'Up to 30 hours',
      'Bluetooth': 'Bluetooth 5.2',
      'Weight': '250g',
      'Features': 'Touch controls, Voice assistant, Multipoint connection',
    },
    features: [
      'Industry-leading noise cancellation',
      '30-hour battery life',
      '8 microphones for clear calls',
      'Touch controls',
      'Voice assistant support',
    ],
  },
  4: {
    id: 4,
    name: 'Samsung Galaxy Watch 6',
    price: 299.99,
    originalPrice: 349.99,
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
    ],
    description: 'The Samsung Galaxy Watch 6 combines style with advanced health monitoring features. Track your fitness goals, monitor your sleep, and stay connected with this premium smartwatch.',
    category: 'Wearables',
    rating: 4.6,
    reviews: 156,
    inStock: true,
    specifications: {
      display: '1.4-inch Super AMOLED',
      battery: 'Up to 40 hours',
      'Water Resistance': '5ATM + IP68',
      sensors: 'Heart rate, Blood oxygen, ECG, Sleep tracking',
      compatibility: 'Android 8.0 or higher, iOS 10.0 or higher',
    },
    features: [
      'Advanced health monitoring',
      'Sleep tracking',
      'Fitness tracking',
      'Water resistant',
      'Long battery life',
    ],
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const productData = productsData[id];
      if (productData) {
        setProduct(productData);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
      }));
      setSnackbar({
        open: true,
        message: `${product.name} added to cart!`,
        severity: 'success',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Product not found
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  // Get related products (excluding current product)
  const relatedProducts = Object.values(productsData)
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/products')}
        >
          Products
        </Typography>
        <Typography variant="body2" color="text.secondary">
          / {product.name}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: theme.palette.grey[50],
              borderRadius: 2,
            }}
          >
            <Box
              component="img"
              src={product.images[selectedImage]}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 1,
                mb: 2,
              }}
            />
            <Grid container spacing={1}>
              {product.images.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Box
                    component="img"
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: selectedImage === index ? `2px solid ${theme.palette.primary.main}` : 'none',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                    onClick={() => setSelectedImage(index)}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews} reviews)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" color="primary" sx={{ mr: 2 }}>
                ${product.price}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ${product.originalPrice}
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Chip
                label={product.category}
                sx={{ mr: 1 }}
              />
              <Chip
                label={product.inStock ? 'In Stock' : 'Out of Stock'}
                color={product.inStock ? 'success' : 'error'}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                disabled={!product.inStock}
                onClick={handleAddToCart}
                sx={{ flex: 1 }}
              >
                Add to Cart
              </Button>
              <IconButton
                onClick={() => setIsFavorite(!isFavorite)}
                sx={{
                  border: `1px solid ${theme.palette.grey[300]}`,
                  '&:hover': {
                    backgroundColor: theme.palette.grey[100],
                  },
                }}
              >
                {isFavorite ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>

            {/* Features */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Key Features
              </Typography>
              <Grid container spacing={2}>
                {product.features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.primary.main,
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Services */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <LocalShippingIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body2">Free Shipping</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <SecurityIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body2">Secure Payment</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <SupportAgentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body2">24/7 Support</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Specifications */}
      <Box sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Specifications
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {Object.entries(product.specifications).map(([key, value]) => (
              <React.Fragment key={key}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" color="text.secondary">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Related Products */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Related Products
        </Typography>
        <Grid container spacing={3}>
          {relatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images[0]}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.rating})
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Snackbar for Add to Cart notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail; 