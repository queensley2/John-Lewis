"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export default function PopularProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://frontendcodingtest-production.up.railway.app/api/products"
        );
        const data = await res.json();

        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Invalid product response structure:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto mt-20 mb-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl text-[#141414] font-semibold">
          Related Products
        </h2>
        <button className="text-[#525252] hover:underline text-base">
          View All
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-10 text-lg">
          Loading products...
        </p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center py-10 text-lg">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-white rounded-lg transition p-2 hover:shadow-md hover:scale-[1.02] duration-200"
            >
              <div className="relative w-full h-56 bg-gray-100 rounded-md flex items-center justify-center">
                {/* Placeholder image since API doesn’t provide one */}
                <Image
                  src="/image4.png"
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col mt-2 gap-2">
                <div>
                  <h3 className="font-semibold text-lg text-[#292929] line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="font-semibold text-[#141414] text-xl mt-1">
                    ₦{product.price}
                  </p>
                </div>
                <p className="text-gray-500 text-sm capitalize">
                  Category: {product.category}
                </p>
                <p className="text-gray-500 text-sm capitalize">
                  Stock: {product.stock}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
