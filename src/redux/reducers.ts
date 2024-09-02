// src/redux/reducers.ts

import {produce} from 'immer';
import { ProductActionTypes, CartActionTypes } from './actions';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_CARTS_REQUEST,
  FETCH_CARTS_SUCCESS,
  FETCH_CARTS_FAILURE
} from './actionTypes';
import { getCartFromLocalStorage, saveCartToLocalStorage } from './localStorage';

// Interfaces
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface CartItem {
  productId: number;
  quantity: number;
}

interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountTotal: number;
  userId: number;
}

// State Interfaces
interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

interface CartState {
  items: CartItem[];
  carts: Cart[];
  loading: boolean;
  error: string | null;
}

// Initial States
const initialProductsState: ProductsState = {
  products: [],
  loading: false,
  error: null
};

const initialCartState: CartState = {
  items: getCartFromLocalStorage(),
  carts: [],
  loading: false,
  error: null
};

// Reducers
const productsReducer = (state = initialProductsState, action: ProductActionTypes): ProductsState => 
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case FETCH_PRODUCTS_SUCCESS:
        draft.loading = false;
        draft.products = action.payload;
        break;
      case FETCH_PRODUCTS_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

const cartReducer = (state = initialCartState, action: CartActionTypes): CartState => 
  produce(state, draft => {
    switch (action.type) {
      case ADD_TO_CART:
        const itemIndex = draft.items.findIndex(item => item.productId === action.payload.productId);
        if (itemIndex >= 0) {
          draft.items[itemIndex].quantity += action.payload.quantity;
        } else {
          draft.items.push(action.payload);
        }
        saveCartToLocalStorage(draft.items);
        break;
      case REMOVE_FROM_CART:
        draft.items = draft.items.filter(item => item.productId !== action.payload);
        saveCartToLocalStorage(draft.items);
        break;
      case FETCH_CARTS_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case FETCH_CARTS_SUCCESS:
        draft.loading = false;
        draft.carts = action.payload;
        break;
      case FETCH_CARTS_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

export { productsReducer, cartReducer };
