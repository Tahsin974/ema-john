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
  const size = 10;
  const baseURL = 'https://ema-john-server-ashen.vercel.app';

  useEffect(() => {
    fetch(`${baseURL}/products?page=${page}&&size=${size}`)
    .then(res => res.json())
    .then(data => {
      setProducts(data.products);
      setDisplayProducts(data.products);

      const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
    });
  },[page])


  
  
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
    e.preventDefault()
    const searchText = searchRef.current.value;
    const matchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayProducts(matchedProducts);

    searchRef.current.value =''
  };

  
  
  return (
    <div>
      
        
        <form className="search-container flex justify-center" onSubmit={handleSearch}>
        <label className="input input-bordered w-3/5 rounded-none min-w-md flex items-center justify-between gap-2 my-2">
          <input 
          ref={searchRef}
          type="text" className="grow " placeholder="search products" />
          <button type="submit" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          </button>
        </label>
        </form>
      <div className="shop-container grid lg:grid-cols-5">
        <div className="product-container lg:col-span-4">
          {displayProducts.map((product) => (
            <Product
              handleAddToCart={handleAddToCart}
              key={product.key}
              product={product}
            ></Product>
          ))}
          <div className="join my-6 flex justify-center space-x-3">
            {[...Array(pageCount).keys()].map((number) => (
              <div key={number}>
                <button
                  onClick={() => setPage(number)}
                  className={
                    number === page
                      ? "btn join-item rounded-none bg-yellow-400 text-black border-gray-500 hover:bg-yellow-500"
                      : "btn join-item rounded-none"
                  }
                >
                  {number + 1}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-container">
          <Cart cart={cart}>
            {
              cart.length > 0 ? <Link to="/review">
              <button className="btn bg-yellow-500  hover:bg-yellow-600">review your order</button>
            </Link> :
            <button className="btn btn-disabled">
            review your order
          </button>
            }
            
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Shop;
