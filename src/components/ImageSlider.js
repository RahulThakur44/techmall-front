// src/components/ImageSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';

const ImageSlider = () => {
  const images = [
  "https://cdn.pixabay.com/photo/2016/02/17/15/37/laptop-1205256_1280.jpg",
  "https://cdn.pixabay.com/photo/2024/02/24/19/00/phone-8594571_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/19/21/01/analysis-1841158_1280.jpg", // Laptop & workspace
  "https://cdn.pixabay.com/photo/2017/04/09/12/00/gaming-2215601_1280.jpg", // Smartwatch and tech
  "https://cdn.pixabay.com/photo/2017/08/06/02/49/headphones-2588056_1280.jpg" // Headphones & electronics
];


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Slider {...settings}>
        {images.map((url, index) => (
          <Box key={index} component="img" src={url} alt={`slide-${index}`} sx={{ width: '100%', height: 'auto', borderRadius: 2 }} />
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
