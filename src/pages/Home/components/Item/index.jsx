import { Button } from 'antd';
import React, { useState } from 'react';
import history from '../../../../utils/history';
import { connect } from 'react-redux';

import './styles.css'

function Item(props) {
    const { productListItem } = props;

    return (
        <>
            <div className="product-item-container" onClick={() => history.push(`/home/${productListItem.categoryId}/${productListItem.id}`)}>
                <div className="product-item-image">
                    <img src={productListItem.productImage[0]} />
                    <div className="text-discount">
                        {-productListItem.productDiscount * 100} %
                    </div>
                    <div className="text_new">New</div>
                </div>

                <div className="product-title">
                    <div className="product-content">
                        <h5>{productListItem.productName}</h5>
                        <p>{productListItem.productPrice.toLocaleString()}</p>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Item;