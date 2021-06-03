import React, { useState } from 'react';
import history from '../../../../utils/history';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Space,
  Card,
  Form,
  Input,
  Button,
  Table,
  Modal,
  Pagination,
  Popconfirm
} from 'antd';

import {
  getUserInfoAction,
  getUserListAction,
  deleteUserListAction,
  editUserListAction,
} from '../../../../redux/actions'

import { EditOutlined, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons'


import './styles.css';

function Item(props) {
  const { userListItem, onDeleteUserList, handleEditUserList } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [editForm] = Form.useForm();

  // Get Info from Local
  const UserInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

  // Khai Bao Cua Modal

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <>
      <tbody>
        <tr>
          <td className="user-id">
            {userListItem.id}
          </td>

          <td className="user-name">
            {isEdit
              ? <Modal title="Quản Lý Thành Viên" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                  // {...layout}
                  form={editForm}
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={(values) => {
                    handleEditUserList(values, userListItem.id);
                    setIsEdit(false);
                  }}
                >
                  <Form.Item
                    label="Username"
                    name="userName"
                  // rules={[
                  //     {
                  //         required: true,
                  //         message: 'Please input your username!',
                  //     },
                  // ]}
                  >
                    <Input />
                  </Form.Item>
                </Form>

                <Form
                  // {...layout}
                  form={editForm}
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={(values) => {
                    handleEditUserList(values, userListItem.id);
                    setIsEdit(false);
                  }}
                >
                  <Form.Item
                    label="User Email"
                    name="userEmail"
                  // rules={[
                  //     {
                  //         required: true,
                  //         message: 'Please input your user Email!',
                  //     },
                  // ]}
                  >
                    <Input />
                  </Form.Item>
                </Form>

                {/* form phone number */}
                <Form
                  // {...layout}
                  form={editForm}
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={(values) => {
                    handleEditUserList(values, userListItem.id);
                    setIsEdit(false);
                  }}
                >
                  <Form.Item
                    label="User Phone"
                    name="userPhoneNumber"
                  // rules={[
                  //     {
                  //         required: true,
                  //         message: 'Please input your Phone Number!',
                  //     },
                  // ]}
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </Modal>
              : userListItem.userName
            }
          </td>

          <td className="user-email">
            {userListItem.userEmail}
          </td>

          <td className="user-name">
            {userListItem.userPhoneNumber}
          </td>

          {/* Button - Area */}
          <td>
            {isEdit
              ? (
                <>
                  <Button type="primary">
                    <span onClick={() => {
                      editForm.submit();
                    }}>Đồng Ý</span>
                  </Button>

                  <Button type="primary">
                    <span onClick={() => setIsEdit(false)}>Hủy Bỏ</span>
                  </Button>
                </>
              )
              : (
                <>

                  <Button type="primary"
                    onClick={() => {
                      { showModal() };
                      setIsEdit(true)
                    }}
                  >
                    <EditOutlined />
                  </Button>

                </>
              )

            }
          </td>

          <td className="user-remove">
            <Popconfirm
              title={`Bạn có chắc muốn xóa ${userListItem.userName}`}
              onConfirm={() => onDeleteUserList(userListItem.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger style={{display:"flex" ,justifyContent:"center" , alignItems:"center"}} ><DeleteOutlined /></Button>
            </Popconfirm>
          </td>
        </tr>
      </tbody>

    </>
  )
}


export default Item;