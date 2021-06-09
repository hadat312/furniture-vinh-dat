import React, { useState } from 'react';

import history from '../../utils/history'
import logo1 from '../../images/logo1.jpg'
import twitter from '../../images/twitter.svg'
import insfooter from '../../images/insfooter.svg'
import hambuger from '../../images/hambuger.svg'
import search from '../../images/search.svg'
import cart from '../../images/cart.svg'
import heart from '../../images/heart.svg'
import fbfooter from '../../images/fbfooter.svg'
import user from '../../images/user.svg'
import sofa from '../../images/sofa.jpg'
import youtube from '../../images/youtube.svg'
import calendar from '../../images/calendar.svg'
import thumbnail1 from '../../images/thumbnail1.png'
import thumbnail2 from '../../images/thumbnail2.png'
import thumbnail3 from '../../images/thumbnail3.png'
import thumbnail4 from '../../images/thumbnail4.png'
import thumbnail5 from '../../images/thumbnail5.png'
import thumbnail6 from '../../images/thumbnail6.png'
import ImgComp from '../../ImgComp'
// import carousel1 from '../../images/carousel1.jpg';
import carousel3 from '../../images/carousel3.jpg';
import carousel4 from '../../images/carousel4.jpg';
import carousel6 from '../../images/carousel6.jpg'
import carousel7 from '../../images/carousel7.jpg';
import bannerbg from '../../images/bannerbg.png';
import avatar from '../../images/avatar.png';
import avatar1 from '../../images/avatar1.jpg';
import avatar2 from '../../images/avatar2.jpg';
import testimonialsbg from '../../images/testimonialsbg.png';
import brand1 from '../../images/brand1.png';
import brand2 from '../../images/brand2.png';
import brand3 from '../../images/brand3.png';
import brand4 from '../../images/brand4.png';
import brand5 from '../../images/brand5.png';
import brand6 from '../../images/brand6.png';
import btnplay from '../../images/btnplay.png';

import {  RightOutlined ,LeftOutlined } from '@ant-design/icons'

import './styles.css'


