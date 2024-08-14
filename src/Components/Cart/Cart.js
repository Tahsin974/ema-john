import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const {cart} = props;
    const {children} = props;
    let price = 0;
    let shipping = 0;
    let total = 0;
    let totalQuantity = 0;
    for(const product of cart){
        if(!product.quantity){
            product.quantity = 1;
        } 
        // product Quantity
        totalQuantity = totalQuantity + product.quantity;
        price = product.price;
        shipping = shipping + (product.shipping)*product.quantity
        total = total + price * product.quantity;
    }
    const tax = (price+shipping)*0.10;
    const grandTotal = total + tax;
    return (
        <div className='space-y-3'>
            <h2 className='text-xl text-red-600 font-bold'>Order Summary</h2>
            <h4 className='text-lg'>Items ordered:{totalQuantity}</h4>
            
            <p className='text-lg'>Items price:${price.toFixed(2)}</p>
            <p className='text-lg'>Shipping & Handling:${shipping.toFixed(2)}</p>
            <p className='text-lg'>Total before tax:${total.toFixed(2)}</p>
            <p className='text-lg'>Estimated Tax:${tax.toFixed(2)}</p>
            <p className='text-lg'>Order Total:${grandTotal.toFixed(2)}</p>
            {children}
        </div>
    );
};

export default Cart;