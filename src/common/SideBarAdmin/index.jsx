import React, { useEffect, useState } from 'react';
import { Button, Menu, Avatar, Layout, Typography } from 'antd';
import { AiTwotoneEdit } from 'react-icons/ai';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  HomeOutlined,
  TableOutlined,
  LogoutOutlined

} from '@ant-design/icons';
import history from '../../utils/history';
import { ROUTERS } from '../../constants/router';
import { connect } from 'react-redux';

import {
  getUserInfoAction,
} from '../../redux/actions';

import SubMenu from 'antd/lib/menu/SubMenu';

import logo1 from '../../images/logo1.jpg'
import logout from '../../images/logout.png'

import './styles.css'

function SideBarAdmin(props) {
  const { Title } = Typography;
  const { Sider } = Layout;
  const { getUserInfo, userInfo } = props;

  useEffect(() => {
    if (userInfoLocalStorage && userInfoLocalStorage.id) {
      getUserInfo({ id: userInfoLocalStorage.id });
    }
  }, [])

  const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo'));

  function handleLogOut() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <Sider
      style={{ backgroundColor: '#fff', height: '100%', marginTop: 130 }}
      width="260px"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="logo">
          <img src={logo1} alt="" />
        </div>
      </div>

      <Menu theme="" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => { history.push(ROUTERS.ADMIN) }}>
          Dashboard
           </Menu.Item>
        <Menu.Item key="2" icon={<ShopOutlined />} onClick={() => { history.push(ROUTERS.ADMIN_PRODUCT) }} >
          Quản lý sản phẩm
          </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />} onClick={() => { history.push(ROUTERS.ADMIN_USER) }}>
          Quản lý thành viên
         </Menu.Item>

        <Menu.Item key="3" icon={<ShoppingCartOutlined />} onClick={() => { history.push(ROUTERS.ADMIN_VOUCHER) }}>
          Quản lý mã khuyến mãi
          </Menu.Item>

        <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogOut}>
          Đăng Xuất ({userInfo.data.userName})
          </Menu.Item>
      </Menu>

    </Sider>
  )
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

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarAdmin);