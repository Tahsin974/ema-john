import React from 'react';

const ReviewItem = (props) => {
    const{key,name,price,quantity} = props.product;
    const {handleRemove} = props;
    return (
        <div className='product'>
            <div>
                <h3 className='product-title'>{name}</h3>
                <p>Price: ${price}</p>
                <p>Quantity: {quantity}</p>
                <button onClick={()=> handleRemove(key)} className='btn btn-wide bg-yellow-500  hover:bg-yellow-600'>Remove</button>
            </div>
            
        </div>
    );
};

export default ReviewItem;