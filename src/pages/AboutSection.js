import React from 'react';
import { Box, Typography, Grid, Button, CardMedia } from '@mui/material';

const AboutSection = () => {
  return (
    <Box sx={{ p: { xs: 3, md: 6 }, backgroundColor: '#F9F9F9' }}>
      <Grid container spacing={4} alignItems="center">
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image="https://img.freepik.com/free-vector/flat-shopping-center-infographic_23-2148179384.jpg"
            alt="About Us"
            sx={{ borderRadius: 3, boxShadow: 3 }}
          />
        </Grid>

        {/* Content Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            About Our Store
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We are committed to bringing you the best in electronics, gadgets, fashion, and more.
            With thousands of satisfied customers, we aim to deliver top-notch products with amazing discounts and reliable delivery.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Our mission is to make online shopping easy, trustworthy, and enjoyable. Every product is quality-checked and comes with secure payment options.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutSection;
