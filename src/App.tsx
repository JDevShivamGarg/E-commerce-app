// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ProductDetail from './ProductDetail';
import Order from './Order';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
};

export default App;
