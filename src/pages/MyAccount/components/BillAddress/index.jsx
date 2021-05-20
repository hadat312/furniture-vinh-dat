import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getUserInfoAction,
  editUserInfoAction
} from '../../../../redux/actions';
function BillAddress({ userInfo, getUserInfo }) {
  const UserInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    getUserInfo({ id: UserInfoLocalStorage.id });
  }, [])
  return (
    <>
      <Row className="custom-row">
        <Col>Họ và Tên: <span className="text-bold">{userInfo.data.userName}</span></Col>
      </Row>
      <Row className="custom-row">
        <Col>
          {
            userInfo.data.address
              ? <span>Địa chỉ: {userInfo.data.address}</span>
              : <span>Chưa cập nhật địa chỉ</span>
          }
        </Col>
      </Row>
      <Row className="custom-row">
        <Col>
          {
            userInfo.data.userPhoneNumber
              ? <span>Số điện thoại: {userInfo.data.userPhoneNumber}</span>
              : <span>Chưa cập nhật số điện thoại</span>
          }
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  // console.log("🚀 ~ file: index.jsx ~ line 220 ~ mapStateToProps ~ userInfo", userInfo.data)
  return {
    userInfo: userInfo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    editUser: (params) => dispatch(editUserInfoAction(params)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BillAddress);