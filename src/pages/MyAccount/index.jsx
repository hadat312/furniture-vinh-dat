import React, { useState } from 'react';
import { Tabs, Radio, Card, Typography, Row, Col, Input, Form } from 'antd';
import { AiOutlineEdit } from "react-icons/ai";
import history from '../../utils/history';
import { ROUTERS } from '../../constants/router';
import OrderTable from './components/OrderTable';
import './myAccount.css';
const { TabPane } = Tabs;
function ProfilePage(props) {
  const { Title } = Typography;
  const myName = "Dat Ha";
  const myAddress = "1355 Market St, Suite 900  San Francisco, CA 94103";
  const myMobile = "0774473993";
  const [isEdit, setIsEdit] = useState(false);
  const [editForm] = Form.useForm();
  function renderBillAddressView() {
    return (
      <>
        <Row className="custom-row">
          <Col><span className="text-bold">{myName}</span></Col>
        </Row>
        <Row className="custom-row">
          <Col><span>{myAddress}</span></Col>
        </Row>
        <Row className="custom-row">
          <Col><span>Mobile: {myMobile}</span></Col>
        </Row>
      </>
    );
  }



  function renderBillAddressEdit() {
    return (
      <Form
        form={editForm}
        layout="vertical"
        name="basic"
        initialValues={{
          name: myName,
          address: myAddress,
          mobile: myMobile,
        }}
        onFinish={(values) => {
          // editTask(values, index);
          setIsEdit(false);
        }}
      >
        <Form.Item
          label={<span className="text-bold">Tên</span>}
          name="name"
          rules={[{ required: true, message: 'Không được để trống!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className="text-bold">Địa chỉ</span>}
          name="address"
          rules={[{ required: true, message: 'Không được để trống!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span className="text-bold">Số điện thoại</span>}
          name="mobile"
          rules={[{ required: true, message: 'Không được để trống!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    )
  }
  return (
    <Row className="profile-container">
      <Col span={4}></Col>
      <Col span={16}>
        <Tabs
          defaultActiveKey="1"
          // type="card"
          size={"Large"}
          style={{ marginBottom: 16 }}>
          <TabPane
            tab={<span className="tab-title text-bold">Dashboard</span>}
            key="1">
            <div className="site-card-border-less-wrapper">
              <Row>
                <Col span={24}>
                  <Card title={
                    <Title level={5}>Dashboard</Title>
                  } bordered={true}>
                    <p>Xin chào, <span style={{ fontWeight: "bold" }}>{myName}</span> (Nếu không phải <span style={{ fontWeight: "bold" }}>{myName}</span> ! Vui lòng <a style={{ fontWeight: "bold" }} onClick={() => history.push(ROUTERS.CUSTOMER_LOGIN)}>Logout!</a>)</p>
                    <p>Từ bảng điều khiển. Bạn có thể dễ dàng kiểm tra & xem đơn hàng hiện tại của bạn, quản lý shipping, địa chỉ hóa đơn và chỉnh sửa chi tiết tài khoản cũng như mật khẩu của bạn.</p>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tab={<span className="tab-title text-bold">Đơn Hàng</span>} key="2">
            <Row>
              <Col span={24}>
                <Card title={
                  <Title level={5}>Đơn hàng</Title>
                } bordered={true}>
                  <OrderTable />
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab={<span className="tab-title text-bold">Địa Chỉ Thanh Toán</span>} key="3">
            <Row>
              <Col span={24}>
                <Card title={
                  <Title level={5}>Địa chỉ thanh toán</Title>
                } bordered={true}>
                  {isEdit ? renderBillAddressEdit() : renderBillAddressView()}
                  <Row className="custom-row">
                    <Col>
                      {isEdit
                        ? (
                          <>
                            <a className="bill-address-confirm" onClick={() => editForm.submit()}>Xác nhận</a>
                            <a className="bill-address-cancel" onClick={() => setIsEdit(false)}>Hủy bỏ</a>
                          </>
                        )
                        : (
                          <>
                            <a className="bill-address__edit-btn" onClick={() => setIsEdit(true)}><AiOutlineEdit /> Sửa địa chỉ </a>
                            {/* <a danger onClick={() => deleteTask(index)}>Delete</a> */}
                          </>
                        )
                      }
                    </Col>
                  </Row>

                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab={<span className="tab-title text-bold">Chi Tiết Tài Khoản</span>} key="4">
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
      </Col>
      <Col span={4}></Col>
    </Row>
  );
}

export default ProfilePage;