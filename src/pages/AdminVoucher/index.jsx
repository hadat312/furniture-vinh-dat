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
  voucherSelected,
  setVoucherSelect,
}) {
  console.log("🚀 ~ file: index.jsx ~ line 57 ~ voucherList", voucherList)

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


  // function renderCategoryOptions() {
  //   return categoryList.data.map((categoryItem, categoryIndex) => {
  //     return (
  //       <Select.Option key={categoryIndex} value={categoryItem.id}>
  //         {categoryItem.categoryName}
  //       </Select.Option>
  //     )
  //   })
  // }

  // function renderProductOptions() {
  //   return categoryList.data.map((categoryItem, categoryIndex) => {
  //     return productList.data.map((productListItem, productListIndex) => {
  //       if (categoryItem.id === productListItem.categoryId) {
  //         return (
  //           <Select.Option key={productListIndex} value={productListItem.id}>
  //             {productListItem.productName}
  //           </Select.Option>
  //         )
  //       }
  //     })
  //   })
  // }


  function handleCreateVoucher() {
    setIsShowModify(true);
  }

  function handleEditVoucher(record) {
    setIsModalVisible(true)
    setVoucherSelect(record)
  }



  function handleSubmitForm() {
    const values = productForm.getFieldsValue();
    if (voucherList.id) {
      editVoucherAdmin({ id: voucherList.id, ...values })
    }
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
        console.log("🚀 ~ file: index.jsx ~ line 152 ~ record", record)
        return (
          <Space>
            <Button type="primary" ghost
              onClick={() => handleEditVoucher(record)}
            >
              {/* {console.log("🚀 ~ file: index.jsx ~ line 205 ~ AdminVoucher ~ record", record)} */}
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
        <img src={logo1} alt="Bodhi Logo Brand" style={{ width: "auto", height: "50px" }} />
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
        // expandable={{
        //   expandedRowRender: (record) => {
        //     return (
        //       <div>

        //       </div>
        //     )
        //   },
        //   // rowExpandable: (record) => record.sizes.length > 0 || record.colors.length > 0
        // }}
        />
        <Drawer
          title="Thêm mã Khuyên Mãi"
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
            <Form.Item name="voucherName" label="Tên mã khuyến mãi">
              <Input placeholder="Tên mã khuyến mãi" />
            </Form.Item>


            <Form.Item name="voucherPrice" label="Giá khuyễn mãi">
              <InputNumber
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                placeholder="Giá khuyến mãi"
                style={{ width: '100%' }}
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
            // {...layout}
            form={editForm}
            name="basic"
            initialValues={
              voucherSelected.id
              && {...voucherSelected}
            }
            onFinish={(values) => {
              editVoucherAdmin({ id: voucherSelected.id, ...values })
            }}
          >
            <Form.Item
              label="Voucher Name"
              name="voucherName"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Voucher Price"
              name="voucherPrice"
            >
              <Input />
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
  const { voucherSelected } = state.adminCommonReducer;
  return {
    productList: productList,
    categoryList: categoryList,

    voucherList: voucherList,
    voucherSelected: voucherSelected,

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
    setVoucherSelect: (params) => dispatch(setVoucherSelectAction(params)),
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(AdminVoucher);