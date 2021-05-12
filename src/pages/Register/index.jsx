import React, { useState } from 'react';

import { connect } from 'react-redux';
import history from '../../utils/history';
import logo from '../../images/logo.webp';
import logo3 from '../../images/logo3.png'
import fb from '../../images/fb.svg';
import twit from '../../images/twit.svg'
import ins from '../../images/ins.png'
import './styles.css';

import { addUserAction, registerAction } from '../../redux/actions'

function RegisterPage(props) {
    const { addUserInfo, userInfo } = props;


    const [fielData, setFielData] = useState({
        userName: "",
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
        userPhoneNumber: "",
        check: false,
    });
    console.log("🚀 ~ file: index.jsx ~ line 19 ~ RegisterPage ~ fielData", fielData)

    const [userError, setUserError] = useState({
        userName: "",
        userEmail: "",
        userPhoneNumber: "",
        userPassword: "",
        confirmPassword: "",
    });

    // const [loginError, setLoginError] = useState({
    //     email: "",
    //     password: "",
    // });

    function handleChange(e) {
        const { name, value, checked, type } = e.target;
        setFielData({
            ...fielData,
            [name]: type === "checkbox" ? checked : value,
        });
    }

    function handleRegister() {
        let isValid = true;

        const newUserError = {
            userName: "",
            userEmail: "",
            userPassword: "",
            confirmPassword: "",
            userPhoneNumber: "",
        }

        if (fielData.userName.trim().length === 0) {
            newUserError.userName = "Email is required";
            isValid = false;
        } else {
            newUserError.userName = "";
        }

        if (fielData.userPhoneNumber.trim().length === 0) {
            newUserError.userPhoneNumber = "Phone is required";
            isValid = false;
        } else {
            newUserError.userPhoneNumber = "";
        }

        if (fielData.userEmail.trim().length === 0) {
            newUserError.userEmail = "Email is required";
            isValid = false;
        } else {
            newUserError.userEmail = "";
        }

        if (fielData.userPassword.trim().length === 0) {
            newUserError.userPassword = "Password is required";
            isValid = false;
        } else if (fielData.userPassword.trim().length < 4) {
            newUserError.userPassword = "Password should be between 4 and 60 characters";
            isValid = false;
        } else {
            newUserError.userPassword = "";
        }

        if (fielData.confirmPassword.trim().length === 0) {
            newUserError.confirmPassword = "You need to confirm your pasword";
            isValid = false;
        } else if (fielData.confirmPassword !== fielData.userPassword) {
            newUserError.confirmPassword = "Invalid password confirmation";
            isValid = false;
        } else {
            newUserError.confirmPassword = "";
        }

        if (isValid) {
            addUserInfo(fielData);
            // localStorage.setItem('userInfo', JSON.stringify(addUserInfo));
        } else {
            // history.push('/Login')
            setUserError({ ...newUserError });
        }
    };

    return (
        <>
            {/* Register - Navigation */}
            <div className="whole-container">
                <div className="header-container container ">
                    <div className="header-content">
                        <img className="header-logo-brand" src={logo} alt="" />

                        <div className="header-title" onClick={() => history.push('/Login')} >Sign In</div>
                    </div>
                </div>



                {/* Register Form */}
                <div className="register-background">
                    <div className="register-content">
                        <h1>Register</h1>
                        <form action="">
                            <div className="text-input">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <input type="text" className="form-control" placeholder="Your Name" id="name" name="userName" onChange={(e) => handleChange(e)} />
                                <div className="text-warning">{userError.userName}</div>
                            </div>

                            <div className="text-input">
                                <i class="fa fa-mobile" aria-hidden="true"></i>
                                <input type="text" className="form-control" placeholder="Your Phone Number" id="name" name="userPhoneNumber" onChange={(e) => handleChange(e)} />
                                <div className="text-warning">{userError.userPhoneNumber}</div>
                            </div>

                            <div className="text-input">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <input type="text" className="form-control" placeholder="Your Email" id="email" name="userEmail" onChange={(e) => handleChange(e)} />
                                <div className="text-warning">{userError.userEmail}</div>
                            </div>

                            <div className="text-input">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                                <input type="password" className="form-control" placeholder="Your Password" id="pwd" name="userPassword" onChange={(e) => handleChange(e)} />
                                <div className="text-warning">{userError.userPassword}</div>
                            </div>

                            <div className="text-input">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                                <input type="password" className="form-control" placeholder="Confirm Password" id="rePwd" name="confirmPassword" onChange={(e) => handleChange(e)} />
                                <div className="text-warning">{userError.confirmPassword}</div>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" value="id" id="flexCheckDefault" name="check" />
                                <label htmlFor="flexCheckDefault" className="form-check-label">Please do not email me Juan special offers</label>
                            </div>


                            <div className="d-grid gap-2">
                                <button className="button title-register btn-register"
                                    type="button"
                                    id="submit"
                                    data-toggle="modal"
                                    data-target="#confirmRegister"
                                    onClick={() => handleRegister()}
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/* Ko can */}

            {/* <div className="footer-container">
                <div className="footer-title">
                    Questions? Contact us.
                </div>

                <div className="footer-content">
                    <ul className="footer-menu">
                        <li className="footer-item">Trang Chu</li>
                        <li className="footer-item">Gioi Thieu</li>
                        <li className="footer-item">Linh Vuc Hoat Dong</li>
                        <li className="footer-item">Tin Tuc va Su Kien</li>
                    </ul>


                    <div className="footer-contact">
                        <p className=" footer-contact_title footer-item">Kết Nối Với Chúng Tôi</p>
                        <div className="footer-link">
                            <img src={fb} alt="Our Facebook" />
                            <img src={ins} alt="Our Instagram" />
                            <img src={twit} alt="Our Twitter" />
                        </div>
                    </div>
                </div>


            </div> */}
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
        addUserInfo: (params) => dispatch(registerAction(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);