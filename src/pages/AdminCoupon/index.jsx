import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history'

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
} from 'antd';

import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import {
 
} from '../../redux/actions'

function AdminCoupon() {

  


}


const mapStateToProps = (state) => {
  const { productList, categoryList } = state.adminProductReducer;
  return {
    productList: productList,
    categoryList: categoryList,

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getProductList: (params) => dispatch(getProductListAction(params)),

   





  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCoupon);