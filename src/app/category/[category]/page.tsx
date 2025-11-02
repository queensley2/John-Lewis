"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

// ✅ Define manual image mappings by category or product name
  const imageMap: Record<string, string> = {
    
    running: "/shoe.jpg",
    wireless: "/headphone.jpg",
    yoga: "/yoga mat.jpg",
    headset: "/products/headset.png",
    laptop: "/laptopstand.jpg",
    coffee: "/coffee.jpg",
  };


export default function CategoryPage() {
  const { category } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://frontendcodingtest-production.up.railway.app/api/categories/${category}/products`
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        const fetchedProducts = Array.isArray(data.products)
          ? data.products
          : Array.isArray(data)
          ? data
          : [];

        // ✅ Apply manual image assignment
        const updatedProducts = fetchedProducts.map((product: Product) => {
          const productName = product.name.toLowerCase();
          const matchedImage =
            Object.entries(imageMap).find(([key]) =>
              productName.includes(key)
            )?.[1] || "/image5.png"; // fallback image
          return { ...product, image: matchedImage };
        });

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <main className="bg-white min-h-screen text-gray-900 px-6 md:px-12 py-8">
      {/* 🔙 Back Button */}
      <button
        onClick={() => router.push("/category")}
        className="flex items-center gap-2 text-gray-700 hover:text-[#FE7622] mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Categories</span>
      </button>

      {/* 🧭 Breadcrumb */}
      <nav
        className="flex flex-wrap items-center text-sm text-gray-500 mb-6"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-[#FE7622] font-medium">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
        <Link href="/category" className="hover:text-[#FE7622] font-medium">
          Categories
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
        <span className="text-gray-800 capitalize font-medium">{category}</span>
      </nav>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 capitalize">
        {category} Products
      </h1>

      {/* Product Grid */}
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative w-full h-48 bg-gray-50">
                  <Image
                    src={product.image || "/image5.png"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h2 className="text-base text-gray-900 font-medium mb-1 truncate">
                    {product.name}
                  </h2>
                  <p className="text-[#FE7622] font-semibold">
                    ₦{product.price?.toLocaleString() || "—"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found in this category.</p>
      )}
    </main>
  );
}
