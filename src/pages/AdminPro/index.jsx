import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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


import SizeOption from './SizeOption';

import ColorOption from './ColorOption'

import './styles.css';


import logo1 from '../../images/logo1.jpg'
import { ROUTERS } from '../../constants/router';

function AdminProduct(props) {
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
    const [isShowModify, setIsShowModify] = useState(false);

    // {} là create / Object có data là edit
    const [isOptionForm, setIsOptionForm] = useState(false);
    const [isShowCreateOption, setIsShowCreateOption] = useState(false);

    // Show Create Option Color
    const [isColorOptionForm, setIsColorOptionForm] = useState(false);
    const [isShowCreateColor, setIsShowCreateColor] = useState(false);
    const [isShowModifyColor, setIsShowModifyColor] = useState(false);

    const [productForm] = Form.useForm();

    const [dataDescription, setDataDescription] = useState('');

    const [dataStorageInstruction, setDataStorageInstruction] = useState('');


    // useEffect(() => {
    //     getProductListAdmin({ categoryId: categoryId })
    // }, [categoryId])

    useEffect(() => {
        getProductListAdmin();
        getCategoryListAdmin();
    }, []);

    useEffect(() => {
        if (isShowModify) {
            setIsShowCreateOption(false)
        }
    }, [isShowModify]);

    //  Show Create Option Color
    useEffect(() => {
        if (isShowModifyColor) {
            setIsShowCreateColor(false)
        }
    }, [isShowModifyColor])

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
        if (colorSelected.id) {
            editProductAdmin({ id: colorSelected.id, ...values })
        }
        else {
            const newProduct = {
                ...values,
                productDescription: dataDescription,
                productStorageInstruction: dataStorageInstruction
            }
            createProductAdmin(newProduct)
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
            productItem.colors.forEach((anotherOption) => {

                if (option.price > maxValue && anotherOption.price > maxValue) maxValue = option.price + anotherOption.price;
                if (option.price < minValue && anotherOption.price < minValue) minValue = option.price + anotherOption.price;
            })
        })

        // productItem.colors.forEach((anotherOption) => {
        //     // console.log("🚀 ~ file: index.jsx ~ line 196 ~ productItem.colors.forEach ~ anotherOption", anotherOption)
        //     if(anotherOption.price > maxValue) maxValue=anotherOption.price;
        //     if(anotherOption.price < minValue) minValue=anotherOption.price;
        // })


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

    function renderProductId() {
        return productList.data.map((productListItem, productIndex) => {
            return (
                <Select.Option key={productIndex} value={productListItem.id}>
                    {productListItem.productName}
                </Select.Option>
            )
        })
    }

    // function 

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
                        label="Kích Thước"
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
            return (
                <SizeOption
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
                <h4>Danh sách kích thước</h4>
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
                        setIsShowCreateColor(false);
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
                            <Button onClick={() => setIsShowCreateColor(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit">Thêm</Button>
                        </Space>
                    </Row>
                </Form>
            </Card>
        )
    }

    function renderColorOptionItems() {
        return colorSelected.colors.map((colorItem, colorIndex) => {
            // console.log("🚀 ~ file: index.jsx ~ line 348 ~ returncolorSelected.sizes.map ~ colorItem", colorItem)
            return (
                <ColorOption
                    key={colorIndex}
                    colorItem={colorItem}
                    productId={colorSelected.id}
                />
            )
        })
    }
    function renderColorOptionForm() {
        return (
            <div style={{ marginTop: 16 }}>
                <h4>Danh sách màu sắc</h4>
                {
                    colorSelected.id &&
                    colorSelected.colors.length > 0 &&
                    renderColorOptionItems()
                }
                {isShowCreateColor
                    ? renderCreateOptionColor()
                    : (
                        <Button
                            type="dashed"
                            block
                            icon={<PlusOutlined />}
                            onClick={() => setIsShowCreateColor(true)}
                        >
                            Thêm tùy chọn
                        </Button>
                    )
                }
            </div>
        )
    }

    function onChange(values) {          // Render Category Name

    }

    function onChangeLength(value) {     // Onchange Chiều Dài trong mô tả sản phẩm
        console.log('changedLength', value);
    }

    function onChangeHeight(value) {    // Onchange Chiều Cao trong mô tả sản phẩm
        console.log('changedHeight', value);
    }

    function onChangeWidth(value) {   // Onchange Chiều Rộng trong mô tả sản phẩm
        console.log('changedWidth', value);
    }

    function onChangeDescriptionEditor(event, editor) {  // Onchange Description
        const data = editor.getData();
        setDataDescription(data);
        // console.log({ data });
    }

    function onChangeProductStorageInstruction(even, editor) {   // Onchange Product Storage Instruction
        const data = editor.getData();
        setDataStorageInstruction(data)
    }

    return (
        <>
            <Row justify="space-between" align="center" style={{ marginTop: 130 }}>
                <img src={logo1} alt="Bodhi Logo Brand" style={{ width: "auto", height: "50px" }} />
                <Button type="primary" onClick={() => handleCreateProduct()}>
                    <PlusOutlined /> Thêm Mới
                </Button>
            </Row>

            <Row justify="center" style={{ marginBottom: 16 }}>
                <h3 >Danh sách sản phẩm</h3>
            </Row>

            <div className="admin-area_container">
                <div className="admin-side_left">
                    <div className="sidebar-admin-user-menu">
                        <div className="side-admin-user-link">
                            <i className="fa fa-home text-lightblue"></i>
                            <span onClick={() => { history.push(ROUTERS.ADMIN) }}>Dashboard</span>
                        </div>

                        <div className="side-admin-user-link  active-admin-user-link">
                            <i className="fa fa-user-secret text-lightblue"></i>
                            <span onClick={() => history.push(ROUTERS.ADMIN_USER)}>Quản Lý Tài Khoản</span>
                        </div>

                        <div className="side-admin-user-link">
                            <i className="fa fa-handshake text-lightblue"></i>
                            <span >Quản Lý Sản Phẩm</span>
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
                            rowExpandable: (record) => record.sizes.length > 0 || record.colors.length > 0
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
                                <Select placeholder="Loại sản phẩm" onChange={onChange} >
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

                            <Form
                                form={productForm}
                                layout="vertical"
                                // name="productForm"
                                initialValues={{
                                    productSpecificationsLength: 100,
                                    productSpecificationsHeight: 100,
                                    productSpecificationsWidth: 100,
                                }}
                            >
                                <Form.Item name="productSpecificationsLength" label="Thông số chiều Dài (cm)">
                                    <InputNumber min={100} max={400} onChange={onChangeLength} />
                                </Form.Item>

                                <Form.Item name="productSpecificationsHeight" label="Thông số chiều Cao">
                                    <InputNumber min={100} max={400} onChange={onChangeHeight} />
                                </Form.Item>

                                <Form.Item name="productSpecificationsWidth" label="Thông số chiều Rộng">
                                    <InputNumber min={100} max={400} onChange={onChangeWidth} />
                                </Form.Item>
                            </Form>

                            <div>
                                <h6>Mô Tả Sản Phẩm</h6>
                                <CKEditor

                                    editor={ClassicEditor}
                                    // data="<p>Hello from CKEditor 5!</p>"
                                    // onReady={editor => {
                                    //     // You can store the "editor" and use when it is needed.
                                    //     console.log('Editor is ready to use!', editor);
                                    // }}
                                    onChange={(event, editor) => onChangeDescriptionEditor(event, editor)}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </div>

                            <div>
                                <h6>Hướng Dẫn Bảo Quản</h6>
                                <CKEditor
                                    editor={ClassicEditor}
                                    // data="<p>Hello from CKEditor 5!</p>"
                                    // onReady={editor => {
                                    //     // You can store the "editor" and use when it is needed.
                                    //     console.log('Editor is ready to use!', editor);
                                    // }}
                                    onChange={(event, editor) => onChangeProductStorageInstruction(event, editor)}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </div>





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