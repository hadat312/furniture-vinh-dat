import { Row, Col, Typography, Menu, Dropdown, Button, Badge, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import history from '../../../../utils/history';
import { ROUTERS } from '../../../../constants/router'
import { connect } from 'react-redux';

import './styles.css';


function Item({
  categoryItem
}) {

  return (
    <>
      <ul className="header-menu__category">
        <li className="header-menu__category__dropdown">
          <a className="category__dropdown__menu-item"
            onClick={() => {
              history.push(`/home/${categoryItem.id}`)
            }}
          >
            {categoryItem.categoryName}
          </a>
        </li>
      </ul>
    </>
  )
}
export default Item;