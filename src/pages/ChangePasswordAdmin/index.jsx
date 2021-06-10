import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history'

import { ROUTERS } from '../../constants/router';


import {
  Row,
  Table,
  Button,
  Space,
  Drawer,
  Form,
  Input,
  Select,
  InputNumber,
  Card,
  Modal,
  Tag,
  notification

} from 'antd';

import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { useForm } from 'antd/lib/form/Form';

import { getUserInfoAction, changePasswordAdminAction } from '../../redux/actions'

import './styles.css';

function AdminChangePassword(props) {
  const { changePassword, getUserInfo, userInfo } = props
  console.log("🚀 ~ file: index.jsx ~ line 39 ~ AdminChangePassword ~ userInfo", userInfo)

  const userLocaleStorage = JSON.parse(localStorage.getItem("userInfo"));

  const [editForm] = Form.useForm();

  useEffect(() => {
    getUserInfo({ id: userLocaleStorage.id })
  }, [])


  function showNotification() {
    return notification.success({
      message: 'Chỉnh sửa hồ sơ thành công!',
    });
  }

  function showNotificationError() {
    return notification.error({
      message: 'Mật khẩu bạn nhập không trùng mật khẩu cũ'
    });
  }

  function showNotificationError2() {
    return notification.error({
      message: 'Xác nhận mật khẩu không trùng khớp'
    });
  }

  function handleChangePasswordAdmin() {
    const values = editForm.getFieldsValue();

    if (values.userPassword !== userInfo.data.userPassword) {
      showNotificationError();
    } else if (values.newPassWord !== values.confirmPassword) {
      showNotificationError2();
    } else {
      changePassword({
        userId: userInfo.data.id,
        ...values
      })
      showNotification()
    }

  }

  return (
    <>
      <div className="admin-changepassword_container">
        <h3 className="admin-changepassword_title">Thay Đổi Mật Khẩu</h3>
        <Form
          form={editForm}
          name="basic"
          initialValues={{}}
        >


          <Form.Item
            name="userPassword"
            label="Mật khẩu cũ"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="Nhập Mật Khẩu" />
          </Form.Item>

          <Form.Item
            name="newPassWord"
            label="Mật Khẩu mới"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="Nhập Mật Khẩu Mới" />
          </Form.Item>



          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Cần nhập đúng mật khẩu!',
              },
              ({ getFieldValue }) => ({
                // validator(_, value) {
                //   if (!value || getFieldValue('userPassword') === value) {
                //     return Promise.resolve();
                //   }
                //   return Promise.reject(new Error('The two passwords that you entered do not match!'));
                // },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận lại mật khẩu" />
          </Form.Item>

          <Row justify="end">
            <Space>
              <Button type="primary" onClick={handleChangePasswordAdmin}>
                Xác Nhận
              </Button>
            </Space>
          </Row>

        </Form>

      </div>

    </>

  )
}


const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  return {
    userInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (params) => dispatch(changePasswordAdminAction(params)),

    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(AdminChangePassword);