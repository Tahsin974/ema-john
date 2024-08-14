import React, { useEffect, useState } from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Rating from "react-rating";

const Product = (props) => {
  const element = <FontAwesomeIcon icon={faShoppingCart} />;

  const { img, name, seller, price, stock, star } = props.product;
  return (
    <div className="product">
      <div className="grid lg:grid-cols-4 items-center bg-white ">
        <figure>
          <img
            src={img}
            alt="Album"
            className="image-full"
          />
        </figure>
        <div className="card-body lg:col-span-3">
          <h2 className="card-title">{name}</h2>
          <p>
          <small>by: {seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>only {stock} left in stock - order soon</small>
        </p>
        <Rating
          readonly
          initialRating={star}
          emptySymbol="fa-regular fa-star icon-color"
          fullSymbol="fa-solid fa-star icon-color"
        ></Rating>
        <br />
        <button
          onClick={() => props.handleAddToCart(props.product)}
          className="btn bg-yellow-500  hover:bg-yellow-600"
        >
          {element} add to cart
        </button>
        </div>
      </div>
      
      
    </div>
  );
};

export default Product;
