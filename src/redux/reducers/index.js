import { combineReducers } from 'redux';
import productReducer from './product.reducer';
import categoriesReducer from './categories.reducer';
import userReducer from './user.reducer';

export default combineReducers({
  productReducer: productReducer,
  userReducer: userReducer,
  categoriesReducer: categoriesReducer
})

//data trả về ở reducer