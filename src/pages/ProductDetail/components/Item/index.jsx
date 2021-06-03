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
function Item({ commentItem, averageRate }) {
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
            <div>
              <Avatar className="avatar__img"
                style={{ margin: 10 }}
                size={{ xs: 30, sm: 35, md: 40, lg: 45, xl: 50, xxl: 55 }}
                // icon={<UserOutlined />}
                src="https://phunuhiendai.vn/wp-content/uploads/2018/11/Morico-Saigon-Classical-ph%E1%BB%A5-n%E1%BB%AF-hi%E1%BB%87n-%C4%91%E1%BA%A1i-B%C3%ACa-1.png"
              />
              <div className="comment-user" style={{color:"#333"}}>{commentItem.userName}</div>
            </div>
          </div>

          <div className="comment-side-right">
            <div className="comment-opinion">
              <Rate  disabled defaultValue={commentItem.rate} />
              {renderShow()}
            </div>

            <p className="comment-text">{commentItem.comment}</p>
            <p>Nhận xét vào {commentItem.time} - {commentItem.date}</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default Item;