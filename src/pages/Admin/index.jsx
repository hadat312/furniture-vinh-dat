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
                <h1 className="dashboard-title">Manager</h1>

                <div className="navbar">
                    {/* <div className="nav-icon">
                        <i className="fa fa-bars"></i>
                    </div> */}
                    <div className="navbar-left">
                        <a href="#">Subscribers</a>
                        <a href="#">Video Management</a>
                        <a className="active-link" href="#">Admin</a>
                    </div>


                    <div className="main-title">
                        <img src=" " alt="" />
                        <div className="main-greeting">
                            {/* <h3>
                                {userInfo.data.id
                                    ? (
                                        <p>{`Hola: ${userInfo.data.userName}`}</p>
                                    )
                                    : ""
                                }
                            </h3> */}

                            {userInfo.data.id
                                ? (
                                    <h5>{`Welcome ${userInfo.data.userName} to your admin dashboard`}</h5>
                                )
                                : ""
                            }

                        </div>
                    </div>

                    {/* <div className="navbar-right">
                        <a href="#">
                            <i className="fa fa-search"></i>
                        </a>

                        <a href="#">
                            <i className="fa fa-clock-o"></i>
                        </a>

                        <a href="#">
                            <img width="30" src="" alt="" />
                        </a>
                    </div> */}


                </div>

                <div className="sidebar-container">
                    <div className="sidebar-title">
                        <div className="sidebar-img">
                            <img src={logo1} alt="logo" />
                            <i class="fa fa-bars text-green" aria-hidden="true" onClick={() => setIsShowToggle(!isShowToggle)}></i>
                        </div>
                        {/* 
                        <i className="fa fa-times">

                        </i> */}
                    </div>

                    <div className="sidebar-menu">
                        <div className="sidebar-link active-menu-link">
                            <i className="fa fa-home text-lightblue"></i>
                            <span >Dashboard</span>
                        </div>

                        <div className="sidebar-link">
                            <i className="fa fa-user-secret text-lightblue"></i>
                            <span onClick={() => history.push(ROUTERS.ADMIN_USER)} >Quản Lý Tài Khoản</span>
                        </div>

                        <div className="sidebar-link">
                            <i className="fa fa-handshake text-lightblue"></i>
                            <span onClick={() => history.push(ROUTERS.ADMIN_PRODUCT)}>Quản Lý Sản Phẩm</span>
                        </div>
                    </div>
                </div>

                <div className="main-container">

                    <div className="main-cards">

                        <div className="card">
                            <i class="fa fa-user fa-2x text-lightblue" aria-hidden="true"></i>
                            <div className="card-inner">
                                <p className="text-primary-p">Number of Subscribers</p>
                                <span className="font-bold text-title">578</span>
                            </div>
                        </div>

                        <div className="card">
                            <i className="fa fa-calendar fa-2x text-red"></i>
                            <div className="card-inner">
                                <p className="text-primary-p">Times of Watching</p>
                                <span className="font-bold text-title">2537</span>
                            </div>
                        </div>

                        <div className="card">
                            <i class="fa fa-camera fa-2x text-salmon" aria-hidden="true"></i>
                            <div className="card-inner">
                                <p className="text-primary-p">Number of Videos</p>
                                <span className="font-bold text-title">241</span>
                            </div>
                        </div>

                        <div className="card">
                            <i className="fa fa-thumbs-up fa-2x text-green"></i>
                            <div className="card-inner">
                                <p className="text-primary-p">Number of Likes</p>
                                <span className="font-bold text-title">883</span>
                            </div>
                        </div>

                    </div>

                    <div className="charts">
                        <div className="charts-left">
                            <div className="charts-left-title">
                                <h1>Daily Reports</h1>
                                <p>Da Nang, Viet Nam</p>
                                <i className="fa fa-usd"></i>
                            </div>
                            {/* <Chart/> */}
                        </div>

                        <div className="charts-right">
                            <div className="charts-right-title">
                                <h1>Stats Reports</h1>
                                <p>Da Nang</p>
                                <i className="fa fa-use"></i>
                            </div>

                            <div className="charts-right-cards">
                                <div className="card1">
                                    <h1>Income</h1>
                                    <p>$75,300</p>
                                </div>

                                <div className="card2">
                                    <h1>Sales</h1>
                                    <p>$124,200</p>
                                </div>

                                <div className="card3">
                                    <h1>Users</h1>
                                    <p>{userList.data.length}</p>
                                </div>

                                <div className="card4">
                                    <h1>Orders</h1>
                                    <p>2257</p>
                                </div>

                            </div>

                        </div>
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