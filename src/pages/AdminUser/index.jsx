import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Item from './components/Item'
import history from '../../utils/history'

import { Input, Space, Col, Modal, Button, Pagination, Row } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

import logo1 from '../../images/logo1.jpg'

import {
    deleteUserListAction,
    getUserListAction,
    getUserInfoAction,
    editUserListAction
} from '../../redux/actions'

import './styles.css'

function AdminUserPage(props) {
    const { userInfo,
        getUserInfo,
        userList,
        getUserList,
        deleteUserList,
        editUserList
    } = props;


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

    return (
        <>
            <div className="admin-user_area">
                <div className="admin-user-header ">
                    <h1>Manager</h1>
                    <Input.Search
                        onChange={(e) => setSearchKey(e.target.value)}
                        placeholder="Search..." style={{ width: 400 }}
                    />
                </div>

                <div className="main-admin-user_container">
                    <div className="main-left">
                        <div className="sidebar-admin-user-menu">
                            <div className="sidebar-admin-user-link">
                                <i className="fa fa-home text-lightblue"></i>
                                <span onClick={() => history.push('/admin')}>Dashboard</span>
                            </div>

                            <div className="sidebar-admin-user-link  active-admin-user-link">
                                <i className="fa fa-user-secret text-lightblue"></i>
                                <span >Quản Lý Tài Khoản</span>
                            </div>

                            <div className="sidebar-admin-user-link ">
                                <i className="fa fa-handshake text-lightblue "></i>
                                <span onClick={() => history.push('/admin/product')}>Quản Lý Sản Phẩm</span>
                            </div>
                        </div>
                    </div>

                    <div className="main-right">
                        <table className="admin-user_table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User Name</th>
                                    <th>User Email</th>
                                    <th>User Phone Number</th>
                                    <th>Action</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {renderUserList()}
                        </table>
                        <Row justify="end">
                            <Space>
                                <Pagination defaultCurrent={1} total={50} />
                            </Space>
                        </Row>
                    </div>
                </div>
            </div>
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserPage);