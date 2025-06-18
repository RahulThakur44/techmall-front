// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Grid, Box, Paper, Tabs, Tab,
  Button, Chip, CircularProgress, Alert, Snackbar,
  FormControl, InputLabel, Select, MenuItem, IconButton, Pagination
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import ImageSlider from '../components/ImageSlider'; // Add this import at the top


const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [filters, setFilters] = useState({
    categories: {smartphones: false,
    laptops: false,
    tablets: false,
    accessories: false,
    audio: false,
    gaming: false,},
    price: [0, 100000],
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleTabChange = (e, newValue) => setActiveTab(newValue);
  const toggleFilters = () => setShowFilters(!showFilters);
  const handleViewModeChange = (mode) => setViewMode(mode);
  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleFilterChange = (updatedFilters) => setFilters(updatedFilters);
  const handleCloseNotification = () => setNotification({ ...notification, open: false });

  const handleAddToCart = (product) => {
    const fullImagePath = product.image.startsWith('http')
      ? product.image
      : `http://localhost:5000/uploads/${product.image}`;

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: fullImagePath,
      })
    );

    setNotification({
      open: true,
      message: `${product.name} added to cart`,
      severity: 'success',
    });
  };

  const handleAddToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const alreadyExists = wishlist.some((item) => item.id === product.id);

    if (!alreadyExists) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setNotification({ open: true, message: `${product.name} added to wishlist`, severity: 'success' });
    } else {
      setNotification({ open: true, message: `${product.name} already in wishlist`, severity: 'info' });
    }
  };

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Apply filtering and sorting
  useEffect(() => {
    let filtered = [...items];

    // Tab filtering (category tabs)
    if (activeTab !== 'all') {
      filtered = filtered.filter((p) => p.category?.toLowerCase() === activeTab);
    }

    // Category filter (from sidebar)
    const selectedCategories = Object.entries(filters.categories)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= filters.price[0] && p.price <= filters.price[1]
    );

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to page 1 on filters/sorting change
  }, [items, activeTab, filters, sortBy]);

  // Paginate
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
       <ImageSlider />  {/* 🔥 Your new slider */}
      <Typography variant="h4" gutterBottom>Products</Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Discover our collection of premium products
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        <Tab label="All" value="all" />
        <Tab label="Smartphones" value="smartphones" />
        <Tab label="Laptops" value="laptops" />
        <Tab label="Tablets" value="tablets" />
        <Tab label="Accessories" value="accessories" />
        <Tab label="Audio" value="audio" />
        <Tab label="Gaming" value="gaming" />
      </Tabs>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<FilterListIcon />} onClick={toggleFilters} sx={{ display: { xs: 'flex', md: 'none' } }}>
            Filters
          </Button>
          <Chip label={`${filteredProducts.length} Products`} color="primary" variant="outlined" />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={handleSortChange}>
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
              <MenuItem value="name-asc">Name: A to Z</MenuItem>
              <MenuItem value="name-desc">Name: Z to A</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <IconButton onClick={() => handleViewModeChange('grid')} color={viewMode === 'grid' ? 'primary' : 'default'}>
              <ViewModuleIcon />
            </IconButton>
            <IconButton onClick={() => handleViewModeChange('list')} color={viewMode === 'list' ? 'primary' : 'default'}>
              <ViewListIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Sidebar Filters */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: { xs: showFilters ? 'block' : 'none', md: 'block' },
              position: { xs: 'fixed', md: 'static' },
              top: 0, left: 0, right: 0, bottom: 0,
              bgcolor: 'background.paper',
              zIndex: 1200,
              p: 2, overflowY: 'auto'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Filters</Typography>
              <IconButton onClick={toggleFilters} sx={{ display: { xs: 'block', md: 'none' } }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
          </Box>
        </Grid>

        {/* Products List */}
        <Grid item xs={12} md={9}>
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress /></Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : filteredProducts.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography>No products found</Typography>
            </Paper>
          ) : (
            <>
              <Grid container spacing={3}>
                {currentProducts.map((product) => (
                  <Grid
                    key={product.id}
                    item
                    xs={12}
                    sm={viewMode === 'list' ? 12 : 6}
                    md={viewMode === 'list' ? 12 : 4}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                      onAddToWishlist={() => handleAddToWishlist(product)}
                      viewMode={viewMode}
                    />
                  </Grid>
                ))}
              </Grid>
              {totalPages > 1 && (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>

      {/* Notification Snackbar */}
      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Products;
