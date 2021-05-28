import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Button,
  Space,
  Popconfirm,
  Card,
  Form,
  Input,
  InputNumber,
} from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';

import {
  editOptionAdminAction,
  deleteOptionAdminAction,
} from '../../redux/actions'

function ProductOption({
  sizeOptionItem,
  editOptionAdmin,
  deleteOptionAdmin,
  productId,
}) {
  
  const [isEditForm, setIsEditForm] = useState(false);

  if (isEditForm) {
    return (
      <Card
        title="Cập nhật"
        size="small"
        style={{ marginBottom: 8 }}
      >
        <Form
          name="editProductOption"
          initialValues={sizeOptionItem}
          onFinish={(values) => {
            editOptionAdmin({
              id: sizeOptionItem.id,
              productId,
              ...values,
            });
            setIsEditForm(false);
          }}
        >
          <Form.Item name="title" label="Tùy chọn">
            <Input placeholder="Tùy chọn" />
          </Form.Item>
          <Form.Item name="productPrice" label="Giá thêm">
            <InputNumber
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              placeholder="Giá thêm"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button onClick={() => setIsEditForm(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">Xác nhận</Button>
            </Space>
          </Row>
        </Form>
      </Card>
    )
  }

  return (
    <Card size="small" style={{ marginBottom: 8 }}>
      <Row justify="space-between">
        <Space>
          <div>{sizeOptionItem.sizeName}</div>
          <div>{sizeOptionItem.price}</div>
        </Space>
        <Space>
          <Button type="text" size="small" onClick={() => setIsEditForm(true)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title={`Bạn có chắc muốn xóa ${sizeOptionItem.sizeName}`}
            onConfirm={() => deleteOptionAdmin({ id: sizeOptionItem.id })}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" size="small" danger ><CloseOutlined /></Button>
          </Popconfirm>
        </Space>
      </Row>
    </Card>
  );
}
        
const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    editOptionAdmin: (params) => dispatch(editOptionAdminAction(params)),
    deleteOptionAdmin: (params) => dispatch(deleteOptionAdminAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOption);
