import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  Grid
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductCard = ({ product, onAddToCart, onClick, viewMode = 'grid', variant = 'default' }) => {
  const isListView = viewMode === 'list';
  const isCompact = variant === 'compact';

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: isListView ? 'row' : 'column',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.2s ease-in-out',
          boxShadow: 3
        }
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{ 
          objectFit: 'contain',
          p: isCompact ? 1 : 2,
          width: isListView ? '200px' : '100%',
          height: isCompact ? '150px' : isListView ? '200px' : '200px'
        }}
      />
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        p: isCompact ? 1.5 : isListView ? 3 : 2
      }}>
        <Grid container spacing={isCompact ? 1 : 2}>
          <Grid item xs={12} md={isListView ? 8 : 12}>
            <Typography 
              gutterBottom 
              variant={isCompact ? "subtitle1" : "h6"} 
              component="h2" 
              noWrap
            >
              {product.name}
            </Typography>
            {!isCompact && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mb: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: isListView ? 2 : 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {product.description}
              </Typography>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: isCompact ? 0.5 : 1 }}>
              <Rating 
                value={product.rating} 
                precision={0.5} 
                readOnly 
                size={isCompact ? "small" : "medium"}
              />
              <Typography 
                variant={isCompact ? "caption" : "body2"} 
                color="text.secondary" 
                sx={{ ml: 1 }}
              >
                ({product.reviews})
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={isListView ? 4 : 12}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: isListView ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isListView ? 'flex-end' : 'center',
              gap: isCompact ? 1 : 2
            }}>
              <Box>
                <Typography 
                  variant={isCompact ? "subtitle1" : "h6"} 
                  color="primary" 
                  sx={{ mb: isCompact ? 0.5 : 1 }}
                >
                  ${product.price}
                </Typography>
                {!isCompact && (
                  <Chip 
                    label={product.inStock ? 'In Stock' : 'Out of Stock'} 
                    color={product.inStock ? 'success' : 'error'}
                    size="small"
                  />
                )}
              </Box>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
                disabled={!product.inStock}
                size={isCompact ? "small" : "medium"}
                sx={{ 
                  minWidth: isListView ? '100%' : 'auto',
                  py: isCompact ? 0.5 : 1
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 