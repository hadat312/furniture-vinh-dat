import React, { useEffect, useState } from 'react';
import {
  Typography,
  Row,
  Col,
  Input,
  Form,
  Modal,
  notification,
  Menu,
  Breadcrumb,
  Layout,
  Space,
  Button,
  Card,
  Radio,
  DatePicker
} from 'antd';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { connect } from 'react-redux';

import {
  getUserInfoAction,
  editUserInfoAction
} from '../../redux/actions';

import BillAddress from './components/BillAddress';

import './myAccount.css';

function ProfilePage({
  userInfo,
  getUserInfo,
  editUser,
}) {
  const UserInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
  const [checkName, setCheckName] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  const [editForm] = Form.useForm();

  const { Header, Content, Footer, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const { Title } = Typography;
  const [isEdit, setIsEdit] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    getUserInfo({ id: UserInfoLocalStorage.id });
  }, [])

  const showModal = () => {
    setIsModalVisible(true);
  };

  let birthdayString = '';
  const dateFormatList = 'DD/MM/YYYY';

  function onChange(date, dateString) {
    birthdayString = dateString.trim();
    // console.log("birthdayString: ", birthdayString, "date: ", date, "dateString: ", dateString);
  }

  function showNotification() {
    const key = `open${Date.now()}`;
    return notification.success({
      message: 'Chỉnh sửa hồ sơ thành công!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function billAddressEdit() {
    return (
      <Modal title={<Title level={4}>Chỉnh sửa hồ sơ</Title>} visible={isModalVisible}
        okText={<span><AiOutlineCheck/> Xác nhận</span>}
        cancelText={<span><AiOutlineClose/> Hủy bỏ</span>}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          editForm
            .validateFields()
            .then(values => {
              // editForm.resetFields();
              console.log('Success:', values);
              setIsModalVisible(false);
              const changeProfile = {
                ...values,
                birthdayString,
              }
              editUser({ id: userInfo.data.id, ...changeProfile });
              showNotification();
            })
            .catch(info => {
              console.log('Failed:', info.values);
            });
        }}
      >
        <Form
          form={editForm}
          // layout="horizontal"
          {...layout}
          name="basic"
          initialValues={{
            userName: userInfo.data.userName,
            userPhoneNumber: userInfo.data.userPhoneNumber || '',
            userEmail: userInfo.data.userEmail,
            gender: userInfo.data.gender || '',
          }}
        >
          <Form.Item
            label={<span>Tên</span>}
            name="userName"
            rules={[
              { required: true, message: 'Không được để trống!' },
              { min: 4, message: 'Phải lớn hơn 4 ký tự' },
              { max: 20, message: 'Phải nhỏ hơn 8 ký tự' },
            ]}
            hasFeedback
          >
            <Input className="text-bold" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="userEmail"
            rules={[
              { required: true, message: 'Không được để trống!' },
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.reject('Không được để trống!');
                  }
                  else if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                    return Promise.reject('Email không đúng định dạng!');
                  } else {
                    return Promise.resolve();
                  }
                }
              }

            ]}
            hasFeedback
          >
            <Input className="text-bold" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn giới tính!',
              },
            ]}
          >
            <Radio.Group>
              <Radio value="Male">{<span className="text-bold">Nam</span>}</Radio>
              <Radio value="Female">{<span className="text-bold">Nữ</span>}</Radio>
              <Radio value="Other">{<span className="text-bold">Khác</span>}</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="birthday"
            label="Ngày sinh"
          >
            <DatePicker format={dateFormatList} style={{ width: '100%' }} onChange={onChange} placeholder="Nhập ngày, tháng, năm sinh" />
          </Form.Item>


          <Form.Item
            label="Số điện thoại"
            name="userPhoneNumber"
            rules={[
              {
                required: true,
                validator(_, value) {
                  if (!value) {
                    return Promise.reject('Không được để trống!');
                  }
                  else if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(value)) {
                    return Promise.reject('Số điện thoại không đúng định dạng!');
                  } else {
                    return Promise.resolve();
                  }
                }
              }
            ]}
            hasFeedback
          >
            <Input className="text-bold" />
          </Form.Item>
        </Form>

      </Modal >
    )
  }

  return (
    <Row>
      <Col span={12}>
        <Card title={
          <Title level={4}>Hồ sơ của tôi</Title>
        } bordered={true}>
          <BillAddress />
          <Row className="custom-row">
            <Col>
              <Button
                type="primary"
                ghost
                className="bill-address__edit-btn"
                onClick={showModal}
              >
                <AiOutlineEdit />
                 Chỉnh sửa hồ sơ
              </Button>
              {billAddressEdit()}
            </Col>
          </Row>

        </Card>
      </Col>
      <Col span={12}>
        <Card title={
          <Title level={4}>Đổi ảnh đại diện</Title>
        } bordered={true}>
          
        </Card>
      </Col>
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
