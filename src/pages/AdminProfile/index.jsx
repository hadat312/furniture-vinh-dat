import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history'

import { Form, Input, Button, Checkbox, DatePicker, Radio, Row, Space, notification } from 'antd';
import 'moment/locale/vi';
import moment from 'moment';

import {
    updateProfileAdminAction,
    getUserInfoAction

} from '../../redux/actions'

import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from '@ant-design/icons';

import './styles.css'

function AdminProfile(props) {
    const {
        updateProfile,
        getUserInfo,
        userInfo,
    } = props;



    const userLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

    const [editForm] = Form.useForm();


    useEffect(() => {
        getUserInfo({ id: userLocalStorage.id })
    }, [])

    useEffect(() => {
        editForm.resetFields();
    }, [editForm])


    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    let birthdayString = '';

    const dateFormatList = 'DD/MM/YYYY';

    function onChangeDatePicker(date, dateString) {
        birthdayString = dateString.trim();
    }

    function showNotification() {
        return notification.success({
            message: 'Chỉnh sửa hồ sơ thành công!',
        });
    }

    function showNotificationError() {
        return notification.error({
            message: 'Chỉnh sửa hồ sơ thất bại - Bạn cần nhập đầy đủ các trường!',
        });
    }

    function updateProfileAdmin() {
        // const values = editForm.getFieldsValue();

        editForm.validateFields().then(values => {
            updateProfile({
                ...values,
                birthday: birthdayString || userInfo.data.birthday,
                userId: userInfo.data.id,
            })
            showNotification()
        })
            .catch(info => {
                showNotificationError();
            })

    }

    return (
        <>
            <div style={{ padding: 15, marginTop: " 30px", backgroundColor: "#e7e7e7" }}>
                <h3 style={{ display: "flex", justifyContent: "center" }}>Chỉnh Sửa Thông Tin</h3>
                <Form
                    form={editForm}
                    name="editForm"
                    initialValues={{
                        userName: userInfo.data.userName,
                        userPhoneNumber: userInfo.data.userPhoneNumber,
                        userEmail: userInfo.data.userEmail,
                        gender: userInfo.data.gender,
                        // birthday: moment(userInfo.data.birthday, dateFormatList)
                        birthday: userInfo.data.birthday ? moment(userInfo.data.birthday, dateFormatList) : null

                    }}
                >
                    <Form.Item
                        label="Họ và Tên"
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: 'Tên không được để trống!',
                            },
                            { min: 3, message: 'Phải lớn hơn 3 ký tự' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="userEmail"
                        label="Nhập Email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Email không đúng định dạng!',
                            },
                            {
                                required: true,
                                message: 'Vui lòng nhập Email!',
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Giới tính"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn giới tính!',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value="Male">{<span className="text-bold">Nam</span>}</Radio>
                            <Radio value="Female">{<span className="text-bold">Nữ</span>}</Radio>
                            <Radio value="Other">{<span className="text-bold">Khác</span>}</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="birthday"
                        label="Ngày sinh"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày sinh!',
                            },
                        ]}
                    >
                        <DatePicker format={dateFormatList} style={{ width: '100%' }} onChange={onChangeDatePicker} placeholder="Nhập ngày, tháng, năm sinh" />
                    </Form.Item>


                    <Form.Item
                        name="userPhoneNumber"
                        label="Số điện thoại"
                        validateFirst
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

                    <Row justify="end">
                        <Space>
                            <Button type="primary" onClick={updateProfileAdmin} >
                                Chỉnh sửa thông tin
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </div>

        </>
    )


}

const mapStateToProps = (state) => {
    const { userInfo } = state.userReducer;

    return {
        userInfo
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        updateProfile: (params) => dispatch(updateProfileAdminAction(params)),

        getUserInfo: (params) => dispatch(getUserInfoAction(params)),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile)