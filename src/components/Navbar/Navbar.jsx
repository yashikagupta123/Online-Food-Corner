import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';
import Badge from '@mui/material/Badge';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '../../assets/logo.jpg';

const Navbar = ({ searchTerm, setSearchTerm, handleLogout }) => {
  const navigate = useNavigate();

  const cartData = useSelector((state) => state.cart.value);

  const handleClick = () => {
    navigate('/CartPage');
  };
  const handleLogoClick = () => {
    navigate('/HomePage');
  };
  const handleOrderClick = () => {
    navigate('/OrdersPage');
  };
  const [isSearchBoxVisible, setSearchBoxVisible] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);

  const toggleSearchBox = () => {
    setSearchBoxVisible(!isSearchBoxVisible);
    setSearchActive(!isSearchActive);
  };

  useEffect(() => {
    if (searchTerm) {
      navigate('/HomePage');
    }
  }, [searchTerm]);

  const totalQuantity = () => {
    let totalCount = Object.values(cartData).reduce(
      (accumulator, currValue) => accumulator + currValue,
      0
    );
    console.log(totalCount);

    return totalCount;
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full h-24 px-24">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <img
            onClick={handleLogoClick}
            src={logo}
            alt="MySwiggyClone Logo"
            className="w-24 h-20 hover:opacity-75 cursor-pointer"
          />
        </div>
        {/* Navbar Items */}
        <div
          className={`flex items-center ${isSearchBoxVisible ? 'space-x-6' : 'space-x-4'}`}
        >
          {/* Search Bar */}
          <div className="flex items-center relative">
            <button
              onClick={toggleSearchBox}
              className={`flex items-center px-3 py-3 transition-colors duration-300 ${isSearchActive ? 'text-orange-500' : 'text-black'}`}
            >
              <IoSearch className="h-5 w-5" />
              <span className="ml-2">Search</span>
            </button>
            {isSearchBoxVisible && (
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-2 p-2 border border-gray-400 font-sans rounded shadow-lg focus:outline-none w-80"
                placeholder="Search for restaurants"
              />
            )}
          </div>
          {/* Sign Out */}
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 hover:text-orange-500 transition-colors duration-300"
          >
            <FaRegUser className="h-6 w-6" />
            <span className="ml-2">Sign Out</span>
          </button>
          {/*Orders*/}
          <button
            onClick={handleOrderClick}
            className="flex items-center px-4 py-3 hover:text-orange-500 transition-colors duration-300"
          >
            <BsBoxSeam className="h-6 w-6" />
            <span className="ml-2">Orders</span>
          </button>
          {/* Cart */}
          <button
            onClick={handleClick}
            className="flex items-center px-4 py-3 hover:text-orange-500 transition-colors duration-300"
          >
            <Badge badgeContent={totalQuantity()} color="primary">
              <HiOutlineShoppingBag className="h-6 w-6" />
            </Badge>
            <span className="ml-2">Cart</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
