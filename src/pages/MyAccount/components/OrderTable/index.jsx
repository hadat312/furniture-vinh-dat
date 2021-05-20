import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Space, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getOrderListAction } from '../../../../redux/actions';
import './orderTable.css'
function OrderTable({
  orderList,
  getOrderList
}) {

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

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


  function NestedTable() {
    const orderListData = [];
    orderList.data.forEach((orderListItem, orderIndex) => {
      orderListData.push({
        key: orderListItem.id,
        id: orderListItem.id,
        firstName: orderListItem.firstName,
        lastName: orderListItem.lastName,
        email: orderListItem.email,
        phone: orderListItem.phone,
        address: orderListItem.address,
        date: orderListItem.date,
        time: orderListItem.time,
        totalPrice: orderListItem.totalPrice,
      });
    })

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
        { title: 'Tên sản phẩm', dataIndex: 'productName' },
        { title: 'Màu', dataIndex: 'colorName' },
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

    const columns = [
      { title: 'Họ', dataIndex: 'lastName', key: 'lastName' },
      { title: 'Tên', dataIndex: 'firstName', key: 'firstName' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
      { title: 'Địa chỉ nhận hàng', dataIndex: 'address', key: 'address' },
      { title: 'Ngày đặt hàng', dataIndex: 'date', key: 'date' },
      { title: 'Giờ đặt hàng', dataIndex: 'time', key: 'time' },
      {
        title: 'Tổng tiền',
        dataIndex: 'totalPrice',
        render: (text) =>
          <div>{text.toLocaleString() + ' vnđ'}</div>,
        key: 'totalPrice'
      },
      {
        title: 'Thao tác',
        key: 'operation',
        render: () =>
          // <Tag color='red' style={{ cursor: "pointer" }}><DeleteOutlined /></Tag>
          <Space justify="center">
            <Button danger ><DeleteOutlined /></Button>
          </Space>

      },
    ];


    return (
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandable={{ expandedRowRender: item => render(item.id) }}
        dataSource={orderListData}
        pagination={false}
      />
    );
  }

  return (
    // <Table
    //   rowSelection={{
    //     type: selectionType,
    //     ...rowSelection,
    //   }}
    //   columns={columns}
    //   dataSource={orderList.data}
    //   pagination={{ defaultCurrent: 1 }}
    // />
    // <Table
    //   columns={columns}
    //   expandable={{
    //     expandedRowRender: record => <p style={{ margin: 0 }}>{record.date}</p>,
    //     rowExpandable: record => record.name !== 'Not Expandable',
    //   }}
    //   dataSource={orderList}
    // />
    <NestedTable />
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTable);