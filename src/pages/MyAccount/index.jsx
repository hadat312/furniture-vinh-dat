import React from 'react';
import { Tabs, Radio, Card, Typography, Row, Col } from 'antd';
import history from '../../utils/history';
import { ROUTERS } from '../../constants/router';
import './myAccount.css';
const { TabPane } = Tabs;
function ProfilePage(props) {
  const { Title } = Typography;
  const myName = "Dat Ha";
  return (
    <div>
      <Radio.Group
        value={"Large"}
        style={{ marginBottom: 16 }}
      >
      </Radio.Group>
      <Tabs defaultActiveKey="1" type="card" size={"Large"} >
        <TabPane
          className="tab-pane-container"
          tab={
            <span className="tab-title">
              Dashboard
            </span>
          }
          key="1">
          <div className="site-card-border-less-wrapper">
            <Row>
              <Col span={24}>
                <Card title={
                  <Title level={5}>Dashboard</Title>
                } bordered={true}>
                  <p>Xin chào, <span style={{fontWeight:"bold"}}>{myName}</span> (Nếu không phải <span style={{fontWeight:"bold"}}>{myName}</span> ! Vui lòng <a style={{fontWeight:"bold"}} onClick={() => history.push(ROUTERS.CUSTOMER_LOGIN)}>Logout!</a>)</p>
                  <p>Từ bảng điều khiển. Bạn có thể dễ dàng kiểm tra & xem đơn hàng hiện tại của bạn, quản lý shipping, địa chỉ hóa đơn và chỉnh sửa chi tiết tài khoản cũng như mật khẩu của bạn.</p>
                </Card>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tab="Đơn hàng" key="2">
          <Row>
            <Col span={24}>
              <Card title={
                <Title level={5}>Đơn hàng</Title>
              } bordered={true}>
                <p>Hello, {myName} (If Not {myName} ! <a onClick={() => history.push(ROUTERS.CUSTOMER_LOGIN)}>Logout!</a>)</p>
                <p>Từ bảng điều khiển. Bạn có thể dễ dàng kiểm tra & xem đơn hàng hiện tại của bạn, quản lý shipping, địa chỉ hóa đơn và chỉnh sửa chi tiết tài khoản cũng như mật khẩu của bạn.</p>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Địa chỉ thanh toán" key="3">
          <Row>
            <Col span={24}>
              <Card title={
                <Title level={5}>Địa chỉ thanh toán</Title>
              } bordered={true}>
                <p>Hello, {myName} (If Not {myName} ! <a onClick={() => history.push(ROUTERS.CUSTOMER_LOGIN)}>Logout!</a>)</p>
                <p>Từ bảng điều khiển. Bạn có thể dễ dàng kiểm tra & xem đơn hàng hiện tại của bạn, quản lý shipping, địa chỉ hóa đơn và chỉnh sửa chi tiết tài khoản cũng như mật khẩu của bạn.</p>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Chi tiết tài khoản" key="4">
          <Row>
            <Col span={24}>
              <Card title={
                <Title level={5}>Chi tiết tài khoản</Title>
              } bordered={true}>
                <p>Hello, {myName} (If Not {myName} ! <a onClick={() => history.push(ROUTERS.CUSTOMER_LOGIN)}>Logout!</a>)</p>
                <p>Từ bảng điều khiển. Bạn có thể dễ dàng kiểm tra & xem đơn hàng hiện tại của bạn, quản lý shipping, địa chỉ hóa đơn và chỉnh sửa chi tiết tài khoản cũng như mật khẩu của bạn.</p>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfilePage;