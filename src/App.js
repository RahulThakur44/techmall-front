import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import DealSection from './pages/DealSection';
import AboutSection from './pages/AboutSection';
import HelpSection from './pages/HelpSection';
import WishlistPage from './pages/WishlistPage';
import ProductForm from './components/ProductForm';

// Context
import { WishlistProvider } from './contexts/WishlistContext';

// 🔐 Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <WishlistProvider>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />

          <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
            <Routes>
              {/* 🔹 Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/add" element={<ProductForm />} />
              <Route path="/edit/:id" element={<ProductForm />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/deals" element={<DealSection />} />
              <Route path="/about" element={<AboutSection />} />
              <Route path="/help" element={<HelpSection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />

              {/* 🔐 Protected Routes */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                 path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />

              {/* ❌ 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </Router>
    </WishlistProvider>
  );
}

export default App;
