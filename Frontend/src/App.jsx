/* eslint-disable no-unused-vars */
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
import {useFetch} from '../src/customHooks/useFetch'
import SignupForm from './pages/SignupForm.jsx';
import SignInForm from './pages/SigninForm.jsx';

// Create Cart Context
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

function App() {
  // fetching data from custom hook

    const {
      data: loggedInUserData,
      error: loggedInUserError,
      loading: loggedInUserLoading
  } = useFetch("http://localhost:7000/users/loggedIn-user");
  // fetching the information of looged in user from backend whenever the app.jsx renders.

  console.log('*****logged in ',loggedInUserData);
  

  const {
    data: categories,
    error,
    loading,
  } = useFetch("http://localhost:7000/categories"); // custom hook.

  // Load cart directly from localStorage as initial state
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


 
  

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <BrowserRouter>
        <Topbar loggedInUserInfo={ loggedInUserData } />
        <Nav categories={categories} />
        <Routes>
          <Route path="/" element={<Home categories={categories} />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:slug" element={<Details />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </CartContext.Provider>
  );
}

export default App;
