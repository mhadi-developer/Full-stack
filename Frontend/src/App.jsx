import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Nav from './components/nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Details from './pages/Details';
import { createContext, useState, useEffect } from 'react';
import Contact from './pages/Contact';
import Topbar from './components/Topbar';
import Footer from './components/Footer';

// Create Cart Context
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

function App() {
  // Load cart directly from localStorage as initial state
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <BrowserRouter>
        <Topbar />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:slug" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </CartContext.Provider>
  );
}

export default App;
