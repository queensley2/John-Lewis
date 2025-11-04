"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { getApiConfig } from "@/lib/api-config";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image?: string;
  description?: string;
  category?: string;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
    const { baseURL, headers } = getApiConfig();

  const passedImage = searchParams.get("image"); 

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${baseURL}/api/products/${id}`, { method: 'GET', headers: headers }
        );
        if (!res.ok) throw new Error("Failed to fetch product details");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: passedImage || product.image || "/image5.png", 
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading)
    return (
      <div className="bg-white min-h-screen flex justify-center items-center text-gray-500">
        Loading product details...
      </div>
    );

  if (!product)
    return (
      <div className="bg-white min-h-screen flex justify-center items-center text-gray-500">
        Product not found.
      </div>
    );

  return (
    <main className="bg-white min-h-screen text-gray-900 px-6 md:px-12 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-700 hover:text-[#FE7622] mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative w-full h-80 md:h-[450px] bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={passedImage || product.image || "/image5.png"} 
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            {product.name}
          </h1>
          <p className="text-[#FE7622] text-xl font-semibold mb-4">
            ₦{product.price?.toLocaleString()}
          </p>

          {product.description && (
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>
          )}

          {product.category && (
            <p className="text-sm text-gray-500 mb-3">
              Category:{" "}
              <span className="capitalize font-medium text-gray-800">
                {product.category}
              </span>
            </p>
          )}

          {product.stock !== undefined && (
            <p className="text-sm text-gray-500 mb-8">
              Stock:{" "}
              <span className="font-medium text-gray-800">{product.stock}</span>
            </p>
          )}

          <button
            onClick={handleAddToCart}
            className="w-full md:w-1/2 bg-[#FE7622] text-white py-3 rounded-lg font-medium hover:bg-[#e65f14] transition"
          >
            {added ? "✅ Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
}
