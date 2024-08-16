import React, { useEffect, useRef, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDb } from "../../utilities/fakedb";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const searchRef = useRef();
  const [displayProducts, setDisplayProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const size = 15;
  const baseURL = "https://ema-john-server-ashen.vercel.app";

  useEffect(() => {
    fetch(`${baseURL}/products?page=${page}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setDisplayProducts(data.products);

        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
  }, [page]);

  const handleAddToCart = (product) => {
    const exists = cart.find((pd) => pd.key === product.key);
    let newCart = [];
    if (exists) {
      const rest = cart.filter((pd) => pd.key !== product.key);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    // add to local storage
    addToDb(product.key);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = searchRef.current.value;
    const matchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayProducts(matchedProducts);

    searchRef.current.value = "";
  };

  return (
    <div>
      <form
        className=" join search-container  flex justify-center rounded-none py-2"
        onSubmit={handleSearch}
      >
        
          <input
            className="input input-bordered join-item lg:w-3/4 md:w-2/4 bg-white"
            placeholder="Search Products"
            type="text"
            ref={searchRef}
          />
          <button type="submit" className="btn join-item bg-yellow-400 text-black border-gray-500 hover:bg-yellow-500">Search</button>
      
      </form>
      <div className="shop-container grid lg:grid-cols-5 text-black my-4">
        <div className="product-container lg:col-span-4 lg:mx-8 mx-auto md:border-r-0 sm:border-r-0">
          {displayProducts.map((product) => (
            <Product
              handleAddToCart={handleAddToCart}
              key={product.key}
              product={product}
            ></Product>
          ))}
          <div className=" my-6  flex justify-center">
            {[...Array(pageCount).keys()].map((number) => (
              <div key={number}>
                <button
                  onClick={() => setPage(number)}
                  className={
                    number === page
                      ? "btn  rounded-none bg-yellow-400 text-black border-gray-500 hover:bg-yellow-500"
                      : "btn bg-white border-gray-500  text-black rounded-none"
                  }
                >
                  {number + 1}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-container mx-auto">
          <Cart cart={cart}>
            {cart.length > 0 ? (
              <Link to="/review">
                <button className="btn bg-yellow-500  hover:bg-yellow-600 text-black">
                  review your order
                </button>
              </Link>
            ) : (
              <button className="btn btn-disabled">review your order</button>
            )}
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Shop;
