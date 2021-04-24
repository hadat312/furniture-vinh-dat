import { Col, Row, Typography } from 'antd';
import React from 'react';
import history from '../../utils/history'
import { ROUTERS } from '../../constants/router';
import { AiFillPhone, AiTwotoneMail, AiFillFacebook, AiFillYoutube, AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import './index.css'
function Footer(props) {
  const { Title } = Typography;
  return (
    <div>
      <div className="footer">
        <Row justify="center">
          <Col>
            <Title >
              <span style={{cursor:'pointer'}} onClick={() => history.push(ROUTERS.HOME)}>LAZEDA</span>
            </Title>
            Copyrights © 2021 - 2031. All rights reserved by
            <a className="footer__brand" target="_blank" onClick={() => history.push(ROUTERS.HOME)}> LAZEDA</a>
          </Col>
          <Col span={10} >
            <Row>
              <Col span={8}></Col>
              <Col span={8}>
                <div className="footer__info">

                  <Title level={2}>Liên hệ</Title>
                  <div className="info__contacts">
                    <ul>
                      <li>
                        <a >
                          <AiFillPhone className="contacts__icon" />
                          +84774473993
                        </a>
                      </li>
                      <li>
                        <a >
                          <AiTwotoneMail className="contacts__icon" />
                          admin@furniture.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col span={8}></Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={8}></Col>
              <Col span={8}>
                <div className="footer__social-media">
                  <Title level={2}>Mạng xã hội</Title>
                  <div className="social-media__links">
                    <ul>
                      <li>
                        <a >
                          <AiFillFacebook className="links__icon" />
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a >
                          <AiFillYoutube className="links__icon" />
                          Youtube
                        </a>
                      </li>
                      <li>
                        <a >
                          <AiFillInstagram className="links__icon" />
                          Instagram
                        </a>
                      </li>
                      <li>
                        <a >
                          <AiOutlineTwitter className="links__icon" />
                          Twitter
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col span={8}></Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;