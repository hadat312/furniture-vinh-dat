import { Row, Col, Typography, Breadcrumb } from 'antd';
import React, { useState } from 'react';
import history from '../../utils/history'
import { ROUTERS } from '../../constants/router';
import { connect } from 'react-redux';

import banner from '../../images/cartbg.jpg';
// import * as Style from './styles';
import './index.css';

function Banner({ location, history, match, getURLProductDetail, getNameProduct }) {
  console.log("🚀 ~ file: index.jsx ~ line 12 ~ Banner ~ getNameProduct: ", getNameProduct)
  console.log("🚀 ~ file: index.jsx ~ line 12 ~ Banner ~ getURLProductDetail: ", getURLProductDetail)
  const { Title } = Typography;
  // console.log('location: ', location);
  // console.log('match: ', match);
  // const selectedItemId = match.params.id;

  const breadcrumbNameMap = [
    {
      urlBreadCrumb: "/home",
      title: "Trang Chủ"
    },
    {
      urlBreadCrumb: "/home/category01",
      title: "Phòng Khách"
    },
    {
      urlBreadCrumb: "/home/category02",
      title: "Phòng Ăn"
    },
    {
      urlBreadCrumb: "/home/category03",
      title: "Phòng Ngủ"
    },
    {
      urlBreadCrumb: "/home/category04",
      title: "Phòng Làm Việc"
    },
    {
      urlBreadCrumb: "/home/category05",
      title: "Tủ Bếp"
    },
    {
      urlBreadCrumb: "/home/category06",
      title: "Hàng Trang Trí"
    },
    {
      urlBreadCrumb: "/home/about",
      title: "Giới Thiệu"
    },
    {
      urlBreadCrumb: "/home/search",
      title: "Kết Quả Tìm Kiếm"
    },
    {
      urlBreadCrumb: "/home/cart",
      title: "Giỏ Hàng"
    },
    {
      urlBreadCrumb: "/home/cart/checkout",
      title: "Xác nhận thông tin mua hàng"
    },
    {
      urlBreadCrumb: "/home/wishlist",
      title: "Danh sách yêu thích"
    },
    {
      urlBreadCrumb: "/home/profile",
      title: "Hồ Sơ Cá Nhân"
    },
    {
      urlBreadCrumb: "/home/address",
      title: "Địa Chỉ Thanh Toán"
    },
    {
      urlBreadCrumb: "/home/orders",
      title: "Lịch Sử Giao Dịch"
    },
    {
      urlBreadCrumb: "/home/change-password",
      title: "Thay Đổi Mật Khẩu"
    },
    {
      urlBreadCrumb: `${getURLProductDetail}`,
      title: `${getNameProduct}`
    },
  ]
  //hiển thị breadcrumbNameMap của detail
  //c1: tạo 1 luồng redux common giống như selected để cập nhật lại breadcrumbNameMap khi vào detail
  //c2: if else, khi vào trang detailPage thì lấy breadcrumbNameMap của trang detailPage, 
  //còn ko thì sài breadcrumbNameMap của Banner
  //lấy mỗi từ ngăn cách bởi dấu / của pathname của location cho vào mảng
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  // console.log("pathSnippets: ", pathSnippets)

  let urlValue = '';
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    //slice(start, end): lấy giá trị trong khoảng từ index(start) tới index(end) 
    //không có .join("/") thì giữa 2 giá trị là dấu ","
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

    // console.log("extraBreadcrumbItems ~ url: ", url)
    // console.log("breadcrumbNameMap[url]: ", breadcrumbNameMap[url]);


    return breadcrumbNameMap.map((breadcrumbItem, breadcrumbIndex) => {
      if (url === breadcrumbItem.urlBreadCrumb) {
        urlValue = breadcrumbItem.title;
        // console.log("breadcrumbNameMap2.map ~ urlValue", urlValue)
        // console.log("breadcrumbItem.urlBreadCrumb", breadcrumbItem.title)
        return (
          <Breadcrumb.Item key={url}>
            <Title level={4} onClick={() => {
              history.push(url);
            }}>
              {/* Title của url */}
              {breadcrumbItem.title}
            </Title>
          </Breadcrumb.Item>

        )
      }
    })
  });
  return (
    <div className="main-container__banner">
      <div className="banner__bg"
      >
        <div className="bg__title">
          <Title level={2}>{urlValue}</Title>
          <Breadcrumb className="breadcrumb-container">
            {extraBreadcrumbItems}
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}

export default Banner;