import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get all products
const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

// Get product by ID
const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch product');
  }
};

// Get products by category
const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch products by category');
  }
};

// Search products
const searchProducts = async (query) => {
  try {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error(error.response?.data?.message || 'Failed to search products');
  }
};

const productService = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts
};

export default productService; 