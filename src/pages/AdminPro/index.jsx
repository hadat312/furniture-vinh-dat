import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import { AudioOutlined, UploadOutlined } from '@ant-design/icons';

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
    Upload,
    message,
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
    getCategoryListSearchKey,
    getItemCategoriesAction,
    getSubCategoriesAction
} from '../../redux/actions';


import SizeOption from './SizeOption';

import ColorOption from './ColorOption'

import './styles.css';


import logo1 from '../../images/logo1.jpg'
import { ROUTERS } from '../../constants/router';

function AdminProduct(props) {
    const {

        getCategorySearchKey,  // Get Category theo Search key

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

        getItemCategory,
        itemCategories,
        getSubCategory,
        subCategories
    } = props;
    console.log("🚀 ~ file: index.jsx ~ line 89 ~ AdminProduct ~ productSelected", productSelected)
    const [isShowModify, setIsShowModify] = useState(false);

    // {} là create / Object có data là edit
    const [isOptionForm, setIsOptionForm] = useState(false);
    const [isShowCreateOption, setIsShowCreateOption] = useState(false);

    // Show Create Option Color
    const [isColorOptionForm, setIsColorOptionForm] = useState(false);
    const [isShowCreateColor, setIsShowCreateColor] = useState(false);
    // const [isShowModifyColor, setIsShowModifyColor] = useState(false);  

    const [productForm] = Form.useForm();

    const [dataDescription, setDataDescription] = useState('');

    const [dataStorageInstruction, setDataStorageInstruction] = useState('');


    const [searchKey, setSearchKey] = useState(null);

    const [isCategory, setIsCategory] = useState("");

    const [isSubCategory, setIsSubCategory] = useState("");

    const formProductImages = productSelected.id
        ? productSelected.productImage.map((image, index) => ({
            uid: index,
            name: `image-${index + 1}.jpg`,
            type: 'image/jpeg',
            thumbUrl: image,
        }))
        : []

    const initialValues = productSelected.id
        ? {
            ...productSelected,
            productImage: formProductImages
        }
        : {
            // productSpecificationsLength: 100,
            // productSpecificationsHeight: 100,
            // productSpecificationsWidth: 100,
        }


    useEffect(() => {
        getProductListAdmin({ searchKey: searchKey })
    }, [searchKey])

    // useEffect(() => {
    //     getItemCategory({
    //         isCategory: isCategory
    //     })
    // }, [isCategory])



    // useEffect(() => {            // Checked
    //     if (isShowModify) {
    //         setIsColorOptionForm()
    //     }
    // })



    // useEffect(() => {
    //     getProductListAdmin({ categoryId: categoryId })
    // }, [categoryId])

    useEffect(() => {
        getSubCategory()
    }, []);

    useEffect(() => {
        getItemCategory({
            subCategoryId: isSubCategory
        })
    }, [isSubCategory])

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

    useEffect(() => {     // Nghĩa là khi vào trang mở Drawer,
        //  setIsShowCreateColor(false) =>   isShowCreateColor(false) để hiện button Thêm Tùy chọn,  Line 410
        if (isShowModify) {
            setIsShowCreateColor(false)     //setIsShowModifyColor
        }
    }, [isShowModify])

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
        console.log("🚀 ~ file: index.jsx ~ line 206 ~ handleEditProduct ~ record", record)
        setIsShowModify(true);
        setProductSelect(record);
        setColorSelect(record);
    }

    function handleCreateProduct() {
        setIsShowModify(true);
        setProductSelect({});     // test tối qua 7/6/2021
    }


    // Lưu vào Reducer


    function handleSubmitForm() {
        const values = productForm.getFieldsValue();

        const newProductImage = (values.productImage || []).map((file) => file.thumbUrl);

        const newProduct = {
            ...values,
            productImage: newProductImage,
            productDetailDescription: dataDescription,
            productStorageInstruction: dataStorageInstruction
        }
        if (productSelected.id || colorSelected.id) {
            // editProductAdmin({ id: colorSelected.id, ...values })
            editProductAdmin({ id: colorSelected.id, ...newProduct })
        }
        else {
            createProductAdmin(newProduct)
        }
        setIsShowModify(false);
    }

    // console.log("productSelected ", productSelected)


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
            title: 'Giá khuyến mãi',
            dataIndex: 'productDiscount',
            key: 'productDiscount',
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
                            title={`Bạn có chắc muốn xóa ${record.productName}`}
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

    const tableData = productList.data.map((productItem, productIndex) => {
        let maxValueSize = 0;
        let minValueSize = 0;


        let maxValueColor = 0;
        let minValueColor = 0;

        // console.log("🚀 ~ file: index.jsx ~ line 300 ~ tableData ~ productIndex", productIndex)

        productItem.sizes.forEach((option, optionIndex) => {
            // console.log("🚀 ~ file: index.jsx ~ line 308 ~ productItem.sizes.forEach ~ optionIndex", optionIndex)
            if (optionIndex === 0) {       // Ngay tại index bằng 0 khi chạy vòng lặp, sẽ gán giá trị option price cho biến minValue

                minValueSize = option.price   // Lúc này minValueColor = 200.000
            }


            if (option.price > maxValueSize) maxValueSize = option.price;    //  nhạp option size = 500.000
            if (option.price < minValueSize) minValueSize = option.price
        })
        // console.log("🚀 ~ file: index.jsx ~ line 303 ~ tableData ~ minValueSize", minValueSize)

        productItem.colors.forEach((anotherOption, anotherOptionIndex) => {
            if (anotherOptionIndex === 0) {    // Ngay tại index = 0 khi chạy ở vòng lặp đầu tiên, sẽ gán giá tiền colors vào min Value Color
                minValueColor = anotherOption.price;      // Lúc này minValueColor = 300.000
            }

            if (anotherOption.price > maxValueColor) maxValueColor = anotherOption.price;

            if (anotherOption.price < minValueColor) minValueColor = anotherOption.price;
        })


        let maxTotal = maxValueColor + maxValueSize;
        // console.log("🚀 ~ file: index.jsx ~ line 330 ~ tableData ~ maxTotal", maxTotal)

        let minTotal = minValueColor + minValueSize;

        // lúc này minTotal = 300.000  (colors) + 200.000 (Sizes)  + 20.000.000 (product)

        // 20.500.000  -  20.800.000


        return {
            ...productItem,
            key: productItem.id,
            categoryName: productItem.category.categoryName,
            productDiscount: productItem.productDiscount,
            minMaxPrice: productItem.sizes.length > 0 || productItem.colors.length > 0       /// nếu option sizes và option color > 0 sẽ nhảy vào line 341 , bé hơn nhảy vào 347
                ? (productItem.sizes.length === 1 && productItem.colors.length <= 1) || (productItem.sizes.length <= 1 && productItem.colors.length === 1)
                    // TH: nếu size.length === 1
                    ? (productItem.productPrice + maxTotal).toLocaleString()
                    : `${(productItem.productPrice + minTotal).toLocaleString()} - ${(productItem.productPrice + maxTotal).toLocaleString()}`

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

    function renderItemCategoryOption() {
        return itemCategories.data.map((itemCategoryItem, itemCategoryIndex) => {
            return (
                <Select.Option key={itemCategoryIndex} value={itemCategoryItem.id}>
                    {itemCategoryItem.itemCategoryName}
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
                            // setProductSelect,  // test tối 7/6/2021
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
                    colorSelected.id &&            // nếu có id colorSelected và colors.length >0 sẽ hiển thị phần item colors đã được tạo
                    colorSelected.colors.length > 0 &&
                    renderColorOptionItems()
                }
                {isShowCreateColor                   // isShowCreateColor (true) => hiển thị 1 form tạo color 
                    ? renderCreateOptionColor()      // isShowCreateColor(false) => hiển thị button thêm tùy chọn
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

    function onChange(values) { // Render Category Name
        setIsCategory(values)
        subCategories.data.forEach((subCategoryItem, subCategoryIndex) => {
            itemCategories.data.forEach((itemCategoryItem, itemCategoryIndex) => {
                if (values === subCategoryItem.categoryId && subCategoryItem.id === itemCategoryItem.subCategoryId) {
                    setIsSubCategory(subCategoryItem.id)
                    // console.log("subCategoryId: " ,subCategoryItem.id)
                }
            })
        })

    }
    // console.log("IsCategory: ", isCategory)

    function onChangeItemCategory() {

    }

    function onChangeDescriptionEditor(event, editor) {  // Onchange Description
        const data = editor.getData();
        setDataDescription(data);
    }

    function onChangeProductStorageInstruction(even, editor) {   // Onchange Product Storage Instruction
        const data = editor.getData();
        setDataStorageInstruction(data)
    }




    // Search - Area

    const { Search } = Input;

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    const onSearch = value => setSearchKey(value);

    // Tinh Initial Value & Origin Value
    let originPrice = 0;
    let initialPrice = 0;

    // if (productListItem.colors.length === 0 && productListItem.sizes.length === 0) {
    //     originPrice = productListItem.productPrice.toLocaleString();
    //     initialPrice = (productListItem.productPrice * (1 - productListItem.productDiscount)).toLocaleString();
    //   } else if (productListItem.colors.length === 0) {
    //     originPrice = ((productListItem.productPrice + productListItem.sizes[0].price)).toLocaleString();
    //     initialPrice = ((productListItem.productPrice + productListItem.sizes[0].price) * (1 - productListItem.productDiscount)).toLocaleString();
    //   } else if (productListItem.sizes.length === 0) {
    //     originPrice = ((productListItem.productPrice + productListItem.colors[0].price)).toLocaleString();
    //     initialPrice = ((productListItem.productPrice + productListItem.colors[0].price) * (1 - productListItem.productDiscount)).toLocaleString();
    //   } else {
    //     originPrice = ((productListItem.productPrice + productListItem.colors[0].price + productListItem.sizes[0].price)).toLocaleString();
    //     initialPrice = ((productListItem.productPrice + productListItem.colors[0].price + productListItem.sizes[0].price) * (1 - productListItem.productDiscount)).toLocaleString();
    //   }


    const { TextArea } = Input;
    return (
        <>
            <div className="logo-brand">
                <img src={logo1}
                    alt="Bodhi Logo Brand"
                    style={{ width: "auto", height: "50px", cursor: "pointer" }}
                    onClick={() => { history.push(ROUTERS.HOME) }}
                />
            </div>
            <Row justify="space-between" align="center" style={{ marginTop: 16 }}>
                <Space direction="vertical" >
                    <Search placeholder="input search text" onSearch={onSearch} enterButton style={{ width: "300px" }} />
                </Space>

                <Button type="primary" onClick={() => handleCreateProduct()}>
                    <PlusOutlined /> Thêm Mới
                </Button>
            </Row>

            <Row justify="center" style={{ marginBottom: 16 }}>
                <h3 >Danh sách sản phẩm</h3>
            </Row>
            <div className="admin-area_container">


                <Table
                    style={{ width: "100%" }}
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
                                <Button onClick={() => setIsShowModify(false)}>Hủy</Button>
                                <Button type="primary" onClick={() => handleSubmitForm()}>Lưu</Button>
                            </Space>
                        </Row>
                    )}
                >
                    <Form
                        form={productForm}
                        layout="vertical"
                        name="productForm"
                        initialValues={{
                            ...initialValues,
                            hasOption: false
                        }}
                    >
                        <Form.Item name="productName" label="Tên sản phẩm">
                            <Input placeholder="Tên sản phẩm" />
                        </Form.Item>

                        <Form.Item name="categoryId" label="Loại phòng">
                            <Select placeholder="Loại phòng" >
                                {renderCategoryOptions()}
                            </Select>
                        </Form.Item>

                        <Form.Item name="itemCategoryId" label="Loại sản phẩm">
                            <Select placeholder="Loại sản phẩm" onChange={onChangeItemCategory}>
                                {renderItemCategoryOption()}
                            </Select>
                        </Form.Item>

                        <Form.Item name="productShortDescription" label="Mô tả sản phẩm">
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item
                            valuePropName="fileList"
                            name="productImage"
                            label="Ảnh sản phẩm"
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) return e;
                                return e && e.fileList
                            }}
                            validateFirst
                            rules={[
                                { required: true },
                                () => ({
                                    validator(_, value) {
                                        if (!['image/png', 'image/jpeg'].includes(value[0].type)) {
                                            return Promise.reject('File không đúng định dạng')
                                        }
                                        return Promise.resolve();
                                    }
                                })
                            ]}
                        >
                            <Upload
                                listType='picture'
                                beforeUpload={() => false}
                            >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>



                        <Form.Item name="productDiscount" label="Giảm giá sản phẩm">
                            <InputNumber
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                placeholder="Giá khuyến mãi"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>


                        <Form.Item name="productPrice" label="Giá gốc">
                            <InputNumber
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                placeholder="Giá gốc"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>


                        <div>
                            <h6 style={{ marginBottom: "5px" }}>Mô Tả Sản Phẩm</h6>
                            <CKEditor

                                editor={ClassicEditor}
                                name="productDescription"
                                onChange={(event, editor) => onChangeDescriptionEditor(event, editor)}
                                onBlur={(event, editor) => {
                                    // console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    // console.log('Focus.', editor);
                                }}
                            />
                        </div>

                        <div style={{ marginTop: "10px " }}>
                            <h6 >Hướng Dẫn Bảo Quản</h6>
                            <CKEditor
                                editor={ClassicEditor}
                                name="productStorageInstruction"
                                onChange={(event, editor) => onChangeProductStorageInstruction(event, editor)}
                                onBlur={(event, editor) => {
                                    // console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    // console.log('Focus.', editor);
                                }}
                            />
                        </div>

                        

                        {productSelected.id && (
                            <>
                                <Row justify="space-between">
                                    <Checkbox checked={isOptionForm} onChange={(e) => setIsOptionForm(e.target.checked)}>Thêm Kích Thước</Checkbox>
                                    <Checkbox checked={isColorOptionForm} onChange={(e) => setIsColorOptionForm(e.target.checked)}>Thêm Màu</Checkbox>
                                </Row>
                            </>
                        )}
                    </Form>


                    {/* 1>Giải thích - isOptionForm : khi isOptionForm checked thì mới hiện ra  */}
                    {isOptionForm && productSelected.id && renderProductOptionForm()}

                    {isColorOptionForm && colorSelected.id && renderColorOptionForm()}


                </Drawer>
            </div>

        </>
    )
}

const mapStateToProps = (state) => {
    const { productList, categoryList } = state.adminProductReducer;
    const { itemCategories, subCategories } = state.categoriesReducer;
    const { productSelected, colorSelected } = state.adminCommonReducer;
    return {
        productList: productList,
        categoryList: categoryList,

        productSelected: productSelected,
        colorSelected: colorSelected,

        itemCategories: itemCategories,
        subCategories: subCategories
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

        getItemCategory: (params) => dispatch(getItemCategoriesAction(params)),
        getSubCategory: (params) => dispatch(getSubCategoriesAction(params)),
        // getCategorySearchKey: (params) => dispatch(getCategoryListSearchKey(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProduct);