import React from "react";
import useProducts from "../../Hooks/useProducts";
import useCart from "../../Hooks/useCart";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import { clearTheCart, deleteFromDb } from "../../utilities/fakedb";
import { useNavigate } from "react-router-dom";

const OrderReview = () => {
  const [products] = useProducts();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const handleRemove = (key) => {
    const newCart = cart.filter((product) => product.key !== key);
    setCart(newCart);
    deleteFromDb(key);
  };

  const handlePlaceOrder = () => {
    navigate("/shipping");
  };

  return (
    <div className="min-h-screen">
      <div className="shop-container grid lg:grid-cols-5 text-black">
        <div className="product-container lg:col-span-4 lg:mx-8 mx-auto">
          {cart.map((product) => (
            <ReviewItem
              key={product.key}
              product={product}
              handleRemove={handleRemove}
            ></ReviewItem>
          ))}
        </div>
        <div className="cart-container mx-auto">
          <Cart cart={cart}>
            {cart.length ? (
              <button
                onClick={handlePlaceOrder}
                className="btn bg-yellow-500  hover:bg-yellow-600 text-black"
              >
                Process For Order
              </button>
            ) : (
              <button className="btn btn-disabled">review your order</button>
            )}
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
