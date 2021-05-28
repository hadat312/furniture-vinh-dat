import React, { useEffect, useState } from 'react';

import {
  Col,
  Radio,
  Rate,
  Row,
  Typography,
  Button,
  Comment,
  Avatar,
  InputNumber,
  notification,
  Alert,
  Space
} from 'antd';

import './styles.css'

import { UserOutlined } from "react-icons/ai";
function Item(props) {
  const { commentItem } = props;

  const { Title } = Typography;

  function renderShow() {
    if (commentItem.rate >= 5) {
      return <p>Rất Hài Lòng</p>
    } else if (commentItem.rate >= 4) {
      return <p>Hài Lòng</p>
    } else if (commentItem.rate >= 3) {
      return <p>Bình Thường</p>
    } else if (commentItem.rate >= 2) {
      return <p>Tệ</p>
    }
    return <p>Rất Tệ</p>
  }

  return (
    <>
      <div className="comment-container">
        <div className="comment-content">
          <div className="comment-side-left">
            <img src="" alt="" />
            <h5 className="comment-user">{commentItem.userName}</h5>
          </div>

          <div className="comment-side-right">
            <div className="comment-opinion">
              <Rate allowHalf defaultValue={commentItem.rate} />
              {renderShow()}
            </div>

            <h4 className="comment-text">{commentItem.comment}</h4>
            <p>Nhận xét vào {commentItem.time} - {commentItem.date}</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default Item;