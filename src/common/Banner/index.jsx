import { Row, Col, Typography, Breadcrumb } from 'antd';
import React from 'react';
import history from '../../utils/history'
import { ROUTERS } from '../../constants/router';
import { connect } from 'react-redux';
import './index.css';

function Banner({ location, history, match }) {
  const { Title } = Typography;
  console.log('location: ', location);
  console.log('match: ', match);
  const selectedItemId = match.params.id;
  const breadcrumbNameMap = {
    "/home/category01": "Phòng Khách",
    "/home/category02": "Phòng Ăn",
    "/home/category03": "Phòng Ngủ",
    "/home/category04": "Phòng Làm Việc",
    "/home/category05": "Tủ Bếp",
    "/home/category06": "Hàng Trang Trí",
    "/home/cart":"Giỏ Hàng",
    "/home/wishlist":"Danh sách yêu thích",
    "/home/profile":"Hồ Sơ Cá Nhân",
    "/home/address": "Địa Chỉ Thanh Toán",
    "/home/change-password": "Thay Đổi Mật Khẩu",
  };

  //lấy mỗi từ ngăn cách bởi dấu / của pathname của location cho vào mảng
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  // console.log("pathSnippets: ", pathSnippets)
  
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    //slice(start, end): lấy giá trị trong khoảng từ index(start) tới index(end) 
    //không có .join("/") thì giữa 2 giá trị là dấu ","
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    console.log("extraBreadcrumbItems ~ url: ", url)
    console.log("breadcrumbNameMap[url]: ", breadcrumbNameMap[url]);
    return (
      <Breadcrumb.Item key={url}>
        {/* <Link to={url}>{breadcrumbNameMap[url]}</Link> */}
        <a onClick={() => history.push(url)}>{breadcrumbNameMap[url]}</a>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <a onClick={() => history.push(ROUTERS.HOME)}>Trang Chủ</a>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);
console.log("breadcrumbItems: ", breadcrumbItems);
  return (
    <div className="product-container__banner-bg">
      <Row >
        <Col span={4}></Col>
        <Col span={20} className="banner-bg__content">
          <div>

            {/* <Title level={2}>Phòng khách</Title> */}
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Banner;