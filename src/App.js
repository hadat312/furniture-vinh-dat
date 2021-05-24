import React, { useEffect } from 'react';
import Router from './Router';
import { connect } from 'react-redux';
import {
  getUserInfoAction,
  getCartListAction,
} from './redux/actions';

import './App.css';

function App({ getUserInfo, getCartList }) {
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.id) {
      getUserInfo({ id: userInfo.id });
      // getCartList({ userId: userInfo.id });
    }
  }, []);
  return (
    <div>
      <Router />
    </div>
  );
}

// const mapStateToProps = (state)=>{
//   const { userList} = state.userReducer;
//   return {
//     userList: userList
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    // getCartList: (params) => dispatch(getCartListAction(params)),
  };
}

export default connect(null, mapDispatchToProps)(App);
