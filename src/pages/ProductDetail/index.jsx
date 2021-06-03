import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import history from '../../utils/history';
import { ROUTERS } from '../../constants/router';

import {
  Col,
  Radio
  , Rate,
  Row,
  Typography,
  Button,
  Comment,
  Avatar,
  InputNumber,
  notification,
  Alert,
  Space,
  Tabs,
  Carousel
} from 'antd';
import { AiFillHeart, AiOutlineHeart, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import {
  getProductDetailAction,
  getWishListAction,
  getCartListAction,
  addWishlistTaskAction,
  deleteWishlistTaskAction,
  addCartTaskAction,
  editCartTaskAction,
  getCommentAction,
  addCommentAction,
  getUserInfoAction,
  getProductListAction
} from '../../redux/actions';

import moment from 'moment';
import { v4 } from 'uuid';

import Item from './components/Item';
import NextArrow from './components/NextArrow';
import PrevArrow from './components/PrevArrow';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './productDetail.css';


function ProductDetailPage({
  productDetail,
  wishlist,
  cartList,
  // getCartList,
  getWishList,
  getProductDetail,
  addWishlistTask,
  deleteWishlistTask,
  addCartTask,
  editCartTask,
  getUserInfo,
  userInfo,
  commentList,
  getComment,
  addComment,
  match,
  
}) {

  const productId = match.params.id;

  const userLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    // getCartList();
    getWishList();
    getProductDetail({ id: productId });
    getComment({ productId: productId })
  }, [productId])



  //chọn màu sắc và kích cỡ mặc định 
  useEffect(() => {
    if (productDetail.data.id) {
      setSizeSelected(productDetail.data.sizes[0] || {})
      setColorSelected(productDetail.data.colors[0] || {})
      setChangeImage(productDetail.data.productImage[0] || {})
    }
  }, [productDetail.data])

