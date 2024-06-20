import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
const Shop = () => {
    const [products,setProducts] = useState([])
    const [cart,setCart] = useState([])
    const [displayProducts,setDisplayProducts]=useState([]);

    useEffect(()=>{
        fetch('./products.json')
        .then(res => res.json())
        .then(data =>{
             
            setProducts(data);
            setDisplayProducts(data)});
    },[])

    useEffect(() =>{
        if(products.length){
            const savedCart = getStoredCart();
            const storedCart = [];
            for(const key in savedCart){
                const addedProduct = products.find(product => product.key === key);
                const quantity = savedCart[key];
                addedProduct.quantity = quantity;
                console.log(addedProduct);
                storedCart.push(addedProduct);
            }
            setCart(storedCart);
        }
    },[products])

    const handleAddToCart = (product)=>{
        let newCart = [...cart,product]
        setCart(newCart);
        // add to local storage
        addToDb(product.key)
    }

    const handleSearch = event =>{
        const searchText = event.target.value;
         const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))
         setDisplayProducts(matchedProducts)


    }
    return (
        <div>
            <div className="search-container">
                <input onChange={handleSearch} type="text" placeholder='search products'/>
            </div>
            <div className='shop-container'>
            <div className="product-container">
                {
                    displayProducts.map(product => <Product 
                    handleAddToCart = {handleAddToCart}
                    key = {product.key}
                    product = {product}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}></Cart>
            </div>
        </div>
        </div>
    );
};

export default Shop;