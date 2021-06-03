import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Item from './components/Item'
import history from '../../utils/history'

import { Input, Space, Col, Modal, Button, Pagination, Row, Form, Checkbox, Select } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from '@ant-design/icons';


import logo1 from '../../images/logo1.jpg'
import { ROUTERS } from '../../constants/router';

import {
    deleteUserListAction,
    getUserListAction,
    getUserInfoAction,
    editUserListAction,

    addUserTaskAction
} from '../../redux/actions'

import './styles.css'

function AdminUserPage(props) {
    const { userInfo,
        getUserInfo,
        userList,
        getUserList,
        deleteUserList,
        editUserList,
        addUser
    } = props;

    const [userRoleName, setUserRole] = useState();


    useEffect(() => {
        getUserList({
            page: 1,
            limit: 5,
        })
    }, []);

    useEffect(() => {
        const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || {};
        if (userInfoLocalStorage && userInfoLocalStorage.id) {
            getUserInfo({ id: userInfoLocalStorage.id });
        }
    }, []);

    const { Search } = Input;

    const [productForm] = Form.useForm();

    const [searchKey, setSearchKey] = useState('');

    //  Function Edit

    function handleEditUserList(values, id) {
        // window.location.reload();
        userList.data.map((userListItem) => {
            if (id === userListItem.id) {
                return editUserList({ ...values, id: userListItem.id })
            }
        })
    }

    function onDeleteUserList(id) {
        console.log("🚀 ~ file: index.jsx ~ line 61 ~ onDeleteUserList ~ id", id)
        userList.data.map((userListItem) => {
            if (id === userListItem.id) {
                return deleteUserList({ id: userListItem.id });
            }
        })
    }

    // Filter User List

    const filterUserList = userList.data.filter((item) => {
        return item.userName.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1
    });


    function renderUserList() {
        if (filterUserList.load) return <p>Loading...</p>
        return filterUserList.map((userListItem, userListIndex) => {
            return (
                <Item
                    key={userListItem.id}
                    userListItem={userListItem}
                    onDeleteUserList={onDeleteUserList}
                    handleEditUserList={handleEditUserList}
                />
            )
        })
    }

    // Modal 
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        const values = productForm.getFieldsValue();
        addUser({
            ...values,
            userRoleName
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Form Ant
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };



    // render Option Role

    const USER_ROLE = [
        {
            id: 1,
            userRole: "admin"
        },
        {
            id: 2,
            userRole: "customer"
        }
    ]

    function renderUserRoleOption() {
        return USER_ROLE.map((userRoleItem, userRoleIndex) => {
            return (
                <Select.Option key={userRoleIndex} value={userRoleItem.id}>
                    {userRoleItem.userRole}
                </Select.Option>
            )
        })
    }

    function onChange(values) {
        return USER_ROLE.map((userRoleItem, userRoleIndex) => {
            if (values === userRoleItem.id) {
                return (
                    setUserRole(userRoleItem.userRole)
                )
            }
        })
    }



    return (
        <>
            <div className="admin-user_area">
                <div className="admin-logo-brand">
                    <img src={logo1} alt="Bodhi Logo Brand" style={{ width: "auto", height: "50px" }} />
                </div>
                <div className="admin-user-header ">
                    <h3>Danh sách thành viên</h3>

                    <Input.Search
                        onChange={(e) => setSearchKey(e.target.value)}
                        placeholder="Search..." style={{ width: 300 }}
                    />


                    <Button type="primary" onClick={showModal}>
                        <PlusOutlined /> Thêm Mới Thành Viên
                    </Button>
                </div>

                <div className="main-admin-user_container">
                    <table className="admin-user_table">
                        <thead>
                            <tr>
                                <th>ID Thành Viên</th>
                                <th>Tên Thành Viên</th>
                                <th>Email Thành viên</th>
                                <th>Số Điện Thoại</th>
                                <th>Hành Động</th>
                                <th></th>
                            </tr>
                        </thead>
                        {renderUserList()}
                    </table>
                </div>
            </div>

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    {...layout}
                    form={productForm}
                    name="basic"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        label="Tên thành viên"
                        name="userName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="userRoleName" label="User Role">
                        <Select placeholder="User Role" onChange={onChange} >
                            {renderUserRoleOption()}
                        </Select>
                    </Form.Item>


                    <Form.Item
                        label="Số điện thoại"
                        name="userPhoneNumber"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="userEmail"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="userPassword"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>


        </>
    )
}


const mapStateToProps = (state) => {
    const { userInfo, userList } = state.userReducer;
    return {
        userInfo: userInfo,
        userList: userList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (params) => dispatch(getUserInfoAction(params)),

        getUserList: (params) => dispatch(getUserListAction(params)),
        deleteUserList: (params) => dispatch(deleteUserListAction(params)),

        editUserList: (params) => dispatch(editUserListAction(params)),

        addUser: (params) => dispatch(addUserTaskAction(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserPage);