import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyCoupon,
  clearCart,
  updateQuantity,
  removeFromCart,
} from "../pages/store/cartSlice";
import { FaTrash, FaArrowLeft } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const couponDiscount = useSelector((state) => state.cart.couponDiscount);
  const couponCode = useSelector((state) => state.cart.couponCode);
  const [inputCouponCode, setInputCouponCode] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      dispatch(updateQuantity({ id: itemId, quantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleApplyCoupon = () => {
    if (inputCouponCode.trim()) {
      dispatch(applyCoupon(inputCouponCode.trim()));
      if (inputCouponCode.trim() === "SAVE10") {
        alert("Coupon applied successfully! 10% discount added.");
      } else {
        alert('Invalid coupon code. Try "SAVE10" for 10% off.');
      }
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length > 0) {
      setIsCheckingOut(true);

      // Simulate checkout process
      setTimeout(() => {
        alert(`Order placed successfully! Total: $${total.toFixed(2)}`);
        dispatch(clearCart());
        setInputCouponCode("");
        setIsCheckingOut(false);
      }, 1500);
    }
  };

  const handleReturnToShop = () => {
    // Navigate back to home/shop page
    window.history.back();
  };

  const handleUpdateCart = () => {
    // Force re-render or show success message
    alert("Cart updated successfully!");
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * couponDiscount) / 100;
  const total = subtotal - discountAmount;

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="px-6 py-4 text-sm text-gray-600">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span className="text-black">Cart</span>
        </div>

        <div className="px-6 pb-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              onClick={handleReturnToShop}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#DB4444] text-white rounded hover:bg-red-600 transition-colors"
            >
              <FaArrowLeft size={16} />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white mx-25">
      {/* Breadcrumb */}
      <div className="px-6 py-4 text-sm text-gray-600">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span className="text-black font-semibold">Cart</span>
      </div>

      <div className="px-6 pb-8">
        {/* Cart Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
            cart
          </p>
        </div>

        {/* Cart Table Header */}
        <div className="grid grid-cols-5 gap-6 py-4 border-b border-gray-200 mb-6">
          <div className="font-medium col-span-2">Product</div>
          <div className="font-medium text-center">Price</div>
          <div className="font-medium text-center">Quantity</div>
          <div className="font-medium text-center">Subtotal</div>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 gap-6 items-center py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {/* Product */}
              <div className="col-span-2 flex items-center gap-4">
                <div className="w-16 h-16  rounded flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <div
                    onClick={() => handleRemoveItem(item.id)}
                    className="inline-flex items-center gap-1 text-[#DB4444] hover:text-red-600 text-sm mt-1 transition-colors cursor-pointer"
                  >
                    <FaTrash size={12} />
                    Remove
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-center font-medium">
                ${item.price.toFixed(2)}
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-center">
                <div className="flex items-center border border-gray-300 rounded overflow-hidden cursor-pointer">
                  <div
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    disabled={item.quantity === 1}
                  >
                    -
                  </div>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-12 text-center bg-white">
                    {item.quantity}
                  </span>
                  <div
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <div className="text-center font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mb-8">
          <div
            onClick={handleReturnToShop}
            className="inline-flex items-center gap-2 px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <FaArrowLeft size={14} />
            Return To Shop
          </div>
          <div
            onClick={handleUpdateCart}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Update Cart
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          {/* Coupon Section */}
          <div className="flex-1 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Apply Coupon</h3>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={inputCouponCode}
                onChange={(e) => setInputCouponCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#DB4444] focus:border-transparent"
              />
              <button
                onClick={handleApplyCoupon}
                disabled={!inputCouponCode.trim()}
                className="px-6 py-2 bg-[#DB4444] text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Apply
              </button>
            </div>
            {couponCode && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-green-700 text-sm">
                  ✅ Coupon "{couponCode}" applied ({couponDiscount}% off)
                </p>
              </div>
            )}
          </div>

          {/* Cart Total */}
          <div className="w-full lg:w-96 border border-gray-400 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">
                  Subtotal ({cartItems.length} items):
                </span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium text-green-600">Free</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between py-2 text-green-600">
                  <span>Discount ({couponDiscount}%):</span>
                  <span className="font-medium">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              <hr className="border-gray-300" />

              <div className="flex justify-between py-3 text-xl font-bold">
                <span>Total:</span>
                <span className="text-[#DB4444]">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || isCheckingOut}
              className="w-full mt-6 px-6 py-4 bg-[#DB4444] text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
            >
              {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
            </button>

            {/* Security badges */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
              <span>🔒 Secure Checkout</span>
              <span>💳 All Cards Accepted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
