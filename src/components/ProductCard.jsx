import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Eye, ShoppingCart, Star, Trash2 } from "lucide-react";
import {
  addToWishlist,
  removeFromWishlist,
} from "../pages/store/wishlistSlice";

const ProductCard = ({ product, isWishlistView = false }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    alert("Adding to cart:", product);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group">
      {/* Product Image Container */}
      <div className="relative bg-gray-100 rounded-t-lg overflow-hidden">
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-[#DB4444] text-white text-xs font-medium px-2 py-1 rounded">
              -{product.discount}%
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="aspect-square flex items-center justify-center p-6">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-400 text-sm">{product.name}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full shadow-md transition-colors duration-200 ${
              isInWishlist
                ? "bg-[#DB4444] text-white"
                : "bg-white text-gray-600 hover:text-[#DB4444]"
            }`}
          >
            {isWishlistView ? (
              <Trash2 className="w-4 h-4" />
            ) : (
              <Heart
                className={`w-4 h-4 ${isInWishlist ? "fill-white" : ""}`}
              />
            )}
          </button>

          <button className="p-2 bg-white text-gray-600 hover:text-blue-500 rounded-full shadow-md transition-colors duration-200">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#DB4444] font-semibold">
            ${product.salePrice || product.price}
          </span>
          {product.salePrice && (
            <span className="text-gray-400 text-sm line-through">
              ${product.price}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-gray-500 text-sm">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <div
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add To Cart
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
