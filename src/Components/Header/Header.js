import React from 'react';
import './Header.css'
import Logo from '../../images/logo.png'
const Header = () => {
    return (
        <div className='header'>
            <img className='logo' src={Logo} alt="" />
            <nav>
                <li><a href="/Shop">Shop</a></li>
                <li><a href="/Order">Order Review</a></li>
                <li><a href="/Manage">Manage Inventory Here</a></li>
            </nav>
        </div>
    );
};

export default Header;