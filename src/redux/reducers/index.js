import { combineReducers } from 'redux';
import productReducer from './product.reducer';
import categoriesReducer from './categories.reducer';
import wishlistReducer from './wishlist.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import billReducer from './bill.reducer';
import orderReducer from './order.reducer';
import addressReducer from './address.reducer';
import commonReducer from './common.reducer';

export default combineReducers({
  productReducer: productReducer,
  userReducer: userReducer,
  categoriesReducer: categoriesReducer,
  wishlistReducer: wishlistReducer,
  cartReducer: cartReducer,
  billReducer: billReducer,
  orderReducer: orderReducer,
  addressReducer: addressReducer,
  commonReducer: commonReducer,
})

//data trả về ở reducer