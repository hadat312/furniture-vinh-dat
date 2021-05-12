import React, { useEffect, useState } from 'react';
// import Item from '../Checkout/component/Item'
import Item from '../Checkout/components/Item';
import { connect } from 'react-redux';

import {
    getProductListAction,
    getCartAction,
    addBillTaskAction
} from '../../redux/actions'

import { SmileOutlined } from '@ant-design/icons';
import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';

import './checkout.css'
import { Components } from 'antd/lib/date-picker/generatePicker';

const { Option } = Select;



function CheckOutPage(props) {

    // const [grandTotal, setGrandTotal] = useState(0);
    // console.log("🚀 ~ file: index.jsx ~ line 24 ~ CheckOutPage ~ grandTotal", grandTotal)

    const {
        id,
        image,
        name,
        description,
        price,
        discount,
        getProductList,
        productList,
        getCart,
        cart,
        addBill,
        userid

    } = props;
    // console.log("🚀 ~ file: index.jsx ~ line 41 ~ CheckOutPage ~ cart", cart)


    useEffect(() => {
        getCart({
            page: 1,
            limit: 20,
        });

        getProductList({
            page: 1,
            limit: 20,
        })
    }, []);

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
            newCheckoutError.firstName = "First Name is required";
            isValid = false;
        } else {
            newCheckoutError.firstName = "";
        }

        if (fillBill.lastName.trim().length === 0) {
            newCheckoutError.lastName = "Last Name is required";
            isValid = false;
        } else {
            newCheckoutError.lastName = "";
        }

        if (fillBill.email.trim().length === 0) {
            newCheckoutError.email = "Email is required";
            isValid = false;
        } else {
            newCheckoutError.email = "";
        }

        if (fillBill.phone.trim().length === 0) {
            newCheckoutError.phone = "Phone is required";
            isValid = false;
        } else {
            newCheckoutError.phone = "";
        }

        if (fillBill.company.trim().length === 0) {
            newCheckoutError.company = "Company is required";
            isValid = false;
        } else {
            newCheckoutError.company = "";
        }


        if (fillBill.address.trim().length === 0) {
            newCheckoutError.address = "Address is required";
            isValid = false;
        } else {
            newCheckoutError.address = "";
        }


        // if (fillBill.country.trim().length === 0) {
        //     newCheckoutError.country = "Country is required";
        //     isValid = false;
        // } else {
        //     newCheckoutError.country = "";
        // }

        if (fillBill.city.trim().length === 0) {
            newCheckoutError.city = "City is required";
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
        if (cart.load) return <p>Loading...</p>;

        return (
            cart.data.map((cartItem, cartIndex) => {
                grandTotal = grandTotal + cartItem.price;
                if (cartItem.userId === userInfoLocalStorage.id
                ) {
                    return (
                        <Item
                            key={cartItem._id}
                            cartItem={cartItem}
                        />
                    )
                }
            })
        );
    }
    return (
        <>
            <div className="main-contaner container">
                <div className="main-content ">
                    <div className="checkout-main-left">
                        <div className="checkout-bill_content">
                            <h2 className="bill-title">
                                Billing Address
                            </h2>

                            <div className="bill-name_info">
                                <div className="checkout-input_content">
                                    <label htmlFor="first-name" className="">First Name*</label>
                                    <input type="text" placeholder="First Name" name="firstName" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.firstName}</div>
                                </div>

                                <div className="input-content">
                                    <label htmlFor="last-name">Last Name*</label>
                                    <input type="text" placeholder="Last Name" name="lastName" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.lastName}</div>
                                </div>

                                <div className="input-content">
                                    <label htmlFor="email">EMAIL ADDRESS*</label>
                                    <input type="text" placeholder="Email Address" name="email" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.email}</div>
                                </div>

                                <div className="input-content">
                                    <label htmlFor="phone">PHONE NO*</label>
                                    <input type="text" placeholder="Phone number" name="phone" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.phone}</div>
                                </div>

                                <div className="input-content">
                                    <label htmlFor="comapny">COMPANY NAME</label>
                                    <input type="text" placeholder="Company name" name="company" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.company}</div>
                                </div>

                                <div className="input-content">
                                    <label htmlFor="address">ADDRESS</label>
                                    <input type="text" placeholder="Address" name="address" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.address}</div>
                                </div>

                                <div className="input-content">
                                    <label htmlFor="country">COUNTRY*</label>
                                    <select name="" id="" className="checkout-select">
                                        <option value="Đà Nẵng">Việt Nam</option>
                                        <option value="Gia Lai">ThaiLand</option>
                                        <option value="Huế">Australia</option>
                                        <option value="Sài Gòn">England</option>
                                        <option value="Hà Nội">Spain</option>
                                        <option value="Đà Lạt">Greece</option>
                                    </select>
                                    {/* <div className="text-warning">{checkoutError.country}</div> */}
                                </div>

                                <div className="input-content">
                                    <label htmlFor="city">TOWN/CITY*</label>
                                    <input type="text" placeholder="Town/City" name="city" onChange={(e) => handleChange(e)} />
                                    <div className="text-warning">{checkoutError.city}</div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="checkout-main-right">
                        <h2 className="checkout-title">
                            Cart Total
                        </h2>

                        <div className="checkout_cart-container">
                            <div className="checkout_cart-subtitle">
                                <h4>Product</h4>
                                <h4>Total</h4>
                            </div>
                            {renderCheckOut()}

                            <div className="checkout_cart-grand-total-area">
                                <h5>Grand Total</h5>
                                <h5>{grandTotal.toLocaleString()} VND</h5>
                            </div>
                        </div>

                        <button className="btn-order" onClick={() => handleCheckout()}>Place Order</button>
                    </div>
                </div>
            </div>

        </>
    )
}
const mapStateToProps = (state) => {
    const { productList } = state.productReducer;
    const { cart } = state.cartReducer;
    // console.log("🚀 ~ file: index.jsx ~ line 215 ~ mapStateToProps ~ cart", cart)
    return {
        productList: productList,
        cart: cart,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProductList: (params) => dispatch(getProductListAction(params)),
        getCart: (params) => dispatch(getCartAction(params)),
        addBill: (params) => dispatch(addBillTaskAction(params))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage);