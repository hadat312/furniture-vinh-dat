import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Space, Tag, Typography, Card, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import history from '../../utils/history';

import {
  getProductListAction,
  getOrderListAction,
  deleteOrderAction,
} from '../../redux/actions';
import * as Style from './styles';
function OrderPage({
  productList,
  getProductList,
  orderList,
  getOrderList,
  deleteOrder,
}) {

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));


  const { Title } = Typography;

  useEffect(() => {
    getProductList({})
    getOrderList({ userId: userInfo.id });
  }, []);

  // useEffect(() => {
  //   getOrderList({ userId: userInfo.id });
  // }, [orderList.data]);

  // const [selectionType, setSelectionType] = useState('checkbox');

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   getCheckboxProps: (record) => ({
  //     disabled: record.name === 'Disabled User',
  //     // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // };
  const { confirm } = Modal;

  function showDeleteConfirm(text) {
    confirm({
      title: 'Bạn chắc chắn muốn xóa đơn hàng này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy bỏ',
      onOk() {
        deleteOrder({ id: text, userId: userInfo.id })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }




  function NestedTable() {
    const orderListData = orderList.data.map((orderItem) => {
      return {
        ...orderItem,
        regionName: orderItem.addressName + ', ' + orderItem.wardName + ', ' + orderItem.districtName + ', ' + orderItem.cityName,
        dateTime: 'ngày ' + orderItem.date + ', ' + orderItem.time,
        key: orderItem.id,
      }
    });

    const render = (id) => {
      const data = [];
      orderList.data.forEach((orderListItem, orderIndex) => {
        if (id === orderListItem.id) {
          orderListItem.carts.forEach((cartsItem, cartsIndex) => {
            const colorPrice = cartsItem.color.price || 0;
            const sizePrice = cartsItem.size.price || 0;
            const totalPrice = (cartsItem.productPrice + colorPrice + sizePrice) * cartsItem.productQuantity;
            data.push({
              key: cartsItem.id,
              id: cartsItem.id,
              productId: cartsItem.productId,
              productImage: cartsItem.productImage,
              productName: cartsItem.productName,
              productQuantity: cartsItem.productQuantity,
              productPrice: cartsItem.productPrice,
              productDiscount: cartsItem.productDiscount,
              colorId: cartsItem.color.id,
              colorName: cartsItem.color.colorName || 'không có',
              colorPrice: colorPrice,
              sizeId: cartsItem.size.id,
              sizeName: cartsItem.size.sizeName || 'không có',
              sizePrice: sizePrice,
              totalPrice: totalPrice * (1 - cartsItem.productDiscount),
            });
          })
        }
      })

      const goToProductDetail = (value) => {
        productList.data.forEach((productItem, productIndex) => {
          orderList.data.forEach((orderItem, orderIndex) => {
            if (id === orderItem.id) {
              orderItem.carts.forEach((cartItem, cartIndex) => {
                if (productItem.id === cartItem.productId && value === cartItem.productName) {
                  history.push(`/home/${productItem.categoryId}/${productItem.id}`)
                }
              })
            }
          })
        })
      }


      const columns = [
        {
          title: 'Tên sản phẩm',
          dataIndex: 'productName',
          render: (value) =>
            <Style.CustomText onClick={() => goToProductDetail(value)}>{value}</Style.CustomText>,
          width: '30%'
        },
        { title: 'Màu', dataIndex: 'colorName', width: '10%' },
        { title: 'Kích thước', dataIndex: 'sizeName' },
        { title: 'Số lượng', dataIndex: 'productQuantity' },
        {
          title: 'Đơn giá',
          dataIndex: 'productPrice',
          render: (value) =>
            <div>{value.toLocaleString() + ' vnđ'}</div>
        },
        {
          title: 'Giảm giá',
          dataIndex: 'productDiscount',
          render: (value) =>
            <div>{value * 100 + '%'}</div>
        },
        {
          title: 'Thành tiền',
          dataIndex: 'totalPrice',
          render: (value) =>
            <div>{value.toLocaleString() + ' vnđ'}</div>
        },
      ];

      return (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      );
    };

    const columns = [
      {
        title: 'Tên khách hàng',
        dataIndex: 'userName',
      },
      // { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Số điện thoại', dataIndex: 'phone' },
      {
        title: 'Địa chỉ nhận hàng',
        dataIndex: 'regionName',
        width: '20%'
      },
      // { title: 'Mã vùng', dataIndex: 'regionCode', width: '15%' },
      {
        title: 'Ngày đặt hàng',
        dataIndex: 'dateTime',
        // render: (text) => {
        //   <div>{text}</div>
        // } 
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        render: (text) =>
          <div>
            {
              text === "Đang giao hàng"
                ? <Tag style={{ fontSize: 15 }} color="gold">{text}</Tag>
                : <Tag style={{ fontSize: 15 }} color="green">{text}</Tag>
            }
          </div>
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'totalPrice',
        render: (text) =>
          <div>{text.toLocaleString() + ' vnđ'}</div>,
        key: 'totalPrice'
      },
      {
        title: 'Hành động',
        key: 'operation',
        render: (text) =>
          <Space justify="center">
            <Button danger onClick={() => showDeleteConfirm(text.id)}><DeleteOutlined /></Button>
          </Space>

      },
    ]


    return (
      <Table
        className="components-table-demo-nested"
        loading={orderList.load}
        columns={columns}
        expandable={{ expandedRowRender: item => render(item.id) }}
        dataSource={orderListData}
      />
    );
  }

  return (
    <>
      <Card
        title={
          <Title level={4}>Địa chỉ của tôi</Title>
        }
        bordered={true}
      >
        <Style.MainOrders>
          <NestedTable />
        </Style.MainOrders>

      </Card>
    </>
  );
}
const mapStateToProps = (state) => {
  const { productList } = state.productReducer;
  const { orderList } = state.orderReducer;
  return {
    productList: productList,
    orderList: orderList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params => dispatch(getProductListAction(params))),
    getOrderList: (params) => dispatch(getOrderListAction(params)),
    deleteOrder: (params) => dispatch(deleteOrderAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);