import React, { useState, useEffect } from 'react';
import { ROUTERS } from '../../constants/router';
import history from '../../utils/history';
import { connect } from 'react-redux';

import Item from './components/Item';
import {
  getProductListAction

} from '../../redux/actions'

import { ShoppingCartOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons'

import carousel1 from '../../images/carousel1.jpg';
import carousel2 from '../../images/carousel2.jpg';
import carousel3 from '../../images/carousel3.jpg';
import carousel4 from '../../images/carousel4.jpg';
import carousel7 from '../../images/carousel7.jpg';
import bannerbg1 from '../../images/bannerbg1.jpg';
import bannerbg2 from '../../images/bannerbg2.jpg';
import bannerbg3 from '../../images/bannerbg3.jpg';
import collectionbg from '../../images/collectionbg.png';
import shoppingcart from '../../images/shoppingcart.svg'
import avatar from '../../images/avatar.png';
import avatar1 from '../../images/avatar1.jpg';
import avatar2 from '../../images/avatar2.jpg';
import cabinetbg from '../../images/cabinetbg.png';
import btnup from '../../images/btnup.svg'
import phongkhach from '../../images/phongkhach.jpg';
import phongngu from '../../images/phongngu.jpg';
import phongan from '../../images/phongan.jpg';

import ImgComp from '../../ImgComp'

import './home.css';


function HomePage(props) {
  const { getProductList, productList } = props;


  useEffect(() => {
    getProductList({
      page: 1,
      limit: 20,
    });
  }, [])

  const [autoPlay, setAutoPlay] = useState({
    activeIndex: 0,
    transalate: 0,
    transition: 0.45
  })
  const [x, setX] = useState(0);

  let imageArr = [
    <ImgComp src={carousel4} />,
    <ImgComp src={carousel3} />,
    <ImgComp src={carousel7} />,
    // <ImgComp src={carousel1}/>,
    // <ImgComp src={carousel2}/>
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

  // Scroll to Top
  /*
  var btntop = document.getElementById("btntop");
  
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btntop.style.display = "block";
    } else {
      btntop.style.display = "none";
    }
  }
  */

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


  function renderProductList() {
    if (productList.load) return <p>Loading...</p>
    return productList.data.map((productListItem, productListIndex) => {
      // console.log("productListItem" ,productListItem.productRanking)
      if (productListItem.productRanking === "yes") {
        return (
          <Item
            key={productListItem.id}
            productListItem={productListItem}
          />
        )
      }
    })
  }

  return (
    <>
      <div className="carousel-area">

        <div className="carousel-bg">
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
        </div>
      </div>


      <button className="btn-top" id="btn-top" onClick={() => topFunction()}>
        <img src={btnup} alt="" />
      </button>

      <div className="banner-area-container ">
        <div className="banner-standard">
          <div className="banner-standard-1">
            <div className="banner-img">
              <img src={phongkhach} alt="" onClick={() => history.push(ROUTERS.PRODUCT)} />
            </div>
          </div>

          <div className="banner-standard-2">
            <div className="banner-img">
              <img src={phongngu} alt="" onClick={() => history.push(ROUTERS.PRODUCT)} />

            </div>
          </div>

          <div className="banner-standard-3">
            <div className="banner-img">
              <img src={phongan} alt="" onClick={() => history.push(ROUTERS.PRODUCT)} />

            </div>
          </div>
        </div>
      </div>

      <div className="product-space-container">
        <h1 className="product-space-title">
          SẢN PHẨM BÁN CHẠY
        </h1>
        <div className="product-space-list">
          <div className="product-space-side-left">

          </div>

          <div className="product-space-side-right">
            {renderProductList()}
          </div>
        </div>
      </div>

      <div className="countdown-timer-wrapper">
        <div className="countdown-timer-wrapper-content">

          <div className="img-fluid">
            <img src={collectionbg} alt="" />
          </div>

          <div className="countdown-timer-wrapper-text">
            <h3>Deal of the day</h3>
            <div className="deal-countdown">
              <div className="single-countdown">
                <span className="single-countdown_time">0</span>
                <span className="single-countdown_text">Days</span>
              </div>

              <div className="single-countdown">
                <span className="single-countdown_time">0</span>
                <span className="single-countdown_text">Hours</span>
              </div>

              <div className="single-countdown">
                <span className="single-countdown_time">0</span>
                <span className="single-countdown_text">Minutes</span>
              </div>

              <div className="single-countdown">
                <span className="single-countdown_time">0</span>
                <span className="single-countdown_text">Seconds</span>
              </div>
            </div>

            <button className="btn-countdown" onClick={() => history.push(`/home/${productList.data[0].categoryId}`)}>
              <span>
                <ShoppingCartOutlined />
              </span>
              Mua sắm ngay
            </button>
          </div>
        </div>
      </div>

      <div className="section-title-container ">
        <div className="section-title-purpot">
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

      <div className="cabinet-wrapper">
        <div className="cabinet-content">
          <div className="cabinet-text">
            <h3 className="cabinet-subtitle"> FEATURED PRODUCT</h3>
            <h2 className="cabinet-title"> Montana shelf collection</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae reprehenderit excepturi laboriosam sapiente ipsam delectus doloremque vel alias eveniet facere!</p>

            <button className="btn-cabinet" onClick={() => history.push(`/home/${productList.data[0].categoryId}`)}>
              <span>
                <ShoppingCartOutlined />
              </span>
              Only $39
            </button>
          </div>

          <div className="cabinet-img">
            <img src={cabinetbg} alt="" />
          </div>
        </div>

      </div>


    </>
  );
}


const mapStateToProps = (state) => {
  const { productList } = state.productReducer;
  return {
    productList: productList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);