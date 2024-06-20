import React, { useEffect, useState } from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Rating from 'react-rating';


const Product = (props) => {
    const element = <FontAwesomeIcon icon={faShoppingCart} />

    const {img,name,url,seller,price,stock,star} = props.product
    return (
        <div className='product'>
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-info">
                <a className='product-title' href={url}><h3 >{name}</h3></a>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                <Rating
                readonly
                initialRating={star}
                emptySymbol="fa-regular fa-star icon-color"
                fullSymbol="fa-solid fa-star icon-color"
                >
                </Rating>
                <br />
                <button onClick={()=>props.handleAddToCart(props.product)} className='btn-regular'>{element} add to cart</button>
            </div>
        </div>
    );
};

export default Product;