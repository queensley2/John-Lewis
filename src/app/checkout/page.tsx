"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { getApiConfig } from "@/lib/api-config";

interface CheckoutForm {
  email: string;
  address: string;
}

interface CheckoutResponse {
  message?: string;
  success?: boolean;
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<CheckoutForm>({
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
      const { baseURL, headers } = getApiConfig();
  

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
`${baseURL}/api/checkout`,        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart.map((item) => ({
              product_id: item.id, 
              quantity: item.quantity,
            })),
            shipping_address: form.address, 
            email: form.email, 
          }),
        }
      );

      const data: CheckoutResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Checkout failed");
      }

      setMessage({ type: "success", text: "✅ Checkout successful!" });
      clearCart();

      setTimeout(() => router.push("/"), 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "error", text: "Something went wrong." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 md:px-12 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-[#141414]">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {/*  Left — Customer Info Form */}
          <form
            onSubmit={handleCheckout}
            className="bg-gray-50 border rounded-lg p-6 shadow-sm flex flex-col gap-4"
          >
            <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-md  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FE7622]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Shipping Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full border text-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FE7622]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-[#FE7622] text-white font-medium py-2 rounded-md flex justify-center items-center gap-2 hover:bg-[#e25f10] transition"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Place Order"
              )}
            </button>

            {message && (
              <div
                className={`mt-3 flex items-center gap-2 ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <p>{message.text}</p>
              </div>
            )}
          </form>

          {/*  Right — Order Summary */}
          <div className="bg-gray-50 border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="divide-y">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-[#141414]">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-[#FE7622] font-semibold">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>

            <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold text-[#141414]">
              <span>Total:</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