function AboutPage() {
    const [isShowSearchBar, setIsShowSearchBar] = useState(false);
    const [isLogOut, setIsLogOut] = useState(false);

    const [autoPlay, setAutoPlay] = useState({
        activeIndex: 0,
        transalate: 0,
        transition: 0.45
    })
    const [x, setX] = useState(0);

    let imageArr = [
        <ImgComp src={carousel4} />,
        <ImgComp src={carousel3} />,
        // <ImgComp src={carousel1} />,
        <ImgComp src={carousel7} />,
        // <ImgComp src={carousel6} />,
        // <ImgComp src={carousel2} />,
        // <ImgComp src={carousel1}  />,
        // <ImgComp src={slide1} />,
    ];


    function Pre() {
        x === 0 ? setX(-100 * (imageArr.length - 1)) : setX(x + 100);
    };

    function Next() {
        x === -100 * (imageArr.length - 1) ? setX(0) : setX(x - 100);
    };

    return (
        <>

            <div className="banner-bg">
                <div className="banner-container" id="banner-auto">
                    {imageArr.map((item, index) => {
                        return (
                            <div key={index}
                                className="slide"
                                style={{ transform: `translateX(${x}%)` }}
                            >
                                {item}
                            </div>
                        );
                    })}
                    <button className="next" id="next" onClick={() => Next()}>
                        <RightOutlined />
                    </button>
                    <button className="pre" id="pre" onClick={() => Pre()}>
                        <LeftOutlined />
                    </button>
                    <div className="banner-purpot">
                        <div className="banner-title">About</div>
                        <ul className="banner-list">
                            <li className="banner-item banner-switch">Home</li>
                            <span>/</span>
                            <li className="banner-item">About Two</li>
                        </ul>
                    </div>
                </div>

                <div className="about-purpot ">
                    <div className="about-title-container">
                        <p className="dark-title">SIMPLY OR WHITE</p>
                        <h2 className="title">Clever &amp; unique ideas</h2>
                        <p className="title-text">Lorem ipsum dolor sit amet, consectetur cing elit. Suspe ndisse suscipit sagittis leo sit met condimentum estibulum is Suspe ndisse suscipit sagittis leo sit met condimentum estibulorem ipsum dolor sit amet, consectetur cing elit.</p>
                    </div>

                    <div className="about-video-bg container">
                        <p className="video-text video-text-left" onClick={() => history.push('/Login')}>
                            LAZEDA STORE
                        </p>
                        <div className="about-video-content">
                            <div className="play-icon">
                                <button>
                                    <img src={btnplay}  alt="icon-play" className="img-play" />
                                </button>
                            </div>
                            <h1>OUR STORY</h1>
                        </div>

                        <p className="video-text video-text-right" onClick={() => history.push('/Login')}>
                            OUR STORY
                        </p>
                    </div>

                    <div className="about-info container">
                        <div className="about-info-content">
                            <div className="about-left">
                                <h2 className="widget-title">ADDRESS</h2>
                                <p className="widget-content">800 Abbot Kinney Blvd. Unit D &amp; E Venice</p>

                                <h2 className="widget-title">PHONE</h2>
                                <p className="widget-content">Mobile: (+88) – 1990</p>

                                <h2 className="widget-title">EMAIL</h2>
                                <p className="widget-content">contact@lezadastore.com</p>
                            </div>

                            <div className="about-right">
                                <div className="about-page-content">
                                    <div className="about-page-text">
                                        <p>Lorem ipsum dolor sit amet, consectetur cing elit. Suspe ndisse suscipit sagittis leo sit estibulum issim Lorem ipsum dolor sit amet, consectetur cing elit. ipsum dolor sit amet, consectetur cing elit. Suspe ndisse suscipit sagittis leo sit es</p>
                                    </div>
                                    <div className="btn-store-online">
                                        <button>
                                            +  ONLINE STORE
                                 </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-title-container ">
                <div className="section-title-content">
                    <h2 className="section-title">
                        Testimonial
                    </h2>
                    <div className="testimonial-wrapper">
                        <div className="testimonial-info">
                            <p className="testimonial-text">
                                There's nothing would satisfy me much more than a worry-free clean and
                                responsive theme for my high-traffic site
                        </p>

                            <div className="testimonial-contact">
                                <img src={avatar} alt="avatar"></img>
                                <p className="testimonial-name">Lois Thompson</p>
                                <p className="testimonial-job">Reporter</p>
                            </div>
                        </div>

                        <div className="testimonial-info">
                            <p className="testimonial-text">
                                There's nothing would satisfy me much more than a worry-free clean and
                                responsive theme for my high-traffic site
                        </p>

                            <div className="testimonial-contact">
                                <img src={avatar2} alt="avatar"></img>
                                <p className="testimonial-name">Lois Thompson</p>
                                <p className="testimonial-job">Actor</p>
                            </div>
                        </div>

                        <div className="testimonial-info">
                            <p className="testimonial-text">
                                There's nothing would satisfy me much more than a worry-free clean and
                                responsive theme for my high-traffic site
                        </p>

                            <div className="testimonial-contact">
                                <img src={avatar1} alt="avatar"></img>
                                <p className="testimonial-name">Lois Thompson</p>
                                <p className="testimonial-job">Model</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-brand-area">
                <div className="about-brand-content">
                    <h2 className="about-brand-title">
                        Our Brands
                    </h2>
                    <div className="brand-logo-area">
                        <img src={brand1} alt="" />
                        <img src={brand2} alt="" />
                        <img src={brand3} alt="" />
                        <img src={brand4} alt="" />
                        <img src={brand5} alt="" />
                        <img src={brand6} alt="" />
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            {/* <div className="footer-bg ">
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
            </div> */}
        </>

    )
}
export default AboutPage;