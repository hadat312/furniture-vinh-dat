import { Row, Col, Typography } from 'antd';
import React from 'react';
import './index.css';

function Banner(props) {
  const { Title } = Typography;
  return (
    <div className="product-container__banner-bg">
        <Row >
          <Col span={4}></Col>
          <Col span={20} className="banner-bg__content">
            <div>
              <Title level={2}>Phòng khách</Title>
              <ul className="content__path">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  Phòng khách
                  </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
  );
}

export default Banner;