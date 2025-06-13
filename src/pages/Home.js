import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Paper,
  useTheme,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/hero-pattern.png")',
    opacity: 0.1,
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const CategoryCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  height: 200,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    '& .category-overlay': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
}));

const CategoryOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  transition: 'background-color 0.3s ease-in-out',
}));

const ServiceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
}));

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const products = useSelector(state => state?.products?.items || []);
  const loading = useSelector(state => state?.products?.loading || false);

  // Sample latest products data
  const latestProducts = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      price: 999.99,
      image: 'https://i5.walmartimages.com/asr/cb8f75e5-1b8e-4c06-9776-0d995a314ada.88ab53492f6fe7e653033585616419b1.jpeg',
      description: 'Latest Apple iPhone with A16 Bionic chip',
      category: 'Smartphones',
      rating: 4.8,
      reviews: 128,
      inStock: true
    },
    {
      id: 2,
      name: 'MacBook Pro M2',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      description: 'Powerful laptop with M2 chip and Retina display',
      category: 'Laptops',
      rating: 4.9,
      reviews: 256,
      inStock: true
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
      description: 'Premium noise-cancelling headphones',
      category: 'Audio',
      rating: 4.7,
      reviews: 89,
      inStock: true
    },
    {
      id: 4,
      name: 'Samsung Galaxy Watch 6',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
      description: 'Advanced smartwatch with health monitoring',
      category: 'Wearables',
      rating: 4.6,
      reviews: 156,
      inStock: true
    }
  ];

  const featuredCategories = [
    {
      title: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      link: '/products?category=smartphones',
    },
    {
      title: 'Laptops',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
      link: '/products?category=laptops',
    },
    {
      title: 'Accessories',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
      link: '/products?category=accessories',
    },
  ];

  const services = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Secure Payment',
      description: '100% secure payment',
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: '24/7 Support',
      description: 'Dedicated support',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom>
                Discover the Latest Tech
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Shop the best electronics with amazing deals and discounts
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/products')}
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Shop Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600"
                alt="Hero"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Featured Categories */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Featured Categories
        </Typography>
        <Grid container spacing={3}>
          {featuredCategories.map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <CategoryCard onClick={() => navigate(category.link)}>
                <Box
                  component="img"
                  src={category.image}
                  alt={category.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <CategoryOverlay className="category-overlay">
                  <Typography variant="h5" gutterBottom>
                    {category.title}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Explore
                  </Button>
                </CategoryOverlay>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Services Section */}
      <Box sx={{ backgroundColor: theme.palette.grey[100], py: 6, mb: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ServiceBox>
                  {service.icon}
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </ServiceBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Latest Products */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Latest Products
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {latestProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <FeatureCard>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: 1,
                        fontSize: '0.75rem',
                      }}
                    >
                      {product.category}
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ 
                      height: '3em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                        {product.rating} ★
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ({product.reviews} reviews)
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      mb: 2,
                      height: '2.5em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {product.description}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mt: 'auto'
                    }}>
                      <Typography variant="h6" color="primary">
                        ${product.price}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => navigate(`/products/${product.id}`)}
                        disabled={!product.inStock}
                        sx={{
                          backgroundColor: product.inStock ? theme.palette.primary.main : theme.palette.grey[400],
                          '&:hover': {
                            backgroundColor: product.inStock ? theme.palette.primary.dark : theme.palette.grey[400],
                          },
                        }}
                      >
                        {product.inStock ? 'View' : 'Out of Stock'}
                      </Button>
                    </Box>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Promotional Banner */}
      <Box sx={{ backgroundColor: theme.palette.primary.main, py: 6, mb: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" color="white" gutterBottom>
                Special Offer
              </Typography>
              <Typography variant="h6" color="white" sx={{ mb: 3, opacity: 0.9 }}>
                Get 20% off on your first purchase
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/products')}
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Shop Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600"
                alt="Promotion"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 