console.log('data: ', productDetail.data)

  const { Title } = Typography;

  const imageList = [
    ...productDetail.data.productImage
  ]

  // Table 
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const [changeImage, setChangeImage] = useState(productDetail.data.productImage);


  const [sizeSelected, setSizeSelected] = useState({});
  const [colorSelected, setColorSelected] = useState({});
  const [quantity, setQuantity] = useState(1);

  const [isAddWishlist, setIsAddWishlist] = useState(false);

  const oldPrice = productDetail.data.productPrice + (sizeSelected.price || 0) + (colorSelected.price || 0);
  const newPrice = (productDetail.data.productPrice + (sizeSelected.price || 0) + (colorSelected.price || 0)) * (1 - productDetail.data.productDiscount || 0);

  const [fillText, setFillText] = useState({
    comment: "",
  })

  //rate of comment
  const [rate, setRate] = useState(0)

  const key = `open${Date.now()}`;

  function toggleWishlist() {
    if (userLocalStorage !== null) {
      setIsAddWishlist(!isAddWishlist);
    }
  }


  function onAddToCart() {
    //color, size đều không có
    //chỉ có color
    //chỉ có size
    //có cả 2
    //nếu không có cart và cả size

    if (!userLocalStorage) {
      return notification.warning({

        message: 'Chưa đăng nhập',
        description: 'Bạn cần đăng nhập để thêm vào giỏ hàng',
        placement: 'bottomRight',
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
          id: cartList.data[existProductIndex].id,
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
          userId: userLocalStorage.id,
          carts: newCart,
        })
        notification.success({
          message: 'Cập nhật vào giỏ thành công',
          key,
          placement: 'bottomRight',
          duration: 2
        });
      } else {
        addCartTask({
          userId: userLocalStorage.id,
          carts: [
            ...cartList.data,
            {
              id: v4(),
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
          placement: 'bottomRight',
          duration: 2
        });
      }
    } else if (!colorSelected.id) { // nếu chỉ có size
      const existSizeIndex = cartList.data.findIndex((item) => item.size.id === sizeSelected.id);
      if (existSizeIndex !== -1) {
        const newCartList = cartList.data;
        newCartList.splice(existSizeIndex, 1, {
          id: cartList.data[existSizeIndex].id,
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
          userId: userLocalStorage.id,
          carts: newCartList,
        })
        notification.success({
          message: 'Cập nhật vào giỏ thành công',
          key,
          placement: 'bottomRight',
          duration: 2
        });
      } else {
        addCartTask({
          userId: userLocalStorage.id,
          carts: [
            ...cartList.data,
            {
              id: v4(),
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
          placement: 'bottomRight',
          duration: 2
        });
      }
    } else if (!sizeSelected.id) { // nếu chỉ có color
      const existColorIndex = cartList.data.findIndex((item) => item.color.id === colorSelected.id);
      if (existColorIndex !== -1) {
        const newCartList = cartList.data;
        newCartList.splice(existColorIndex, 1, {
          id: cartList.data[existColorIndex].id,
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
          userId: userLocalStorage.id,
          carts: newCartList,
        })
        notification.success({
          message: 'Cập nhật vào giỏ thành công',
          key,
          placement: 'bottomRight',
          duration: 2
        });
      } else {
        addCartTask({
          userId: userLocalStorage.id,
          carts: [
            ...cartList.data,
            {
              id: v4(),
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
          placement: 'bottomRight',
          duration: 2
        });
      }
    } else {//có cả color và size
      const existOptionIndex = cartList.data.findIndex((item) => item.color.id === colorSelected.id && item.size.id === sizeSelected.id);
      if (existOptionIndex !== -1) {
        const newCartList = cartList.data;
        newCartList.splice(existOptionIndex, 1, {
          id: cartList.data[existOptionIndex].id,
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
          userId: userLocalStorage.id,
          carts: newCartList,
        })
        notification.success({
          message: 'Cập nhật vào giỏ thành công',
          key,
          placement: 'bottomRight',
          duration: 2
        });
      } else {
        addCartTask({
          userId: userLocalStorage.id,
          carts: [
            ...cartList.data,
            {
              id: v4(),
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
          placement: 'bottomRight',
          duration: 2,
        });
      }
    }
  }

  function onAddWishlistTask() {
    const key = `open${Date.now()}`;
    if (!userLocalStorage) {
      return notification.warning({
        message: 'Chưa đăng nhập',
        description: 'Bạn cần đăng nhập để thêm danh sách yêu thích',
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
      const existProductIndex = wishlist.data.findIndex((item) => item.productId === productId);
      if (existProductIndex === -1) {
        addWishlistTask({
          userId: userLocalStorage.id,
          wishlist: [
            ...wishlist.data,
            {
              id: v4(),
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
          message: 'Thêm vào danh sách yêu thích thành công',
          key,
          placement: 'bottomRight',
          duration: 2
        });
      }
    } else if (!colorSelected.id) { // nếu chỉ có size
      const existSizeIndex = wishlist.data.findIndex((item) => item.size.id === sizeSelected.id);
      if (existSizeIndex === -1) {
        addWishlistTask({
          userId: userLocalStorage.id,
          wishlist: [
            ...wishlist.data,
            {
              id: v4(),
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
          message: 'Thêm vào danh sách yêu thích thành công',
          key,
          placement: 'bottomRight',
          duration: 2
        });
      }
    } else if (!sizeSelected.id) { // nếu chỉ có color
      const existColorIndex = wishlist.data.findIndex((item) => item.color.id === colorSelected.id);
      if (existColorIndex === -1) {
        addWishlistTask({
          userId: userLocalStorage.id,
          wishlist: [
            ...wishlist.data,
            {
              id: v4(),
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
          message: 'Thêm vào danh sách yêu thích thành công',
          key,
          placement: 'bottomRight',
          duration: 2
        });
      }
    }
    else {//có cả color và size
      const existOptionIndex = wishlist.data.findIndex((item) => item.color.id === colorSelected.id && item.size.id === sizeSelected.id);
      if (existOptionIndex === -1) {
        addWishlistTask({
          userId: userLocalStorage.id,
          wishlist: [
            ...wishlist.data,
            {
              id: v4(),
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
          message: 'Thêm vào danh sách yêu thích thành công',
          key,
          placement: 'bottomRight',
          duration: 2,
        });
      }
    }
  }

  function onDeleteWishlistTask() {
    const newWishlist = wishlist.data;
    wishlist.data.forEach((wishlistItem, wishlistIndex) => {
      //check xem colorId và sizeId ở detail có === colorId, sizeId ở wishlist ko
      // === thì xóa
      if (wishlistItem.productId === productId
        && wishlistItem.color.id === colorSelected.id
        && wishlistItem.size.id === sizeSelected.id) {
        newWishlist.splice(wishlistIndex, 1)
        deleteWishlistTask({
          userId: userLocalStorage.id,
          wishlist: [
            ...newWishlist,
          ]
        })
        notification.success({
          message: 'xóa sản phẩm thành công',
          key,
          placement: 'bottomRight',
          duration: 2
        });
      }

    })

  }

  // function checkExistWishlist(){
  //   wishlist.data.forEach((wishlistItem, wishlistIndex) => {
  //     //check xem colorId và sizeId ở detail có === colorId, sizeId ở wishlist ko
  //     // === thì xóa
  //     if (wishlistItem.productId === productId
  //       && wishlistItem.color.id === colorSelected.id
  //       && wishlistItem.size.id === sizeSelected.id) {
  //       setIsAddWishlist(true)
  //     }else{
  //       setIsAddWishlist(false)
  //     }

  //   })
  // }

  function renderImageList() {
    return imageList.map((item, index) => {
      return (
        <img
          className="imageOption"
          key={'image-', index}
          src={item}
          onMouseEnter={() => {
            setChangeImage(item)
          }}
        />
      )
    })
  }


  function renderSizeOptions() {
    return productDetail.data.sizes.map((sizesItem, sizesIndex) => {
      return (
        <Radio.Button
          key={'sizeItem' + (sizesIndex + 1)}
          value={sizesItem}
          className="size-content__item" >
          {sizesItem.sizeName}
        </Radio.Button >
      )
    })
  }

  function renderColorsOptions() {
    return productDetail.data.colors.map((colorItem, colorIndex) => {
      return (
        <Radio.Button
          key={'colorItem' + (colorIndex + 1)}
          value={colorItem}
          className="color-content__item">
          {colorItem.colorName}
        </Radio.Button>
      )
    })
  }

  // Comment


  function handleChange(e) {
    const { name, value, checked, type } = e.target;
    setFillText({
      ...fillText,
      [name]: type === "checkbox" ? checked : value,
    });
  }


  moment.locale('vi');
  const commentContent = {
    comment: fillText.comment,
    date: moment().format('MMMM Do YYYY'),
    time: moment().format('LT'),
    rate: rate,
    userId: userInfo.data.id,
    userName: userInfo.data.userName,
    productId: productId
  }

  function handleAddComment() {
    if (!userLocalStorage) {
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
    }if(rate === 0  ){
      return notification.warning({
        message: 'Bạn cần chọn đánh giá',
        // description: 'Bạn cần đăng nhập để thêm vào giỏ hàng',
        key,
      });
    }else{
      addComment(commentContent)
    }
  }

  function renderComment() {
    if (commentList.load) <p>Đợi một chút nha...</p>
    return (
      commentList.data.map((commentItem, commentIndex) => {
        return (
          <Item
            key={'commentItem' + commentItem.id}
            commentItem={commentItem}
          />
        )
      })
    )
  }

  function getAvgRate() {
    let avgRate = 0;
    commentList.data.map((commentListItem) => {
      avgRate = avgRate + commentListItem.rate
    })
    return Math.ceil(avgRate / commentList.data.length)
  }


  const settings = {
    // dots: true,
    // fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  // -----------------------------------

  return (
    <>
      <div className="detail-container">
        <div className="detail-container__product-info">

          <div className="product-info__bg">
            <div className="bg__container">
              <img
                className="bg__container__lgImage"
                src={changeImage} />
            </div>
            <div className="detail-container__thumbnail">
              <div className="thumbnail__item">
                <Slider {...settings} style={{ width: '100%', align: 'center' }}>
                  {renderImageList()}
                </Slider>
              </div>
            </div>
          </div>


          <div className="detail-container__content">
            <div className="detail-container__rate">
              <Rate disabled value={getAvgRate()}/>
              <span className="ant-rate-text">( {commentList.data.length} khách hàng đánh giá )</span>
            </div>
            <div className="detail-container__title">
              <Title level={2}>
                {productDetail.data.productName}
              </Title>
            </div>
            <div className="detail-container__detail-price">
              <span className="detail-price__old">{oldPrice.toLocaleString()} vnđ</span>
              <span className="detail-price__current">{newPrice.toLocaleString()} vnđ</span>
            </div>
            <div className="detail-container__descriptions">
              <p>{productDetail.data.productShortDescription}</p>
            </div>
            <div className="detail-container__color">
              {
                colorSelected.id && <Title level={3} className="color-title">Color</Title>
              }
              <div>
                <Radio.Group
                  onChange={(e) => {
                    setColorSelected(e.target.value)
                    // setIsAddWishlist(!isAddWishlist)
                  }}
                  value={colorSelected}
                >
                  {renderColorsOptions()}
                </Radio.Group>
              </div>
            </div>
            <div className="detail-container__size">
              {
                sizeSelected.id && <Title level={3} className="size-title">Size</Title>
              }
              <div>
                <Radio.Group
                  onChange={(e) => {
                    setSizeSelected(e.target.value)
                    // setIsAddWishlist(!isAddWishlist)
                  }}

                  value={sizeSelected}
                >
                  {renderSizeOptions()}
                </Radio.Group>
              </div>
            </div>
            <div className="detail-container__quantity">
              <Title level={3}>Quantity</Title>
              <InputNumber
                // onStep={(value) => console.log(value)}
                style={{ width: 100 }}
                className="quantity__content__input-number"
                min={1}
                max={10}
                defaultValue={1}
                onChange={(e) => {
                  setQuantity(e)
                }}
              />

              <div className="main-container__wishlist-bg">
                {
                  isAddWishlist
                    ? <AiFillHeart
                      onClick={() => {
                        toggleWishlist()
                        onDeleteWishlistTask();
                      }}
                      className="main-container__card__delete-wishlist"
                    />
                    : <AiFillHeart
                      onClick={() => {
                        toggleWishlist()
                        onAddWishlistTask();
                      }}
                      className="main-container__card__add-to-wishlist"
                    />
                }
              </div>
            </div>
            <div className="detail-container__order">
              <Button
                className="detail-container__order__add-button"
                onClick={onAddToCart}
              >
                Thêm vào giỏ hàng
          </Button>

            </div>
          </div>
        </div>



        <div className="detail-container__detail-description">
          <Title level={3} className="detail-description__container__title">MÔ TẢ SẢN PHẨM</Title>
          <div className="detail-description__container ">

            <div className="detail-description__container__content">
              <p>
                {/* {productDetail.data.productDetailDescription} */}

                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane
                    tab={
                      <Title level={4}>Mô Tả Sản Phẩm</Title>
                    }
                    key="1">
                    <div dangerouslySetInnerHTML={{ __html: productDetail.data.productDescription }} />
                  </TabPane>

                  <TabPane
                    tab={
                      <Title level={4}>Hướng Dẫn Bảo Quản</Title>
                    }
                    key="2">
                      <div dangerouslySetInnerHTML={{ __html: productDetail.data.productStorageInstruction }} />
                  </TabPane>

                </Tabs>

              </p>
            </div>


            <div className="detail-specifications__container__content">

              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane
                  tab={
                    <Title level={4}>Thông Số Kỹ Thuật</Title>
                  }
                  key="2">
                    <div dangerouslySetInnerHTML={{ __html: productDetail.data.productStorageInstruction }} />
                </TabPane>

              </Tabs>
            </div>

          </div>

        </div>

        <hr />
        <div className="detail-review__container ">
          <div className="detail-review__container__rate-space ">
            <Title level={3} className="detail-review__container__title">NHẬN XÉT VÀ ĐÁNH GIÁ</Title>
            <p className="detail-review-place-comment">Viết đánh giá</p>
            <div className="detail-review__container__rate">
              <Rate onChange={(e) => { setRate(e) }} />
              <p className="detail-review__container__enjoy">Chọn mức độ hài lòng</p>
            </div>
          </div>
          <div className="detail-review__container_comment-space">
            <input type="text" name="comment" onChange={(e) => handleChange(e)} placeholder="Viết đánh giá của ban tại đây" />
            <button className="btn-review" onClick={handleAddComment}>Đánh Giá</button>
          </div>
          <div className="detail-review__container__list-review ">
            {/* Comment Review List */}
            <h4 className="detail-review__container__subtitle">ĐÁNH GIÁ - NHẬN XÉT TỪ KHÁCH HÀNG</h4>
            {renderComment()}
          </div>
        </div>
      </div >
    </>
  );
}

const mapStateToProps = (state) => {
  const { wishlist } = state.wishlistReducer;
  const { cartList } = state.cartReducer;
  const { productDetail } = state.productReducer;
  const { userInfo } = state.userReducer;
  const { commentList } = state.commentReducer;
  return {
    productDetail,
    wishlist,
    cartList,
    userInfo,
    commentList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
    getWishList: (params) => dispatch(getWishListAction(params)),
    addWishlistTask: (params) => dispatch(addWishlistTaskAction(params)),
    deleteWishlistTask: (params) => dispatch(deleteWishlistTaskAction(params)),
    // getCartList: (params) => dispatch(getCartListAction(params)),
    addCartTask: (params) => dispatch(addCartTaskAction(params)),
    editCartTask: (params) => dispatch(editCartTaskAction(params)),

    getComment: (params) => dispatch(getCommentAction(params)),

    addComment: (params) => dispatch(addCommentAction(params)),

    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    getProductList: (params => dispatch(getProductListAction(params))),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);