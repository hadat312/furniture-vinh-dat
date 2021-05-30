import { Row, Col, Typography, Menu, Dropdown, Button, Badge, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import history from '../../../../utils/history';
import { ROUTERS } from '../../../../constants/router'
import { connect } from 'react-redux';


function Item({
  categoryItem,
  fontWeightBold,
}) {

  return (
    <>
      <li>
        <a
          style={{
            fontWeight: `${fontWeightBold}`
          }}
          onClick={() => {
            history.push(`/home/${categoryItem.id}`)
          }}
        >
          {categoryItem.categoryName.toUpperCase()}
        </a>
      </li>
    </>
  )
}
export default Item;