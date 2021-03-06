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

  const [editForm] = Form.useForm();


  const { confirm } = Modal;
  //get onChange cityName, districtName, wardName
  const [changeCityName, setChangeCityName] = useState('');
  const [changeDistrictName, setChangeDistrictName] = useState('');
  const [changeWardName, setChangeWardName] = useState('');

  //isSelected => disable false, !isSelected => disable true
  const [isSelectedDistrict, setIsSelectedDistrict] = useState(false);
  const [isSelectedWard, setIsSelectedWard] = useState(false);

  //get cityCode, districtCode, wardCode
  const [cityCode, setCityCode] = useState('');
  const [districtCode, setDistrictCode] = useState('');
  const [wardCode, setWardCode] = useState('');

  //get cityName, districtName, wardName
  const [cityName, setCityName] = useState('Ch??a ch???n m?? v??ng');
  const [districtName, setDistrictName] = useState('Ch??a ch???n m?? v??ng');
  const [wardName, setWardName] = useState('Ch??a ch???n m?? v??ng');

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
  }, [addressSelected.id]);

  function showAddAddressNotification() {
    const key = `open${Date.now()}`;
    return notification.success({
      message: 'Th??m ?????a ch??? nh???n h??ng th??nh c??ng!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function showEditAddressNotification() {
    const key = `open${Date.now()}`;
    return notification.success({
      message: 'C???p nh???t ?????a ch??? nh???n h??ng th??nh c??ng!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function showDeleteAddressNotification() {
    const key = `open${Date.now()}`;
    return notification.success({
      message: 'X??a ?????a ch??? nh???n h??ng th??nh c??ng!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function showDeleteConfirm(text) {
    console.log('delete: ', text);
    confirm({
      title: 'B???n ch???c ch???n mu???n x??a ?????a ch??? n??y?',
      icon: <ExclamationCircleOutlined />,
      okText: 'X??a',
      okType: 'danger',
      cancelText: 'H???y b???',
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
    console.log("???? ~ file: index.jsx ~ line 178 ~ onEditProduct ~ text", text)
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

    // if (addressSelected.id) {
    //   setOriginValues({ districtValue: '', warValue: '' })
    // }
    //value: l?? code c???a city
    const cityFiltered = city.data.filter((item) => item.code === value);
    setCityName(cityFiltered[0].name);
    setCityCode(value);

    //setIsSelected(true) ????? check disabled c???a district
    setIsSelectedDistrict(true)


    console.log(`City ${cityCode}`);
  }


  function onChangeSelectedDistrict(value) {
    //value: l?? code c???a district
    const districtFiltered = district.data.filter((item) => item.code === value);
    setDistrictName(districtFiltered[0].name);
    setDistrictCode(value);

    //setIsSelected(true) ????? check disabled c???a ward
    setIsSelectedWard(true)
    console.log(`District ${districtCode}`);
  }
  function onChangeSelectedWard(value) {
    //value: l?? code c???a ward
    const wardFiltered = ward.data.filter((item) => item.code === value);
    setWardName(wardFiltered[0].name);
    setWardCode(value);
    console.log(`Ward ${wardCode}`);
  }

  function onSearch(val) {
    // console.log('search:', val);
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
    { title: 'T??n', dataIndex: 'userName', width: '15%' },
    { title: '?????a ch???', dataIndex: 'addressName', width: '25%' },
    { title: 'M?? v??ng', dataIndex: 'regionName', width: '35%' },
    { title: 'S??? ??i???n tho???i', dataIndex: 'userPhoneNumber' },
    {
      title: 'H??nh ?????ng',
      key: 'operation',
      render: (text) =>
        <Space justify="center">
          <Button type="primary" ghost onClick={() => onEditProduct(text)}><AiOutlineEdit /></Button>
          <Button danger onClick={() => showDeleteConfirm(text)}><AiOutlineDelete /></Button>
        </Space>

    },
  ];

  return (
    <>
      <Card
        title={
          <Style.TitleAddress>
            <Title level={4}>S??? ?????a ch???</Title>
            <Button
              type="primary"
              ghost
              onClick={() => onAddAddress()}
              className="address__add-btn"
            >
              <AiOutlinePlus />
              Th??m ?????a ch??? m???i
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
        title={<Title level={4}>{addressSelected.id ? "Ch???nh s???a ?????a ch???" : "Th??m ?????a ch???"}</Title>}
        visible={isShowModify}
        centered
        okText={<span><AiOutlineCheck /> X??c nh???n</span>}
        cancelText={<span><AiOutlineClose /> H???y b???</span>}
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

                editAddress({ userId: userId.id, address: changeAddress });
                setIsSelectedDistrict(false);
                setIsSelectedWard(false);
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
            && {
            ...addressSelected,
            city: addressSelected.cityName,
            district: addressSelected.districtName,
            ward: addressSelected.wardName,
          }
          }
        >
          <Form.Item
            label={<span>T??n</span>}
            name="userName"
            rules={[
              { required: true, message: 'Kh??ng ???????c ????? tr???ng!' },
              { min: 4, message: 'Ph???i l???n h??n 4 k?? t???' },
              { max: 20, message: 'Ph???i nh??? h??n 8 k?? t???' },
            ]}
            hasFeedback
          >
            <Input className="text-bold" />
          </Form.Item>

          <Form.Item
            label="?????a ch??? nh???n h??ng"
            name="addressName"
            rules={[
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.reject('Kh??ng ???????c ????? tr???ng!');
                  }
                  else if (value.length < 5 || value.length > 350) {
                    return Promise.reject('Chi???u d??i ?????a ch??? n??n t??? 5 ?????n 350 k?? t???');
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
            label="T???nh/Th??nh Ph???"
            name="city"
            rules={[
              {
                required: true,
                message: 'Vui l??ng ch???n t???nh/th??nh ph???!',
              },
            ]}
          >

            <Select
              showSearch
              placeholder="Ch???n t???nh/th??nh ph???"
              optionFilterProp="children"
              onChange={onChangeSelectedCity}
              onSearch={onSearch}
            >
              {renderCity()}
            </Select>
          </Form.Item>

          <Form.Item
            label="Qu???n/Huy???n"
            name="district"
            rules={[
              {
                required: true,
                message: 'Vui l??ng ch???n qu???n/huy???n!',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Ch???n qu???n/huy???n"
              optionFilterProp="children"
              onChange={onChangeSelectedDistrict}
              onSearch={onSearch}
              disabled={isSelectedDistrict ? false : true}
            >
              {renderDistrictOfCity()}
            </Select>
          </Form.Item>

          <Form.Item
            label="X??/Ph?????ng"
            name="ward"
            rules={[
              {
                required: true,
                message: 'Vui l??ng ch???n x??/ph?????ng!',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Ch???n x??/ph?????ng"
              optionFilterProp="children"
              onChange={onChangeSelectedWard}
              onSearch={onSearch}
              disabled={isSelectedWard ? false : true}
            >
              {renderWardOfDistrict()}
            </Select>
          </Form.Item>


          <Form.Item
            label="S??? ??i???n tho???i"
            name="userPhoneNumber"
            rules={[
              {
                required: true,
                validator(_, value) {
                  if (!value) {
                    return Promise.reject('Kh??ng ???????c ????? tr???ng!');
                  }
                  else if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(value)) {
                    return Promise.reject('S??? ??i???n tho???i kh??ng ????ng ?????nh d???ng!');
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