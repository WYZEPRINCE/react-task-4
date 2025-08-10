import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="mx-5 md:mx-25 p-4 bg-white ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <p className=" text-2xl md:text-3xl  font-bold text-gray-900">Exclusive</p>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6 ">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              to="*"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="*"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              to="/signup"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign up
            </Link>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar - hidden on small screens */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-64"
              />
              <Search size={18} className="text-gray-500" />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3 cursor-pointer">
              <Link to="/wishlist">
                <div className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                  <Heart size={20} />
                </div>
              </Link>
              <Link to="/cart">
                <div className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors relative">
                  <ShoppingBag size={20} />
                  {/* Example cart badge */}
                  {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span> */}
                </div>
              </Link>
            </div>

            {/* Hamburger Menu - Mobile */}
            <div
              className="md:hidden p-2 text-gray-700 cursor-pointer"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 bg-gray-100 rounded-md shadow-md p-4 space-y-3">
            <Link
              to="/"
              onClick={closeMenu}
              className="block text-gray-700 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="block text-gray-700 hover:text-gray-900"
            >
              Contact
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="block text-gray-700 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              to="/signup"
              onClick={closeMenu}
              className="block text-gray-700 hover:text-gray-900"
            >
              Sign up
            </Link>

            {/* Search bar in mobile dropdown */}
            <div className="flex items-center bg-white rounded-md px-3 py-2 mt-3">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
              />
              <Search size={18} className="text-gray-500" />
            </div>
          </div>
        )}
      </header>
      <hr className="w-full text-gray-300" />
    </>
  );
};

export default Header;
