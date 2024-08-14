import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Context/useAuth';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation()
    console.log(loading)

    if(loading){
        
        return <div className='flex justify-center items-center'>
        <span className="loading loading-spinner loading-lg"></span>
    </div>
    }

    if(user){
       return children
    }
    else{
        
        return  <Navigate state={location.pathname} to='/login'></Navigate>
    }
};

export default PrivateRoute;