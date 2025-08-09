import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../pages/store/authSlice";
import {
  User,
  Settings,
  Heart,
  ShoppingBag,
  Star,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { toggleDropdown, closeDropdown } from "../pages/store/profileSlice";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const isDropdownOpen = useSelector((state) => state.profile.isDropdownOpen);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(closeDropdown());
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, dispatch]);

  const menuItems = [
    {
      icon: User,
      label: "Manage My Account",
      onClick: () => alert("Manage Account clicked"),
    },
    {
      icon: ShoppingBag,
      label: "My Order",
      onClick: () => alert("My Order clicked"),
    },
    {
      icon: Heart,
      label: "My Wishlist",
      onClick: () => alert("My Wishlist clicked"),
    },
    {
      icon: Star,
      label: "My Reviews",
      onClick: () => alert("My Reviews clicked"),
    },
    {
      icon: LogOut,
      label: "Logout",
      onClick: async () => {
        await dispatch(logoutAsync());
        window.location.href = "/login";
      },
      isLogout: true,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon Button */}
      <div
        onClick={() => dispatch(toggleDropdown())}
        className={`p-2  bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer ${
          isDropdownOpen
            ? "bg-red-700 text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        <User size={20} />
      </div>

      {/* Dropdown Modal */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => dispatch(closeDropdown())}
          />

          {/* Dropdown Content */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-[#32323233] backdrop-filter backdrop-blur-[15px] rounded-lg shadow-lg  z-20">
            {/* Arrow */}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      item.onClick();
                      dispatch(closeDropdown());
                    }}
                    className={`w-full flex items-center justify-between text-white px-4 py-3 text-left hover:bg-gray-50  hover:text-black transition-colors duration-150 cursor-pointer ${
                      item.isLogout
                        ? "text-red-600 hover:bg-red-50"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent size={16} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {!item.isLogout && (
                      <ChevronRight size={14} className="text-gray-400" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
