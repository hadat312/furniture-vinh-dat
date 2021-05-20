import React, { useEffect, useState } from 'react';
import { Tabs, Radio, Card, Typography, Row, Col, Input, Form, Modal, notification } from 'antd';
import { AiOutlineEdit } from "react-icons/ai";
import history from '../../utils/history';
import { REGEX } from '../../constants/validate';
import { ROUTERS } from '../../constants/router';
import { connect } from 'react-redux';
import {
  getUserInfoAction,
  editUserInfoAction
} from '../../redux/actions';
import OrderTable from './components/OrderTable';
import BillAddress from './components/BillAddress';
import './myAccount.css';
const { TabPane } = Tabs;
function ProfilePage({
  userInfo,
  getUserInfo,
  editUser,
}) {
  const UserInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    getUserInfo({ id: UserInfoLocalStorage.id });
  }, [])

  // useEffect(() => {
  //   if (UserInfoLocalStorage === null) {
  //     history.push(`/`);
  //   }
  // }, [UserInfoLocalStorage])

  const { Title } = Typography;
  const [isEdit, setIsEdit] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [editForm] = Form.useForm();

  const [checkName, setCheckName] = useState("");
  const [checkPhone, setCheckPhone] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const onOk = () => {

    editForm.submit();
    setIsModalVisible(false);

  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  // function renderBillAddressView() {
  //   return (
  //     <>
  //       <Row className="custom-row">
  //         <Col>Họ và Tên: <span className="text-bold">{userInfo.data.userName}</span></Col>
  //       </Row>
  //       <Row className="custom-row">
  //         <Col>
  //           {
  //             userInfo.data.address
  //               ? <span>Địa chỉ: {userInfo.data.address}</span>
  //               : <span>Vui lòng cập nhật địa chỉ tại [<span style={{ fontWeight: "bold" }}>Chi Tiết Tài Khoản</span>]</span>
  //           }
  //         </Col>
  //       </Row>
  //       <Row className="custom-row">
  //         <Col>
  //           {
  //             userInfo.data.userPhoneNumber
  //               ? <span>Địa chỉ: {userInfo.data.userPhoneNumber}</span>
  //               : <span>Vui lòng cập nhật địa chỉ tại [<span style={{ fontWeight: "bold" }}>Chi Tiết Tài Khoản</span>]</span>
  //           }
  //         </Col>
  //       </Row>
  //     </>
  //   );
  // }

  function showNotification() {
    const key = `open${Date.now()}`;
    return notification.success({
      message: 'Cập nhật thành công!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function onSubmit(values) {
    console.log(editForm.getFieldValue());
    let isValid = true;

    const newRegisterError = {
      fullName: "",
      phoneNumber: "",
      email: "",
      confirmEmail: "",
      pwd: "",
      confirmPwd: "",
      acceptTerms: false,
    }
    let abc = '';
    //Validate Full Name
    if (values.length === 0) {
      isValid = false;
      abc = "Enter full name!";
    } else {
      if (values.length <= 5) {
        isValid = false;
        abc = "Sorry, Your full name must be greater than 5 characters";
      }
      else {
        isValid = true;
        abc = "";
      }

      //Validate Phone Number
      // let phoneNumberRegEx = /((09|03|07|08|05)+([0-9]{8})\b)/g; //RegEx VN phone number

      if (!REGEX.PHONE_NUMBER_REGEX.test(values.value)) {
        newRegisterError.phoneNumber = "Sorry, Your phone number not valid!";
        isValid = false;
      } else {
        newRegisterError.phoneNumber = "";
      }

      if (isValid) {
        // editUser({ id: userInfo.data.id, ...values });
        console.log("abc");
        setIsEdit(false);
      } else {
        console.log(abc);
      }
    }
  }

  function billAddressEdit() {
    return (
      <Modal title="Basic Modal" visible={isModalVisible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form
          form={editForm}
          layout="vertical"
          name="basic"
          initialValues={{
            userName: userInfo.data.userName,
            userPhoneNumber: userInfo.data.userPhoneNumber,
            address: userInfo.data.address || '',
          }}
          onFinish={(values) => onSubmit(values)}
        >
          <Form.Item
            label={<span className="text-bold">Tên</span>}
            name="userName"
            rules={[
              { required: true, message: 'Không được để trống!' },
              { min: 4, message: 'Phải lớn hơn 4 ký tự' },
              { max: 8, message: 'Phải nhỏ hơn 8 ký tự' },
            ]}
            hasFeedback
          >
            <Input onChange={(e) => onSubmit(e.target.value)} />
          </Form.Item>

          <Form.Item
            label={<span className="text-bold">Địa chỉ</span>}
            name="address"
            rules={[{ required: true, message: 'Không được để trống!' }]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="text-bold">Số điện thoại</span>}
            name="userPhoneNumber"
            rules={[
              // { required: true, message: 'Không được để trống!' },
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('Không được để trống!'));
                  } else {
                    if (REGEX.PHONE_NUMBER_REGEX.test(value)) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('Số điện thoại không đúng định dạng!'));
                  }
                },
              },

            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal >
    )
  }

  return (
    <Row className="profile-container">
      <Col span={4}></Col>
      <Col span={16}>
        <Tabs
          defaultActiveKey="1"
          // type="card"
          size={"Large"}
          style={{ marginBottom: 16 }}>
          <TabPane
            tab={<span className="tab-title text-bold">Dashboard</span>}
            key="1">
            <div className="site-card-border-less-wrapper">
              <Row>
                <Col span={24}>
                  <Card title={
                    <Title level={5}>Dashboard</Title>
                  } bordered={true}>
                    <p>Xin chào, <span style={{ fontWeight: "bold" }}>{userInfo.data.userName}</span> (Nếu không phải <span style={{ fontWeight: "bold" }}>{userInfo.data.userName}</span> ! Vui lòng <a style={{ fontWeight: "bold" }} onClick={() => history.push(ROUTERS.CUSTOMER_LOGIN)}>Logout!</a>)</p>
                    <p>Từ bảng điều khiển. Bạn có thể dễ dàng kiểm tra & xem đơn hàng hiện tại của bạn, quản lý shipping, địa chỉ hóa đơn và chỉnh sửa chi tiết tài khoản cũng như mật khẩu của bạn.</p>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tab={<span className="tab-title text-bold">Đơn Hàng</span>} key="2">
            <Row>
              <Col span={24}>
                <Card title={
                  <Title level={5}>Đơn hàng</Title>
                } bordered={true}>
                  <OrderTable />
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab={<span className="tab-title text-bold">Địa Chỉ Thanh Toán</span>} key="3">
            <Row>
              <Col span={24}>
                <Card title={
                  <Title level={5}>Địa chỉ thanh toán</Title>
                } bordered={true}>
                  <BillAddress />
                  <Row className="custom-row">
                    <Col>
                      <a
                        className="bill-address__edit-btn"
                        onClick={showModal}>
                        <AiOutlineEdit /> Sửa địa chỉ
                      </a>
                      {billAddressEdit()}
                    </Col>
                  </Row>

                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab={<span className="tab-title text-bold">Chi Tiết Tài Khoản</span>} key="4">
            <Row>
              <Col span={24}>
                <Card title={
                  <Title level={5}>Chi tiết tài khoản</Title>
                } bordered={true}>

                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Col>
      <Col span={4}></Col>
    </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
