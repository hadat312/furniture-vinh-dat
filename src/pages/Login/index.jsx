import React, { useState } from 'react';


import history from '../../utils/history';
import { ROUTERS } from '../../constants/router';
import { REGEX } from '../../constants/validate';
import { connect } from 'react-redux';
import logo from '../../images/logo.webp';
import logo3 from '../../images/logo3.png'
import fb from '../../images/fb.svg';
import twit from '../../images/twit.svg'
import ins from '../../images/ins.png'
import gmail from '../../images/gmail.svg'


import './styles.css'
import {  UserOutlined } from '@ant-design/icons'


import { loginAction } from '../../redux/actions'


function LoginPage({ userInfo, addLogin }) {


    const [loginForm, setLoginForm] = useState([]);

    const [fieldData, setFieldData] = useState({
        userEmail: "",
        userPassword: "",
    });

    const [loginError, setLoginError] = useState({
        userEmail: "",
        userPassword: "",
    });

    function handleChange(e) {
        const { name, value, checked, type } = e.target;
        setFieldData({
            ...fieldData,
            [name]: type === "checkbox" ? checked : value,
        });
    }
    console.log('userInfo: ', userInfo)
    function handleLogin() {
        let isValid = true;

        const newLoginError = {
            userEmail: "",
            userPassword: "",
        }

        // if (fieldData.userEmail.trim().length === 0) {
        //     newLoginError.userEmail = "!";
        //     isValid = false;
        // } else {
        //     newLoginError.userEmail = "";
        // }
        if (fieldData.userEmail.trim().length === 0) {
            newLoginError.userEmail = "Bạn chưa nhập email";
            isValid = false;
        } else if (!REGEX.EMAIL_REGEX.test(fieldData.userEmail.trim())) {
            newLoginError.userEmail = "Vui lòng nhập lại địa chỉ Email hợp lệ !";
            isValid = false;
        } else {
            newLoginError.userEmail = "";
        }

        if (fieldData.userPassword.trim().length === 0) {
            newLoginError.userPassword = "Bạn chưa nhập mật khẩu";
            isValid = false;
        } 
        // else if (userInfo.error.length !== 0) {
        //     newLoginError.userPassword = userInfo.error;
        //     isValid = false;
        // } 
        else {
            newLoginError.userPassword = "";
            isValid = true;
        }

        if (isValid) {
            addLogin(fieldData);
        } else {
            setLoginError({ ...newLoginError });
        }


    }

    return (

        <>
            {/* Register - Navigation */}
            <div className="whole-container">
                <div className="header-container container ">
                    <div className="header-content">
                        <img className="header-logo-brand" src={logo} alt="" onClick={() => history.push(ROUTERS.HOME)}/>

                        <div className="header-title" onClick={() => history.push(ROUTERS.REGISTER)} >Sign Up</div>
                    </div>
                </div>



                {/* Register Form */}
                <div className="login-background">
                    <div className="login-content">
                        <h1>Login</h1>
                        <form action="">
                            <div className="text-input">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <input type="text" className="form-control" placeholder="Your Email" id="email" name="userEmail" onChange={(e) => handleChange(e)} />
                                <div className="text-warning">{loginError.userEmail}</div>
                            </div>

                            <div className="text-input">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                                <input type="password" className="form-control" placeholder="Your Password" id="pwd" name="userPassword" onChange={(e) => handleChange(e)} />
                                <div className="text-warning">{loginError.userPassword}</div>
                            </div>

                            <div className="form-contact">
                                <div className="form-active">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" value="id" id="flexCheckDefault" name="check" />
                                        <label htmlFor="flexCheckDefault" className="form-check-label">Remember me</label>
                                    </div>

                                    <p className="form-forgot spacing-text" >Forgot Password ? </p>
                                </div>

                                <div className="d-grid gap-2">
                                    <button className="button-login title-login btn-login"
                                        type="button"
                                        id="submit"
                                        data-toggle="modal"
                                        data-target="#confirmLogin"
                                        onClick={() => handleLogin()}
                                    >
                                        Continue
                                   </button>
                                </div>



                                <div className="form-contact-tilte">
                                    <h6>Fast Signin with Your Favorite Social Profile</h6>

                                    <div className="form-social ">
                                        <img src={fb} alt="" />
                                        <img src={ins} alt="" />
                                        <img src={twit} alt="" />
                                        <img src={gmail} alt="" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>

    )
}
const mapStateToProps = (state) => {
    const { userInfo } = state.userReducer;
    return {
        userInfo: userInfo,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addLogin: (params) => dispatch(loginAction(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);