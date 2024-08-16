import React from "react";
import "./Header.css";
import Logo from "../../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

import useAuth from "../../Context/useAuth";
const Header = () => {
  const { setUser, user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut().then(() => {
      setUser();
      navigate("/shop");
    });
  };

  return (
    <>
      <div className="header min-w-screen">
        <figure className="flex justify-center">
          <img className="logo" src={Logo} alt="" />
        </figure>
      </div>
      <div className="navbar bg-neutral-950 text-white min-w-screen mt-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral-950 rounded-box z-[1] mt-3 w-52 p-2 shadow "
            >
              <li>
                <NavLink to="/shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="/review">Order Review</NavLink>
              </li>
              <li>
                <NavLink to="/inventory">Manage Inventory Here</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex font-semibold ">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/review">Order Review</NavLink>
            </li>
            <li>
              <NavLink to="/inventory">Manage Inventory Here</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center">
              <p className="text-white me-2">{user.displayName}</p>
              <button className="btn btn-sm bg-yellow-500 text-black hover:bg-yellow-600" onClick={handleLogOut}>
                Log Out
              </button>
            </div>
          ) : (
            
              <NavLink to="/login">
                <button className="btn btn-md bg-yellow-500 border-yellow-500 hover:border-yellow-600  hover:bg-yellow-600 text-black" >Login</button>
              </NavLink>
            
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
