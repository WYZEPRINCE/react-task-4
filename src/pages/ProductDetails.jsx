import React from "react";
import { useSelector, useDispatch } from "react-redux";
import StarRating from "../components/StarRating";
import { addToCart } from "./store/cartSlice";
import { increment, decrement, setQuantity } from "./store/counterSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../pages/store/wishlistSlice";
import { Heart, Truck, RotateCcw } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import GamePad from "../assets/images/gamepad.png";
import TV from "../assets/images/tv.png";
import KeyBoard from "../assets/images/keyboard.png";
import ColorSpeaker from "../assets/images/colorspeaker.png";
import Havic1 from "../assets/images/havic1.png";
import Havic2 from "../assets/images/havic2.png";
import Havic3 from "../assets/images/havic3.png";
import Havic4 from "../assets/images/havic4.png";
import HavicMain from "../assets/images/havicmain.png";

const productImages = [Havic1, Havic2, Havic3, Havic4];

const relatedProducts = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: 120,
    originalPrice: 160,
    rating: 5,
    reviews: 88,
    image: GamePad,
    discount: "-40%",
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    price: 960,
    originalPrice: 1160,
    rating: 4,
    reviews: 75,
    image: KeyBoard,
    discount: "-35%",
  },
  {
    id: 3,
    name: "FPS LCD Gaming Monitor",
    price: 370,
    originalPrice: 400,
    rating: 5,
    reviews: 99,
    image: TV,
    discount: "-30%",
  },
  {
    id: 4,
    name: "RGB Liquid CPU Cooler",
    price: 160,
    originalPrice: 170,
    rating: 4,
    reviews: 65,
    image: ColorSpeaker,
    discount: "-25%",
  },
];

const ProductDetails = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const quantity = useSelector((state) => state.counter.quantity);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      dispatch(setQuantity(value));
    }
  };
  const handleToggleWishlist = (product) => {
      const isInWishlist = wishlistItems.some((item) => item.id === product.id);
  
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id));
        alert (`${product.name} removed from wishlist!`);
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
        alert(`${product.name} added to wishlist!`);
      }
    };
  
    const isInWishlist = (productId) => {
      return wishlistItems.some((item) => item.id === productId);
    };

  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };
    dispatch(addToCart(cartProduct));

    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-6xl mx-5 md:mx-25 mt-10 bg-white">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Account / Gaming /{" "}
        <span className="text-black font-medium">Havic HV G-92 Gamepad</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
        {/* Product Images */}
        <div className="flex gap-4">
          {/* Thumbnail Images */}
          <div className="flex flex-col gap-3 h-full">
            {productImages.map((img, index) => (
              <div
                key={index}
                className="w-24 h-24 md:w-35 md:h-35 p-3 border bg-gray-100 border-gray-200 rounded-md overflow-hidden cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full "
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-gray-100 rounded-md p-8 flex items-center justify-center ">
            <img
              src={HavicMain}
              alt="Havic HV G-92 Gamepad"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Havic HV G-92 Gamepad
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={4} reviews={150} />
              <span className="text-green-500 text-sm">In Stock</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">$192.00</div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            PlayStation 5 Controller Skin High quality vinyl with air channel
            adhesive for easy bubble free install & mess free removal Pressure
            sensitive.
          </p>

          {/* Colors */}
          <div>
            <span className="text-sm font-medium text-gray-900 mb-3 block">
              Colours:
            </span>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-200 border-2 border-gray-600  hover:border-blue-500"></div>
              <div className="w-6 h-6 rounded-full bg-[#DB4444] border-2 border-[#DB4444]"></div>
            </div>
          </div>

          {/* Size */}
          <div>
            <span className="text-sm font-medium text-gray-900 mb-3 block">
              Size:
            </span>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <div
                  key={size}
                  className={`px-3 py-1 border text-sm ${
                    size === "M"
                      ? "bg-[#DB4444] text-white border-[#DB4444]"
                      : "border-gray-300 hover:border-[#DB4444]"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Quantity and Buy div */}
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="flex items-center border border-gray-300 rounded">
              <div
                onClick={() => dispatch(decrement())}
                className="px-3 py-2 hover:bg-gray-100"
              >
                -
              </div>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 px-2 py-2 text-center border-0 outline-none"
                min="1"
              />
              <div
                onClick={() => dispatch(increment())}
                className="px-3 py-2  text-white bg-[#DB4444] border-[#DB4444]"
              >
                +
              </div>
            </div>

            <div className="bg-[#DB4444] text-white px-8 py-2 rounded hover:bg-[#DB4444] font-medium">
              Buy Now
            </div>

            <div
              onClick={() => handleToggleWishlist()}
              className="bg-white rounded-md p-2 flex items-center justify-center  hover:bg-red-50 transition-colors border"
            >
              <Heart
                size={24}
                className={
                  isInWishlist()
                    ? "fill-[#DB4444] text-[#DB4444]"
                    : "text-gray-600"
                }
              />
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-6 pt-6 border-2 border-gray-300 rounded-lg px-4 py-6 md:w-[400px]">
            <div className="flex items-center gap-3 ">
              <Truck size={20} />
              <div>
                <div className="font-medium text-sm">Free Delivery</div>
                <div className="text-xs text-gray-500 underline cursor-pointer">
                  Enter your postal code for Delivery Availability
                </div>
              </div>
            </div>
            <hr />

            <div className="flex items-center gap-3">
              <RotateCcw size={20} />
              <div>
                <div className="font-medium text-sm">Return Delivery</div>
                <div className="text-xs text-gray-500">
                  Free 30 Days Delivery Returns. Details
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      <div className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-4 h-8 bg-[#DB4444] rounded"></div>
          <span className="text-[#DB4444] font-medium">Related Item</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative bg-gray-50 rounded mb-3 overflow-hidden place-items-center">
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-[#DB4444] text-white text-xs px-2 py-1 rounded">
                    {product.discount}
                  </span>
                )}
                <div className="absolute top-2 right-2 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart size={16} />
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-auto h-48 p-10 object-cover group-hover:scale-105 transition-transform items-center-safe"
                />

                <div
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 hover:bg-gray-800"
                >
                  <FaShoppingCart size={16} />
                  Add To Cart
                </div>
              </div>

              <h3 className="font-medium text-sm mb-1">{product.name}</h3>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#DB4444] font-medium">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <StarRating rating={product.rating} reviews={product.reviews} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
