import { Button } from 'antd';
import React from 'react';
import './styles.css'

function Item(props) {
    // console.log("🚀 ~ file: index.jsx ~ line 5 ~ Item ~ props", props)
    const { productId, name, price, discount, cartItem } = props;
    // console.log("🚀 ~ file: index.jsx ~ line 8 ~ Item ~ cartItem", cartItem)
    return (
        <>
            <div className="item-container">
                <div className="item-content">
                  
                    <ul className="checkout-cart-list">
                        
                            <li>{cartItem.name}</li>
                            <li>{cartItem.price.toLocaleString()} VND</li>
                    </ul>
                </div>
            </div>

        </>
    )

}
export default Item;