// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Product from './pages/product/Product';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';


function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="products" element={<Product />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
