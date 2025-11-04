"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../public/image 16.png";
import {
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  User,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { getApiConfig } from "@/lib/api-config";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
      const { baseURL, headers } = getApiConfig();
  

  const router = useRouter();
  const { cart } = useCart();
const totalItems = cart.length;

  //  Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseURL}/api/categories`, { method: 'GET', headers: headers }
        );
        const data = await res.json();
        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error("Invalid categories structure:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  //  Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-white relative">
      <div className="flex justify-between h-[60px] px-5 md:px-10">
        {/*  Logo  */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="brand logo" width={140} height={32} priority />
        </Link>

        {/*  Desktop Menu  */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700 relative">
          {/*  Search Icon */}
          <div className="relative">
            <Search
              className="w-5 h-5 cursor-pointer hover:text-black"
              onClick={() => setSearchOpen(!searchOpen)}
            />
            {searchOpen && (
              <form
                onSubmit={handleSearch}
                className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-2 flex items-center z-50"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#FE7622]"
                />
                <button
                  type="submit"
                  className="ml-2 bg-[#FE7622] text-white px-3 py-1 rounded-md text-sm hover:bg-[#e65f14]"
                >
                  Go
                </button>
              </form>
            )}
          </div>

          {/*  Categories Dropdown  */}
          <div
            className="relative flex items-center gap-1 cursor-pointer"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="text-base text-[#141414] font-medium flex items-center gap-1">
              Categories <ChevronDown className="w-4 h-4" />
            </span>
            {showDropdown && (
              <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-3 min-w-[150px] z-50">
                {loading ? (
                  <p className="text-gray-500 text-sm">Loading...</p>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category}`}
                      className="block px-2 py-1 text-gray-700 hover:text-[#FE7622] hover:bg-gray-50 capitalize"
                    >
                      {category}
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No categories found</p>
                )}
              </div>
            )}
          </div>

          {/*  Other Desktop Links  */}
          <Link
            href="/login"
            className="flex items-center gap-1 text-base text-[#141414] font-medium hover:text-black"
          >
            Sign in <User className="w-4 h-4" />
          </Link>

          <Heart className="w-5 h-5 cursor-pointer hover:text-red-500" />

          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/*  Mobile Icons  */}
        <div className="flex items-center gap-5 md:hidden">
          <Search
            className="w-5 h-5 cursor-pointer text-black"
            onClick={() => setSearchOpen(!searchOpen)}
          />
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 cursor-pointer text-black " />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="text-gray-700 hover:text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/*  Mobile Search Field */}
      {searchOpen && (
        <form
          onSubmit={handleSearch}
          className="md:hidden flex items-center bg-gray-100 px-4 py-2 border-t border-gray-200"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="ml-2 bg-[#FE7622] text-white px-3 py-1 rounded-md text-sm"
          >
            Go
          </button>
        </form>
      )}

      {/*  Mobile Dropdown Menu  */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-6 flex flex-col gap-4 text-gray-800 text-base font-medium">
          <button
            className="flex items-center justify-between hover:text-[#FE7622]"
            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
          >
            <span className="flex items-center gap-2">
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileDropdownOpen ? "rotate-180" : ""
                }`}
              />
              Categories
            </span>
          </button>

          {mobileDropdownOpen && (
            <div className="ml-6 mt-2">
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : categories.length > 0 ? (
                <ul className="flex flex-col gap-1 text-sm">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        href={`/category/${category}`}
                        className="block py-1 hover:text-[#FE7622] capitalize"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No categories found</p>
              )}
            </div>
          )}

          <Link
            href="/login"
            className="flex items-center gap-2 hover:text-[#FE7622]"
          >
            <User className="w-4 h-4 text-black" /> Sign in
          </Link>

          <Link
            href="#"
            className="flex items-center gap-2 hover:text-[#FE7622]"
          >
            <Heart className="w-4 h-4 text-black" /> Wishlist
          </Link>
        </div>
      )}
    </nav>
  );
}
