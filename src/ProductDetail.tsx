// src/pages/ProductDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { addToCart } from './redux/actions';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(productId))
  );

  if (!product) {
    return <p className="text-center text-red-500 mt-8">Product not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            // Placeholder image URL
            alt={product.title}
            className="w-full h-64 rounded shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-blue-500 mb-4">${product.price}</p>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
            onClick={() => dispatch(addToCart({ productId: product.id, quantity: 1 }))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
