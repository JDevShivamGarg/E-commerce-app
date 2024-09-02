import axios from 'axios';
import { Dispatch } from 'redux';
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

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountTotal: number;
  userId: number;
}

interface CartItem {
  productId: number;
  quantity: number;
}

interface FetchProductsRequestAction {
  type: typeof FETCH_PRODUCTS_REQUEST;
}

interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: Product[];
}

interface FetchProductsFailureAction {
  type: typeof FETCH_PRODUCTS_FAILURE;
  payload: string;
}

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: CartItem;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: number;
}

interface FetchCartsRequestAction {
  type: typeof FETCH_CARTS_REQUEST;
}

interface FetchCartsSuccessAction {
  type: typeof FETCH_CARTS_SUCCESS;
  payload: Cart[];
}

interface FetchCartsFailureAction {
  type: typeof FETCH_CARTS_FAILURE;
  payload: string;
}

export type ProductActionTypes =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction;

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | FetchCartsRequestAction
  | FetchCartsSuccessAction
  | FetchCartsFailureAction;

export const fetchProducts = () => async (dispatch: Dispatch<ProductActionTypes>) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const response = await axios.get('https://dummyjson.com/products');
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data.products });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: (error as Error).message });
  }
};

export const addToCart = (item: CartItem): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (productId: number): RemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const fetchCarts = () => async (dispatch: Dispatch<CartActionTypes>) => {
  dispatch({ type: FETCH_CARTS_REQUEST });
  try {
    const response = await axios.get('https://dummyjson.com/carts');
    dispatch({ type: FETCH_CARTS_SUCCESS, payload: response.data.carts });
  } catch (error) {
    dispatch({ type: FETCH_CARTS_FAILURE, payload: (error as Error).message });
  }
};
