import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import CartPage from './Components/CartPage';
import './cssfiles/index.css';
import './cssfiles/product.css';


export default function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.username) {
      const savedCart = localStorage.getItem(`cart_${user.username}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    }
  }, []);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setCart={setCart} />} />
        <Route path="/toregister" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cart} />} />
        <Route
          path="/cart"
          element={<CartPage cartItems={cart} setCart={setCart} />}
        />
         <Route path="/tologinpage" element={<Login />} />
         <Route path="/login" element={<Login />} />
        


      </Routes>
    </Router>
  );
}