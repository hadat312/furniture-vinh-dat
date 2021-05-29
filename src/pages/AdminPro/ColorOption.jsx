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
  
  editColorOptionAdminAction,
  deleteColorOptionAdminAction
} from '../../redux/actions'

function ColorOption({
  colorItem,
  productId,

  editColorOption,
  deleteColorOption
}) {
  console.log("🚀 ~ file: ColorOption.jsx ~ line 26 ~ colorItem", colorItem)

  const [isEditForm, setIsEditForm] = useState(false);

  if (isEditForm) {
    return (
      <Card
        title="Cập nhật màu sắc"
        size="small"
        style={{ marginBottom: 8 }}
      >
        <Form
          name="editProductOption"
          initialValues={colorItem}
          onFinish={(values) => {
            editColorOption({
              id: colorItem.id,
              productId,
              ...values,
            });
            setIsEditForm(false);
          }}
        >
          <Form.Item name="colorName" label="Tùy Chọn">
            <Input placeholder="Cập nhật màu sắc" />
          </Form.Item>
          <Form.Item name="price" label="Giá thêm">
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
          <div>{colorItem.colorName}</div>
          <div>{colorItem.price}</div>
        </Space>
        <Space>
          <Button type="text" size="small" onClick={() => setIsEditForm(true)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title={`Bạn có chắc muốn xóa ${colorItem.colorName}`}
            onConfirm={() => deleteColorOption({ id: colorItem.id })}
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
   

    editColorOption:(params) => dispatch(editColorOptionAdminAction(params)),
    deleteColorOption:(params) => dispatch(deleteColorOptionAdminAction(params)),


   
   
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorOption);
