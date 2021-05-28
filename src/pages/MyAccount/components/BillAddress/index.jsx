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

  function renderUserInformation() {
    if (userInfo.load) return <p>Loading...</p>;
    else {
      return (
        <>
        <div>

        
          <Row className="custom-row">
            <Col>Họ và Tên: <span className="text-bold">{userInfo.data.userName}</span></Col>
          </Row>
          <Row className="custom-row">
            <Col>Email: <span className="text-bold">{userInfo.data.userEmail}</span></Col>
          </Row>
          <Row className="custom-row">
            <Col>
              {
                userInfo.data.gender
                  ? <Col>Giới tính: <span className="text-bold">{userInfo.data.gender === 'Male' ? 'Nam' : userInfo.data.gender === 'Female' ? 'Nữ' : 'Khác'}</span></Col>

                  : <Col>Giới tính: <span className="text-bold">Chưa cập nhật</span></Col>
              }
            </Col>
          </Row>
          <Row className="custom-row">
            <Col>
              {
                userInfo.data.birthday
                  ? <Col>Ngày sinh: <span className="text-bold"> {userInfo.data.birthday}</span></Col>
                  : <Col>Ngày sinh: <span className="text-bold">Chưa cập nhật</span></Col>
              }
            </Col>
          </Row>
          <Row className="custom-row">
            <Col>
              {
                userInfo.data.userPhoneNumber
                  ? <Col>Số điện thoại: <span className="text-bold">{userInfo.data.userPhoneNumber}</span></Col>
                  : <Col>Số điện thoại: <span className="text-bold">Chưa cập nhật</span></Col>
              }
            </Col>
          </Row>
          </div>
        </>
      );
    }
  }
  return (
    renderUserInformation()
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