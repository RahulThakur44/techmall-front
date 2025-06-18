// src/components/CartItem.jsx
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item, onRemove }) => {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <Box component="img"
        src={item.image}
        alt={item.name}
        sx={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 2 }}
      />
      <Box flex={1}>
        <Typography variant="subtitle1">{item.name}</Typography>
        <Typography variant="body2">₹{item.price}</Typography>
      </Box>
      <IconButton onClick={() => onRemove(item.id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartItem;
