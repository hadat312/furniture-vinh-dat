import { Button } from 'antd';
import React from 'react';
import './styles.css'

function Item(props) {
    const { cartItem } = props;
    const productPrice = (cartItem.productPrice + (cartItem.color.price || 0) + (cartItem.size.price || 0)) * (1 - cartItem.productDiscount);
    // const total = productPrice * cartItem.productQuantity;
    
    return (
        <>
            <div className="item-container">
                <div className="item-content">
                    <ul className="checkout-cart-list">
                        <li style={{display: 'flex'}}><span className="checkout-cart-list__custom-text">{cartItem.productName}</span>{' x' + cartItem.productQuantity}</li>
                        <li>{productPrice.toLocaleString() + ' vnđ'}</li>
                    </ul>
                </div>
            </div>
        </>
    )

}
export default Item;