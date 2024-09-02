// src/pages/Home.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/actions';
import { RootState } from './redux/store'; 
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <Link to="/order">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Go to Orders</button>
      </Link>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        
        <div className="grid grid-cols- sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  // Placeholder image URL
                  alt={product.title}
                  className="h-48 w-full object-cover mb-4 rounded"
                />
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="mt-2 font-bold text-blue-500">${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
