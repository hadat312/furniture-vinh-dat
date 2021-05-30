import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Form, Input, Select, Tooltip, Button, Space, Typography, notification } from 'antd';
// import Moment from 'react-moment';
// import Item from '../Checkout/component/Item'
import 'moment/locale/vi'
import history from '../../utils/history';
import { ROUTERS } from '../../constants/router';
import { connect } from 'react-redux';
import {
  getProductListAction,
  getCartListAction,
  addBillTaskAction,
  getOrderListAction,
  addOrderAction,
  getCityAction,
  getDistrictAction,
  getWardAction,
  addAddressAction
} from '../../redux/actions'


import Item from '../Checkout/components/Item';

import './checkout.css'
import moment from 'moment';

const { Option } = Select;


function CheckOutPage({
  cartList,
  addBill,
  getOrderList,
  addOrder,
  address,
  city,
  district,
  ward,
  getCity,
  getDistrict,
  getWard,
  addAddress,
}) {
  const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || {};

  useEffect(() => {
    getCity();
    getDistrict();
    getWard();
    getOrderList({
      page: 1,
      limit: 10,
      userId: userInfoLocalStorage.id

    });
  }, []);

  const [isSelected, setIsSelected] = useState(false);

  const [isOnChangeCity, setIsOnChangeCity] = useState(false);
  const [isOnChangeDistrict, setIsOnChangeDistrict] = useState(false);
  const [isOnChangeWard, setIsOnChangeWard] = useState(false);

  const [cityCode, setCityCode] = useState('');
  const [districtCode, setDistrictCode] = useState('');
  const [wardCode, setWardCode] = useState('');

  const [cityName, setCityName] = useState('Chưa chọn mã vùng');
  const [districtName, setDistrictName] = useState('');
  const [wardName, setWardName] = useState('');

  useEffect(() => {
    getDistrict({ parentcode: cityCode });
  }, [cityCode]);

  useEffect(() => {
    getWard({ parentcode: districtCode });
  }, [districtCode]);

  const { Title } = Typography;

  const [fillBill, setFillBill] = useState({
    userName: "",
    // lastName: "",
    email: "",
    phone: "",
    // company: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    userId: userInfoLocalStorage.id
    // image: image,
    // id: id,
    // name: name,
    // price: price,

  })

  const [checkoutError, setCheckoutError] = useState({
    userName: "",
    // lastName: "",
    email: "",
    phone: "",
    address: "",
    // company: "",
    city: "",
    district: "",
    ward: "",
  })


  let grandTotal = 0

  function handleChange(e) {
    const { name, value, checked, type } = e.target;
    console.log("🚀 ~ file: index.jsx ~ line 80 ~ handleChange ~ value", value)
    setFillBill({
      ...fillBill,
      [name]: type === "checkbox" ? checked : value,
    });
  }



  function handleCheckout() {
    let isValid = true;

    const newCheckoutError = {
      userName: "",
      // lastName: "",
      email: "",
      phone: "",
      address: "",
      // company: "",
      city: "",
      district: "",
      ward: "",
    }

    if (fillBill.userName.trim().length === 0) {
      newCheckoutError.userName = "Vui lòng không để trống";
      isValid = false;
    } else {
      // isValid = true;
      newCheckoutError.userName = "";
    }

    // if (fillBill.lastName.trim().length === 0) {
    //     newCheckoutError.lastName = "Vui lòng không để trống";
    //     isValid = false;
    // } else {
    //     // isValid = true;
    //     newCheckoutError.lastName = "";
    // }

    if (fillBill.email.trim().length === 0) {
      newCheckoutError.email = "Vui lòng không để trống";
      isValid = false;
    } else {
      // isValid = true;
      newCheckoutError.email = "";
    }

    if (fillBill.phone.trim().length === 0) {
      newCheckoutError.phone = "Vui lòng không để trống";
      isValid = false;
    } else {
      // isValid = true;
      newCheckoutError.phone = "";
    }

    // if (fillBill.company.trim().length === 0) {
    //     newCheckoutError.company = "Vui lòng không để trống";
    //     isValid = false;
    // } else {
    //     isValid = true;
    //     newCheckoutError.company = "";
    // }


    if (fillBill.address.trim().length === 0) {
      newCheckoutError.address = "Vui lòng không để trống";
      isValid = false;
    } else {
      isValid = true;
      newCheckoutError.address = "";
    }

    if (!isOnChangeCity) {
      isValid = false;
      newCheckoutError.city = "Vui lòng không để trống";
    } else {
      isValid = true;
      newCheckoutError.city = "";
    }

    if (!isOnChangeDistrict) {
      isValid = false;
      newCheckoutError.district = "Vui lòng không để trống";
    } else {
      isValid = true;
      newCheckoutError.district = "";
    }

    if (!isOnChangeWard) {
      isValid = false;
      newCheckoutError.ward = "Vui lòng không để trống";
    } else {
      isValid = true;
      newCheckoutError.ward = "";
    }
    // if (fillBill.country.trim().length === 0) {
    //     newCheckoutError.country = "Vui lòng không để trống";
    //     isValid = false;
    // } else {
    //     isValid = true;
    //     newCheckoutError.country = "";
    // }

    // if (fillBill.city.trim().length === 0) {
    //     newCheckoutError.city = "Vui lòng không để trống";
    //     isValid = false;
    // } else {
    //     isValid = true;
    //     newCheckoutError.city = "";
    // }
    if (isValid) {
      const ordersInfo = {
        status: "Đang giao",
        userName: fillBill.userName,
        email: fillBill.email,
        phone: fillBill.phone,
        addressName: fillBill.address,
        cityName: cityName,
        districtName: districtName,
        wardName: wardName,
        userId: fillBill.userId,
        totalPrice: grandTotal,
        date: moment().format('LL'),
        time: moment().format('LT'),
        carts: cartList.data
      }
      addOrder(ordersInfo);
      const key = `open${Date.now()}`;
      notification.success({
        message: 'Đặt hàng thành công thành công',
        key,
        duration: 2
     } );
      history.push(ROUTERS.HOME)

    } else {
      setCheckoutError({ ...newCheckoutError });
    }
  }

  function onChangeSelectedCity(value) {
    //value: là code của city

    //check đã chọ city
    setIsOnChangeCity(true)
    const cityFiltered = city.data.filter((item) => item.code === value);
    setCityName(cityFiltered[0].name);
    setCityCode(value);

    //setIsSelected(true) để check disabled của district
    setIsSelected(true)
    console.log(`City ${cityCode}`);
  }


  function onChangeSelectedDistrict(value) {
    //value: là code của district

    //check đã chọ district
    setIsOnChangeDistrict(true)
    const districtFiltered = district.data.filter((item) => item.code === value);
    setDistrictName(districtFiltered[0].name);
    setDistrictCode(value);

    //setIsSelected(true) để check disabled của ward
    setIsSelected(true)
    console.log(`District ${districtCode}`);
  }
  function onChangeSelectedWard(value) {
    //value: là code của ward

    //check đã chọ ward
    setIsOnChangeWard(true)
    const wardFiltered = ward.data.filter((item) => item.code === value);
    setWardName(wardFiltered[0].name);
    setWardCode(value);
    setIsSelected(true)
    console.log(`Ward ${wardCode}`);
  }




  function onBlur() {
    // console.log('blur');
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


  function renderCheckOut() {
    if (cartList.load) return <p>Đợi một chút nha...</p>;

    return (
      cartList.data.map((cartItem, cartIndex) => {
        const productPrice = ((cartItem.productPrice + (cartItem.color.price || 0) + (cartItem.size.price || 0)) * (1 - cartItem.productDiscount)) * cartItem.productQuantity;
        grandTotal = grandTotal + productPrice;
        // if (cartItem.userId === userInfoLocalStorage.id
        // ) {
        // }
        return (
          <Item
            key={cartItem.productId}
            cartItem={cartItem}
          />
        )
      })
    );
  }
  return (
    <>
      <div className="main-contaner container">
        <div className="main-content ">
          <div className="checkout-main-left">
            <div className="checkout-bill_content">
              <div className="bill-title">
                <Title level={2}>Địa chỉ nhận hàng</Title>
              </div>

              <div className="bill-name_info">
                <div className="checkout-input_content">
                  <label htmlFor="userName" className="">
                    Họ và Tên
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input type="text" placeholder="Tên" name="userName" onChange={(e) => handleChange(e)} />
                  <div className="text-warning">{checkoutError.userName}</div>
                </div>

                {/* <div className="input-content">
                                    <label htmlFor="last-name">Họ*</label>
                                    <input type="text" placeholder="Họ và tên lót" name="lastName" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.lastName}</div>
                                </div> */}

                <div className="input-content">
                  <label htmlFor="email">
                    Địa chỉ email
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input type="text" placeholder="Địa chỉ email" name="email" onChange={(e) => handleChange(e)} />
                  <div className="text-warning">{checkoutError.email}</div>
                </div>

                <div className="input-content">
                  <label htmlFor="phone">
                    Số điện thoại
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input type="text" placeholder="Số điện thoại" name="phone" onChange={(e) => handleChange(e)} />
                  <div className="text-warning">{checkoutError.phone}</div>
                </div>

                <div className="input-content">
                  <label htmlFor="address">
                    Địa chỉ
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input type="text" placeholder="Địa chỉ" name="address" onChange={(e) => handleChange(e)} />
                  <div className="text-warning">{checkoutError.address}</div>
                </div>

                <div className="input-content">
                  <label htmlFor="address">
                    Tỉnh/Thành Phố
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Select
                    showSearch
                    style={{ width: 400 }}
                    placeholder="Chọn tỉnh/thành phố"
                    optionFilterProp="children"
                    onChange={onChangeSelectedCity}
                    // onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {renderCity()}
                  </Select>
                  <div className="text-warning">{checkoutError.city}</div>
                </div>

                <div className="input-content">
                  <label htmlFor="address">
                    Quận/Huyện
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Select
                    showSearch
                    style={{ width: 400 }}
                    placeholder="Chọn quận/huyện"
                    optionFilterProp="children"
                    onChange={onChangeSelectedDistrict}
                    // onFocus={onFocusDistrict}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    disabled={isSelected ? false : true}
                  >
                    {renderDistrictOfCity()}
                  </Select>
                  <div className="text-warning">{checkoutError.district}</div>
                </div>
                <div className="input-content">
                  <label htmlFor="address">
                    Xã/Phường
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Select
                    showSearch
                    style={{ width: 400 }}
                    placeholder="Chọn xã/phường"
                    optionFilterProp="children"
                    onChange={onChangeSelectedWard}
                    // onFocus={onFocusWard}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      //option: lấy tất cả option
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    disabled={isSelected ? false : true}
                  >
                    {renderWardOfDistrict()}
                  </Select>
                  <div className="text-warning">{checkoutError.ward}</div>
                </div>

              </div>
            </div>
          </div>


          <div className="checkout-main-right">
            <div className="checkout-title">
              <Title level={2}>Gói hàng</Title>
            </div>


            <div className="checkout_cart-container">
              <div className="checkout_cart-subtitle">
                <Title level={3}>Sản phẩm</Title>
                <Title level={3}>Giá</Title>
              </div>
              {renderCheckOut()}

              <div className="checkout_cart-grand-total-area">
                <h5>Tổng cộng</h5>
                <h5>{grandTotal.toLocaleString() + ' vnđ'}</h5>
              </div>
            </div>

            <button className="btn-order" onClick={() => handleCheckout()}>Đặt hàng</button>
          </div>
        </div>
      </div>

    </>
  )
}
const mapStateToProps = (state) => {
  const { cartList } = state.cartReducer;
  const { orderList } = state.orderReducer;
  const { address, city, district, ward } = state.addressReducer;
  return {
    // productList: productList,
    cartList: cartList,
    orderList: orderList,
    address: address,
    city: city,
    district: district,
    ward: ward,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    getCartList: (params) => dispatch(getCartListAction(params)),
    addBill: (params) => dispatch(addBillTaskAction(params)),
    getOrderList: (params) => dispatch(getOrderListAction(params)),
    addOrder: (params) => dispatch(addOrderAction(params)),
    getCity: (params) => dispatch(getCityAction(params)),
    getDistrict: (params) => dispatch(getDistrictAction(params)),
    getWard: (params) => dispatch(getWardAction(params)),
    addAddress: (params) => dispatch(addAddressAction(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage);