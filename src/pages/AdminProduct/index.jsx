import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Input, Space, Col } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

import Item from '../AdminProduct/components/Item'
import logo1 from '../../images/logo1.jpg'
import history from '../../utils/history'

import './styles.css';

import {
    getUserInfoAction,
    getProductListAction,
    deleteProductTaskAction,
    editProductListAction,
} from '../../redux/actions'

function AdminProductPage(props) {

    const { getProductList,
        productList,
        getUserInfo,
        userInfo,
        deleteProductList,
        editProductList
    } = props;

    useEffect(() => {
        getProductList({
            page: 1,
            limit: 5,
        })
    }, []);

    useEffect(() => {
        const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || {};
        if (userInfoLocalStorage && userInfoLocalStorage.id) {
            getUserInfo({ id: userInfoLocalStorage.id });
        }
    }, []);


    const [searchKey, setSearchKey] = useState('');

    // Delete Product
    function onDeleteProductList(id) {
        productList.data.map((productListItem) => {
            if (id === productListItem.id) {
                return deleteProductList({ id: productListItem.id });
            }
        })
    }

    // Search Product
    const filterProductList = productList.data.filter((item) => {
        return item.productName.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1;
    })

    // Edit Product

    function handleEditProductList(values, id) {
        // window.location.reload();
        productList.data.map((productListItem, productListIndex) => {
            if (id === productListItem.id) {
                return editProductList({ ...values, id: productListItem.id });
            }
        })
    }


    function renderProductList() {
        if (filterProductList.load) return <p>Loading...</p>
        return filterProductList.map((productListItem, productIndex) => {
            return (
                <Item
                    key={productListItem.id}
                    productListItem={productListItem}
                    onDeleteProductList={onDeleteProductList}
                    handleEditProductList={handleEditProductList}
                />
            )
        })
    }

    return (
        <>
            <div className="admin-product_area">
                <div className="admin-product-header ">
                    <h1>Manager</h1>
                    <Input.Search
                        onChange={(e) => setSearchKey(e.target.value)}
                        placeholder="Search..." style={{ width: 400 }}
                    />
                </div>

                <div className="main-admin-product_container">
                    <div className="main-product-left">
                        <div className="sidebar-admin-product-menu">
                            <div className="sidebar-admin-product-link">
                                <i className="fa fa-home text-lightblue"></i>
                                <span onClick={() => history.push('/admin')}>Dashboard</span>
                            </div>

                            <div className="sidebar-admin-product-link  ">
                                <i className="fa fa-user-secret text-lightblue"></i>
                                <span onClick={() => history.push('/admin-user')}>Quản Lý Tài Khoản</span>
                            </div>

                            <div className="sidebar-admin-product-link active-admin-product-link">
                                <i className="fa fa-handshake text-lightblue"></i>
                                <span>Quản Lý Sản Phẩm</span>
                            </div>
                        </div>
                    </div>

                    <div className="main-product-right">
                        <table className="admin-product_table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th >Product Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th>Trash</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {renderProductList()}
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}




const mapStateToProps = (state) => {
    const { productList } = state.productReducer;
    const { userInfo } = state.userReducer
    console.log("🚀 ~ file: index.jsx ~ line 129 ~ mapStateToProps ~ productList", productList)
    return {
        userInfo: userInfo,
        productList: productList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (params) => dispatch(getUserInfoAction(params)),

        getProductList: (params) => dispatch(getProductListAction(params)),

        deleteProductList: (params) => dispatch(deleteProductTaskAction(params)),
        editProductList: (params) => dispatch(editProductListAction(params)),


    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductPage);