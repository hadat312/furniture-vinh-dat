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
    Tag

} from 'antd';

import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from '@ant-design/icons';


import {
    getUserListAction,
    addUserListAction,
    deleteUserListAction,
    editUserListAction
} from '../../redux/actions'

import logo1 from '../../images/logo1.jpg'

import './styles.css'

function AdminUserPage(props) {

    const {
        userList,
        getUserList,
        addUserList,
        deleteUserList,
        editUserList
    } = props



    const { Option } = Select;

    const [isShowModifyCreate, setIsShowModifyCreate] = useState(false);

    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

    const [productForm] = Form.useForm();

    const [editForm] = Form.useForm();   // value From Edit

    const [userSelected, setUserSelected] = useState("");

    const [userRoleName, setUserRole] = useState();


    const [searchKey, setSearchKey] = useState();

    useEffect(() => {
        editForm.resetFields();
    }, [userSelected]);


    useEffect(() => {
        getUserList({
            page: 1,
            limit: 12,
            searchKey: searchKey
        })
    }, [searchKey])

    const { Search } = Input;
    const onSearch = value => setSearchKey(value);

    const tableColumns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email ',
            dataIndex: 'userEmail',
            key: 'userEmail',
        },
        {
            title: 'Loại tài khoản  ',
            dataIndex: 'userRole',
            render: (_, record) => {
                return (
                    <p><Tag style={{ fontSize: 16 }} color="gold">{record.userRole}</Tag></p>
                )
            }
        },
        {
            title: 'Số diện thoại',
            dataIndex: 'userPhoneNumber',
            key: 'userPhoneNumber',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space>
                        <Button type="primary" ghost
                            onClick={() => handleEditUser(record)}
                        >
                            <EditOutlined />
                        </Button>
                        <Popconfirm
                            title={`Bạn có chắc muốn xóa ${record.userName}`}
                            onConfirm={() => deleteUserList({ id: record.id })}
                            okText="Xóa"
                            cancelText="Hủy"
                        >
                            <Button danger ><DeleteOutlined /></Button>
                        </Popconfirm>
                    </Space>
                )
            }
        },
    ]



    const tableData = userList.data.map((userListItem) => {
        return {
            ...userListItem,
            key: userListItem.id,
            userName: userListItem.userName,
            userEmail: userListItem.userEmail,
            userRole: userListItem.userRole,
            userPhoneNumber: userListItem.userPhoneNumber,

        }

    })


    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+84</Option>
            </Select>
        </Form.Item>
    );

    const USER_ROLE = [
        {
            id: 1,
            userRole: "admin"
        },
        {
            id: 2,
            userRole: "customer"
        }
    ]

    function renderUserRoleOption() {
        return USER_ROLE.map((userRoleItem, userRoleIndex) => {
            return (
                <Select.Option key={userRoleIndex} value={userRoleItem.id}>
                    {userRoleItem.userRole}
                </Select.Option>
            )
        })
    }

    function onChangeUserRole(id) {
        return USER_ROLE.map((userRoleItem, userRoleIndex) => {
            if (id === userRoleItem.id) {
                setUserRole(userRoleItem.userRole)
            }
        })
    }

    // console.log("userRole :", userRoleName)  

    const showModal = () => {
        setIsModalVisibleEdit(true);
    };

    const handleOk = () => {
        const values = editForm.getFieldsValue();

        const newUser = {
            ...values,
            userRole: userRoleName
        }
        editUserList({
            ...newUser,
            id: userSelected.id,

        })

        setIsModalVisibleEdit(false);
        editForm.submit();
    };

    const handleCancel = () => {
        setIsModalVisibleEdit(false);
    };


    function handleCreateUser() {
        setIsShowModifyCreate(true)
    }

    function handleSubmitForm() { // Add UserList
        const values = productForm.getFieldsValue();
        addUserList({
            ...values,
            userRoleName
        })

    }




    function handleEditUser(record) {  // edit user
        setIsModalVisibleEdit(true)
        setUserSelected(record)
    }



    return (
        <>
            <div className="logo-brand">
                <img src={logo1}
                    alt="Bodhi Logo Brand"
                    style={{ width: "auto", height: "50px", cursor: "pointer" }}
                    onClick={() => { history.push(ROUTERS.HOME) }}
                />
            </div>
            <Row justify="space-between" align="center">
                <Space direction="vertical" >
                    <Search placeholder="input search text" onSearch={onSearch} enterButton style={{ width: "300px" }} />
                </Space>

                <Button type="primary" onClick={() => handleCreateUser()}>
                    <PlusOutlined /> Thêm thành viên
                 </Button>


            </Row>
            <h3 className="admin-user_title">Danh sách thành viên</h3>
            <div className="admin-user_container">
                <Table
                    style={{ width: "100%", }}
                    loading={userList.load}
                    columns={tableColumns}
                    dataSource={tableData}
                />

                <Drawer
                    title="Thêm thành viên"
                    width={500}
                    visible={isShowModifyCreate}
                    onClose={() => setIsShowModifyCreate(false)}
                    footer={(
                        <Row justify="end">
                            <Space>
                                <Button>Hủy</Button>
                                <Button type="primary" onClick={() => handleSubmitForm()} >Lưu</Button>
                            </Space>
                        </Row>
                    )}
                >
                    <Form
                        form={productForm}
                        layout="vertical"
                        name="productForm"
                    >
                        <Form.Item name="userName" label="Tên thành viên">
                            <Input placeholder="Tên thành viên" />
                        </Form.Item>

                        <Form.Item
                            name="userEmail"
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input placeholder="Email thành viên" />
                        </Form.Item>

                        <Form.Item name="userRoleName" label="User Role">
                            <Select placeholder="User Role" onChange={onChangeUserRole} >
                                {renderUserRoleOption()}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="userPassword"
                            label="Mật Khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Nhập Mật Khẩu" />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label="Xác nhận mật khẩu"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Cần nhập đúng mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('userPassword') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="userPhoneNumber"
                            label="Số điện thoại"
                            rules={[
                                {
                                    required: true,
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject('Không được để trống!');
                                        }
                                        else if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(value)) {
                                            return Promise.reject('Số điện thoại không đúng định dạng!');
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }
                            ]}
                            hasFeedback
                        >
                            <Input className="text-bold" />
                        </Form.Item>
                    </Form>
                </Drawer>

                <Modal
                    title="Chỉnh sửa thông tin thành viên"
                    visible={isModalVisibleEdit}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form
                        form={editForm}
                        name="basic"
                        initialValues={{
                            ...userSelected,
                        }}

                        onFinish={(values) => {

                        }}
                    >


                        <Form.Item name="userRoleName" label="User Role">
                            <Select placeholder="User Role" onChange={onChangeUserRole} >
                                {renderUserRoleOption()}
                            </Select>
                        </Form.Item>

                        {/* <Form.Item name="userRoleName" label="User Role">
                            <Select placeholder="User Role" onChange={onChangeUserRole} >
                                {renderUserRoleOption()}
                            </Select>
                        </Form.Item> */}

                        {/* 
                        <Form.Item
                            name="userPassword"
                            label="Mật Khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Nhập Mật Khẩu" />
                        </Form.Item> */}

                        {/* <Form.Item
                            name="confirmPassword"
                            label="Xác nhận mật khẩu"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Cần nhập đúng mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('userPassword') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item> */}

                       
                    </Form>

                </Modal>


            </div>
        </>
    )


}

const mapStateToProps = (state) => {
    const { userList } = state.userReducer;
    return {
        userList: userList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserList: (params) => dispatch(getUserListAction(params)),

        addUserList: (params) => dispatch(addUserListAction(params)),

        deleteUserList: (params) => dispatch(deleteUserListAction(params)),

        editUserList: (params) => dispatch(editUserListAction(params)),
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserPage);