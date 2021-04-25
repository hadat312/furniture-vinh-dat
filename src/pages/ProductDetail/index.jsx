import { Col, Radio, Rate, Row, Typography, Button, Comment, Avatar } from 'antd';
// import Avatar from 'antd/lib/avatar/avatar';
import React, { useState } from 'react';
import { AiOutlineHeart } from "react-icons/ai";
// import Slider from "react-slick";
import './productDetail.css';

function ProductDetailPage(props) {
  // const { priceOld, priceCurrent } = props;
  const priceOld = 2000000;
  const priceCurrent = 1500000;
  const { Title } = Typography;
  const [changeImage, setChangeImage] = useState("https://happymag.tv/wp-content/uploads/2019/10/studio-ghibli-1.jpg");
  const imageList = [
    "https://happymag.tv/wp-content/uploads/2019/10/studio-ghibli-1.jpg",
    "https://genk.mediacdn.vn/2019/6/16/anh-1-1560665499838121255197.jpg",
    "https://gaubongonline.vn/wp-content/uploads/2018/02/gau-bong-totoro.jpg",
    "https://www.brain-magazine.fr/m/posts/50136/originals/kiki.jpg",
    "https://phunuhiendai.vn/wp-content/uploads/2018/11/Morico-Saigon-Classical-ph%E1%BB%A5-n%E1%BB%AF-hi%E1%BB%87n-%C4%91%E1%BA%A1i-B%C3%ACa-1.png",
    "https://i.pinimg.com/originals/c3/b2/89/c3b2892e17deba5178e1607f7ce90a73.jpg"];

  function onChangeSize(e) {
    console.log(e.target.value);
  }

  const ExampleComment = ({ children }) => (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author={<a>Han Solo</a>}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure).
        </p>
      }
    >
      {children}
    </Comment>
  );

  function renderImageList() {
    return imageList.map((item, index) => {
      return (
        <div
          key={index}
          className="imageOption"
          style={{ "backgroundImage": `url(${item})` }}
          onMouseEnter={() => {
            setChangeImage(item)
          }}></div>
      )
    })
  }
  return (
    <div className="detail-container">
      <Row>
        <Col span={4}></Col>
        <Col span={8}>
          <Row className="detail-container__bg">
            <div
              className="bg__lgImage"
              style={{ "backgroundImage": `url(${changeImage})` }}
            />
          </Row>
          <Row className="detail-container__thumbnail">
            <div className="thumbnail__item">
              {renderImageList()}
            </div>
          </Row>

        </Col>
        <Col span={8} className="detail-container__content">
          <Row className="detail-container__rate">
            <Rate allowHalf defaultValue={4.5} />
            <span className="ant-rate-text">( {5} khách hàng đánh giá )</span>
          </Row>
          <Row className="detail-container__title">
            <Title level={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Title>
          </Row>
          <Row className="detail-container__detail-price">
            <span className="detail-price__old">{priceOld.toLocaleString()} vnđ</span>
            <span className="detail-price__current">{priceCurrent.toLocaleString()} vnđ</span>
          </Row>
          <Row className="detail-container__descriptions">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, aut molestias autem sapiente quae quisquam, velit omnis quas ut nobis vero earum blanditiis accusantium architecto alias numquam ipsum ad quibusdam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, aut molestias autem sapiente quae quisquam, velit omnis quas ut nobis vero earum blanditiis accusantium architecto alias numquam ipsum ad quibusdam.</p>
          </Row>
          <Row className="detail-container__color">
            <Col span={6}>
              <Title level={3} className="color-title">Color</Title>
            </Col>
            <Col span={14}>
              <Row>
                <Radio.Group onChange={(e) => { onChangeSize(e) }} defaultValue="a" className="color-content">
                  <Radio.Button value="Red" className="color-content__item" type="primary" danger>Red</Radio.Button>
                  <Radio.Button value="Black" className="color-content__item">Black</Radio.Button>
                  <Radio.Button value="White" className="color-content__item">White</Radio.Button>
                  <Radio.Button value="Yellow" className="color-content__item">Yellow</Radio.Button>
                </Radio.Group>
              </Row>
            </Col>
          </Row>
          <Row className="detail-container__size">
            <Col span={6}>
              <Title level={3} className="size-title">Size</Title>
            </Col>
            <Col span={14}>
              <Row>
                <Radio.Group onChange={(e) => { onChangeSize(e) }} defaultValue="a" className="size-content">
                  <Radio.Button value="S" className="size-content__item">S</Radio.Button>
                  <Radio.Button value="M" className="size-content__item">M</Radio.Button>
                  <Radio.Button value="L" className="size-content__item">L</Radio.Button>
                  <Radio.Button value="XL" className="size-content__item">XL</Radio.Button>
                  <Radio.Button value="XXL" className="size-content__item">XXL</Radio.Button>
                </Radio.Group>
              </Row>
            </Col>
          </Row>
          <Row className="detail-container__quantity">
            <Col span={6}>
              <Title level={3} className="quantity-title">Quantity</Title>
            </Col>
            <Col span={14}>
              <Row >
                <div className="detail-container__quantity__content">
                  <button className="btn btn-outline-primary btn-increase">
                    <svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="svg-icon-increase-decrease "><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg>
                  </button>
                  <input type="number" class="form-control quantity__content__input" />
                  <button className="btn btn-outline-primary btn-decrease">
                    <svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="svg-icon-increase-decrease icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                  </button>
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <div className="detail-container__order">
                <Button className="detail-container__order__add-button">Thêm vào giỏ hàng</Button>
                <Button className="detail-container__order__wishlist-button">
                  <AiOutlineHeart />
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="detail-container__detail-description">
        <Col span={4}>
        </Col>
        <Col span={16}>
          <hr />
          <Row >
            <div className="detail-description__container">
              <Title level={3} className="detail-description__container__title">Mô tả sản phẩm</Title>
              <div className="detail-description__container__content">
                {/* Kết nối database để lấy thông tin truyền __container__content*/}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nulla interdum, maximus ligula eu, pellentesque risus. Quisque id accumsan tellus. Vestibulum in nulla at leo pretium feugiat. Nulla eu pharetra mi. Vivamus non nunc id dui sollicitudin tristique. Duis sagittis odio tortor, ac vestibulum odio blandit vel. Fusce mollis pulvinar iaculis. Morbi vel feugiat sem. Donec volutpat ex sit amet vehicula ornare. Nulla dapibus velit et tortor condimentum consectetur. Duis in lectus id nulla imperdiet laoreet ut non nibh. In ultricies non tortor eget iaculis. Phasellus auctor fringilla lacus, eget convallis neque gravida eget. Sed nibh elit, semper non sodales eu, vestibulum volutpat lectus. Suspendisse in ullamcorper odio.

                  Morbi venenatis fermentum arcu, at fermentum leo efficitur eu. Etiam condimentum augue id tortor venenatis congue. Nullam lacus felis, finibus et felis nec, imperdiet hendrerit tortor. Curabitur mattis justo id tincidunt cursus. Pellentesque efficitur metus id ante volutpat tempor. In sed lacus in urna rutrum dictum. Aliquam pellentesque magna mi, id aliquam sem blandit tempor. Phasellus hendrerit tincidunt mattis. Quisque porta, sem feugiat tristique pellentesque, eros velit dictum orci, at iaculis tellus mauris vel dui. Quisque in odio consectetur, malesuada risus nec, rutrum justo. Duis non maximus elit. Morbi ullamcorper, dui in malesuada dapibus, lorem velit pharetra urna, nec ornare ante nulla quis neque. Aliquam congue congue purus, vitae elementum purus viverra ut. Sed ultrices sollicitudin aliquam. Nam maximus lectus ut sagittis consectetur. Sed rhoncus mauris a nisl pharetra tincidunt.

                  Vivamus viverra ante odio, lobortis iaculis tortor facilisis vitae. Nam fermentum dictum varius. Integer hendrerit ligula ut urna facilisis aliquam. Curabitur venenatis ligula eu arcu pulvinar, sit amet tempor odio lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut facilisis eros in odio suscipit condimentum. Nulla pharetra sapien egestas sagittis aliquet. Ut dictum viverra justo, et porta enim venenatis ut. Praesent diam dolor, posuere ut pulvinar nec, rutrum vel enim.

                  Integer interdum viverra dignissim. In eleifend at lectus et mattis. Donec blandit nisi ut posuere imperdiet. Donec vel auctor sem. In id enim a risus porttitor viverra. Suspendisse feugiat ullamcorper metus, sit amet lobortis lectus mattis quis. Sed ultrices, diam sit amet sollicitudin laoreet, neque dolor placerat dolor, vel pellentesque ligula dolor eget neque. Quisque tincidunt non massa vel faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam ornare justo eu mollis sollicitudin. Pellentesque accumsan, turpis id ultricies dignissim, risus nunc pellentesque lectus, in porttitor justo augue dictum purus.
                </p>
              </div>
            </div>

          </Row>
        </Col>
      </Row>
      <Row>
        <Row>
          <Col span={4}>
          </Col>
          <Col span={16}>
            <hr />
            <Row >
              <div className="detail-review__container">
                <Title level={3} className="detail-review__container__title">Đánh giá</Title>
                <div className="detail-review__container__list-review">
                  {/* Danh sách các comment đánh giá*/}
                  <ExampleComment>
                    <ExampleComment>
                      <ExampleComment />
                      <ExampleComment />
                    </ExampleComment>
                  </ExampleComment>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      </Row>
    </div>
  );
}

export default ProductDetailPage;