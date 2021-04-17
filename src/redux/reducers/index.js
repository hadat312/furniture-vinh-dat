import { combineReducers } from 'redux';
import productReducer from './product.reducer';
import userReducer from './user.reducer';

export default combineReducers({
  productReducer: productReducer,
  userReducer: userReducer,
})

//data trả về ở reducer