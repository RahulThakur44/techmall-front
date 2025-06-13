import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';

function OrderSuccess() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <CheckCircleIcon
          color="success"
          sx={{ fontSize: 80, mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          Order Placed Successfully!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Thank you for your purchase. Your order has been received and is being processed.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          You will receive an email confirmation shortly with your order details.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Continue Shopping
          </Button>
          <Button
            component={RouterLink}
            to="/profile"
            variant="outlined"
            color="primary"
          >
            View Orders
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default OrderSuccess; 