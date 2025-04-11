import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { productsReducer, cartReducer } from './reducers';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});


const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
