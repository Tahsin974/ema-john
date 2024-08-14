import React from 'react';
import './Header.css'
import Logo from '../../images/logo.png'
import { NavLink, useNavigate } from 'react-router-dom';

import useAuth from '../../Context/useAuth';
const Header = () => {
    const {setUser,user,logOut} = useAuth();
    const navigate = useNavigate();
    const handleLogOut = () => {
        logOut()
        .then(() => {
            setUser();
            navigate('/shop')
          })
    }
    
    return (
        <div className='header'>
            <figure className='flex justify-center'>
            <img className='logo' src={Logo} alt="" />
            </figure>
            <nav className='flex items-center justify-center'>
                <li><NavLink to="/shop">Shop</NavLink></li>
                <li><NavLink to="/review">Order Review</NavLink></li>
                <li><NavLink to="/inventory">Manage Inventory Here</NavLink></li>
                
                {
                    user ? <div className='flex items-center'>
                        <p className='text-white me-2'>{user.displayName}</p><button className='btn btn-sm bg-white' onClick={handleLogOut}>Log Out</button>
                    </div> : <li><NavLink to="/login">Login</NavLink></li>
                }
                
            </nav>
        </div>
    );
};

export default Header;