"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowLeft, CreditCard } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your cart is empty 🛍️
        </h2>
        <Link
          href="/"
          className="text-white bg-black hover:bg-gray-900 px-6 py-3 rounded-lg transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-200 pb-4"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-500 hover:text-red-500 transition"
                title="Remove from Cart"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>

            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">$5.00</span>
            </div>
            <div className="border-t border-gray-300 my-3"></div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${(totalPrice + 5).toFixed(2)}</span>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition">
            <CreditCard className="w-5 h-5" />
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
