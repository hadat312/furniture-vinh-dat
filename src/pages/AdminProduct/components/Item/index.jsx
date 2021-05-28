import React, { useState } from 'react';
import history from '../../../../utils/history';
import { connect } from 'react-redux';

import { Row, Col, Space, Card, Form, Input, Button, Table, Modal } from 'antd';

import './styles.css';

function Item(props) {
    const { productListItem, onDeleteProductList, handleEditProductList } = props;
    const [isEdit, setIsEdit] = useState(false);

    const [editForm] = Form.useForm();

    // Get Info from Local
    const UserInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

    // Khai Bao Cua Modal

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <tbody>
                <tr className="product-item">
                    <td className="product-id">
                        {productListItem.id}
                    </td>

                    <td className="product-name" >
                        {isEdit
                            ? <Modal title="Human Resource Management" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <Form
                                    // {...layout}
                                    form={editForm}
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={(values) => {
                                        handleEditProductList(values, productListItem.id);
                                        setIsEdit(false);
                                    }}
                                >
                                    <Form.Item
                                        label="Product Name"
                                        name="productName"
                                       
                                    >
                                        <Input />
                                    </Form.Item>
                                </Form>

                                <Form
                                    // {...layout}
                                    form={editForm}
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={(values) => {
                                        handleEditProductList(values, productListItem.id);
                                        setIsEdit(false);
                                    }}
                                >
                                    <Form.Item
                                        label="Product Image"
                                        name="productImage"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Form>

                                {/* form phone number */}
                                <Form
                                    // {...layout}
                                    form={editForm}
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={(values) => {
                                        handleEditProductList(values, productListItem.id);
                                        setIsEdit(false);
                                    }}
                                >
                                    <Form.Item
                                        label="Product Price"
                                        name="produtPrice"
                                      
                                    >
                                        <Input />
                                    </Form.Item>
                                </Form>

                                <Form
                                    // {...layout}
                                    form={editForm}
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={(values) => {
                                        handleEditProductList(values, productListItem.id);
                                        setIsEdit(false);
                                    }}
                                >
                                    <Form.Item
                                        label="Product Discount"
                                        name="productDiscount"
                                      
                                    >
                                        <Input />
                                    </Form.Item>
                                </Form>
                            </Modal>
                            : productListItem.productName
                        }
                    </td>

                    <td className="product-image">
                        <img src={productListItem.productImage} alt="" />
                        {/* <img src={productListItem.productImage[0]} alt="" />   -- ảnh dạng mảng*/}  
                    </td>


                    <td className="product-price">
                        {productListItem.productPrice}
                    </td>

                    <td className="product-price">
                        {productListItem.productDiscount}
                    </td>

                    <td className="product-remove">
                        <button >
                            <span onClick={() => onDeleteProductList(productListItem.id)}>X</span>
                        </button>
                    </td>

                    {/* Button - Area */}
                    <td>
                        {isEdit
                            ? (
                                <>
                                <Button type="primary">
                                        <span onClick={() => {
                                            editForm.submit();
                                        }}>Confirm</span>
                                    </Button>

                                    <Button type="primary">
                                        <span onClick={() => setIsEdit(false)}>Cancel</span>
                                    </Button>
                                </>
                            )

                            : (
                                <Button type="primary" onClick={() => {
                                    { showModal() };
                                    setIsEdit(true)
                                }}>
                                    Edit
                                </Button>
                            )
                        }
                    </td>
                </tr>
            </tbody>

        </>

    )


}
export default Item;