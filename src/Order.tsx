import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { fetchCarts } from './redux/actions';
import { Link } from 'react-router-dom';

const Order: React.FC = () => {
  const dispatch = useDispatch();
  const { carts, loading, error } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <Link to="/">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Go to Product List</button>
      </Link>
      {carts.map((cart) => (
        <div key={cart.id} className="bg-white shadow-md rounded p-6 mb-4">
          <h2 className="text-xl font-bold mb-2">Cart ID: {cart.id}</h2>
          <p>User ID: {cart.userId}</p>
          <p>Total: ${cart.total}</p>
          <p>Discount: ${cart.discountTotal}</p>
          <ul className="mt-4">
            {cart.products.map((product) => (
              <li key={product.id} className="mb-2">
                {product.title} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Order;
