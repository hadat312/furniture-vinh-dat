import { Row, Col, Typography, Breadcrumb } from 'antd';
import React, { useState } from 'react';
import history from '../../utils/history'
import { ROUTERS } from '../../constants/router';
import { connect } from 'react-redux';

import banner from '../../images/cartbg.jpg';
// import * as Style from './styles';
import './index.css';

function Banner({ location, history, match }) {
  const { Title } = Typography;
  // console.log('location: ', location);
  // console.log('match: ', match);
  // const selectedItemId = match.params.id;
  const breadcrumbNameMap = {
    "/home": "Trang Chủ",
    "/home/category01": "Phòng Khách",
    "/home/category02": "Phòng Ăn",
    "/home/category03": "Phòng Ngủ",
    "/home/category04": "Phòng Làm Việc",
    "/home/category05": "Tủ Bếp",
    "/home/category06": "Hàng Trang Trí",
    "/home/search": "Kết Quả Tìm Kiếm",
    "/home/cart": "Giỏ Hàng",
    "/home/cart/checkout": "Xác nhận thông tin mua hàng",
    "/home/wishlist": "Danh sách yêu thích",
    "/home/profile": "Hồ Sơ Cá Nhân",
    "/home/address": "Địa Chỉ Thanh Toán",
    "/home/orders": "Lịch Sử Giao Dịch",
    "/home/change-password": "Thay Đổi Mật Khẩu",
  };
  //hiển thị breadcrumbNameMap của detail
  //c1: tạo 1 luồng redux common giống như selected để cập nhật lại breadcrumbNameMap khi vào detail
  //c2: if else, khi vào trang detailPage thì lấy breadcrumbNameMap của trang detailPage, 
  //còn ko thì sài breadcrumbNameMap của Banner
  //lấy mỗi từ ngăn cách bởi dấu / của pathname của location cho vào mảng
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  // console.log("pathSnippets: ", pathSnippets)

  let urlValue='';
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    //slice(start, end): lấy giá trị trong khoảng từ index(start) tới index(end) 
    //không có .join("/") thì giữa 2 giá trị là dấu ","
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    urlValue = url;
    // console.log("extraBreadcrumbItems ~ url: ", url)
    // console.log("breadcrumbNameMap[url]: ", breadcrumbNameMap[url]);
    return (
      <Breadcrumb.Item key={url}>
        {/* <Link to={url}>{breadcrumbNameMap[url]}</Link> */}
        <a onClick={() => {
          history.push(url);
        }}>{breadcrumbNameMap[url]}</a>
      </Breadcrumb.Item>
    );
  });
  console.log('URL: ', urlValue);
  return (
    <div className="main-container__banner">
      <div className="banner__bg"
      // style={{ backgroundImage: `url(${banner})` }}
      >
        
        <div className="bg__title">
          <Title level={2}>{breadcrumbNameMap[urlValue]}</Title>
          <Breadcrumb lassName="breadcrumb-container">
            <Title level={4} c>{extraBreadcrumbItems}</Title>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}

export default Banner;