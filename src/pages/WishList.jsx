import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "./store/wishlistSlice";
import { addToCart } from "./store/cartSlice";
import { Heart, ShoppingCart, Trash2, ArrowLeft, Eye } from "lucide-react";
import { FaHeart, FaStar } from 'react-icons/fa';
import GamePad from "../assets/images/gamepad.png"
import TV from "../assets/images/tv.png"
import KeyBoard from "../assets/images/keyboard.png"
import IdeaPad from "../assets/images/ideapad.png"


const Products = [
  {
    id: 101,
    name: "ASUS FHD Gaming Laptop",
    price: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 4.5,
    reviews: 65,
    image: IdeaPad,
    isNew: false
  },
  {
    id: 102,
    name: "IPS LCD Gaming Monitor",
    price: 1160,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    reviews: 65,
    image: TV,
    isNew: false
  },
  {
    id: 103,
    name: "HAVIT HV-G92 Gamepad",
    price: 560,
    originalPrice: null,
    discount: null,
    rating: 4.6,
    reviews: 65,
    image: GamePad,
    isNew: true
  },
  {
    id: 104,
    name: "AK-900 Wired Keyboard",
    price: 200,
    originalPrice: null,
    discount: null,
    rating: 4.7,
    reviews: 65,
    image: KeyBoard,
    isNew: false
  }
]

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, count } = useSelector((state) => state.wishlist);
  const cartItems = useSelector((state) => state.cart.items);

  const handleMoveAllToBag = () => {
    // Add all wishlist items to cart
    items.forEach(item => {
      const cartProduct = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image
      };
      dispatch(addToCart(cartProduct));
    });
    
    // Clear wishlist after moving all items
    dispatch(clearWishlist());
    alert(`${items.length} item${items.length !== 1 ? 's' : ''} moved to cart!`);
  };

  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    };
    dispatch(addToCart(cartProduct));
    alert(`${product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleContinueShopping = () => {
    // Navigate back to home/shop page
    window.history.back();
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const ProductCard = ({ product }) => (
    <div className="group cursor-pointer bg-white rounded-lg overflow-hidden transition-shadow duration-200">
      <div className="relative bg-gray-100 aspect-square flex items-center justify-center p-8">
        {/* Discount badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-[#DB4444] text-white px-2 py-1 rounded text-xs font-semibold">
            -{product.discount}%
          </div>
        )}

        {/* Remove from wishlist button */}
        <div
          onClick={() => handleRemoveFromWishlist(product.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
          title="Remove from wishlist"
        >
          <Eye size={16} className="text-black-500" />
        </div>

        {/* Product Image */}
        <div className="w-full md:w-35 h-32 m-3 rounded-lg flex items-center justify-center">
          <img src={product.image} alt={product.name} />
        </div>

        
        {/* Individual remove and add to cart buttons */}
      </div>
        <div className="flex gap-2">
          <div
            onClick={() => handleAddToCart(product)}
            disabled={isInCart(product.id)}
            className="bg-black w-full text-white p-2 flex gap-3 justify-center text-md"
          >
            <ShoppingCart />
            Add to Cart
          </div>
        </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold mb-2 text-gray-900 line-clamp-2">{product.name}</h3>
        
        {/* Price */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#DB4444] font-semibold text-lg">
            ${product.price}
          </span>
          {product.originalPrice && product.originalPrice !== product.price && (
            <span className="text-gray-500 line-through text-sm">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
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
            {product.reviews && (
              <span className="text-gray-500 text-sm">({product.reviews})</span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mb-10 lg:mx-25">
      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-sm text-gray-600">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-black font-bold">Wishlist</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaHeart className="text-[#DB4444]" size={24} />
            <h1 className=" text-xl sm:text-3xl font-bold text-gray-900">
              Wishlist ({count})
            </h1>
          </div>

          {count > 0 && (
            <div className="flex gap-3">
              <div
                onClick={() => dispatch(clearWishlist())}
                className="px-4 py-2 text-[#DB4444] border border-red-200 rounded hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
              >
                <Trash2 size={16} />
                Clear All
              </div>
              <div
                onClick={handleMoveAllToBag}
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
              >
                <ShoppingCart size={16} />
                Move All To Cart
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {count > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-center">
              <button
                onClick={handleContinueShopping}
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save your favorite items by clicking the heart icon on any
              product. They'll appear here for easy access later.
            </p>
            <Link to="/"><button
              onClick={handleContinueShopping}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#DB4444] text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </button></Link>
          </div>
        )}

        {/* Wishlist Tips */}
        {count > 0 && (
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2">
              💡 Wishlist Tips:
            </h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Items in your wishlist are saved for 30 days</li>
              <li>• Get notified when wishlist items go on sale</li>
              <li>• Share your wishlist with friends and family</li>
            </ul>
          </div>
        )}
      </div>

      {/* Just for You Section */}
      <div className="mt-12 mx-5 md:mx-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
          <span className="text-black-500 font-semibold">Just For You</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;