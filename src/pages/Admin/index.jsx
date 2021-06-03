import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Item from './components/Item';
import history from '../../utils/history'
import logo1 from '../../images/logo1.jpg'

import './styles.css';

import {
    getUserInfoAction,
    getUserListAction,
    deleteUserListAction
} from '../../redux/actions'
import { ROUTERS } from '../../constants/router';

function AdminPage(props) {
    // const { Header, Content, Footer, Sider } = Layout;

    // const [isCollapsed, setIsCollapsed] = useState(true)

    // const [isCollapsed, setIsCollapsed] = useState(true)

    // const toggle = () => {
    //     setIsCollapsed(!isCollapsed)
    // }
    const { userInfo, getUserInfo, userList, getUserList, deleteUserList } = props;

    useEffect(() => {
        const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || {};
        if (userInfoLocalStorage && userInfoLocalStorage.id) {
            getUserInfo({ id: userInfoLocalStorage.id });
        }
    }, []);

    useEffect(() => {
        getUserList({
            page: 1,
            limit: 20,
        })
    }, []);


    const [isShowToggle, setIsShowToggle] = useState(true);


    function renderUserList() {
        if (userList.load) return <p>Loading...</p>
        return userList.data.map((userListItem, userListIndex) => {
            return (
                <Item
                    key={userListItem.id}
                    userListItem={userListItem}
                />
            )
        })
    }

    return (
        <>
            <div className="dashboard-container">
                <div className="sidebar-container">
                    <div className="sidebar-img">
                        <img src={logo1} alt="logo" />
                    </div>

                    <div className="sidebar-title">
                        <h3>DashBoard</h3>
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);