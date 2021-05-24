import React from 'react';
import { connect } from 'react-redux';
import {
  getUserInfoAction,
  editUserInfoAction
} from '../../redux/actions';
import { Button, Card, Col, Form, Input, notification, Row, Typography } from 'antd';
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";

function ChangePasswordPage({
  userInfo,
  getUserInfo,
  editUser,

}) {
  const { Title } = Typography;

  function showNotification() {
    const key = `open${Date.now()}`;
    return notification.success({
      message: 'Đổi mật khẩu thành công!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  return (
    <Card title={
      <Title level={4}>Thay đổi mật khẩu</Title>
    } bordered={true}>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          userPassword: '',
          newUserPassword: '',
        }}
        style={{ width: '50%' }}
        onFinish={(value) => {
          editUser({ id: userInfo.data.id, userPassword: value.newUserPassword});
          showNotification();
        }}
      >
        <Form.Item
          label={<span className="text-bold">Mật khẩu hiện tại</span>}
          name="userPassword"
          rules={[
            {
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('Không được để trống!'));
                }
                else if (userInfo.data.userPassword === value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error('Mật khẩu không đúng!'));
                }
              }
            }
          ]}
          hasFeedback
        >
          <Input.Password className="text-bold" placeholder="Nhập mật khẩu cũ" />
        </Form.Item>

        <Form.Item
          label={<span className="text-bold">Mật khẩu mới</span>}
          name="newUserPassword"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('Không được để trống!'));
                }
                else if (getFieldValue('userPassword') === value) {
                  return Promise.reject(new Error('Mật khẩu mới không được trùng mật khẩu cũ!'));
                } else if (value.length < 8) {
                  return Promise.reject(new Error('Phải ít nhất 8 ký tự!'));
                } else {
                  return Promise.resolve();
                }
              }
            }),
          ]}
          hasFeedback
        >
          <Input.Password className="text-bold" placeholder="Nhập mật khẩu mới" />
        </Form.Item>

        <Form.Item
          label={<span className="text-bold">Nhập lại mật khẩu</span>}
          name="confirmNewUserPassword"
          rules={[
            { required: true, message: 'Không được để trống!', },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newUserPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password className="text-bold" placeholder="Nhập lại mật khẩu mới" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            ghost
            className="bill-address__edit-btn"
            htmlType='submit'
          >
            <AiOutlineEdit />
             Xác nhận
          </Button>
        </Form.Item>
      </Form>

    </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);
