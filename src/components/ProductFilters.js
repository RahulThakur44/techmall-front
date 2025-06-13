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
  const handleCategoryChange = (event) => {
    onFilterChange({
      ...filters,
      category: event.target.value === 'All' ? '' : event.target.value.toLowerCase()
    });
  };

  const handlePriceChange = (event, newValue) => {
    onFilterChange({
      ...filters,
      priceRange: newValue
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
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Search
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Search products..."
          value={filters.search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Category
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1) : 'All'}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
          step={50}
          marks={[
            { value: 0, label: '$0' },
            { value: 1000, label: '$1000' },
            { value: 2000, label: '$2000' }
          ]}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            ${filters.priceRange[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${filters.priceRange[1]}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductFilters; 