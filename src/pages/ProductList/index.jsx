import { Col, Input, Row, Space, Typography, Menu, Button } from 'antd';
import React, { useState } from 'react';
import Main from './components/Main';
import FilterContent from './components/FilterContent';
import './productList.css';

function ProductListPage(props) {
  const { Title } = Typography;
  const [searchKey, setSearchKey] = useState('');
  const [isShowFilterContent, setIsShowFilterContent] = useState(false);
  const filterContentToggle = () => {
    setIsShowFilterContent(!isShowFilterContent);
  }

  return (
    <div className="product-container">
      <div className="product-container__shop-header">
        <div className="shop-header__content">
          <Row>
            <Col span={4}></Col>
            <Col span={4} className="content__number-of-pages">
              <div>
                Number of pages
              </div>
            </Col>
            <Col span={12} className="content__format">
              <div className="d-flex" style={{ fontSize: "30px" }}>
                <Button className="content__format__button-3-item" active>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></svg>
                </Button>
                <Button className="content__format__button-4-item">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 9h4V5H3v4zm0 5h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zM8 9h4V5H8v4zm5-4v4h4V5h-4zm5 9h4v-4h-4v4zM3 19h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zm5 0h4v-4h-4v4zm0-14v4h4V5h-4z"></path></svg>
                </Button>
                <Button className="content__format__button-1-item">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></svg>
                </Button>
              </div>
            </Col>
            <Col span={4} className="content__filter">
              <div>
                <Button className="content__filter__button" onClick={filterContentToggle}>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M208 400h96v-47.994h-96V400zM32 112v47.994h448V112H32zm80 168.783h288v-49.555H112v49.555z"></path></svg>
                  <span className="content__filter__button__title">Filter</span>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div >
        {isShowFilterContent ? <FilterContent /> : null}
      </div>
      <div className="product-container__shop-body">
        <Row>
          <Col span={4}></Col>
          <Col span={4} className="">
            <div className="shop-body__sideBar">
              <Space direction="vertical">
                <Input.Search
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Tìm kiếm..."
                />
                <div className="sideBar__categories">
                  <Title level={3}>Danh mục</Title>
                  <div className="categories__menu">
                    {/* SỬ dùng hàm để render ra danh mục */}
                    <Menu
                      onClick={(e) => console.log(e)}
                      style={{ width: 256 }}
                      defaultSelectedKeys={['1']}
                      mode="inline"
                    >
                      <Menu.ItemGroup key="g1" title="Ghế & Sofa">
                        <Menu.Item key="1">Sofa</Menu.Item>
                        <Menu.Item key="2">Sofa góc</Menu.Item>
                        <Menu.Item key="3">Ghế thư giãn</Menu.Item>
                        <Menu.Item key="4">Ghế dài</Menu.Item>
                      </Menu.ItemGroup>
                      <Menu.ItemGroup key="g2" title="Bàn">
                        <Menu.Item key="5">Bàn nước</Menu.Item>
                        <Menu.Item key="6">Bàn console (bàn trang trí)</Menu.Item>
                        <Menu.Item key="7">Bàn bên (bàn góc)</Menu.Item>
                      </Menu.ItemGroup>
                      <Menu.ItemGroup key="g3" title="Tủ">
                        <Menu.Item key="8">Tủ TV</Menu.Item>
                        <Menu.Item key="9">Tủ giày</Menu.Item>
                        <Menu.Item key="10">Kệ trưng bày</Menu.Item>
                      </Menu.ItemGroup>
                      <Menu.ItemGroup key="g4" title="Thảm">
                        <Menu.Item key="11">Thảm</Menu.Item>
                      </Menu.ItemGroup>
                    </Menu>
                  </div>
                </div>
              </Space>
            </div>
          </Col>
          <Col span={12} className="">
            <div classNames="shop-body__main">
              <Main />
            </div>
          </Col>
          <Col span={4}></Col>
        </Row>


      </div>
    </div>
  );
}

export default ProductListPage;