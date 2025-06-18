import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const categories = [
  'All',
  'Smartphones',
  'Laptops',
  'Tablets',
  'Accessories',
  'Audio',
  'Gaming'
];

const ProductFilters = ({ filters, onFilterChange }) => {
  const search = filters?.search ?? '';
  const category = filters?.category ?? 'all';
  const priceRange = filters?.price ?? [0, 2000];

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    onFilterChange({
      ...filters,
      category: selected
    });
  };

  const handlePriceChange = (event, newValue) => {
    onFilterChange({
      ...filters,
      price: newValue
    });
  };

  const handleSearchChange = (event) => {
    onFilterChange({
      ...filters,
      search: event.target.value
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 🔍 Search */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Search
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 🧩 Category */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Category
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat.toLowerCase()}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 💰 Price Range */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
          step={50}
          marks={[
            { value: 0, label: '₹0' },
            { value: 1000, label: '₹1000' },
            { value: 2000, label: '₹2000' }
          ]}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            ₹{priceRange[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{priceRange[1]}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductFilters;
