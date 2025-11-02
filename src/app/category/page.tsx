"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://frontendcodingtest-production.up.railway.app/api/categories"
        );
        const data = await res.json();

        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error("Invalid response format:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="bg-white min-h-screen text-gray-900 px-6 md:px-12 py-8">
      {/* 🔙 Back Button */}
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-700 hover:text-[#FE7622] mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* 🧭 Breadcrumb */}
      <nav
        className="flex items-center text-sm text-gray-500 mb-6"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-[#FE7622] font-medium">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
        <span className="text-gray-800 font-medium">Categories</span>
      </nav>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        All Categories
      </h1>

      {/* Categories Grid */}
      {loading ? (
        <p className="text-gray-500">Loading categories...</p>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="border border-gray-200 rounded-lg p-6 text-center text-gray-700 font-medium hover:text-[#FE7622] hover:border-[#FE7622] transition"
            >
              {category}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No categories found.</p>
      )}
    </main>
  );
}
