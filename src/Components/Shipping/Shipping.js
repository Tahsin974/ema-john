import React from 'react';
import { useForm} from "react-hook-form"
import useAuth from '../../Context/useAuth';
import {clearTheCart, getStoredCart} from '../../utilities/fakedb'
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
    const {user} = useAuth();
    const savedCart = getStoredCart();
    const navigate = useNavigate()
    
    const { register, handleSubmit ,reset} = useForm()
  const onSubmit = (data) => {
    data.order = savedCart;

    fetch('http://localhost:5000/orders',{
        method: 'POST',
        headers:{
            'content-type' : 'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        
        if(result.insertedId){
            alert('Order Proceed Successfully')
            clearTheCart()
            reset();
            navigate('/shop')
        }
    })
  };
    return (
        <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              defaultValue={user.displayName}
              className="input input-bordered"
              required
              {...register("name")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              defaultValue={user.email}
              className="input input-bordered"
              required
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder='address'
              className="input input-bordered"
              
              {...register("address")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              placeholder='city'
              className="input input-bordered"
              
              {...register("city")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contact No.</span>
            </label>
            <input
              type="text"
              placeholder='phone number'
              className="input input-bordered"
            
              {...register("phone")}
            />
          </div>
          <div className="form-control mt-6">
            <button  className="btn bg-yellow-500  hover:bg-yellow-600">Submit</button>
          </div>
          
        </form>
      </div>
    </div>
    );
};

export default Shipping;