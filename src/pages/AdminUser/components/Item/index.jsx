import React, { useState } from 'react';
import history from '../../../../utils/history';
import { connect } from 'react-redux';
import {
    Row,
    Col,
    Space,
    Card,
    Form,
    Input,
    Button,
    Table,
    Modal,
    Pagination
} from 'antd';

import {
    getUserInfoAction,
    getUserListAction,
    deleteUserListAction,
    editUserListAction,
} from '../../../../redux/actions'

import { EditOutlined } from '@ant-design/icons'


import './styles.css';

function Item(props) {
    const { userListItem, onDeleteUserList, handleEditUserList } = props;
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
                <tr>
                    <td className="user-id">
                        {userListItem.id}
                    </td>

                    <td className="user-name">
                        {isEdit
                            // ? <Form
                            //     // {...layout}
                            //     form={editForm}
                            //     name="basic"
                            //     initialValues={{
                            //         remember: true,
                            //     }}
                            //     onFinish={(values) => {
                            //         handleEditUserList(values, userListItem.id);
                            //         setIsEdit(false);
                            //     }}
                            // >
                            //     <Form.Item
                            //         label="Username"
                            //         name="userName"
                            //         rules={[
                            //             {
                            //                 required: true,
                            //                 message: 'Please input your username!',
                            //             },
                            //         ]}
                            //     >
                            //         <Input />
                            //     </Form.Item>
                            // </Form>

                            ? <Modal title="Human Resource Management" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <Form
                                    // {...layout}
                                    form={editForm}
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={(values) => {
                                        handleEditUserList(values, userListItem.id);
                                        setIsEdit(false);
                                    }}
                                >
                                    <Form.Item
                                        label="Username"
                                        name="userName"
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: 'Please input your username!',
                                    //     },
                                    // ]}
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
                                        handleEditUserList(values, userListItem.id);
                                        setIsEdit(false);
                                    }}
                                >
                                    <Form.Item
                                        label="User Email"
                                        name="userEmail"
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: 'Please input your user Email!',
                                    //     },
                                    // ]}
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
                                        handleEditUserList(values, userListItem.id);
                                        setIsEdit(false);
                                    }}
                                >
                                    <Form.Item
                                        label="User Phone"
                                        name="userPhoneNumber"
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: 'Please input your Phone Number!',
                                    //     },
                                    // ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Form>
                            </Modal>
                            : userListItem.userName
                        }
                    </td>

                    <td className="user-email">
                        {/* {isEdit
                            ? <Form
                                    // {...layout}
                                    form={editForm}
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={(values) => {
                                        handleEditUserList(values, userListItem.id);
                                        setIsEdit(false);
                                    }}
                                >
                                    <Form.Item
                                        label="User Email"
                                        name="userEmail"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your user Email!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Form>
                        }
                         */}
                        {userListItem.userEmail}
                    </td>

                    <td className="user-name">
                        {/*  
                        {isEdit
                            ?
                            <Form
                                // {...layout}
                                form={editForm}
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={(values) => {
                                    handleEditUserList(values, userListItem.id);
                                    setIsEdit(false);
                                }}
                            >
                                <Form.Item
                                    label="User Phone"
                                    name="userPhoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Phone Number!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form>

}
*/}
                        {userListItem.userPhoneNumber}
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
                                <>

                                    <Button type="primary"
                                        onClick={() => {
                                            { showModal() };
                                            setIsEdit(true)
                                        }}
                                    >
                                        <EditOutlined />
                                    </Button>

                                </>
                            )

                        }
                    </td>

                    <td className="user-remove">
                        <button >
                            <span onClick={() => onDeleteUserList(userListItem.id)}>X</span>
                        </button>
                    </td>
                </tr>
            </tbody>

        </>
    )
}


export default Item;