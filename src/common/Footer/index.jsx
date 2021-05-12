import { Col, Row, Typography } from 'antd';
import React from 'react';
import history from '../../utils/history'
import { ROUTERS } from '../../constants/router';
import { AiFillPhone, AiTwotoneMail, AiFillFacebook, AiFillYoutube, AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";

import fbfooter from '../../images/fbfooter.svg'
import logo1 from '../../images/logo1.jpg'
import twitter from '../../images/twitter.svg'
import insfooter from '../../images/insfooter.svg'
import youtube from '../../images/youtube.svg'

import './index.css'
function Footer(props) {
    const { Title } = Typography;
    return (
        <>
            <div className="footer-bg ">
                <div className="footer-purpot container">
                    <div className="footer-logo_brand">
                        <img src={logo1} alt="" />
                    </div>


                    <ul className="footer-nav">
                        <li>
                            <a href="#" className="footer-list_title">ABOUT</a>
                            <ul className="footer-about_dropdown">
                                <li>
                                    <a href="#" className="footer-list">About us</a>
                                </li>
                                <li>
                                    <a href="#" className="footer-list">Store location</a>
                                </li>
                                <li>
                                    <a href="#" className="footer-list">Contact</a>
                                </li>
                                <li>
                                    <a href="#" className="footer-list">Orders tracking</a>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#" className="footer-list_title">USEFUL LINKS </a>
                            <ul className="footer-useful_dropdown">
                                <li>
                                    <a href="#" className="footer-list">Returns</a>
                                </li>
                                <li>
                                    <a href="#" className="footer-list">Support Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="footer-list">Size guide</a>
                                </li>
                                <li>
                                    <a href="#" className="footer-list">FAQs</a>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#" className="footer-list_title">FOLLOW US ON</a>

                            <ul className="footer-follow_dropdown">
                                <li className="footer-info">
                                    <img src={fbfooter} alt="Our Facebook" />
                                    <p>Facebook</p>
                                </li>
                                <li className="footer-info">
                                    <img src={twitter} alt="Our Twitter" />
                                    <p> Twitter</p>
                                </li>
                                <li className="footer-info">
                                    <img src={insfooter} alt="Our Ins" />
                                    <p> Instagram </p>
                                </li>
                                <li className="footer-info">
                                    <img src={youtube} alt="Our Youtube" />
                                    <p>Youtube</p>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="footer-subscribe">
                        <h2>Subscribe</h2>
                        <input type="text" name="" id="" placeholder="Your email address" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;