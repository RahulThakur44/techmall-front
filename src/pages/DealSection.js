import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Chip,
  Grid,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ added

// Deal Card Component
const DealCard = ({ deal }) => {
  const navigate = useNavigate(); // ✅ added
  const [timer, setTimer] = useState('03:59:59');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        const [h, m, s] = prev.split(':').map(Number);
        let totalSec = h * 3600 + m * 60 + s - 1;
        if (totalSec <= 0) {
          clearInterval(interval);
          return '00:00:00';
        }
        const newH = String(Math.floor(totalSec / 3600)).padStart(2, '0');
        const newM = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
        const newS = String(totalSec % 60).padStart(2, '0');
        return `${newH}:${newM}:${newS}`;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShopNow = () => {
    navigate('/checkout', { state: { product: deal } }); // ✅ redirect on click
  };

  return (
    <Card
      sx={{
        backgroundColor: '#FFF3E0',
        p: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: 2,
        borderRadius: 3,
        boxShadow: 3,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.01)',
        },
      }}
    >
      {/* Image Box for Perfect Fit */}
      <Box
        sx={{
          width: 200,
          height: 200,
          overflow: 'hidden',
          borderRadius: 2,
          flexShrink: 0,
        }}
      >
        <CardMedia
          component="img"
          image={deal.image}
          alt={deal.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </Box>

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" color="orange" fontWeight="bold" gutterBottom>
          🔥 Deal of the Day
        </Typography>
        <Typography variant="h6">{deal.title}</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Rating value={deal.rating} precision={0.5} readOnly />
          <Typography variant="body2" color="text.secondary">
            ({deal.reviews} reviews)
          </Typography>
        </Box>

        <Box sx={{ mt: 1, ml: 2 }}>
          {deal.features.map((feat, idx) => (
            <Typography key={idx} variant="body2" color="text.secondary">
              • {feat}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Typography variant="h6" color="error" fontWeight="bold">
            ₹{deal.price}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: 'line-through', color: 'gray' }}
          >
            ₹{deal.originalPrice}
          </Typography>
          <Typography
            variant="caption"
            sx={{ backgroundColor: '#FFEBEE', px: 1, borderRadius: 1 }}
          >
            {deal.discount}% OFF
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Chip label="Limited Stock" color="warning" size="small" />
          <Chip icon={<LocalShippingIcon />} label="Free Delivery" size="small" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, color: 'gray' }}>
          <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">Ends in: {timer}</Typography>
        </Box>

        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2, textTransform: 'none', px: 4 }}
          onClick={handleShopNow} // ✅ added
        >
          Shop Now
        </Button>
      </CardContent>
    </Card>
  );
};

// Deal Section Component
const DealSection = () => {
  const deals = [
    {
      title: 'Wireless Bluetooth Headphones',
      image: 'https://m.media-amazon.com/images/I/71ZBnJc4JLL.jpg',
      rating: 4.5,
      reviews: 1248,
      features: ['Noise Cancellation', '40hrs Battery', 'Type-C Charging'],
      price: 999,
      originalPrice: 1999,
      discount: 50,
    },
    {
      title: 'Smart LED TV 43 inch',
      image: 'https://cdn1.smartprix.com/rx-iKi22LtO0-w1200-h1200/Ki22LtO0.jpg',
      rating: 4.3,
      reviews: 780,
      features: ['4K Ultra HD', 'HDR10', 'Dolby Audio'],
      price: 17999,
      originalPrice: 29999,
      discount: 40,
    },
    {
      title: 'Gaming Laptop - Ryzen 5',
      image:
        'https://rukminim1.flixcart.com/image/832/832/kulk9zk0/computer/f/t/w/15-ec2075ax-gaming-laptop-hp-original-imag7nyzhxqc7xhh.jpeg?q=70',
      rating: 4.6,
      reviews: 310,
      features: ['RTX 3050', '512GB SSD', '16GB RAM'],
      price: 54999,
      originalPrice: 69999,
      discount: 21,
    },
    {
      title: 'Smartphone - 5G Mobile',
      image: 'https://m.media-amazon.com/images/I/61amb0CfMGL._SL1500_.jpg',
      rating: 4.4,
      reviews: 980,
      features: ['6.5" AMOLED', 'Snapdragon 695', '33W Fast Charging'],
      price: 13999,
      originalPrice: 19999,
      discount: 30,
    },
    {
      title: 'Video Game Console',
      image:
        'https://cdn.thewirecutter.com/wp-content/media/2020/10/playstation5-2048px-1011018.jpg?auto=webp&quality=75&width=768&dpr=2',
      rating: 4.8,
      reviews: 220,
      features: ['Portable Gaming', 'Wireless Controller', 'HD Output'],
      price: 2999,
      originalPrice: 4999,
      discount: 40,
    },
    {
      title: 'Android Tablet 10.1"',
      image:
        'https://mytabletguide.com/wp-content/uploads/2021/03/asus-chromebook-detachable-cm3-with-stylus.jpg',
      rating: 4.2,
      reviews: 456,
      features: ['10.1" Display', '64GB Storage', 'Dual Camera'],
      price: 7999,
      originalPrice: 12999,
      discount: 38,
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        🔥 Today's Top Deals
      </Typography>
      <Grid container spacing={3}>
        {deals.map((deal, index) => (
          <Grid item xs={12} md={6} key={index}>
            <DealCard deal={deal} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DealSection;
