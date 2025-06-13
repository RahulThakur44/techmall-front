import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
  Paper,
  Tabs,
  Tab,
  Chip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  Rating,
  CardActions,
  TextField
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { fetchProducts } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import axios from 'axios';

// Slider images
const sliderImages = [
  {
    url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Latest Smartphones',
    description: 'Discover our newest collection of smartphones'
  },
  {
    url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Premium Laptops',
    description: 'Powerful laptops for work and gaming'
  },
  {
    url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Smart Watches',
    description: 'Stay connected with our smart watches'
  }
];

// Featured categories
const featuredCategories = [
  {
    title: 'Premium Smartphones',
    description: 'Latest smartphones with cutting-edge technology',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    size: 'large',
    features: ['5G Connectivity', 'High-Resolution Cameras', 'Long Battery Life'],
    productCount: 24,
    link: '/products?category=smartphones'
  },
  {
    title: 'Gaming Laptops',
    description: 'High-performance laptops for gaming enthusiasts',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    size: 'large',
    features: ['High Refresh Rate', 'RGB Lighting', 'Powerful GPUs'],
    productCount: 18,
    link: '/products?category=laptops'
  },
  {
    title: 'Smart Watches',
    description: 'Stay connected and track your fitness',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
    size: 'small',
    features: ['Health Monitoring', 'Notifications', 'Long Battery'],
    productCount: 12,
    link: '/products?category=watches'
  }
];

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Safely access the products state with default values
  const productsState = useSelector((state) => state.products) || {};
  const products = productsState.items || [];
  const loading = productsState.loading || false;
  const error = productsState.error || null;

  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 2000],
    search: '',
  });
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await dispatch(fetchProducts()).unwrap();
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    loadProducts();
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
    setNotification({
      open: true,
      message: `${product.name} added to cart!`,
      severity: 'success'
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFilters(prev => ({
      ...prev,
      category: newValue === 'all' ? '' : newValue.toLowerCase()
    }));
  };

   const[Productss,setProducts]=useState([]);
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products"); // 👈 API URL
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  fetchProducts();
}, []);

  const handleCategoryClick = (category) => {
    setFilters(prev => ({
      ...prev,
      category: category.toLowerCase()
    }));
    navigate(`/products?category=${category.toLowerCase()}`);
    setNotification({
      open: true,
      message: `Filtering products by ${category}`,
      severity: 'info'
    });
  };

  const handleExploreClick = (e, category) => {
    e.stopPropagation();
    handleCategoryClick(category);
  };

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = !filters.category || product.category.toLowerCase() === filters.category;
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesSearch = !filters.search || 
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => dispatch(fetchProducts())}>
          Try Again
        </Button>
      </Box>
    );
  }
 


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Image Slider */}
      <Box sx={{ mb: 4 }}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          sx={{
            '& .swiper-pagination-bullet': {
              backgroundColor: 'primary.main',
            },
            '& .swiper-button-next, & .swiper-button-prev': {
              color: 'primary.main',
            },
          }}
        >
          {sliderImages.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '300px', md: '500px' },
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  image={slide.url}
                  alt={slide.title}
                  sx={{
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 4,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    color: 'white',
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    {slide.title}
                  </Typography>
                  <Typography variant="body1">
                    {slide.description}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Featured Categories */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Featured Categories
        </Typography>
        <Grid container spacing={3}>
          {featuredCategories.map((category, index) => (
            <Grid item xs={12} md={category.size === 'large' ? 8 : 4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                    boxShadow: 3
                  }
                }}
                onClick={() => handleCategoryClick(category.title.split(' ')[1])}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={category.image}
                  alt={category.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {category.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {category.features.map((feature, idx) => (
                      <Chip
                        key={idx}
                        label={feature}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {category.productCount} Products
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => handleExploreClick(e, category.title.split(' ')[1])}
                    >
                      Explore
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      

      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Products
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover our collection of premium products
          </Typography>
        </Box>


<Box
  sx={{
    display: 'flex',
    overflowX: 'auto',
    gap: 2,
    padding: 2,
  }}
>
  {Productss.map((product) => (
    <Card
      key={product.id}
      onClick={() => navigate(`/products/${product.id}`)}
      sx={{
        minWidth: 250, // ensure fixed width
        maxWidth: 250,
        flexShrink: 0, // prevent card from shrinking
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
    >
      <CardMedia
        component="img"
        image={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
        sx={{
          height: 'auto',
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Typography variant="h6" noWrap>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            wordBreak: 'break-word',
            whiteSpace: 'normal',
          }}
        >
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          ₹{product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  ))}
</Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          <Tab label="All" value="all" />
          <Tab label="Smartphones" value="smartphones" />
          <Tab label="Laptops" value="laptops" />
          <Tab label="Tablets" value="tablets" />
          <Tab label="Accessories" value="accessories" />
          <Tab label="Audio" value="audio" />
          <Tab label="Gaming" value="gaming" />
        </Tabs>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={toggleFilters}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              Filters
            </Button>
            <Chip 
              label={`${filteredProducts.length} Products`}
              color="primary"
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="name-asc">Name: A to Z</MenuItem>
                <MenuItem value="name-desc">Name: Z to A</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <IconButton 
                onClick={() => handleViewModeChange('grid')}
                color={viewMode === 'grid' ? 'primary' : 'default'}
              >
                <ViewModuleIcon />
              </IconButton>
              <IconButton 
                onClick={() => handleViewModeChange('list')}
                color={viewMode === 'list' ? 'primary' : 'default'}
              >
                <ViewListIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: { xs: showFilters ? 'block' : 'none', md: 'block' },
              position: { xs: 'fixed', md: 'static' },
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'background.paper',
              zIndex: 1000,
              p: 2,
              overflow: 'auto'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Filters</Typography>
              <IconButton onClick={toggleFilters} sx={{ display: { xs: 'block', md: 'none' } }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          {filteredProducts.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No products found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters or search criteria
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid 
                  item 
                  key={product.id} 
                  xs={12} 
                  sm={viewMode === 'list' ? 12 : 6} 
                  md={viewMode === 'list' ? 12 : 4}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onClick={() => navigate(`/products/${product.id}`)}
                    viewMode={viewMode}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Products; 