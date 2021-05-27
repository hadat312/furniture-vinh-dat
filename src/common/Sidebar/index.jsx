import React, { useEffect, useState } from 'react';
import { Button, Menu, Avatar, Layout, Typography } from 'antd';
import { AiTwotoneEdit } from 'react-icons/ai';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import history from '../../utils/history';
import { ROUTERS } from '../../constants/router';
import { connect } from 'react-redux';
import {
  getUserInfoAction,
  editUserInfoAction
} from '../../redux/actions';

import * as Style from './styles';
import SubMenu from 'antd/lib/menu/SubMenu';

function Sidebar({userInfo, getUserInfo}) {

  const { Title} = Typography;

  const userId = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    getUserInfo({ id: userId.id });
  }, []);

  const SIDEBAR_ITEMS = [
    {
      path: '/profile',
      title: 'Hồ sơ'
    },
    {
      path: '/address',
      title: 'Địa chỉ'
    },
    {
      path: '/change-password',
      title: 'Đổi mật khẩu'
    },

  ];


  function renderSidebarItems() {
    return SIDEBAR_ITEMS.map((sidebarItem, sidebarIndex) => {
      return (
        <Menu.Item
          key={sidebarIndex}
          onClick={() => history.push(sidebarItem.path)}
        >
          {sidebarItem.title}
        </Menu.Item>

      )
    })
  }

  return (
    <Style.SidebarContainer>
      <div className="account-avatar">
        <Avatar className="avatar__img"
          style={{ margin: 10 }}
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 70 }}
          // icon={<UserOutlined />}
          src="https://phunuhiendai.vn/wp-content/uploads/2018/11/Morico-Saigon-Classical-ph%E1%BB%A5-n%E1%BB%AF-hi%E1%BB%87n-%C4%91%E1%BA%A1i-B%C3%ACa-1.png"
        />
        <Title level={3}>{userInfo.data.userName}</Title>
        
      </div>


      <Menu
        mode="inline"
        defaultSelectedKeys={["0"]}
        defaultOpenKeys={['sub1']}

      >
        <SubMenu key="sub1" title="Tổng quan về tài khoản">
          {renderSidebarItems()}
        </SubMenu>
        <Menu.Item key="3" onClick={() => history.push(ROUTERS.MY_ORDER)}>Lịch sử giao dịch</Menu.Item>
      </Menu>
    </Style.SidebarContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);