import { Col, Row, Typography } from 'antd';
import React from 'react';
import './filterContent.css'
function FilterContent(props) {
  const{Title} = Typography;
  return (
    <div>
      <Row className="product-container__collapse-filter">
        <Col span={4}></Col>
        <Col span={8} className="product-container__collapse-filter__price">
          <div>
            <Title level={3}>Giá</Title>
            <ul className="collapse-filter__price__menu">
              <li>
                <a className="price__menu__item">Giá - Cao tới Thấp</a>
              </li>
              <li>
                <a className="price__menu__item">Giá - Thấp tới Cao</a>
              </li>
            </ul>
          </div>

        </Col>
        <Col span={8} className="product-container__collapse-filter__size">
          <div>
            <Title level={3}>Kích cỡ</Title>
            <ul className="collapse-filter__size__menu">
              <li>
                <a className="size__menu__item">S</a>
              </li>
              <li>
                <a className="size__menu__item">M</a>
              </li>
              <li>
                <a className="size__menu__item">XL</a>
              </li>
              <li>
                <a className="size__menu__item">XXL</a>
              </li>
            </ul>
          </div>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
}

export default FilterContent;