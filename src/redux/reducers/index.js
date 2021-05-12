import { combineReducers } from 'redux';
import productReducer from './product.reducer';
import categoriesReducer from './categories.reducer';
import wishlistReducer from './wishlist.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import billReducer from './bill.reducer'

export default combineReducers({
  productReducer: productReducer,
  userReducer: userReducer,
  categoriesReducer: categoriesReducer,
  wishlistReducer: wishlistReducer,
  cartReducer: cartReducer,
  billReducer: billReducer
})

//data trả về ở reducer