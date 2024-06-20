import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const {cart} =props;
    let total = 0;
    let shipping = 0;
    let price = 0;
    let totalQuantity = 0;
    for(const product of cart){
        if(!product.quantity){
            product.quantity = 1;
        } 
        // product Quantity
        totalQuantity = totalQuantity + product.quantity;
        
        shipping = shipping + (product.shipping)*product.quantity;
        price = product.price;
        // total before tax
        total = total + (product.price * product.quantity) ;  
    }
    const tax = (total + shipping)*0.10;
    const grandTotal = total + shipping + tax;
    return (
        <div className='cart'>
            <div className="order-header">
                <h2>Order Summary</h2>
                <p>Items ordered:{cart.length}</p>
            </div>
            <p>Items: ${price.toFixed(2)}</p>
            <p>Shipping & Handling: ${shipping.toFixed(2)}</p>
            <p>Estimated Tax: ${tax.toFixed(2)}</p>
            <p>Total before tax: ${total.toFixed(2)}</p>
            <h3 className='order-total'>Order Total: ${grandTotal.toFixed(2)}</h3>
        </div>
    );
};

export default Cart;