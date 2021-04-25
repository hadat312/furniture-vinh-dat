import { combineReducers } from 'redux';
import productReducer from './product.reducer';
import categoriesReducer from './categories.reducer';
import wishlistReducer from './wishlist.reducer';
import userReducer from './user.reducer';

export default combineReducers({
  productReducer: productReducer,
  userReducer: userReducer,
  categoriesReducer: categoriesReducer,
  wishlistReducer: wishlistReducer,
})

//data trả về ở reducer