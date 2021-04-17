import { Row, Col, Typography, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import React from 'react';
import history from '../../utils/history'
import { ROUTERS } from '../../constants/router';

import './index.css';
function Header(props) {
  const { Title } = Typography;
  const { SubMenu } = Menu;
  const menuLivingRoom = (
    <Menu>
      <SubMenu title="Ghế & Sofa">
        <Menu.Item>
          <a>
            Sofa
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Sofa góc
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Ghế thư giãn
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Ghế dài
          </a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title="Bàn">
        <Menu.Item>
          <a>
            Bàn nước
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Bàn console(Bàn trang trí)
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Bàn bên (Bàn góc)
          </a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title="Tủ">
        <Menu.Item>
          <a>
            Tủ TV
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Tủ giày
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Kệ trưng bày
          </a>
        </Menu.Item>
      </SubMenu>
      <Menu.Item>
        <a>
          Thảm
        </a>
      </Menu.Item>
    </Menu>
  );

  const menuDiningRoom = (
    <Menu>
      <Menu.Item>
        <a>
          Bàn ăn
        </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Ghế ăn
        </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Ghế bar
        </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Tủ ly
        </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Xe đẩy
        </a>
      </Menu.Item>
    </Menu>
  );

  const menuBedRoom = (
    <Menu>
      <SubMenu title="Giường & Bàn">
        <Menu.Item>
          <a>
            Giường ngủ
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Bàn đầu giường
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Bàn trang điểm
          </a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title="Tủ">
        <Menu.Item>
          <a>
            Tủ áo
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Tủ âm tường
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Tủ hộc kéo
          </a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title="Mền & Gối">
        <Menu.Item>
          <a>
            Mền & Gối
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Nệm
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Cây treo áo
          </a>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
  const menuWorkRoom = (
    <Menu>
      <Menu.Item>
        <a>
          Bàn làm việc
        </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Ghế
        </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Kệ sách
        </a>
      </Menu.Item>
    </Menu>
  );
  const menuKitchenCabinets = (
    <Menu>
      <SubMenu title="Tủ & Quầy">
        <Menu.Item>
          <a>
            Tủ bếp
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Tủ rượu
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Đảo bếp
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Quầy bar
          </a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title="Tủ & Quầy">
        <Menu.Item>
          <a>
            Bếp
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Máy hút bụi
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Lò nướng
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Lò vi sóng
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Các thiết bị khác
          </a>
        </Menu.Item>
      </SubMenu>
      <Menu.Item>
        <a>
          Phụ kiện bếp
          </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Dụng cụ bếp
          </a>
      </Menu.Item>
    </Menu>
  );
  const menuDecoratingGoods = (
    <Menu>
      <Menu.Item>
        <a>
          Hoa & Cây
          </a>
      </Menu.Item>
      <SubMenu title="Trang trí tường">
        <Menu.Item>
          <a>
            Đồng hồ
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Tranh
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Khung gương
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Khung hình
          </a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title="Trang trí trên bàn">
        <Menu.Item>
          <a>
            Bình trang trí
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Đèn trang trí
          </a>
        </Menu.Item>
      </SubMenu>
      <Menu.Item>
        <a>
          Thảm trang trí
          </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Gối & Thú nhồi bông
          </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Nến & Chân nến
          </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Noel
          </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className="header">
        <Row justify="center">
          <Col span={3}>
            <Title className="header__brand">
              <div>
                LAZEDA
              </div>
            </Title>
          </Col>
          <Col span={16}>
            <div className="header__menu">
              <Dropdown overlay={menuLivingRoom} placement="bottomLeft">
                <a className="header__menu-item">
                  Phòng khách <DownOutlined className="item__icon" />
                </a>
              </Dropdown>
              <Dropdown overlay={menuDiningRoom} placement="bottomLeft">
                <a className="header__menu-item">Phòng ăn <DownOutlined /></a>
              </Dropdown>
              <Dropdown overlay={menuBedRoom} placement="bottomLeft">
                <a className="header__menu-item">Phòng ngủ <DownOutlined /></a>
              </Dropdown>
              <Dropdown overlay={menuWorkRoom} placement="bottomLeft">
                <a className="header__menu-item">Phòng phòng làm việc <DownOutlined /></a>
              </Dropdown>
              <Dropdown overlay={menuKitchenCabinets} placement="bottomLeft">
                <a className="header__menu-item">Tủ bếp <DownOutlined /></a>
              </Dropdown>
              <Dropdown overlay={menuDecoratingGoods} placement="bottomLeft">
                <a className="header__menu-item">Hàng trang trí <DownOutlined /></a>
              </Dropdown>
              <a className="header__menu-item">Giới thiệu</a>
            </div>
          </Col>
          <Col span={3} >
            <div className="header__user-block">
              <a>
                <AiOutlineSearch className="block__search-item" />
              </a>
              <a>
                <AiOutlineUser
                  className="block__avatar-item"
                  onClick={() => { history.push(ROUTERS.CUSTOMER_LOGIN) }}
                />
              </a>
              <a>
                <AiOutlineHeart className="block__heart-item" />
              </a>
              <a>
                <AiOutlineShoppingCart className="block__cart-item" />
              </a>
            </div>
          </Col>
        </Row>
      </div>

    </>
  );
}

export default Header;