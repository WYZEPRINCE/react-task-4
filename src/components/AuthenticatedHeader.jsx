import React from "react";
import ProfileDropdown from "./ProfileDropdown";
import { Search, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className=" mx-25 p-2">
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <div className="flex items-center gap-8 ">
            <h1 className="text-xl font-bold text-gray-900 mr-20">Exclusive</h1>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </a>
              <a
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </a>
              <a
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors "
              >
                About
              </a>
              {/* <a
              href=""
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign Up
            </a> */}
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-64"
              />
              <Search />
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3 cursor-pointer">
              {/* Wishlist */}
              <Link to="/wishlist">
                <div className="p-2 text-gray-600  hover:bg-gray-200 rounded-full transition-colors">
                  <Heart size={20} />
                </div>
              </Link>

              {/* Cart */}
              <Link to="/cart ">
                {" "}
                <div className="p-2 text-gray-600  hover:bg-gray-200 rounded-full transition-colors relative">
                  <ShoppingBag size={20} />
                  <span className="absolute -top-1 -right-1 bg-[#DB4444] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </div>
              </Link>

              {/* Profile Dropdown */}
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>
      <hr className="w-full text-gray-300 mt-2 " />
    </>
  );
};

export default Header;
