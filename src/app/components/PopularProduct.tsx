"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}

export default function PopularProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  //  Map of keywords to images
  const imageMap: Record<string, string> = useMemo(
    () => ({
      running: "/shoe.jpg",
      wireless: "/headphone.jpg",
      yoga: "/yoga mat.jpg",
      headset: "/products/headset.png",
      laptop: "/laptopstand.jpg",
      coffee: "/coffee.jpg",
      default: "/image5.png",
    }),
    []
  );

  //  Helper to select image by name
  const getImageForProduct = (productName: string): string => {
    const lowerName = productName.toLowerCase();
    for (const [keyword, imagePath] of Object.entries(imageMap)) {
      if (keyword !== "default" && lowerName.includes(keyword)) {
        return imagePath;
      }
    }
    return imageMap.default;
  };

  //  Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://frontendcodingtest-production.up.railway.app/api/products", { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );
        const data = await res.json();

        if (data.products && Array.isArray(data.products)) {
          //  assign images before setting state
          const productsWithImages = data.products.map((p: Product) => ({
            ...p,
            image: getImageForProduct(p.name),
          }));
          setProducts(productsWithImages);
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
  }, [imageMap]);

  return (
    <section className="w-full max-w-6xl mx-auto mt-20 mb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl text-[#141414] font-semibold">
          Popular Products
        </h2>
        <button className="text-[#525252] hover:underline text-base">
          View All
        </button>
      </div>

      {/* Loading or empty states */}
      {loading ? (
        <p className="text-gray-500 text-center py-10 text-lg">
          Loading products...
        </p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center py-10 text-lg">
          No products found.
        </p>
      ) : (
        // Product grid
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={{
                pathname: `/product/${product.id}`,
                query: { image: product.image || "/image5.png" },
              }}
            >
              <div className="relative w-full h-56 bg-gray-100 rounded-md flex items-center justify-center">
                <Image
                  src={product.image || "/image5.png"}
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
                    ₦{product.price.toLocaleString()}
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
