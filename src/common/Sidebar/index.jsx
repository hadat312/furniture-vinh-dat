import React, { useEffect, useState } from 'react';
import { Button, Menu, Avatar, Input, Typography, Popover, Upload, notification } from 'antd';
import ImgCrop  from 'antd-img-crop';
import { AiOutlineUpload, AiOutlineCheck } from "react-icons/ai";
import history from '../../utils/history';
import { ROUTERS } from '../../constants/router';
import { connect } from 'react-redux';
import {
  getUserInfoAction,
  editUserInfoAction
} from '../../redux/actions';

import * as Style from './styles';
import SubMenu from 'antd/lib/menu/SubMenu';

function Sidebar({ userInfo, getUserInfo, editUser }) {

  const { Title } = Typography;

  const userId = JSON.parse(localStorage.getItem('userInfo'));

  const [getImage, setGetImage] = useState('');
  const [disableValueBtn, setDisableValueBtn] = useState(true);

  useEffect(() => {
    getUserInfo({ id: userId.id });
  }, []);

  const SIDEBAR_ITEMS = [
    {
      path: '/home/profile',
      title: 'Hồ sơ'
    },
    {
      path: '/home/address',
      title: 'Địa chỉ'
    },
    {
      path: '/home/change-password',
      title: 'Đổi mật khẩu'
    },

  ];


  function showNotification() {
    const key = `open${Date.now()}`;
    return notification.success({
      message: 'Đổi ảnh thành công!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function showFormatErrorNotification() {
    const key = `open${Date.now()}`;
    return notification.error({
      message: 'Bạn chỉ có thể tải lên ảnh có định dạng JPG/PNG!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function showSizeInvalidNotification() {
    const key = `open${Date.now()}`;
    return notification.error({
      message: 'Ảnh phải nhỏ hơn 2MB!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function checkImage(value) {
    const isJpgOrPng = value.file.type === 'image/jpeg' || value.file.type === 'image/png';
    const isLessThan2M = value.file.size / 1024 / 1024 <= 1;
    if (!isJpgOrPng) {
      showFormatErrorNotification();
    }
    if (!isLessThan2M) {
      showSizeInvalidNotification();
    }
    if (isJpgOrPng && isLessThan2M) {
      setGetImage(value);
      setDisableValueBtn(false)
    }
  }

  function onSave() {
    setDisableValueBtn(true)
    const thumbUrl = getImage.fileList[0].thumbUrl;
    // console.log('thumbUrl: ', thumbUrl)
    // const pathSnippets = thumbUrl.split(",").filter((i) => i);
    // console.log('URL: ', URL.createObjectURL(`${pathSnippets[0]},${pathSnippets[1]}`))
    editUser({ id: userInfo.data.id, userImage: thumbUrl });
    showNotification();
  }

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

  // console.log('getImage: ', getImage)
  return (
    <Style.SidebarContainer>
      <div className="account-avatar">
        <Popover content={
          <>
            {/* <ImgCrop 
            modalTitle={
              <Title level={4}>Chỉnh sửa ảnh</Title>
            }
            modalCancel="Hủy bỏ"
            modalOk="Xác nhận"
            rotate>
              
            </ImgCrop> */}
            <Upload
                listType='picture'
                beforeUpload={() => false}
                onChange={(value) => checkImage(value)}
                maxCount={1}
              >
                <Button icon={<AiOutlineUpload />}>Tải ảnh lên</Button>
              </Upload>
            <Button disabled={disableValueBtn} icon={<AiOutlineCheck />} onClick={onSave}>Lưu</Button>
          </>
        } title={
          <Title level={5}>Cập nhật ảnh đại diện</Title>
        }>
          <Avatar className="avatar__img"
            style={{ margin: 10 }}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 70 }}
            // icon={<UserOutlined />}
            src={userInfo.data.userImage}
          />
        </Popover>

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