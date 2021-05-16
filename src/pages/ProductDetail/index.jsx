import { Col, Radio, Rate, Row, Typography, Button, Comment, Avatar, InputNumber, notification, Alert, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import history from '../../utils/history';
import {
  getProductDetailAction,
  getCartListAction,
  addWishlistTaskAction,
  deleteWishlistTaskAction,
  addCartTaskAction,
  editCartTaskAction
} from '../../redux/actions';
// import Slider from "react-slick";
import './productDetail.css';
import { ROUTERS } from '../../constants/router';

function ProductDetailPage({
  productDetail,
  wishlist,
  cartList,
  // getCartList,
  getProductDetail,
  addWishlistTask,
  deleteWishlistTask,
  addCartTask,
  editCartTask,
  match
}) {

  const productId = match.params.id;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    // getCartList();
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



  const [sizeSelected, setSizeSelected] = useState({});
  const [colorSelected, setColorSelected] = useState({});
  const [quantity, setQuantity] = useState(1);

  const [isAddWishlist, setIsAddWishlist] = useState(false);

  const oldPrice = productDetail.data.productPrice + (sizeSelected.price || 0) + (colorSelected.price || 0);
  const newPrice = (productDetail.data.productPrice + (sizeSelected.price || 0) + (colorSelected.price || 0)) * (1 - productDetail.data.productDiscount);


  function toggleWishlist() {
    if (userInfo !== null) {
      setIsAddWishlist(!isAddWishlist);
    }
  }



  function onAddToCart() {
    //color, size đều không có
    //chỉ có color
    //chỉ có size
    //có cả 2
    //nếu không có cart và cả size
    const key = `open${Date.now()}`;
    if (!userInfo) {
      return notification.warning({
        message: 'Chưa đăng nhập',
        description: 'Bạn cần đăng nhập để thêm vào giỏ hàng',
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push(ROUTERS.LOGIN);
            }}
          >
            Đăng nhập ngay
          </Button>
        ),
      });
    }
    if (!colorSelected.id && !sizeSelected.id) {
      const existProductIndex = cartList.data.findIndex((item) => item.productId === productId);
      if (existProductIndex !== -1) {
        const newCart = cartList.data;
        newCart.splice(existProductIndex, 1, {
          productId: productId,
          productQuantity: cartList.data[existProductIndex].productQuantity + quantity,
          productName: productDetail.data.productName,
          productImage: changeImage,
          productPrice: productDetail.data.productPrice,
          productDiscount: productDetail.data.productDiscount,
          color: {},
          size: {}
        })
        addCartTask({
          userId: userInfo.id,
          carts: newCart,
        })
        notification.success({
          message: 'Cập nhật vào giỏ thành công',
          key,
          duration: 2
        });
      } else {
        addCartTask({
          userId: userInfo.id,
          carts: [
            ...cartList.data,
            {
              productId: productId,
              productQuantity: quantity,
              productName: productDetail.data.productName,
              productImage: changeImage,
              productPrice: productDetail.data.productPrice,
              productDiscount: productDetail.data.productDiscount,
              color: {},
              size: {}
            }
          ]
        })
        notification.success({
          message: 'Thêm vào giỏ thành công',
          key,
          duration: 2
        });
      }
    } else if (!colorSelected.id) { // nếu chỉ có size
      const existSizeIndex = cartList.data.findIndex((item) => item.size.id === sizeSelected.id);
      if (existSizeIndex !== -1) {
        const newCartList = cartList.data;
        newCartList.splice(existSizeIndex, 1, {
          productId: productId,
          productQuantity: cartList.data[existSizeIndex].productQuantity + quantity,
          productName: productDetail.data.productName,
          productImage: changeImage,
          productPrice: productDetail.data.productPrice,
          productDiscount: productDetail.data.productDiscount,
          color: {},
          size: {
            id: sizeSelected.id,
            sizeName: sizeSelected.sizeName,
            price: sizeSelected.price
          }
        })
        addCartTask({
          userId: userInfo.id,
          carts: newCartList,
        })
        notification.success({
          message: 'Cập nhật vào giỏ thành công',
          key,
          duration: 2
        });
      } else {
        addCartTask({
          userId: userInfo.id,
          carts: [
            ...cartList.data,
            {
              productId: productId,
              productQuantity: quantity,
              productName: productDetail.data.productName,
              productImage: changeImage,
              productPrice: productDetail.data.productPrice,
              productDiscount: productDetail.data.productDiscount,
              color: {},
              size: {
                id: sizeSelected.id,
                sizeName: sizeSelected.sizeName,
                price: sizeSelected.price
              }
            }
          ]
        })
        notification.success({
          message: 'Thêm vào giỏ thành công',
          key,
          duration: 2
        });
      }
    } else if (!sizeSelected.id) { // nếu chỉ có color
      const existColorIndex = cartList.data.findIndex((item) => item.color.id === colorSelected.id);
      if (existColorIndex !== -1) {
        const newCartList = cartList.data;
        newCartList.splice(existColorIndex, 1, {
          productId: productId,
          productQuantity: cartList.data[existColorIndex].productQuantity + quantity,
          productName: productDetail.data.productName,
          productImage: changeImage,
          productPrice: productDetail.data.productPrice,
          productDiscount: productDetail.data.productDiscount,
          color: {
            id: colorSelected.id,
            colorName: colorSelected.colorName,
            price: colorSelected.price
          },
          size: {}
        })
        addCartTask({
          userId: userInfo.id,
          carts: newCartList,
        })
        notification.success({
          message: 'Cập nhật vào giỏ thành công',
          key,
          duration: 2
        });
      } else {
        addCartTask({
          userId: userInfo.id,
          carts: [
            ...cartList.data,
            {
              productId: productId,
              productQuantity: quantity,
              productName: productDetail.data.productName,
              productImage: changeImage,
              productPrice: productDetail.data.productPrice,
              productDiscount: productDetail.data.productDiscount,
              color: {
                id: colorSelected.id,
                colorName: colorSelected.colorName,
                price: colorSelected.price
              },
              size: {}
            }
          ]
        })
        notification.success({
          message: 'Thêm vào giỏ thành công',
          key,
          duration: 2
        });
      }
    }
    else {//có cả color và size
      const existOptionIndex = cartList.data.findIndex((item) => item.color.id === colorSelected.id && item.size.id === sizeSelected.id);
      if (existOptionIndex !== -1) {
        const newCartList = cartList.data;
        newCartList.splice(existOptionIndex, 1, {
          productId: productId,
          productQuantity: cartList.data[existOptionIndex].productQuantity + quantity,
          productName: productDetail.data.productName,
          productImage: changeImage,
          productPrice: productDetail.data.productPrice,
          productDiscount: productDetail.data.productDiscount,
          color: {
            id: colorSelected.id,
            colorName: colorSelected.colorName,
            price: colorSelected.price
          },
          size: {
            id: sizeSelected.id,
            sizeName: sizeSelected.sizeName,
            price: sizeSelected.price
          }
        })
        addCartTask({
          userId: userInfo.id,
          carts: newCartList,
        })
        notification.success({
          message: 'Cập nhật vào giỏ thành công',
          key,
          duration: 2
        });
      } else {
        addCartTask({
          userId: userInfo.id,
          carts: [
            ...cartList.data,
            {
              productId: productId,
              productQuantity: quantity,
              productName: productDetail.data.productName,
              productImage: changeImage,
              productPrice: productDetail.data.productPrice,
              productDiscount: productDetail.data.productDiscount,
              color: {
                id: colorSelected.id,
                colorName: colorSelected.colorName,
                price: colorSelected.price
              },
              size: {
                id: sizeSelected.id,
                sizeName: sizeSelected.sizeName,
                price: sizeSelected.price
              }
            }
          ]
        })
        notification.success({
          message: 'Thêm vào giỏ thành công',
          key,
          duration: 2
        });
      }
    }
  }

  function onAddWishlistTask() {
    // if (userInfo !== null) {
    //   addWishlistTask(productItem);
    //   alert("Thêm vào danh sách yêu thích thành công!");
    //   console.log("Thêm vào danh sách yêu thích thành công!");
    // }
    // else {
    //   alert("Vui lòng đăng nhập để thực hiện thao tác này!");
    //   console.log("Vui lòng đăng nhập để thực hiện thao tác này!");
    // }
  }

  function onDeleteWishlistTask(productId) {
    // console.log("xóa thành công");
    // if (userInfo !== null) {
    //   wishlist.data.map((item) => {
    //     if (productId === item._id) {
    //       return deleteWishlistTask({ id: item.id });
    //     }
    //   })
    //   alert("xóa khỏi danh sách yêu thích thành công!");
    //   console.log("xóa khỏi danh sách yêu thích thành công!");
    // }
    // else {
    //   console.log("Vui lòng đăng nhập để thực hiện thao tác này!");
    //   alert("Vui lòng đăng nhập để thực hiện thao tác này!");
    // }
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
          className="size-content__item" >
          { sizesItem.sizeName}
        </Radio.Button >
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
              {
                colorSelected.id && <Title level={3} className="color-title">Color</Title>
              }
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
              {
                sizeSelected.id && <Title level={3} className="size-title">Size</Title>
              }

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
                    onStep={(value) => console.log(value)}
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
                  // onClick={checkIdAndAddTask}
                  onClick={onAddToCart}
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
  const { cartList } = state.cartReducer;
  const { productDetail } = state.productReducer;
  return {
    productDetail,
    wishlist,
    cartList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
    addWishlistTask: (params) => dispatch(addWishlistTaskAction(params)),
    deleteWishlistTask: (params) => dispatch(deleteWishlistTaskAction(params)),
    // getCartList: (params) => dispatch(getCartListAction(params)),
    addCartTask: (params) => dispatch(addCartTaskAction(params)),
    editCartTask: (params) => dispatch(editCartTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);