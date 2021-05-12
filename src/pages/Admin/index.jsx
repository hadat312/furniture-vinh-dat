import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import logo1 from '../../images/logo1.jpg'

import {getUserInfoAction} from '../../redux/actions'


function AdminPage(props) {
    // const { Header, Content, Footer, Sider } = Layout;

    // const [isCollapsed, setIsCollapsed] = useState(true)

    // const [isCollapsed, setIsCollapsed] = useState(true)

    // const toggle = () => {
    //     setIsCollapsed(!isCollapsed)
    // }
    const { userInfo,getUserInfo } = props;

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.id) {
          getUserInfo({ id: userInfo.id });
        }
      }, []);

    const [isShowToggle, setIsShowToggle] = useState(true);
    return (
        <>
            <div className="dashboard-container">
                <h1 className="dashboard-title">React Dashboard</h1>

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
                            <a href="#">Dashboard</a>
                        </div>
                        <h2>MNG</h2>
                        <div className="sidebar-link">
                            <i className="fa fa-user-secret text-lightblue"></i>
                            <a href="#">Admin Management</a>
                        </div>
                        <div className="sidebar-link">
                            <i className="fa fa-building text-lightblue"></i>
                            <a href="#">Comapny Management</a>
                        </div>
                        <div className="sidebar-link">
                            <i className="fa fa-wrench text-lightblue"></i>
                            <a href="#">Employee Management</a>
                        </div>
                        <div className="sidebar-link">
                            <i className="fa fa-archive text-lightblue"></i>
                            <a href="#">Warehouse</a>
                        </div>
                        <div className="sidebar-link">
                            <i className="fa fa-handshake text-lightblue"></i>
                            <a href="#">Contracts</a>
                        </div>
                        <h2>LEAVE</h2>
                        <div className="sidebar-link">
                            <i className="fa fa-question text-lightblue"></i>
                            <a href="#">Requests</a>
                        </div>
                        <div className="sidebar-link">
                            <i className="fa fa-sign text-lightblue"></i>
                            <a href="#">Leave Policy</a>
                        </div>
                        <div className="sidebar-link">
                            <i className="fa fa-calendar-check text-lightblue"></i>
                            <a href="#">Special Days</a>
                        </div>
                        <div className="sidebar-link">
                            <i className="fa fa-file text-lightblue"></i>
                            <a href="#">Apply for leave</a>
                        </div>

                        <h2>PAYROLL</h2>
                        <div className="sidebar-link">
                            <i class="fa fa-credit-card text-lightblue" aria-hidden="true"></i>
                            <a href="#">Payroll</a>
                        </div>

                        <div className="sidebar-link">
                            <i className="fa fa-briefcase text-lightblue"></i>
                            <a href="#">Paygrade</a>
                        </div>

                        <div className="sidebar-logout">
                            <i className="fa fa-power-off"></i>
                            <a href="#">Log out</a>
                        </div>
                    </div>
                </div>

                <div className="main-container">
                    {/* <div className="main-title">
                        <img src=" " alt="" />
                        <div className="main-greeting">
                            <h1>Hello Vinh</h1>
                            <p>Welcome to your admin dashboard</p>
                        </div>
                    </div> */}

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
                                    <p>3900</p>
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
  const { userInfo } = state.userReducer;
  return {
    userInfo: userInfo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);