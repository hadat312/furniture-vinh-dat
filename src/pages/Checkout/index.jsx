import React, { useEffect, useState } from 'react';
// import Item from '../Checkout/component/Item'
import Item from '../Checkout/components/Item';
import { connect } from 'react-redux';

import {
    getProductListAction,
    getCartListAction,
    addBillTaskAction
} from '../../redux/actions'

import { SmileOutlined } from '@ant-design/icons';
import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';

import './checkout.css'
import { Components } from 'antd/lib/date-picker/generatePicker';

const { Option } = Select;



function CheckOutPage(props) {

    // const [grandTotal, setGrandTotal] = useState(0);

    const {
        id,
        image,
        name,
        description,
        price,
        discount,
        getProductList,
        productList,
        getCartList,
        cartList,
        addBill,
        userid

    } = props;

    const { Title } = Typography;

    // useEffect(() => {
    //     getCartList({
    //         page: 1,
    //         limit: 20,
    //     });

    //     getProductList({
    //         page: 1,
    //         limit: 20,
    //     })
    // }, []);

    const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || {};

    const [fillBill, setFillBill] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        address: "",
        country: "",
        city: "",
        userId: userInfoLocalStorage.id,
        image: image,
        id: id,
        name: name,
        price: price,

    })

    const [checkoutError, setCheckoutError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        address: "",
        country: "",
        city: "",
    })

    function handleChange(e) {
        const { name, value, checked, type } = e.target;
        setFillBill({
            ...fillBill,
            [name]: type === "checkbox" ? checked : value,
        });
    }



    function handleCheckout() {
        let isValid = true;

        const newCheckoutError = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: "",
            address: "",
            country: "",
            city: "",
        }

        if (fillBill.firstName.trim().length === 0) {
            newCheckoutError.firstName = "Vui lòng không để trống";
            isValid = false;
        } else {
            newCheckoutError.firstName = "";
        }

        if (fillBill.lastName.trim().length === 0) {
            newCheckoutError.lastName = "Vui lòng không để trống";
            isValid = false;
        } else {
            newCheckoutError.lastName = "";
        }

        if (fillBill.email.trim().length === 0) {
            newCheckoutError.email = "Vui lòng không để trống";
            isValid = false;
        } else {
            newCheckoutError.email = "";
        }

        if (fillBill.phone.trim().length === 0) {
            newCheckoutError.phone = "Vui lòng không để trống";
            isValid = false;
        } else {
            newCheckoutError.phone = "";
        }

        if (fillBill.company.trim().length === 0) {
            newCheckoutError.company = "Vui lòng không để trống";
            isValid = false;
        } else {
            newCheckoutError.company = "";
        }


        if (fillBill.address.trim().length === 0) {
            newCheckoutError.address = "Vui lòng không để trống";
            isValid = false;
        } else {
            newCheckoutError.address = "";
        }


        // if (fillBill.country.trim().length === 0) {
        //     newCheckoutError.country = "Vui lòng không để trống";
        //     isValid = false;
        // } else {
        //     newCheckoutError.country = "";
        // }

        if (fillBill.city.trim().length === 0) {
            newCheckoutError.city = "Vui lòng không để trống";
            isValid = false;
        } else {
            newCheckoutError.city = "";
        }

        if (isValid) {
            addBill(fillBill)

        } else {
            setCheckoutError({ ...newCheckoutError });
        }
    }



    let grandTotal = 0
    function renderCheckOut() {
        if (cartList.load) return <p>Đợi một chút nha...</p>;

        return (
            cartList.data.map((cartItem, cartIndex) => {
                const productPrice = ((cartItem.productPrice + (cartItem.color.price || 0) + (cartItem.size.price || 0)) * (1 - cartItem.productDiscount)) * cartItem.productQuantity;
                console.log(cartItem.productId, ", total: ", productPrice)
                grandTotal = grandTotal + productPrice;
                console.log(cartItem.productId, ", grand total: ", grandTotal);
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
                                    <label htmlFor="first-name" className="">Tên*</label>
                                    <input type="text" placeholder="Tên" name="firstName" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.firstName}</div>
                                </div>

                                <div className="input-content">
                                    <label htmlFor="last-name">Họ*</label>
                                    <input type="text" placeholder="Họ và tên lót" name="lastName" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.lastName}</div>
                                </div>

                                <div className="input-content">
                                    <label htmlFor="email">Địa chỉ email*</label>
                                    <input type="text" placeholder="Địa chỉ email" name="email" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.email}</div>
                                </div>

                                <div className="input-content">
                                    <label htmlFor="phone">Số điện thoại*</label>
                                    <input type="text" placeholder="Số điện thoại" name="phone" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.phone}</div>
                                </div>

                                {/* <div className="input-content">
                                    <label htmlFor="comapny">Công ty</label>
                                    <input type="text" placeholder="Company name" name="company" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.company}</div>
                                </div> */}

                                <div className="input-content">
                                    <label htmlFor="address">Địa chỉ</label>
                                    <input type="text" placeholder="Địa chỉ" name="address" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.address}</div>
                                </div>

                                {/* <div className="input-content">
                                    <label htmlFor="country">Quốc giá*</label>
                                    <select name="" id="" className="checkout-select">
                                        <option value="Đà Nẵng">Việt Nam</option>
                                        <option value="Gia Lai">ThaiLand</option>
                                        <option value="Huế">Australia</option>
                                        <option value="Sài Gòn">England</option>
                                        <option value="Hà Nội">Spain</option>
                                        <option value="Đà Lạt">Greece</option>
                                    </select>
                                    <div className="text-warning">{checkoutError.country}</div>
                                </div> */}

                                {/* <div className="input-content">
                                    <label htmlFor="city">Quận / Thành phố*</label>
                                    <input type="text" placeholder="Town/City" name="city" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.city}</div>
                                </div> */}
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
    // const { productList } = state.productReducer;
    const { cartList } = state.cartReducer;
    return {
        // productList: productList,
        cartList: cartList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProductList: (params) => dispatch(getProductListAction(params)),
        getCartList: (params) => dispatch(getCartListAction(params)),
        addBill: (params) => dispatch(addBillTaskAction(params))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage);