import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Item from './components/Item';
import history from '../../utils/history'
import logo1 from '../../images/logo1.jpg'

import './styles.css';

// import { Line } from '@ant-design/charts';

import {
    getUserInfoAction,
    getUserListAction,
    deleteUserListAction
} from '../../redux/actions'
import { ROUTERS } from '../../constants/router';

function AdminPage(props) {

    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];

    const config = {
        data,
        height: 400,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
    };

    return (
        <>
            <div className="dashboard-container">
                <div className="sidebar-container">
                    <div className="sidebar-title">
                        <img src={logo1} 
                        alt="logo" 
                        style={{cursor: 'pointer'}} 
                        // onClick={history.push(ROUTERS.HOME)}
                        />
                        <h3>DashBoard</h3>
                    </div>
                </div>
            </div>

            <div className="dashboard-main">
                {/* <Line {...config} /> */}
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