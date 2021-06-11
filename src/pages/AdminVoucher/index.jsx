import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history'

import { ROUTERS } from '../../constants/router';

import {
  Row,
  Table,
  Button,
  Space,
  Drawer,
  Form,
  Input,
  Select,
  Popconfirm,
  List,
  InputNumber,
  Checkbox,
  Card,
  Modal,
} from 'antd';

import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import {
  getProductListAdminAction,
  getCategoryListAdminAction,
  createVoucherAdminAction,
  getVoucherAdminAction,
  deleteVoucherAdminAction,
  editVoucherAdminAction,
  setVoucherSelectAction
} from '../../redux/actions'

import logo1 from '../../images/logo1.jpg'

import './styles.css'
function AdminVoucher({
  getProductListAdmin,
  getCategoryListAdmin,
  categoryList,
  productList,

  editVoucherAdmin,
  deleteVoucherAdmin,
  voucherList,
  createVoucher,
  getVoucherAdmin,
}) {

  useEffect(() => {
    getProductListAdmin();
    getCategoryListAdmin();
    getVoucherAdmin();
  }, []);

  

  const [isShowModify, setIsShowModify] = useState(false);


  // const [isShowEditVoucher, setIsShowEditVoucher] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [productForm] = Form.useForm();

  const [editForm] = Form.useForm();

  const [voucherSelected, setVoucherSelected] = useState({})


  useEffect(() => {
    editForm.resetFields();
  }, [voucherSelected.id]);

  function handleCreateVoucher() {
    setIsShowModify(true);
  }

  function handleEditVoucher(record) {
    setIsModalVisible(true)
    setVoucherSelected(record)
  }



  function handleSubmitForm() {
    const values = productForm.getFieldsValue();
    createVoucher(values)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    editForm.submit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //  Table Colums
  const tableColumns = [
    {
      title: 'Tên mã khuyến mãi',
      dataIndex: 'voucherName',
      key: 'productName',
    },
    {
      title: 'Mã khuyến mãi',
      dataIndex: 'voucherCode',
      // key: 'voucherCode',
    },
    {
      title: 'Giá khuyễn mãi',
      dataIndex: 'voucherPrice',
      render: (_, record) => <div>{parseInt(record.voucherPrice).toLocaleString()}</div>
      // key: 'productImage',
    },

    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary" ghost
              onClick={() => { handleEditVoucher(record) }}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title={`Bạn có chắc muốn xóa ${record.voucherName}`}
              onConfirm={() => deleteVoucherAdmin({ id: record.id })}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger ><DeleteOutlined /></Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  const tableData = voucherList.data.map((voucherListItem) => {
    return {
      ...voucherListItem,
      key: voucherListItem.id,
      voucherName: voucherListItem.voucherName,
      voucherPrice: voucherListItem.voucherPrice
    }
  })


  return (

    <>
      <Row justify="space-between" align="center">
        <img src={logo1}
          alt="Bodhi Logo Brand"
          style={{ width: "auto", height: "50px", cursor: "pointer" }}
          onClick={() => { history.push(ROUTERS.HOME) }}
        />
        <Button type="primary" onClick={() => handleCreateVoucher()}>
          <PlusOutlined /> Thêm Mã Khuyến Mãi
        </Button>
      </Row>

      <div className="admin-area_container">
        <Table
          style={{ width: "100%", }}
          loading={voucherList.load}
          columns={tableColumns}
          dataSource={tableData}
        />

        <Drawer
          title="Thêm mã khuyến mãi"
          width={500}
          visible={isShowModify}
          onClose={() => setIsShowModify(false)}
          footer={(
            <Row justify="end">
              <Space>
                <Button>Hủy</Button>
                <Button type="primary" onClick={() => handleSubmitForm()}>Lưu</Button>
              </Space>
            </Row>
          )}
        >
          <Form
            form={productForm}
            layout="vertical"
            name="productForm"
          >
            <Form.Item
              name="voucherName"
              label="Tên mã khuyến mãi"
              rules={[
                {
                  required: true,
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject('Không được để trống!');
                    }
                    else {
                      return Promise.resolve();
                    }
                  }
                }
              ]}
            >
              <Input placeholder="Tên mã khuyến mãi" />
            </Form.Item>

            <Form.Item
              name="voucherCode"
              label="Mã khuyến mãi"
              rules={[
                {
                  required: true,
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject('Không được để trống!');
                    }
                    else {
                      return Promise.resolve();
                    }
                  }
                }
              ]}
            >
              <Input placeholder="Mã khuyến mãi" />
            </Form.Item>

            <Form.Item
              name="voucherPrice"
              label="Giá khuyễn mãi"
              rules={[
                {
                  required: true,
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject('Không được để trống!');
                    }
                    else {
                      return Promise.resolve();
                    }
                  }
                }
              ]}
            >
              <InputNumber
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                placeholder="Giá khuyến mãi"
                style={{ width: '50%' }}
              />
            </Form.Item>

          </Form>
        </Drawer>

        <Modal
          title="Chỉnh sữa mã khuyến mãi"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <Form
            form={editForm}
            name="basic"
            initialValues={{
              ...voucherSelected
            }}
            onFinish={(values) => {
              const newVoucher = {
                voucherName: values.voucherName,
                voucherCode: values.voucherCode,
                voucherPrice: values.voucherPrice,
              }
              editVoucherAdmin({
                id: voucherSelected.id,
                newVoucher: newVoucher
              })
            }}
          >
            <Form.Item
              label="Voucher Name"
              name="voucherName"
              rules={[
                {
                  required: true,
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject('Không được để trống!');
                    }
                    else {
                      return Promise.resolve();
                    }
                  }
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Voucher Code"
              name="voucherCode"
              rules={[
                {
                  required: true,
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject('Không được để trống!');
                    }
                    else {
                      return Promise.resolve();
                    }
                  }
                }
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>


            <Form.Item
              label="Voucher Price"
              name="voucherPrice"
              rules={[
                {
                  required: true,
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject('Không được để trống!');
                    }
                    else {
                      return Promise.resolve();
                    }
                  }
                }
              ]}
            >
              <InputNumber
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                placeholder="Giá"
                style={{ width: '50%' }}
              />
            </Form.Item>
          </Form>

        </Modal>
      </div>


    </>
  )

}


const mapStateToProps = (state) => {
  const { productList, categoryList } = state.adminProductReducer;
  const { voucherList } = state.adminVoucherReducer;
  return {
    productList: productList,
    categoryList: categoryList,

    voucherList: voucherList,

  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    getProductListAdmin: (params) => dispatch(getProductListAdminAction(params)),
    getCategoryListAdmin: (params) => dispatch(getCategoryListAdminAction(params)),

    createVoucher: (params) => dispatch(createVoucherAdminAction(params)),

    getVoucherAdmin: (params) => dispatch(getVoucherAdminAction(params)),

    deleteVoucherAdmin: (params) => dispatch(deleteVoucherAdminAction(params)),

    editVoucherAdmin: (params) => dispatch(editVoucherAdminAction(params)),
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(AdminVoucher);