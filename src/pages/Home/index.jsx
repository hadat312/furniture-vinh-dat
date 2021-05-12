import React,{useState} from 'react';
// import { ROUTERS } from '../../constants/router';
// import { Button, Card } from 'antd';
// import history from '../../utils/history';

import carousel3 from '../../images/carousel3.jpg';
import carousel4 from '../../images/carousel4.jpg';
import carousel7 from '../../images/carousel7.jpg';

import ImgComp from '../../ImgComp'

import './home.css';


function HomePage(props) {

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
    <div className="carousel-area">
      <div className="carousel-bg" >
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
          <i class="fa fa-chevron-right" aria-hidden="true" />
        </button>
        <button className="pre" id="pre" onClick={() => Pre()}>
          <i class="fa fa-chevron-left" aria-hidden="true" />
        </button>
      </div>
      <div>Home</div>
    </div>
  );
}


export default HomePage;