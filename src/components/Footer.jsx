import React from 'react'
import Logo from "../assets/images/Logo.png"
import { FaPaperPlane, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import QrCode from "../assets/images/Qrcode.png"
import Google from "../assets/images/GooglePlay.png"
import Apple from "../assets/images/download-appstore.png"

function Footer() {
  return (
    <div className="bg-black px-30 py-15">
      {/* subscribe */}
      <div className="flex gap-8 w-full">
        <span className="flex flex-col gap-5">
          <p className="text-white text-2xl font-semibold">Exclusive</p>
          <p className="text-white text-md font-medium">Subscribe</p>
          <p className="text-white text-sm">Get 10% off your first order</p>

          <div className="border-1 border-white flex text-white place-items-center px-2 py-1">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="focus:outline-none"
            />
            <FaPaperPlane />
          </div>
        </span>

        {/* support */}
        <span className="flex flex-col gap-4">
          <p className="text-white text-2xl font-medium mb-2">Support</p>
          <p className="text-white text-sm font-normal w-45">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p className="text-white text-sm">exclusive@gmail.com</p>
          <p className="text-white text-sm">+88015-88888-9999</p>
        </span>

        {/* Account */}
        <span className="flex flex-col gap-4">
          <p className="text-white text-2xl font-medium mb-2">Account</p>
          <p className="text-white text-sm font-normal w-45">My Account</p>
          <p className="text-white text-sm">Login / Register</p>
          <p className="text-white text-sm">Cart</p>
          <p className="text-white text-sm">Wishlist</p>
          <p className="text-white text-sm">Shop</p>
        </span>

        {/* Quick Link */}
        <span className="flex flex-col gap-4">
          <p className="text-white text-2xl font-medium mb-2">Quick Link</p>
          <p className="text-white text-sm font-normal w-45">Privacy Policy</p>
          <p className="text-white text-sm">Term Of Use</p>
          <p className="text-white text-sm">FAQ</p>
          <p className="text-white text-sm">Contct</p>
        </span>

        {/* Download App */}
        <span className="flex flex-col gap-4">
          <p className="text-white text-2xl font-medium mb-2">Download App</p>
          <p className="text-gray-400 text-xs font-normal w-45">
            Save $3 with App New User Only
          </p>
          <div className="flex gap-2">
            <img src={QrCode} width={60} alt="QrCode" />
            <div className="flex flex-col gap-2">
              <img src={Google} width={100} alt="Gplay" />
              <img src={Apple} width={100} alt="Apple" />
            </div>
          </div>
          <div className="flex gap-5 text-white">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </span>
      </div>
    </div>
  );
}

export default Footer;