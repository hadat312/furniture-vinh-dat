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
    getProductListAdminAction,
    getCategoryListAdminAction,
    createOptionAdminAction,

    createProductAdminAction,
    editProductAdminAction,
    deleteProductAdminAction,

    createOptionColorAction,
    setColorSelectAction,

    setProductSelectAction,
} from '../../redux/actions';


import ProductOption from './ProductOption';

import './styles.css';


import logo1 from '../../images/logo1.jpg'

function AdminProduct(props) {
    const [isShowModify, setIsShowModify] = useState(false);
    // {} là create / Object có data là edit
    const [isOptionForm, setIsOptionForm] = useState(false);
    const [isShowCreateOption, setIsShowCreateOption] = useState(false);

    // Show Create Option Color
    const [isColorOptionForm, setIsColorOptionForm] = useState(false);
    const [isShowCreateColor, setIsShowCreateColor] = useState(false);

    const [productForm] = Form.useForm();

    const {
        getCategoryListAdmin,
        getProductListAdmin,
        createProductAdmin,
        editProductAdmin,
        deleteProductAdmin,
        productList,
        categoryList,
        createOptionAdmin,

        createOptionColor,
        colorSelected,
        setColorSelect,

        setProductSelect,
        productSelected,
    } = props;


    useEffect(() => {
        getProductListAdmin();
        getCategoryListAdmin();
    }, []);

    useEffect(() => {
        if (isShowModify) {
            setIsShowCreateOption(false)
        }
    }, [isShowModify]);

    useEffect(() => {
        productForm.resetFields();
        setIsOptionForm(productSelected.sizes?.length > 0);
    }, [productSelected.id]);

    // Colors

    useEffect(() => {
        productForm.resetFields();
        setIsColorOptionForm(colorSelected.colors?.length > 0);
    }, [colorSelected.id]);



    // Function - Area

    function handleEditProduct(record) {
        setIsShowModify(true);
        setProductSelect(record);
        setColorSelect(record);
    }

    function handleCreateProduct() {
        setIsShowModify(true);
        setProductSelect({});
    }

    function handleSubmitForm() {
        const values = productForm.getFieldsValue();
        if (productSelected.id) {
            editProductAdmin({ id: productSelected.id, ...values });
        }
        else if (colorSelected.id) {
            editProductAdmin({ id: colorSelected.id, ...values })
        }
        else {
            createProductAdmin(values)
        }
        setIsShowModify(false);
    }


    const tableColumns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'productImage',
            // key: 'productImage',
            render: (_, record) => {
                return (
                    <img src={record.productImage[0]} style={{ width: "auto", height: "100px" }} />
                )
            }
        },

        {
            title: 'Loại sản phẩm',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Giá',
            dataIndex: 'minMaxPrice',
            key: 'minMaxPrice',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space>
                        <Button type="primary" ghost onClick={() => handleEditProduct(record)}>
                            <EditOutlined />
                        </Button>
                        <Popconfirm
                            title={`Bạn có chắc muốn xóa ${record.name}`}
                            onConfirm={() => deleteProductAdmin({ id: record.id })}
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

    const tableData = productList.data.map((productItem) => {
        let minValue = 0;
        let maxValue = 0;
        productItem.sizes.forEach((option) => {
            if (option.price > maxValue) maxValue = option.price;
            if (option.price < minValue) minValue = option.price;
        })

        return {
            ...productItem,
            key: productItem.id,
            categoryName: productItem.category.categoryName,
            minMaxPrice: productItem.sizes.length > 0
                ? productItem.sizes.length === 1
                    ? (productItem.productPrice + maxValue).toLocaleString()
                    : `${(productItem.productPrice + minValue).toLocaleString()} - ${(productItem.productPrice + maxValue).toLocaleString()}`
                : productItem.productPrice.toLocaleString()
        }
    });

    function renderCategoryOptions() {
        return categoryList.data.map((categoryItem, categoryIndex) => {
            return (
                <Select.Option key={categoryIndex} value={categoryItem.id}>
                    {categoryItem.categoryName}
                </Select.Option>
            )
        })
    }

    function renderCreateOptionForm() {
        return (
            <Card size="small" title="Thêm mới">
                <Form
                    name="createProductOption"
                    onFinish={(values) => {
                        createOptionAdmin({
                            productId: productSelected.id,
                            ...values,
                            setProductSelect,
                        })
                        setIsShowCreateOption(false);
                    }}
                >
                    <Form.Item
                        name="sizeName"
                        label="Tùy chọn"
                        rules={[{ required: true, message: 'Bạn chưa điền tên của tùy chọn' }]}
                    >
                        <Input placeholder="Tùy chọn" />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá thêm"
                        rules={[{ required: true, message: 'Bạn chưa điền giá của tùy chọn' }]}
                    >
                        <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            placeholder="Giá thêm"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Row justify="end">
                        <Space>
                            <Button onClick={() => setIsShowCreateOption(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit">Thêm</Button>
                        </Space>
                    </Row>
                </Form>
            </Card>
        )
    }

    function renderProductOptionItems() {
        return productSelected.sizes.map((sizeOptionItem, sizeOptionIndex) => {
            console.log("🚀 ~ file: index.jsx ~ line 259 ~ returnproductSelected.sizes.map ~ sizeOptionItem", sizeOptionItem)
            return (
                <ProductOption
                    key={sizeOptionIndex}
                    sizeOptionItem={sizeOptionItem}
                    productId={productSelected.id}
                />
            )
        })
    }

    function renderProductOptionForm() {
        return (
            <div style={{ marginTop: 16 }}>
                <h4>Danh sách tùy chọn</h4>
                {
                    productSelected.id &&
                    productSelected.sizes.length > 0 &&
                    renderProductOptionItems()
                }
                {isShowCreateOption
                    ? renderCreateOptionForm()
                    : (
                        <Button
                            type="dashed"
                            block
                            icon={<PlusOutlined />}
                            onClick={() => setIsShowCreateOption(true)}
                        >
                            Thêm tùy chọn
                        </Button>
                    )
                }
            </div>
        )
    }

    // Render Option Colors

    function renderCreateOptionColor() {
        return (
            <Card size="small" title="Thêm mới Color">
                <Form
                    name="createColorOption"
                    onFinish={(values) => {
                        createOptionColor({
                            productId: colorSelected.id,
                            ...values,
                            setColorSelect,
                        })
                        setIsShowCreateOption(false);
                    }}
                >
                    <Form.Item
                        name="colorName"
                        label="Tên Màu"
                        rules={[{ required: true, message: 'Bạn chưa điền tên của tùy chọn' }]}
                    >
                        <Input placeholder="Tùy chọn" />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá thêm"
                        rules={[{ required: true, message: 'Bạn chưa điền giá của tùy chọn' }]}
                    >
                        <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            placeholder="Giá thêm"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Row justify="end">
                        <Space>
                            <Button onClick={() => setIsShowCreateOption(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit">Thêm</Button>
                        </Space>
                    </Row>
                </Form>
            </Card>
        )
    }

    function renderColorOptionItems() {
        return colorSelected.sizes.map((colorItem, colorIndex) => {
            return (
                <ProductOption
                    key={colorIndex}
                    optionItem={colorItem}
                    productId={colorSelected.id}
                />
            )
        })
    }
    function renderColorOptionForm() {
        return (
            <div style={{ marginTop: 16 }}>
                <h4>Danh sách tùy chọn</h4>
                {
                    colorSelected.id &&
                    colorSelected.colors.length > 0 &&
                    renderColorOptionItems()
                }
                {isShowCreateOption
                    ? renderCreateOptionColor()
                    : (
                        <Button
                            type="dashed"
                            block
                            icon={<PlusOutlined />}
                            onClick={() => setIsShowCreateOption(true)}
                        >
                            Thêm tùy chọn
                        </Button>
                    )
                }
            </div>
        )
    }

    return (
        <>
            <Row justify="space-between" align="center" style={{ marginTop: 16 }}>
                <img src={logo1} alt="Bodhi Logo Brand" style={{ width: "auto", height: "50px" }} />
                <Button type="primary" onClick={() => handleCreateProduct()}>
                    <PlusOutlined /> Thêm Mới
                </Button>
            </Row>

            <Row justify="center" style={{ marginBottom: 16 }}>
                <h3>Danh sách sản phẩm</h3>
            </Row>

            <div className="admin-area_container">
                <div className="admin-side_left">
                    <div className="sidebar-admin-user-menu">
                        <div className="side-admin-user-link">
                            <i className="fa fa-home text-lightblue"></i>
                            <span onClick={() => history.push('/admin')}>Dashboard</span>
                        </div>

                        <div className="side-admin-user-link  active-admin-user-link">
                            <i className="fa fa-user-secret text-lightblue"></i>
                            <span >Quản Lý Tài Khoản</span>
                        </div>

                        <div className="side-admin-user-link">
                            <i className="fa fa-handshake text-lightblue"></i>
                            <span onClick={() => history.push('/admin/product')}>Quản Lý Sản Phẩm</span>
                        </div>
                    </div>
                </div>

                <div className="admin-side-right">
                    <Table
                        loading={productList.load}
                        columns={tableColumns}
                        dataSource={tableData}
                        expandable={{
                            expandedRowRender: (record) => {
                                return (
                                    <div>
                                        {record.sizes.length > 0 && (
                                            <>
                                                Danh sách kích thước
                                                <List
                                                    size="small"
                                                    dataSource={record.sizes}
                                                    renderItem={(item) => (
                                                        <List.Item>
                                                            <Row justify="space-between" align="center" style={{ width: '100%' }}>
                                                                <div style={{ padding: "10px" }}>Kích thước: {item.sizeName}</div>
                                                                <div>Giá thêm: {(item.price).toLocaleString()}</div>
                                                            </Row>
                                                        </List.Item>
                                                    )}
                                                />
                                            </>
                                        )}
                                        {record.colors.length > 0 && (
                                            <>
                                                Danh sách màu sắc
                                                <List
                                                    size="small"
                                                    dataSource={record.colors}
                                                    renderItem={(item) => (
                                                        <List.Item>

                                                            <Row justify="space-between" align="center" style={{ width: '100%' }}>
                                                                <div style={{ padding: "10px" }}>Màu sắc: {item.colorName}</div>
                                                                <div>Giá thêm: {(item.price).toLocaleString()}</div>
                                                            </Row>
                                                        </List.Item>
                                                    )}
                                                />
                                            </>
                                        )}
                                    </div>
                                )
                            },
                            rowExpandable: (record) => record.sizes.length > 0
                            // rowExpandable: (record) => record.colors.length > 0
                        }}
                    />
                    <Drawer
                        title={productSelected.id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
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
                            initialValues={productSelected.id
                                ? { ...productSelected, hasOption: false }
                                : {}
                            }
                        >
                            <Form.Item name="productName" label="Tên sản phẩm">
                                <Input placeholder="Tên sản phẩm" />
                            </Form.Item>
                            <Form.Item name="categoryId" label="Loại sản phẩm">
                                <Select placeholder="Loại sản phẩm">
                                    {renderCategoryOptions()}
                                </Select>
                            </Form.Item>
                            <Form.Item name="productPrice" label="Giá gốc">
                                <InputNumber
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    placeholder="Giá gốc"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            {productSelected.id && (
                                <>
                                    <Row justify="space-between">
                                        <Checkbox checked={isOptionForm} onChange={(e) => setIsOptionForm(e.target.checked)}>Thêm Kích Thước</Checkbox>
                                        <Checkbox checked={isColorOptionForm} onChange={(e) => setIsColorOptionForm(e.target.checked)}>Thêm Màu</Checkbox>
                                    </Row>
                                </>
                            )}
                        </Form>

                        {isOptionForm && productSelected.id && renderProductOptionForm()}

                        {isColorOptionForm && colorSelected.id && renderColorOptionForm()}


                    </Drawer>
                </div>
            </div>

        </>
    )

}

const mapStateToProps = (state) => {
    const { productList, categoryList } = state.adminProductReducer;
    const { productSelected, colorSelected } = state.adminCommonReducer;
    return {
        productList: productList,
        categoryList: categoryList,

        productSelected: productSelected,
        colorSelected: colorSelected,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getProductList: (params) => dispatch(getProductListAction(params)),

        getProductListAdmin: (params) => dispatch(getProductListAdminAction(params)),
        getCategoryListAdmin: (params) => dispatch(getCategoryListAdminAction(params)),

        createOptionAdmin: (params) => dispatch(createOptionAdminAction(params)),
        setProductSelect: (params) => dispatch(setProductSelectAction(params)),

        createProductAdmin: (params) => dispatch(createProductAdminAction(params)),
        editProductAdmin: (params) => dispatch(editProductAdminAction(params)),
        deleteProductAdmin: (params) => dispatch(deleteProductAdminAction(params)),

        // Create Color Option
        createOptionColor: (params) => dispatch(createOptionColorAction(params)),
        setColorSelect: (params) => dispatch(setColorSelectAction(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProduct);