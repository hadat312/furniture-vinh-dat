import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Space, Tag, Typography, Card, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import {
  getOrderListAction,
  deleteOrderAction
} from '../../redux/actions';
import * as Style from './styles';
function OrderPage({
  orderList,
  getOrderList,
  deleteOrder,
}) {

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));


  const { Title } = Typography;

  useEffect(() => {
    getOrderList({ userId: userInfo.id });
  }, []);

  const [selectionType, setSelectionType] = useState('checkbox');

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
        key: orderItem.id,
      }
    });
    // orderList.data.forEach((orderListItem, orderIndex) => {
    //   orderListData.push({
    //     key: orderListItem.id,
    //     id: orderListItem.id,
    //     userName: orderListItem.userName,
    //     email: orderListItem.email,
    //     phone: orderListItem.phone,
    //     address: orderListItem.address,
    //     date: orderListItem.date,
    //     time: orderListItem.time,
    //     totalPrice: orderListItem.totalPrice,
    //   });
    // })

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


      const columns = [
        {
          title: 'Tên sản phẩm',
          dataIndex: 'productName',
          render: (value) =>
            <Style.CustomText>{value.toLocaleString() + ' vnđ'}</Style.CustomText>,
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
          title: 'Tổng tiền',
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

    console.log('orderList: ', orderListData);

    const columns = [
      {
        title: 'Tên khách hàng',
        dataIndex: 'userName',
      },
      // { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Số điện thoại', dataIndex: 'phone' },
      {
        title: 'Địa chỉ nhận hàng',
        dataIndex: 'address',
        width: '20%'
      },
      // { title: 'Mã vùng', dataIndex: 'regionCode', width: '15%' },
      { title: 'Ngày đặt hàng', dataIndex: 'date' },
      { title: 'Giờ đặt hàng', dataIndex: 'time' },
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
          // <Tag color='red' style={{ cursor: "pointer" }}><DeleteOutlined /></Tag>
          <Space justify="center">
            <Button danger onClick={() => showDeleteConfirm(text.id)}><DeleteOutlined /></Button>
          </Space>

      },
    ];


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
  const { orderList } = state.orderReducer;
  return {
    orderList: orderList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderList: (params) => dispatch(getOrderListAction(params)),
    deleteOrder: (params) => dispatch(deleteOrderAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);