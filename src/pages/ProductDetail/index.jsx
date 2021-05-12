import { Col, Radio, Rate, Row, Typography, Button, Comment, Avatar, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  getProductDetailAction,
  getCartAction,
  addWishlistTaskAction,
  deleteWishlistTaskAction,
  addCartTaskAction,
  editCartTaskAction
} from '../../redux/actions';
// import Slider from "react-slick";
import './productDetail.css';

function ProductDetailPage({
  productDetail,
  wishlist,
  cart,
  getCart,
  getProductDetail,
  addWishlistTask,
  deleteWishlistTask,
  addCartTask,
  editCartTask,
  match
}) {

  const productId = match.params.id;

  const UserInfoLocalStorage = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    getCart();
    getProductDetail({ id: productId });
  }, [])


  //chọn màu sắc và kích cỡ mặc định 
  useEffect(() => {
    if (productDetail.data.id) {
      setSizeSelected(productDetail.data.sizes[0] || {})
      setColorSelected(productDetail.data.colors[0] || {})
    }
  }, [productDetail.data])

  const { Title } = Typography;

  const imageList = [
    "https://happymag.tv/wp-content/uploads/2019/10/studio-ghibli-1.jpg",
    "https://genk.mediacdn.vn/2019/6/16/anh-1-1560665499838121255197.jpg",
    "https://gaubongonline.vn/wp-content/uploads/2018/02/gau-bong-totoro.jpg",
    "https://www.brain-magazine.fr/m/posts/50136/originals/kiki.jpg",
    "https://phunuhiendai.vn/wp-content/uploads/2018/11/Morico-Saigon-Classical-ph%E1%BB%A5-n%E1%BB%AF-hi%E1%BB%87n-%C4%91%E1%BA%A1i-B%C3%ACa-1.png",
    "https://i.pinimg.com/originals/c3/b2/89/c3b2892e17deba5178e1607f7ce90a73.jpg",
    productDetail.data.productImage,
  ];
  const [changeImage, setChangeImage] = useState(productDetail.data.productImage);
  console.log("🚀 ~ file: index.jsx ~ line 61 ~ changeImage", changeImage)


  const [sizeSelected, setSizeSelected] = useState({});
  const [colorSelected, setColorSelected] = useState({});
  const [quantity, setQuantity] = useState(1);

  const [isAddWishlist, setIsAddWishlist] = useState(false);

  const oldPrice = productDetail.data.productPrice + (sizeSelected.price || 0) + (colorSelected.price || 0);
  const newPrice = (productDetail.data.productPrice + (sizeSelected.price || 0) + (colorSelected.price || 0)) * (1 - productDetail.data.productDiscount) * quantity;

  const userInfoLocalStorage = JSON.parse(localStorage.getItem("userId"));

  function toggleWishlist() {
    if (UserInfoLocalStorage !== null) {
      setIsAddWishlist(!isAddWishlist);
    }
  }

  const productItem = {
    id: productId,
    image: changeImage,
    name: productDetail.data.productName,
    size: sizeSelected.sizeName,
    color: colorSelected.colorName,
    quantity: quantity,
    price: newPrice,
    userId: userInfoLocalStorage.userId
  };

  //UPDATE QUANTITY OF ITEM IN CART
  function checkIdAndAddTask() {
    if (UserInfoLocalStorage !== null) {
      let isNotMatch = true;
      //Không có sản phẩm trong cart
      if (cart.data.length === 0) {
        addCartTask(productItem);
        console.log("Thêm vào giỏ thành công");
        alert("Thêm vào giỏ thành công");
        // <Alert message="Thêm vào giỏ thành công" type="success" />
      } else {
        //Có sản phẩm trong giỏ
        cart.data.map((cartItem) => {
          //Kiểm tra xem đã thêm sản phẩm hiện tại vào giỏ chưa
          if (productId === cartItem._id) {
            let updateItem = {};
            if (quantity !== 1) {
              updateItem = {
                image: changeImage,
                size: sizeSelected.sizeName,
                color: colorSelected.colorName,
                quantity: quantity,
                price: newPrice
              };
            } else {
              updateItem = {
                image: changeImage,
                size: sizeSelected.sizeName,
                color: colorSelected.colorName,
                quantity: quantity + 1,
                price: newPrice
              };
            }
            console.log("Đã cập nhật giỏ hàng");
            alert("Đã cập nhật giỏ hàng");
            isNotMatch = false;
            editCartTask({ id: cartItem.id, ...updateItem });
          }
        })
        //Sản phẩm hiện tại không trùng với các sản phẩm trong giỏ
        if (isNotMatch) {
          alert("Thêm vào giỏ thành công");
          console.log("Thêm vào giỏ thành công");
          addCartTask(productItem);
        }
      }
    } else {
      alert("Vui lòng đăng nhập để thực hiện thao tác này!");
      console.log("Vui lòng đăng nhập để thực hiện thao tác này!");
    }

  }

  function onAddWishlistTask() {
    if (UserInfoLocalStorage !== null) {
      addWishlistTask(productItem);
      alert("Thêm vào danh sách yêu thích thành công!");
      console.log("Thêm vào danh sách yêu thích thành công!");
    }
    else {
      alert("Vui lòng đăng nhập để thực hiện thao tác này!");
      console.log("Vui lòng đăng nhập để thực hiện thao tác này!");
    }
  }

  function onDeleteWishlistTask(productId) {
    console.log("xóa thành công");
    if (UserInfoLocalStorage !== null) {
      wishlist.data.map((item) => {
        if (productId === item._id) {
          return deleteWishlistTask({ id: item.id });
        }
      })
      alert("xóa khỏi danh sách yêu thích thành công!");
      console.log("xóa khỏi danh sách yêu thích thành công!");
    }
    else {
      console.log("Vui lòng đăng nhập để thực hiện thao tác này!");
      alert("Vui lòng đăng nhập để thực hiện thao tác này!");
    }
  }

  //COMMENT
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


  function renderSizeOptions() {
    return productDetail.data.sizes.map((sizesItem) => {
      return (
        <Radio.Button
          key={sizesItem.id + 1}
          value={sizesItem}
          className="size-content__item">
          {sizesItem.sizeName}
        </Radio.Button>
      )
    })
  }

  function renderColorsOptions() {
    return productDetail.data.colors.map((colorItem) => {
      return (
        <Radio.Button
          key={colorItem.id + 1}
          value={colorItem}
          className="color-content__item">
          {colorItem.colorName}
        </Radio.Button>
      )
    })
  }


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

            <div className="bg__container">
              <img
                className="bg__container__lgImage"
                src={changeImage} />
            </div>

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
              {productDetail.data.productName}
            </Title>
          </Row>
          <Row className="detail-container__detail-price">
            <span className="detail-price__old">{oldPrice.toLocaleString()} vnđ</span>
            <span className="detail-price__current">{newPrice.toLocaleString()} vnđ</span>
          </Row>
          <Row className="detail-container__descriptions">
            <p>{productDetail.data.productShortDescription}</p>
          </Row>
          <Row className="detail-container__color">
            <Col span={6}>
              <Title level={3} className="color-title">Color</Title>
            </Col>
            <Col span={14}>
              <Row>
                <Radio.Group
                  onChange={(e) => {
                    setColorSelected(e.target.value)
                  }}
                  value={colorSelected}
                >
                  {renderColorsOptions()}
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
                <Radio.Group
                  onChange={(e) => {
                    setSizeSelected(e.target.value)
                  }}

                  value={sizeSelected}
                >
                  {renderSizeOptions()}
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
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={1}
                    onChange={(e) => {
                      setQuantity(e)
                    }}
                  />
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <div className="detail-container__order">
                <Button
                  className="detail-container__order__add-button"
                  onClick={checkIdAndAddTask}
                >
                  Thêm vào giỏ hàng
                  </Button>
                {/* <Button className="detail-container__order__wishlist-button">
                  <AiOutlineHeart />
                </Button> */}
                <div>
                  {
                    isAddWishlist
                      ? <AiFillHeart
                        onClick={() => {
                          toggleWishlist()
                          onDeleteWishlistTask(productId);
                        }}
                        className="main-container__card__add-to-wishlist"
                      />
                      : <AiOutlineHeart
                        onClick={() => {
                          toggleWishlist()
                          onAddWishlistTask()
                        }}
                        className="main-container__card__wishlist"
                      />

                  }
                </div>
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
                <p>
                  {productDetail.data.productDetailDescription}
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

const mapStateToProps = (state) => {
  const { wishlist } = state.wishlistReducer;
  const { cart } = state.cartReducer;
  const { productDetail } = state.productReducer;
  return {
    productDetail,
    wishlist,
    cart
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
    addWishlistTask: (params) => dispatch(addWishlistTaskAction(params)),
    deleteWishlistTask: (params) => dispatch(deleteWishlistTaskAction(params)),
    getCart: (params) => dispatch(getCartAction(params)),
    addCartTask: (params) => dispatch(addCartTaskAction(params)),
    editCartTask: (params) => dispatch(editCartTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);