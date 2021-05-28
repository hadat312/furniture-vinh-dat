import { Row, Col, Typography, Menu, Dropdown, Button, Badge, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import history from '../../../../utils/history';
import { ROUTERS } from '../../../../constants/router'
import { connect } from 'react-redux';

import './styles.css';


function Item(props) {
  const { categoryItem } = props;

  return (
    <>
      <ul className="header-ád">
        <li className="header-ád-dropdown">
          <a className="menu-item"
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