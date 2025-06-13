import React from 'react';
import { Box, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const HelpSection = () => {
  const faqs = [
    {
      question: 'How can I track my order?',
      answer: 'After placing an order, you will receive an email with a tracking link. You can also track your order from your account dashboard.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy for all eligible products. Please make sure the product is unused and in its original packaging.',
    },
    {
      question: 'How do I cancel my order?',
      answer: 'You can cancel your order from the “My Orders” section within 12 hours of placing it, or contact our support team for help.',
    },
    {
      question: 'Do you offer customer support?',
      answer: 'Yes! Our support team is available 24/7 through chat, email, and phone to assist you with your queries.',
    },
  ];

  return (
    <Box sx={{ p: { xs: 3, md: 6 }, backgroundColor: '#E3F2FD', borderRadius: 3 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          <HelpOutlineIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Help & Support
        </Typography>

        <Grid container spacing={3}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight="bold">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default HelpSection;
