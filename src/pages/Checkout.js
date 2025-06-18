import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';

import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const steps = ['Cart Review', 'Shipping Details', 'Payment', 'Confirmation'];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [activeStep, setActiveStep] = useState(0);
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleShippingChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

 const handlePlaceOrder = async () => {
  const cartTotal = calculateTotal() * 1.1;
  const cartItems = cart.items;
  const { firstName, lastName, phone, address } = shippingDetails;
  const name = firstName + " " + lastName;

  const orderData = {
    userId: 1, // temp user
    totalAmount: cartTotal,
    shippingDetails: {
      name,
      address,
      phone,
    },
    items: cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price
    }))
  };

  try {
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Order failed:', error.message);
      return;
    }

    // ✅ Order placed successfully
    dispatch(clearCart()); // clear cart from redux
    setActiveStep((prevStep) => prevStep + 1); // go to confirmation step
  } catch (error) {
    console.error('Error placing order:', error);
  }
};


  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Cart Items</Typography>
            {cart.items.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <img
                       // src={`http://localhost:5000/uploads/${item.image}`}
                       src={item.image}
                        alt={item.name}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="body1" color="primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Typography variant="h6">
                Total: ${calculateTotal().toFixed(2)}
              </Typography>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Shipping Details</Typography>
            <Grid container spacing={2}>
              {[
                ['First Name', 'firstName'],
                ['Last Name', 'lastName'],
                ['Email', 'email'],
                ['Phone', 'phone'],
                ['Address', 'address'],
                ['City', 'city'],
                ['State', 'state'],
                ['ZIP Code', 'zipCode'],
                ['Country', 'country'],
              ].map(([label, name], i) => (
                <Grid item xs={12} sm={name === 'firstName' || name === 'lastName' || name === 'state' || name === 'zipCode' ? 6 : 12} key={name}>
                  <TextField
                    required
                    fullWidth
                    label={label}
                    name={name}
                    value={shippingDetails[name]}
                    onChange={handleShippingChange}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Payment Method</Typography>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="credit" control={<Radio />} label="Credit Card" />
                <FormControlLabel value="debit" control={<Radio />} label="Debit Card" />
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
              </RadioGroup>
            </FormControl>
            {paymentMethod !== 'paypal' && (
              <Grid container spacing={2}>
                {[
                  ['Card Number', 'cardNumber'],
                  ['Name on Card', 'cardName'],
                  ['Expiry Date', 'expiryDate'],
                  ['CVV', 'cvv'],
                ].map(([label, name], i) => (
                  <Grid item xs={name === 'expiryDate' || name === 'cvv' ? 6 : 12} key={name}>
                    <TextField
                      required
                      fullWidth
                      label={label}
                      name={name}
                      value={cardDetails[name]}
                      onChange={handleCardChange}
                      placeholder={name === 'expiryDate' ? 'MM/YY' : ''}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );

      case 3:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>Thank you for your order!</Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              Your order has been placed successfully.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>{renderStepContent(activeStep)}</Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <Divider sx={{ my: 2 }} />
            {cart.items.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Typography variant="body2">
                  {item.name} x {item.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Subtotal</Typography>
              <Typography>${calculateTotal().toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Tax</Typography>
              <Typography>${(calculateTotal() * 0.1).toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ${(calculateTotal() * 1.1).toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={activeStep === steps.length - 2 ? handlePlaceOrder : handleNext}
          disabled={activeStep === steps.length - 1}
        >
          {activeStep === steps.length - 2 ? 'Place Order' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;
