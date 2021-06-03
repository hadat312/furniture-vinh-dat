import React, { useEffect, useState } from 'react';

import history from '../../utils/history';
import { ROUTERS } from '../../constants/router';

import { REGEX } from '../../constants/validate';

import { connect } from 'react-redux';

import {
  getUserInfoAction,
  editUserInfoAction,
  setAddressSelectAction,
  getCityAction,
  getDistrictAction,
  getWardAction,
  addAddressAction,
  editAddressAction,
  deleteAddressAction,
} from '../../redux/actions';

import {
  Button,
  Table,
  Row,
  Col,
  Typography,
  Space,
  Tag,
  Card,
  Input,
  Form,
  Modal,
  Radio,
  notification,
  Select,
} from 'antd';
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus
} from "react-icons/ai";

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { v4 } from 'uuid';

import * as Style from './styles';

function AddressPage({
  userInfo,
  getUserInfo,
  addressSelected,
  setAddressSelect,
  address,
  city,
  district,
  ward,
  getCity,
  getDistrict,
  getWard,
  addAddress,
  editAddress,
  deleteAddress,
}) {

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };

  const userId = JSON.parse(localStorage.getItem('userInfo'));

  const { Title } = Typography;

  const { Option } = Select;

  const [isShowModify, setIsShowModify] = useState(false);
  // const [isShowCreateOption, setIsShowCreateOption] = useState(false);

  const [editForm] = Form.useForm();


  const { confirm } = Modal;

  const [changeCityName, setChangeCityName] = useState('');
  const [changeDistrictName, setChangeDistrictName] = useState('');
  const [changeWardName, setChangeWardName] = useState('');

  const [isSelected, setIsSelected] = useState(false);
  const [cityCode, setCityCode] = useState('');
  const [districtCode, setDistrictCode] = useState('');
  const [wardCode, setWardCode] = useState('');

  const [cityName, setCityName] = useState('Chưa chọn mã vùng');
  const [districtName, setDistrictName] = useState('Chưa chọn mã vùng');
  const [wardName, setWardName] = useState('Chưa chọn mã vùng');

  useEffect(() => {
    getCity();
    getDistrict();
    getWard();
    getUserInfo({ id: userId.id });
  }, []);

  useEffect(() => {
    getDistrict({ parentcode: cityCode });
  }, [cityCode]);

  useEffect(() => {
    getWard({ parentcode: districtCode });
  }, [districtCode]);

  useEffect(() => {
    editForm.resetFields();
    // setIsOptionForm(productSelected.productOptions?.length > 0);
  }, [addressSelected.id]);

  function showAddAddressNotification() {
    const key = `open${Date.now()}`;
    return notification.success({
      message: 'Thêm địa chỉ nhận hàng thành công!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function showEditAddressNotification() {
    const key = `open${Date.now()}`;
    return notification.success({
      message: 'Cập nhật địa chỉ nhận hàng thành công!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function showDeleteAddressNotification() {
    const key = `open${Date.now()}`;
    return notification.success({
      message: 'Xóa địa chỉ nhận hàng thành công!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function showDeleteConfirm(text) {
    console.log('delete: ', text);
    confirm({
      title: 'Bạn chắc chắn muốn xóa địa chỉ này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy bỏ',
      onOk() {

        const newAddress = address.data;
        newAddress.splice(text.index, 1)
        deleteAddress({
          userId: userId.id,
          address: [
            ...newAddress,
          ]
        })

        showDeleteAddressNotification()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function onEditProduct(text) {
    city.data.map((cityItem, cityIndex) => {
      if (cityItem.name === addressSelected.cityName) {
        return (
          setChangeCityName(cityItem.code)
        );
      }
    })

    // setIsSelected(true)
    setIsShowModify(true);
    setAddressSelect(text);
  }

  function onAddAddress() {
    setIsShowModify(true);
    setAddressSelect({});
  }


  function onChangeSelectedCity(value) {
    //value: là code của city
    const cityFiltered = city.data.filter((item) => item.code === value);
    setCityName(cityFiltered[0].name);
    setCityCode(value);

    //setIsSelected(true) để check disabled của district
    setIsSelected(true)
    console.log(`City ${cityCode}`);
  }


  function onChangeSelectedDistrict(value) {
    //value: là code của district
    const districtFiltered = district.data.filter((item) => item.code === value);
    setDistrictName(districtFiltered[0].name);
    setDistrictCode(value);

    //setIsSelected(true) để check disabled của ward
    setIsSelected(true)
    console.log(`District ${districtCode}`);
  }
  function onChangeSelectedWard(value) {
    //value: là code của ward
    const wardFiltered = ward.data.filter((item) => item.code === value);
    setWardName(wardFiltered[0].name);
    setWardCode(value);
    setIsSelected(true)
    console.log(`Ward ${wardCode}`);
  }

  function onFocusCity() {
    console.log('focus', changeCityName);
  }

  function onFocusDistrict() {
    console.log('focus', changeDistrictName);
  }

  function onFocusWard() {
    console.log('focus', changeWardName);
  }


  function onBlur() {
    console.log('blur');
  }

  function onSearch(val) {
    // console.log('search:', val);
  }

  function onClear() {
    console.log('clear');
  }

  function renderCity() {
    // getDistrict({ parentCode: cityCode });
    return city.data.map((cityItem, cityIndex) => {
      return (
        <Option key={cityIndex} value={cityItem.code}>{cityItem.name}</Option>
      );
    })
  }

  function renderDistrictOfCity() {
    return district.data.map((districtItem, districtIndex) => {
      return (
        <Option key={districtIndex} value={districtItem.code}>{districtItem.name}</Option>
      );
    })
  }

  function renderWardOfDistrict() {
    return ward.data.map((wardItem, wardIndex) => {
      return (
        <Option key={wardIndex} value={wardItem.code}>{wardItem.name}</Option>
      );
    })
  }

  const addressDataTable = address.data.map((addressItem, addressIndex) => {
    return {
      ...addressItem,
      regionName: addressItem.wardName + ', ' + addressItem.districtName + ', ' + addressItem.cityName,
      key: addressItem.id,
      index: addressIndex
    }
  });

  const columns = [
    { title: 'Tên', dataIndex: 'userName', width: '15%' },
    { title: 'Địa chỉ', dataIndex: 'addressName', width: '25%' },
    { title: 'Mã vùng', dataIndex: 'regionName', width: '35%' },
    { title: 'Số điện thoại', dataIndex: 'userPhoneNumber' },
    {
      title: 'Hành động',
      key: 'operation',
      render: (text) =>
        <Space justify="center">
          <Button type="primary" ghost onClick={() => onEditProduct(text)}><AiOutlineEdit /></Button>
          <Button danger onClick={() => showDeleteConfirm(text)}><AiOutlineDelete /></Button>
        </Space>

    },
  ];
  // console.log('addressSelected: ', addressSelected);
  return (
    <>
      <Card
        title={
          <Style.TitleAddress>
            <Title level={4}>Sổ địa chỉ</Title>
            <Button
              type="primary"
              ghost
              onClick={() => onAddAddress()}
              className="address__add-btn"
            >
              <AiOutlinePlus />
              Thêm địa chỉ mới
            </Button>
          </Style.TitleAddress>
        }
        bordered={true}
      >
        <Style.MainAddress>
          <Table
            loading={userInfo.load}
            columns={columns}
            dataSource={addressDataTable}
          />
        </Style.MainAddress>
      </Card>

      {/* MODAL */}
      <Modal
        title={<Title level={4}>{addressSelected.id ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ"}</Title>}
        visible={isShowModify}
        centered
        okText={<span><AiOutlineCheck /> Xác nhận</span>}
        cancelText={<span><AiOutlineClose /> Hủy bỏ</span>}
        onCancel={() => setIsShowModify(false)}
        onOk={() => {
          editForm
            .validateFields()
            .then(values => {
              if (addressSelected.id) {

                // const changeAddress = {
                //   userName: values.userName,
                //   addressName: values.addressName,
                //   regionName: wardName + ', ' + districtName + ', ' + cityName,
                //   userPhoneNumber: values.userPhoneNumber,
                // }

                const changeAddress = address.data;
                changeAddress.splice(addressSelected.index, 1, {
                  id: addressSelected.id,
                  userName: values.userName,
                  addressName: values.addressName,
                  cityName: cityName,
                  districtName: districtName,
                  wardName: wardName,
                  userPhoneNumber: values.userPhoneNumber,
                })

                editAddress({ userId: userId.id, address: changeAddress })
                showEditAddressNotification();
                console.log('Edit Success:', changeAddress);
              } else {
                addAddress({
                  userId: userId.id,
                  address: [
                    ...address.data,
                    {
                      id: v4(),
                      userName: values.userName,
                      addressName: values.addressName,
                      cityName: cityName,
                      districtName: districtName,
                      wardName: wardName,
                      userPhoneNumber: values.userPhoneNumber,
                    }
                  ]
                })
                showAddAddressNotification();
                console.log('Add Success:', values);
              }
              setIsShowModify(false);

            })
            .catch(info => {
              console.log('asdasd Failed:', info.values);
            });
        }}
      >
        {/* {console.log('selected: ', addressSelected)} */}
        <Form
          form={editForm}
          // layout="horizontal"
          {...layout}
          name="basic"
          // initialValues={{
          //   userName: userInfo.data.userName,
          //   userPhoneNumber: userInfo.data.userPhoneNumber || '',
          //   userEmail: userInfo.data.userEmail,
          //   gender: userInfo.data.gender || '',
          // }}
          initialValues={addressSelected.id
            ? {
              ...addressSelected,
              city: changeCityName,
              district: addressSelected.districtName,
              ward: addressSelected.wardName,
            }
            : {

            }
          }
        >
          <Form.Item
            label={<span>Tên</span>}
            name="userName"
            rules={[
              { required: true, message: 'Không được để trống!' },
              { min: 4, message: 'Phải lớn hơn 4 ký tự' },
              { max: 20, message: 'Phải nhỏ hơn 8 ký tự' },
            ]}
            hasFeedback
          >
            <Input className="text-bold" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ nhận hàng"
            name="addressName"
            rules={[
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.reject('Không được để trống!');
                  }
                  else if (value.length < 5 || value.length > 350) {
                    return Promise.reject('Chiều dài địa chỉ nên từ 5 đến 350 ký tự');
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

          <Form.Item
            label="Tỉnh/Thành Phố"
            name="city"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn tỉnh/thành phố!',
              },
            ]}
          >

            <Select
              showSearch
              placeholder="Chọn tỉnh/thành phố"
              optionFilterProp="children"
              onChange={onChangeSelectedCity}
              onFocus={onFocusCity}
              onBlur={onBlur}
              onSearch={onSearch}
              // value={cityName}
              // defaultValue={changeCityName}
              onClear={onClear}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {renderCity()}
            </Select>
          </Form.Item>

          <Form.Item
            label="Quận/Huyện"
            name="district"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn quận/huyện!',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn quận/huyện"
              optionFilterProp="children"
              onChange={onChangeSelectedDistrict}
              onFocus={onFocusDistrict}
              onBlur={onBlur}
              onSearch={onSearch}
              // value={districtName}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              disabled={isSelected ? false : true}
            >
              {renderDistrictOfCity()}
            </Select>
          </Form.Item>

          <Form.Item
            label="Xã/Phường"
            name="ward"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn xã/phường!',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn xã/phường"
              optionFilterProp="children"
              onChange={onChangeSelectedWard}
              onFocus={onFocusWard}
              onBlur={onBlur}
              onSearch={onSearch}
              // value={wardName}
              filterOption={(input, option) =>
                //option: lấy tất cả option
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              disabled={isSelected ? false : true}
            >
              {renderWardOfDistrict()}
            </Select>
          </Form.Item>


          <Form.Item
            label="Số điện thoại"
            name="userPhoneNumber"
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

      </Modal >
    </>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  const { addressSelected } = state.commonAddressReducer;
  const { address, city, district, ward } = state.addressReducer;
  return {
    userInfo: userInfo,
    addressSelected: addressSelected,
    address: address,
    city: city,
    district: district,
    ward: ward,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    editUser: (params) => dispatch(editUserInfoAction(params)),
    setAddressSelect: (params) => dispatch(setAddressSelectAction(params)),
    getCity: (params) => dispatch(getCityAction(params)),
    getDistrict: (params) => dispatch(getDistrictAction(params)),
    getWard: (params) => dispatch(getWardAction(params)),
    addAddress: (params) => dispatch(addAddressAction(params)),
    editAddress: (params) => dispatch(editAddressAction(params)),
    deleteAddress: (params) => dispatch(deleteAddressAction(params)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressPage);