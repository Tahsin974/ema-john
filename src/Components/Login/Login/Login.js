import React from "react";
import { useForm} from "react-hook-form"
import useFirebase from "../../../Hooks/useFirebase";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Context/useAuth";


const Login = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data);
  const {setUser,googleSignIn} = useAuth();
  const location = useLocation()
  

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then((result) => {
        
        setUser(result.user)
        navigate(location.state ? location.state : '/shop')
       
      }).catch((error) => {
        console.log(error.message)
      })
  }

  


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
              {...register("Email")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              {...register("Password")}
            />
          </div>
          <div className="form-control mt-6">
            <button  className="btn btn-primary">Login</button>
          </div>
          <div className="form-control mt-6">
            <button onClick={handleGoogleSignIn} className="btn bg-green-500 text-white hover:bg-green-600">Google Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
