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

function SizeOption({
  sizeOptionItem,
  editOptionAdmin,
  deleteOptionAdmin,
  productId,
}) {

  const [isEditForm, setIsEditForm] = useState(false);

  const [editSizeOption] = Form.useForm();

  function handleEditSizeOption() {

    const values = editSizeOption.getFieldsValue();

    editOptionAdmin({
      id: sizeOptionItem.id,
      productId,
      ...values
    })

    setIsEditForm(false);   // Đóng form

  }

  if (isEditForm) {
    return (
      <Card
        title="Cập nhật kích thước"
        size="small"
        style={{ marginBottom: 8 }}
      >
        <Form
          name="editProductOption"
          form={editSizeOption}
          initialValues={sizeOptionItem}
        >
          <Form.Item name="sizeName" label="Tùy chọn">
            <Input placeholder="Cập nhật kích thước" />
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
              <Button type="primary" onClick={handleEditSizeOption}>Xác nhận</Button>
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
          <div>{sizeOptionItem.price.toLocaleString()}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SizeOption);
