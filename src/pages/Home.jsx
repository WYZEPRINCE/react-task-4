import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { addToCart } from "../pages/store/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../pages/store/wishlistSlice";
import HeroImg from "../assets/images/HeroImg.png";
import Timer from "../components/Timer";
import {
  Smartphone,
  Heart,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
  Truck,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import Jbl from "../assets/images/jbl.png";
import GamePad from "../assets/images/gamepad.png";
import TV from "../assets/images/tv.png";
import KeyBoard from "../assets/images/keyboard.png";
import Chair from "../assets/images/chair.png";
import WhiteApple from "../assets/images/white-apple.png";
import Ps5 from "../assets/images/ps5.png";
import WomanHat from "../assets/images/womanhat.png";
import Perfume from "../assets/images/perfume.png";
import Speaker from "../assets/images/speaker.png";

const categories = [
  { id: 1, name: "Phones", icon: Smartphone, isActive: false },
  { id: 2, name: "Computers", icon: Monitor, isActive: false },
  { id: 3, name: "SmartWatch", icon: Watch, isActive: false },
  { id: 4, name: "Camera", icon: Camera, isActive: true },
  { id: 5, name: "HeadPhones", icon: Headphones, isActive: false },
  { id: 6, name: "Gaming", icon: Gamepad2, isActive: false },
];

const services = [
  {
    id: 1,
    icon: Truck,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    id: 2,
    icon: Headphones,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    id: 3,
    icon: Shield,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
  },
];

const products = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: 120,
    originalPrice: 160,
    discount: 40,
    rating: 4.5,
    reviews: 88,
    image: GamePad,
    isNew: false,
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    price: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 4.8,
    reviews: 75,
    image: KeyBoard,
    isNew: false,
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    price: 370,
    originalPrice: 400,
    discount: 30,
    rating: 4.9,
    reviews: 99,
    image: TV,
    isNew: false,
  },
  {
    id: 4,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.6,
    reviews: 99,
    image: Chair,
    isNew: false,
  },
  {
    id: 5,
    name: "S-Series Gaming Chair",
    price: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 4.7,
    reviews: 65,
    image: Chair,
    isNew: false,
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistCount = useSelector((state) => state.wishlist.count);

  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };
    dispatch(addToCart(cartProduct));

    // Optional: Show a toast notification
    console.log(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      console.log(`${product.name} removed from wishlist!`);
    } else {
      const wishlistProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        discount: product.discount,
      };
      dispatch(addToWishlist(wishlistProduct));
      console.log(`${product.name} added to wishlist!`);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const ProductCard = ({ product }) => (
    <div className="group cursor-pointer">
      <div className="relative bg-gray-100 rounded-lg p-8 mb-4 aspect-square flex items-center justify-center">
        {/* Discount badge */}
        <div className="absolute top-3 left-3 bg-[#DB4444] text-white px-2 py-1 rounded text-xs font-semibold">
          -{product.discount}%
        </div>

        {/* New badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 mt-8 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
            NEW
          </div>
        )}

        {/* Wishlist button */}
        <div
          onClick={() => handleToggleWishlist(product)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center  hover:bg-red-50 transition-colors"
        >
          <Heart
            size={16}
            className={
              isInWishlist(product.id)
                ? "fill-[#DB4444] text-[#DB4444]"
                : "text-gray-600"
            }
          />
        </div>

        {/* Add to cart button (appears on hover) */}
        <div
          onClick={() => handleAddToCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 hover:bg-gray-800"
        >
          <FaShoppingCart size={16} />
          Add To Cart
        </div>

        {/* Product image */}
        <div className="w-35 h-32 m-3 rounded-lg flex items-center justify-center">
          <Link to="/productdetails" ><img src={product.image} alt={product.name} /></Link>
        </div>
      </div>

      {/* Product info */}
      <div>
        <h3 className="font-semibold mb-2">{product.name}</h3>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#DB4444] font-semibold">${product.price}</span>
          <span className="text-gray-500 line-through">
            ${product.originalPrice}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={14}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm">({product.reviews})</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white w-full px-25">
      {/* Sidebar */}
      <div className="flex gap-8">
        <div className="w-64 h-full bg-white border-r border-gray-200 p-6">
          <nav className="space-y-4">
            <div className="flex items-center justify-between cursor-pointer hover:text-[#DB4444]">
              <span>Woman's Fashion</span>
              <FaChevronRight size={16} />
            </div>
            <div className="flex items-center justify-between cursor-pointer hover:text-[#DB4444]">
              <span>Men's Fashion</span>
              <FaChevronRight size={16} />
            </div>
            <div className="cursor-pointer hover:text-[#DB4444]">
              Electronics
            </div>
            <div className="cursor-pointer hover:text-[#DB4444]">
              Home & Lifestyle
            </div>
            <div className="cursor-pointer hover:text-[#DB4444]">Medicine</div>
            <div className="cursor-pointer hover:text-[#DB4444]">
              Sports & Outdoor
            </div>
            <div className="cursor-pointer hover:text-[#DB4444]">
              Baby's & Toys
            </div>
            <div className="cursor-pointer hover:text-[#DB4444]">
              Groceries & Pets
            </div>
            <div className="cursor-pointer hover:text-[#DB4444]">
              Health & Beauty
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-full">
          {/* Hero Banner */}
          <div className="relative bg-black text-white mt-10 p-16 mb-8">
            <div className="max-w-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <img src={WhiteApple} className="text-black font-bold" />
                </div>
                <span>iPhone 14 Series</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Up to 10%
                <br />
                off Voucher
              </h1>
              <div className="flex items-center gap-2 text-white underline hover:no-underline cursor-pointer">
                Shop Now
                <FaChevronRight size={16} />
              </div>
            </div>
            <img
              className="absolute left-2/4 size-80 top-0"
              src={HeroImg}
              alt=""
            />

            {/* Carousel dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className="w-3 h-3 bg-white/50 rounded-full"></div>
              <div className="w-3 h-3 bg-white/50 rounded-full"></div>
              <div className="w-3 h-3 border-2 border-white bg-red-700 rounded-full"></div>
              <div className="w-3 h-3 bg-white/50 rounded-full"></div>
              <div className="w-3 h-3 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2 mb-2">
            <FaShoppingCart size={20} />
            <span>Cart: {getTotalCartItems()} items</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHeart size={20} />
            <span>Wishlist: {wishlistCount} items</span>
          </div>
        </div>
      </div>

      {/* Flash Sales Section */}
      <div className="mb-8 px-6 ">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
          <span className="text-[#DB4444] font-semibold">Today's</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-8">
            <h2 className="text-4xl font-bold">Flash Sales</h2>
            <Timer />
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer">
              <FaChevronLeft size={20} />
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer">
              <FaChevronRight size={20} />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-5 gap-6 mb-8 overflow-x-visible w-[1300px]">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center">
          <button className="bg-[#DB4444] text-white px-12 py-4 rounded hover:bg-red-600 transition-colors">
            View All Products
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="text-gray-300 mx-30" />

      {/* Product Category Section */}
      <div className="max-full px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-8 bg-[#DB4444] rounded"></div>
            <span className="text-[#DB4444] font-medium">Categories</span>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900">
              Browse By Category
            </h1>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                <FaChevronLeft size={20} />
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                <FaChevronRight size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;

            return (
              <div
                key={category.id}
                className={`
                relative group p-8 rounded-lg border-2 transition-all duration-200 hover:scale-105 cursor-pointer
                ${
                  category.isActive
                    ? "bg-[#DB4444] border-[#DB4444] text-white shadow-lg"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md"
                }
              `}
              >
                <div className="flex flex-col items-center gap-4">
                  <IconComponent
                    className={`w-12 h-12 ${
                      category.isActive ? "text-white" : "text-gray-700"
                    }`}
                    strokeWidth={1.5}
                  />
                  <span
                    className={`font-medium text-sm ${
                      category.isActive ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {category.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Best Selling Section */}
      <div className="mb-8 px-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
          <span className="text-[#DB4444] font-semibold">This Month</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-8">
            <h2 className="text-4xl font-bold">Best Selling Products</h2>
          </div>
          <button className="text-[#DB4444] hover:text-red-600 font-medium">
            View All
          </button>
        </div>

        <div className="grid grid-cols-5 gap-6 mb-8">
          {products.map((product) => (
            <ProductCard key={`best-${product.id}`} product={product} />
          ))}
        </div>
      </div>

      {/* Enhance Music Experience Section */}
      <div className="relative bg-black text-white rounded-lg p-16 mb-8 mx-6">
        <div className="flex flex-col gap-3 max-w-md">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-500">Categories</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Enhance Your
            <br />
            Music Experience
          </h1>
          <Timer />
          <div className="bg-green-500 w-1/4 p-2 rounded-sm text-center mt-3 text-white hover:bg-green-600 transition-colors">
            Shop Now
          </div>
        </div>
        <img
          className="absolute left-1/2 size-110 top-0 shadow-2xl shadow-stone-700"
          src={Jbl}
          alt=""
        />
      </div>

      {/* Explore Our Products */}
      <div className="mb-8 px-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
          <span className="text-[#DB4444] font-semibold">Our Products</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-8">
            <h2 className="text-4xl font-bold">Explore Our Products</h2>
          </div>

          <div className="flex gap-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer">
              <FaChevronLeft size={20} />
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer">
              <FaChevronRight size={20} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <ProductCard key={`explore-${product.id}`} product={product} />
          ))}
        </div>

        <div className="text-center">
          <button className="bg-[#DB4444] text-white px-12 py-4 rounded hover:bg-red-600 transition-colors">
            View All Products
          </button>
        </div>
      </div>

      {/* Featured Section */}
      <div className="w-full px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-8 bg-[#DB4444] rounded"></div>
            <span className="text-[#DB4444] font-medium">Featured</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">New Arrival</h1>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          {/* PlayStation 5 - Large Card */}
          <div className="relative bg-black rounded-lg overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>

            {/* PS5 Image Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex gap-4">
                {/* Black PS5 */}
                <img src={Ps5} alt="" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-20 p-8 h-full flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white mb-4">
                PlayStation 5
              </h3>
              <p className="text-gray-300 mb-6 max-w-xs">
                Black and White version of the PS5 coming out on sale.
              </p>
              <div className="text-white underline hover:no-underline transition-all text-left font-medium">
                Shop Now
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid grid-rows-2 gap-6">
            {/* Women's Collections */}
            <div className="relative bg-black rounded-lg overflow-hidden cursor-pointer">
              {/* Woman Image */}
              <div className="absolute right-0 top-0 h-full ">
                <div className="h-full   relative overflow-hidden">
                  {/* Silhouette of woman with hat */}
                  <img src={WomanHat} alt="" />
                </div>
              </div>

              {/* Content */}
              <div className="relative  p-6 h-full flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white mb-3">
                  Women's Collections
                </h3>
                <p className="text-gray-300 mb-4 text-sm max-w-48">
                  Featured woman collections that give you another vibe.
                </p>
                <div className="text-white underline hover:no-underline transition-all text-left font-medium">
                  Shop Now
                </div>
              </div>
            </div>

            {/* Bottom Row - Speakers and Perfume */}
            <div className="grid grid-cols-2 gap-6">
              {/* Speakers */}
              <div className="relative bg-black rounded-lg overflow-hidden  cursor-pointer">
                {/* Amazon Echo Speakers */}
                <div className="absolute p-5 items-center justify-center">
                  <img src={Speaker} alt="" />
                </div>

                {/* Content */}
                <div className="relative z-20 p-4 h-full flex flex-col justify-end">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Speakers
                  </h3>
                  <p className="text-gray-300 mb-3 text-xs">
                    Amazon wireless speakers
                  </p>
                  <div className="text-white underline hover:no-underline transition-all text-left font-medium text-sm">
                    Shop Now
                  </div>
                </div>
              </div>

              {/* Perfume */}
              <div className="relative bg-black rounded-lg overflow-hidden group cursor-pointer">
                {/* Perfume Bottle */}
                <div className="absolute top-8 p-4  transform ">
                  <img src={Perfume} alt="" />
                </div>

                {/* Content */}
                <div className="relative z-20 p-4 h-full flex flex-col justify-end">
                  <h3 className="text-lg font-bold text-white mb-2">Perfume</h3>
                  <p className="text-gray-300 mb-3 text-xs">
                    GUCCI INTENSE OUD EDP
                  </p>
                  <div className="text-white underline hover:no-underline transition-all text-left font-medium text-sm">
                    Shop Now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {services.map((service) => {
            const IconComponent = service.icon;

            return (
              <div
                key={service.id}
                className="flex flex-col items-center text-center"
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  {/* Outer gray circle */}
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                    {/* Inner black circle */}
                    <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                      <IconComponent
                        className="w-7 h-7 text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-black tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
